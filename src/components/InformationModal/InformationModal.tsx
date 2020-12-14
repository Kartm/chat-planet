import React from 'react'
import Modal from '../Modal/Modal'
import SepiaButton from '../reusable/SepiaButton/SepiaButton'
import './InformationModal.css'

type InformationModalProps = {
    onClose: () => void;
    information: string | null;
}

const InvitationModal = (props: InformationModalProps) => {
    const { onClose, information } = props

    return (
        information ? (
            <Modal>
                <div className='information'>
                    <div className='information-header'>
                        <span className='information-header-text'>
                            A new information!
                        </span>
                        <SepiaButton
                            className='information-close-button'
                            onClick={onClose}
                        >
                            &#215;
                        </SepiaButton>
                    </div>
                    <div className='information-content'>
                        <span className='information-text'>{information}</span>
                    </div>
                </div>
            </Modal>
        ) : null
    )
}

export default InvitationModal
