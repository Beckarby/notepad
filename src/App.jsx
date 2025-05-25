import { useState } from 'react'
import Card from './components/card'
import Toast from './components/toast'
import Input from './components/input'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import User from './pages/User/user'



const App = () => {
  const [toasts, setToasts] = useState([]);
  const addToast = () => {
    const newToast = {
      id: Date.now(),
      message: 'This is a toast message',
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  const handleDelete = () => {
    console.log('Toast closed');
  }
  const handleEdit = () => {
    console.log('Toast closed');
  }
  const handleMoreInfo = () => {
    console.log('Toast closed');
  }


  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
      </Routes>
      
      <div className="container">
        <Card title="Card 1" description="This is the first card" time="10:00 AM" 
          onDelete={handleDelete} onEdit={handleEdit} onMoreInfo={handleMoreInfo}
        />
        <Card title="Card 2" description="This is the second card" time="11:00 AM" 
          onDelete={handleDelete} onEdit={handleEdit} onMoreInfo={handleMoreInfo}
        />
        <Card title="Card 3" description="This is the third card" time="12:00 PM" 
          onDelete={handleDelete} onEdit={handleEdit} onMoreInfo={handleMoreInfo}
        />

        <button onClick={addToast}>Add Toast</button>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
        ))}

      </div>
    </BrowserRouter>
  )
}
export default App
