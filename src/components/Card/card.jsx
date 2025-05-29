"use client";
import { useState } from "react";
import Modal from "../Modal/modal";
import './card.css';

export default function Card({ title, description, time, onDelete, onEdit, onMoreInfo }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true); 
    const closeModal = () => setIsModalOpen(false);


    return (
    <div className='card'>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={openModal}>More Info</button>

        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            hasCloseBtn={true}
        >
            <h2>{title}</h2>
            <p>{description}</p>
        </Modal>
    </div>
  )
}