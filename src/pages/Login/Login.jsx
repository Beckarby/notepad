import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Toast from "../../components/Toast/toast";
import Input from "../../components/Input/input";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            <Toast message="Login successful!" onClose={() => {}} />;
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return ( 
        <div>
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