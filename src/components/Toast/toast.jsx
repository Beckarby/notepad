"use client";
import { useState, useEffect } from "react";
import './toast.css'; 

export default function Toast({ message, onClose }) {
    const [visible, setVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        let removeTimer;

        const closeTimer = setTimeout(() => {
            setIsClosing(true);

            removeTimer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, 1000);

        }, 1500);

        return () => {
            clearTimeout(closeTimer);
            clearTimeout(removeTimer);
        };
    }, [onClose]);

    if (!visible) return null;

    return (
    <div className={`toast ${isClosing ? "toast-closing" : ""}`}>
      <p>{message}</p>
    </div>
  );

  
}