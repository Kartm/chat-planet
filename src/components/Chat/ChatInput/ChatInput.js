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
        if (value !== '') {
            this.props.onSend({ value })
            this.setState({ value: '' })
        }
    }

    onKeyDown = e => {
        if (e.keyCode === 13) {
            this.onSubmit(e)
        }
    }

    render() {
        const isMsgEmpty = this.state.value === ''
        let btnClassName = 'button button--sepia '
        if (isMsgEmpty) btnClassName += 'button--sepia--hidden'
        return (
            <form
                onSubmit={this.onSubmit}
                onKeyDown={this.onKeyDown}
                className='chat-input'
            >
                <textarea
                    className='input input--sepia'
                    value={this.state.value}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
                <button
                    disabled={isMsgEmpty}
                    type='submit'
                    className={btnClassName}
                >
                    Send
                </button>
            </form>
        )
    }
}
export default ChatInput
