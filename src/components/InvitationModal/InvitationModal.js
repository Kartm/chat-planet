import React from 'react'
import Modal from '../Modal/Modal'
import './InvitationModal.css'

const InvitationModal = props => {
    const { onAccept, onReject, invitation } = props
    if (invitation === null) return null
    return (
        <Modal>
            <div className='invitation'>
                <div className='invitation-header'>
                    <span className='invitation-header-text'>
                        A new invitation!
                    </span>
                    <button
                        className='invitation-close-button'
                        onClick={onReject}
                    >
                        &#215;
                    </button>
                </div>
                <div className='invitation-content'>
                    <span>{`from ${invitation.from.name}`}</span>
                    <div className='invitation-buttons'>
                        <button
                            className='invitation-button accept'
                            onClick={onAccept}
                        >
                            Accept
                        </button>
                        <button
                            className='invitation-button reject'
                            onClick={onReject}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default InvitationModal