"use client";
import "./input.css";

export default function Input({ label, type, placeholder, value, onChange }) {
    return (
        <div className="input-container">
        <label>{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        </div>
    );
}
