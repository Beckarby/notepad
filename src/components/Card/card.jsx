"use client";
import { useEffect, useState } from "react";
import Modal from "../Modal/modal";
import EditForm from "../CardForm/CardForm.jsx";
import './card.css';


export default function Card({ id, title, description, onDelete, onEdit }) {
    const [openModal, setOpenModal] = useState(null);
    const charLimit = 50;

    const truncatedDescription = description.length > charLimit
    ? description.slice(0, charLimit) + '...'
    : description;

    return (
    <div className='card'>
      <h2>{title}</h2>
      <p>{truncatedDescription}</p>
      <button onClick={() => setOpenModal('delete')}>Delete</button>
      <button onClick={() => setOpenModal('edit')}>Edit</button>
      <button onClick={() => setOpenModal('info')}>More Info</button>

        <Modal
            isOpen={openModal === 'info'}
            onClose={() => setOpenModal(null)}
        >
            <h2>{title}</h2>
            <p>{description}</p>
        </Modal>

        <Modal
            isOpen={openModal === 'edit'}
            onClose={() => setOpenModal(null)}
            >
          <EditForm
            title={title}
            description={description}
            onSave={onEdit}
            onClose={() => setOpenModal(null)}
            isAddMode={false}
            isOpen={openModal === 'edit'}
          />
        </Modal>
        <Modal
            isOpen={openModal === 'delete'}
            onClose={() => setOpenModal(null)}
        >
            <div className="delete-modal">
                <p>Confirm</p>
                <h3>Are you sure you want to delete this card?</h3>
                <button onClick={() => {
                    onDelete(id);
                    setOpenModal(null);
                }}>Yes, Delete</button>
                <button onClick={() => setOpenModal(null)}>Cancel</button>
            </div>
        </Modal>
    </div>
  )
}