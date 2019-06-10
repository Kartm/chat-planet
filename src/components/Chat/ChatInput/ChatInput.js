import React, { Component } from 'react'
import './ChatInput.css'

class ChatInput extends Component {
    state = { value: '' }

    onChange = e => {
        this.setState({ value: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const { value } = this.state
        this.props.onSend({ value })
        this.setState({ value: '' })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className='chat-input'>
                <textarea
                    className='input input--sepia'
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <button type='submit' className='button button--sepia'>
                    Send
                </button>
            </form>
        )
    }
}
export default ChatInput
