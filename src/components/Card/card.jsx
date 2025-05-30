"use client";
import { useState } from "react";
import Modal from "../Modal/modal";
import './card.css';

export default function Card({ title, description, time, onDelete, onEdit, onMoreInfo }) {
    const [openModal, setOpenModal] = useState(null);
    const charLimit = 30;
    // const openModal = () => setOpenModal(true); 
    // const closeModal = () => setOpenModal(false);

    const truncatedDescription = description.length > charLimit
  ? description.slice(0, charLimit) + '...'
  : description;


    return (
    <div className='card'>
      <h2>{title}</h2>
      <p>{truncatedDescription}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={() => setOpenModal('edit')}>Edit</button>
      <button onClick={() => setOpenModal('info')}>More Info</button>

        <Modal
            isOpen={openModal === 'info'}
            onClose={() => setOpenModal(null)}
            hasCloseBtn={true}
        >
            <h2>{title}</h2>
            <p>{description}</p>
        </Modal>

        <Modal
            isOpen={openModal === 'edit'}
            onClose={() => setOpenModal(null)}
            hasCloseBtn={true}
        >
            <h2>Edit {title}</h2>
            <input
            placeholder="Edit title"
            type="text"
            ></input>
        </Modal>
    </div>
  )
}