import { useState } from "react";

export default function Input({ label, type, placeholder, value, onChange }) {
    const [inputValue, setInputValue] = useState(value);
    
    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };
    
    return (
        <div className="input-container">
        <label>{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
        />
        </div>
    );
}
