import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from '../../components/Toast/toast';
import Input from '../../components/Input/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toast, setToast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const ValidateForm = () => {
        const newErrors = {};

        if (!nick.trim()) {
            newErrors.nick = "Nickname is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    // tryhard moment i guess
    const getPasswordStrength = (password) => {
        if (password.length < 6) return 1;
        if (password.length < 8) return 2;
        if (password.length >= 8) return 3;
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!ValidateForm()) return;
        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setToast({
                message: "Registration successful! Redirecting to login...",
                onClose: () => {
                    setToast(null);
                    navigate('/login');
                }
            });
        } catch (err) {
            console.error("Registration error:", err);
            setErrors({ submit: err.message });
        } finally {
            setIsLoading(false);
        }
    }
    const passwordStrength = getPasswordStrength(password);

    return (
        <div className='register-container'>
            <div className='register-card'>
                <div className='register-header'>
                    <h1>Register</h1>
                </div>
            {toast && (
                <Toast message={toast.message} onClose={toast.onClose} />
            )}
                <form onSubmit={handleRegister} className='register-form'>
                    <div className='form-row'>
                        <Input 
                            label="Nick" 
                            type="text" 
                            placeholder="Enter your Nickname" 
                            value={nick} 
                            onChange={setNick} 
                        />
                    </div>
                    <div className='form-row'>
                        <Input 
                            label="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={setEmail} 
                        />
                    </div>
                    <div className='form-row'>
                        <Input 
                            label="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={setPassword} 
                        />
                    </div>
                    {password && (
                        <div className='password-strength'>
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`strength-bar ${
                                        i < passwordStrength 
                                            ? passwordStrength === 1 
                                            ? "weak"
                                            : passwordStrength === 2
                                            ? "medium"
                                            : "strong"
                                        : ""
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                    <div className='form-row'>
                        <Input
                            label="confirm password" 
                            type="password" 
                            placeholder="Confirm your password" 
                            value={confirmPassword} 
                            onChange={setConfirmPassword}
                        />
                    </div>
                    {errors && errors.submit && (<div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                        {errors.submit}
                        </div>
                    )}
                    <button 
                        type="submit" 
                        className={`register-button ${isLoading ? 'loading' : ''}`} 
                        disabled={isLoading} 
                    >{isLoading ? "" : "Create Account"}
                     </button>
                </form>

                    <div className='register-footer'>
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                
                </div>
        </div>
        
    )
}

export default Register;