import React, { Component } from 'react';
import { render } from 'react-dom';
import { Modal } from 'react-bootstrap';

class Panel extends Component {
    state = {
        show: false,
        component: null,
        callback: () => { }
    }
    handleClose = data => {
        this.setState({
            show: false,
        })
        this.state.callback(data)
    }
    handleShow = (options = {
        props: {},
        component: null,
        callback: () => { }
    }) => {
        const { props, component, callback } = options
        const _key = new Date().getTime()
        const _component = React.createElement(component, {
            ...props,
            handleClose: this.handleClose,
            key: _key
        })
        this.setState({
            show: true,
            component: _component,
            callback: callback
        })
    }
    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
            >
                {this.state.component}
            </Modal>
        )
    }
}

const _div = document.createElement('div')
document.body.appendChild(_div)

const _panel = render(<Panel />, _div)

export default _panel;