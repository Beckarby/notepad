'use client';
import { useState } from "react";
import './editform.css';
import Input from "../Input/input";

function EditForm({ title, description, onSave, onClose }) {
    const [titleValue, setTitleValue] = useState(title);
    const [descriptionValue, setDescriptionValue] = useState(description);

    const handleSubmit = () => {
        onSave(titleValue, descriptionValue);
        onClose();
    }

    return (
        <div>
            <h2>Edit {title}</h2>
            <Input
                label="Title"
                type="text"
                placeholder="Enter title"
                value={titleValue}
                onChange={setTitleValue}
            />
            <Input
                label="Description"
                type="text"
                placeholder="Enter description"
                value={descriptionValue}
                onChange={setDescriptionValue}
            />
            <button onClick={handleSubmit}>
                Save Changes
            </button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}

export default EditForm;