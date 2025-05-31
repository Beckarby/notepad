import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from '../../components/Toast/toast';
import Input from '../../components/Input/input';
import { useState } from 'react';

const Register = () => {
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            <Toast message="Registration successful!" onClose={() => {}} />;
            
        } catch (err) {
            console.error("Registration error:", err);
        }
    }
    return (
        <div className='auth-container'>
            
            <h1>Register</h1>
            <div className='form-content'>
                <form onSubmit={handleRegister} className='form auth-form'>
                    <div>
                        <Input 
                            label="nick" 
                            type="text" 
                            placeholder="Enter your nickname" 
                            value={nick} 
                            onChange={setNick} 
                        />
                    </div>
                    <div>
                        <Input 
                            label="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={setEmail} 
                        />
                    </div>
                    <div>
                        <Input 
                            label="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={setPassword} 
                        />
                    </div>
                    <div>
                        <Input
                            label="confirm password" 
                            type="password" 
                            placeholder="Confirm your password" 
                            value={confirmPassword} 
                            onChange={setConfirmPassword}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                
            </div>
            <div className='auth-bg'></div>
        </div>
    )
}

export default Register;