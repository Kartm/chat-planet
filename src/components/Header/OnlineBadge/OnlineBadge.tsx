import React from 'react'
import './OnlineBadge.css'

type OnlineBadgeProps = {
    amount: number;
}

const OnlineBadge = (props: OnlineBadgeProps) => {
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
