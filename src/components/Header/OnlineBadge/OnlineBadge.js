import React from 'react'
import './OnlineBadge.css'

const OnlineBadge = props => {
    return (
        <React.Fragment>
            <div className='online-badge'>
                <div className='online-badge-text'>
                    {props.amount} users online
                </div>
            </div>
        </React.Fragment>
    )
}

export default OnlineBadge
