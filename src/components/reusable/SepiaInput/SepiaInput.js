import React from 'react'
import './SepiaInput.css'

const SepiaInput = props => {
    const onInput = e => {
        props.onInputChange(e.target.value)
    }

    return <input type='text' onInput={onInput} className='sepia-input' />
}

export default SepiaInput
