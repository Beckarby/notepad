import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import Layout from './layouts/header'


const App = () => {
  return (

    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  )
}
export default App
