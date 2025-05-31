import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Toast from "../../components/Toast/toast";
import Input from "../../components/Input/input";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState(null);   
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setToast({
                message: "Login successful! Redirecting to home page...",
                onClose: () => {
                    setToast(null);
                    navigate('/');
                }
            })
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return ( 
        <div>
            {toast && (
                <Toast 
                    message={toast.message} 
                    onClose={toast.onClose} 
                />
            )}
            <h1>Login here</h1>
            <div className="form-content">            
                <form onSubmit={handleLogin} className="form auth-form">
                    <div>
                        <Input 
                            label="Email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={setEmail} 
                        />
                    </div>
                    <div>
                        <Input 
                            label="Password" 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={setPassword} 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;