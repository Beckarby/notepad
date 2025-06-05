'use client';
import { useState } from "react";
import './editform.css';
import Input from "../Input/input";

function EditForm({ title, description, onSave, onClose }) {
    const [titleValue, setTitleValue] = useState(title);
    const [descriptionValue, setDescriptionValue] = useState(description);
    const [error, setError] = useState("");

    const titleLimit = 25;

    const handleTitleChange = (value) => {
        if (value.length > titleLimit) {
            setError(`Title can't be more than ${titleLimit} characters.`);
        } else {
            setError("");
            setTitleValue(value);
        }
    }

    const handleSubmit = () => {
        if (titleValue.length > titleLimit) {
            setError(`Title can't be more than ${titleLimit} characters.`);
            return;
        }
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
                onChange={handleTitleChange}
            />
            {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}
            <Input
                label="Description"
                type="text"
                placeholder="Enter description"
                value={descriptionValue}
                onChange={setDescriptionValue}
            />
            <button onClick={handleSubmit} disabled={!!error}>
                Save Changes
            </button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}

export default EditForm;