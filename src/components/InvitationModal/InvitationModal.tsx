import React from 'react'
import Modal from '../Modal/Modal'
import SepiaButton from '../reusable/SepiaButton/SepiaButton'
import Flag from '../reusable/Flag/Flag'
import './InvitationModal.css'
import Invitation from '../../models/Invitation'

type InvitationModalProps = {
    onAccept: () => void;
    onClose: () => void;
    invitation: Invitation | null;     
}

const InvitationModal = (props: InvitationModalProps) => {
    const { onAccept, onClose, invitation } = props
    if (invitation === null) return null

    const { from } = invitation
    let invitationText = ''
    invitationText += from.name + ', ' + from.countryCode

    return (
        <Modal>
            <div className='invitation'>
                <div className='invitation-header'>
                    <span className='invitation-header-text'>
                        A new invitation!
                    </span>
                    <SepiaButton
                        className='invitation-close-button'
                        onClick={onClose}
                    >
                        &#215;
                    </SepiaButton>
                </div>
                <div className='invitation-content'>
                    <span className='invitation-text'>
                        {invitationText}
                        <Flag countryCode={from.countryCode} />
                    </span>
                    <div className='invitation-buttons'>
                        <SepiaButton
                            className='accept'
                            onClick={() => {
                                onAccept()
                                onClose()
                            }}
                        >
                            Accept
                        </SepiaButton>
                        <SepiaButton className='reject' onClick={onClose}>
                            Reject
                        </SepiaButton>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default InvitationModal
