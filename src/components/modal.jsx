"use client";
import { useRef, useEffect } from "react";
import '../App.css';

export default function Modal({ isOpen, onClose, hasCloseBtn, children }) {
    const modalRef = useRef(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleCloseModal();
        }
    }

    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;
        if (isOpen) {
            modalElement.showModal();
        } else {
            modalElement.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
            {hasCloseBtn && (
                <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close Modal">
                    Close
                </button>
            )}
            {children}
        </dialog>
    )
}