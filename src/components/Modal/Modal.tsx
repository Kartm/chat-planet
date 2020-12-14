import { Component } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

class Modal extends Component {
    root = document.getElementById('portal-root')

    render() {
        if(this.root) {
            return ReactDOM.createPortal(this.props.children, this.root)
        }
        
        return null;
    }
}

export default Modal
