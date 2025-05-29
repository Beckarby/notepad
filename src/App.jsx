import { useState } from 'react'
import Toast from './components/Toast/toast'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import User from './pages/User/user'
import Layout from './layouts/header'


const App = () => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (message) => {
    const newToast = {
      id: Date.now(),
      message,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  
  return (

    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={
            <Home 
                onDelete={() => addToast("Card deleted")}
                onEdit={() => addToast("Card edited")}
                onMoreInfo={() => addToast("More info about the card")}
            />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
      </Routes>
      {toasts.map((toast) => (
            <Toast 
                key={toast.id} 
                message={toast.message} 
                onClose={() => removeToast(toast.id)} 
            />
      ))}
      </Layout>
    </BrowserRouter>
  )
}
export default App
