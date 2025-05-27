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
import Layout from './layouts/header'



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
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
      </Routes>
      </Layout>
      
      <div className="container ">
        
        <button onClick={addToast}>Add Toast</button>
        {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
        ))}

    </div>
    </BrowserRouter>
  )
}
export default App
