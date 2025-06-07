"use client"

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import './header.css';
import '../App.css';


export default function Layout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    }

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
        
    }

    return (
        <div className='app-container'>
            <header className="header">
                <Link to="/"><img src="/logo.png" alt="Logo" className="header-logo" /></Link>
                <p className='header-brand'>Expedition Journal</p>
                <div className='header-content'>
                <nav>
                    <ul>
                        { isLoggedIn && (
                            <>
                                <li><Link to="/">Home</Link></li>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            </>
                        )}
                        { isLoggedIn && (
                            <li>
                                <button className='logout-button' onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
                <button className='theme-toggle' onClick={toggleTheme} aria-label='Toggle Theme'>
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