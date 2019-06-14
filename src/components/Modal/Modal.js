import { Component } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

class Modal extends Component {
    root = document.getElementById('portal-root')

    render() {
        return ReactDOM.createPortal(this.props.children, this.root)
    }
}

export default Modal
