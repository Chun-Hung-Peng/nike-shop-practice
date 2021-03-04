import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from '../../common/axios';
import CartItem from './CartItem';

const Cart = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const user = global.auth.getUser() || {};
    axios.get(`/carts?userId=${user.email}`).then(res => setCarts(res.data));
  }, []);

  const totalPrice = () => {
    const totalPrice = carts.map(cart => cart.price.substr(1) * cart.mount)
      .reduce((a, value) => a + value, 0)
    return totalPrice
  }

  const updateCart = cart => {
    const newCarts = [...carts];
    const _index = newCarts.findIndex(c => c.id === cart.id);
    newCarts.splice(_index, 1, cart);
    setCarts(newCarts);
  };

  const deleteCart = cart => {
    const _carts = carts.filter(c => c.id !== cart.id);
    setCarts(_carts);
  };

  return (
    <div className="cart-page ">
      <span className="cart-title">購買清單</span>
      <div className='cart-list'>
        <TransitionGroup component={null}>
          {
            carts.map(cart =>
              <CSSTransition classNames='cart-item' timeout={300} key={cart.id}>
                <CartItem
                  updateCatrs={updateCart}
                  deleteCart={deleteCart}
                  cart={cart} />
              </CSSTransition>
            )}
        </TransitionGroup>
      </div>
      {
        carts.length === 0 ?
          <p className='no-cart'>尚無商品</p> : ''
      }
      <div className="cart-total">
        總金額：
                <span className="total-price">${totalPrice()}</span>
      </div>
    </div >
  );
};

export default Cart;
