'use client';
import { useState, useEffect } from "react";
import Input from "../Input/input";

function EditForm({ title, description, onSave, onClose, isAddMode = false, isOpen }) {
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
        if (isAddMode && !titleValue.trim() || !descriptionValue.trim()) {
            setError("Title and description cannot be empty.");
            return;
        }
        if (isAddMode && !titleValue.trim()) {
            setError("Title cannot be empty.");
            return;
        }
        if (isAddMode && !descriptionValue.trim()) {
            setError("Description cannot be empty.");
            return;
        }
        onSave(titleValue, descriptionValue);
        onClose();
    }

    useEffect(() => {
        if (isOpen) {
            setTitleValue(title);
            setDescriptionValue(description);
            setError("");
        }
    }, [isOpen, title, description]);

    return (
        <div>
            <h2>{isAddMode ? "Add New Card" : `Edit ${title}`}</h2>
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
                {isAddMode ? "Add Card" : "Save Changes"}
            </button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}

export default EditForm;