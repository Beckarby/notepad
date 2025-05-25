import { useState } from "react";

export default function Card({ title, description, time, onDelete, onEdit, onMoreInfo }) {
    return (
    <div className='card'>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={
        onMoreInfo
        
        }>More Info</button>

    </div>
  )
}