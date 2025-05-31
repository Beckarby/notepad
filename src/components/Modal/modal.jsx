"use client";
import { useRef, useEffect, useState } from "react";
import { X } from 'lucide-react'
import './modal.css'; 

export default function Modal({ isOpen, onClose, children }) {
    const modalRef = useRef(null);  
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            if (onClose) {
                onClose();
            }
            setIsClosing(false);
        }, 400);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && isOpen && !isClosing) {
            handleCloseModal();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isClosing]);
  

    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;
        if (isOpen) {
            modalElement.showModal();
        } else if (!isClosing){
            modalElement.close();
        }
    }, [isOpen, isClosing]);

    return (
        <dialog 
            ref={modalRef} 
            onKeyDown={handleKeyDown} 
            className={`modal ${isClosing ? 'closing' : ''}`}
            >
                <button 
                className="modal-close-btn" 
                onClick={handleCloseModal} 
                aria-label="Close Modal"
                >
                    <X size={20} />
                </button>
            {children}
        </dialog>
    )
}