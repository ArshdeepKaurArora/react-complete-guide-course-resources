import React, { useEffect, useRef } from 'react'

function Modal({children, className, open, onClose, ...props}) {

    const classes = `modal ${className}`;

    const modalRef = useRef(null)

    useEffect(() => {
        if (open) {
            modalRef.current.showModal()
        } 

        return () => {
            if (modalRef.current) {
                modalRef.current.close()
            }
        }
    }, [open])

  return (
    <dialog className={classes} {...props} ref={modalRef} onClose={onClose}>
        {children}
    </dialog>
  )
}

export default Modal