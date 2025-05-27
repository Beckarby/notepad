"use client"

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './header.css';
import '../App.css';


export default function Layout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            setIsDarkMode(systemPrefersDark);
        }
    }, []);

    useEffect(() => {
        document.documentElement.className = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    }
    return (
        <div className='app-container'>
            <header className="header">
                <Link to="/"><img src="/logo.png" alt="Logo" className="header-logo" /></Link>
                <p className='header-brand'>Expedition Journal</p>
                <div className='header-content'>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/user">User</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
                <button className='theme-toggle' onClick={toggleTheme} aria-label='Toggle Theme'>
                    {/* {isDarkMode ? src="/light.png" : src="/dark.png"} */}
                    <img src={isDarkMode ? "/bright.png" : "/dark.png"} alt="Toggle Theme" className='theme-image' />  
                </button>
                </div>
            </header>
            <div className='scrollable-content'>
                <main className='content'>
                    {children}  
                </main>
            </div>

        </div>
    )
}