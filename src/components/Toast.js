import React from "react"
import { Toast as ToastBody, ToastContainer } from "react-bootstrap"

const Toast = ({
    show,
    onClose,
    header,
    body,
    variant
}) => {
    return (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
            <ToastBody 
            className={'text-white'}
            bg={variant}
            show={show} onClose={onClose}>
                <ToastBody.Header>
                    <span className="w-100 ">
                    {header}
                    </span>
                </ToastBody.Header>
                <ToastBody.Body>
                    {body}
                </ToastBody.Body>
            </ToastBody>
        </ToastContainer>
    )
}

export default Toast;