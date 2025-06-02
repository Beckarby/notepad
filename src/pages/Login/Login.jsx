import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Toast from "../../components/Toast/toast";
import Input from "../../components/Input/input";
import { useNavigate, Link } from "react-router-dom";
import './login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");
    const [toast, setToast] = useState(null);   
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email.trim()) {
            setErrors("Email is required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors("Email is invalid");
            return false;
        }
        if (!password) {
            setErrors("Password is required");
            return false;
        }
        return true;
    }
   

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors("");
        setSuccess("");
        if (!validateForm()) return;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess("Login successful");
            setTimeout(() => {
                navigate('/');
            }, 1500)
        } catch (err) {
            console.error("Login error:", err);

            switch (err.code) {
                case 'auth/user-not-found':
                    setErrors("User not found");
                    break;
                case 'auth/wrong-password':
                    setErrors("Incorrect password");
                    break;
                case 'auth/invalid-email':
                    setErrors("Invalid email address");
                    break;
                default:
                    setErrors("Login failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle social login (e.g., Google, Facebook) 
    // TODO: Implement actual social login logic
    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider} `);
    }

    return ( 
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Login</h1>
                </div>
                <div className="form-content">            
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-row">
                        <Input 
                            label="Email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={setEmail} 
                        />
                    </div>
                    <div className="form-row">
                        <Input 
                            label="Password" 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={setPassword} 
                        />
                    </div>
                    <div className="remember-me">
                        <input
                            type="checkbox" 
                            id="rememberMe"
                            checked={rememberMe} 
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    {errors && <div className="error-message">{errors}</div>}
                    {success &&<div className="success-message">{success}</div>}

                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? "loading" : ""}`} 
                        disabled={isLoading}>{isLoading ? "" : "Sign In"}
                    </button>

                    <div className="social-login">
                        <div className="divider">
                            <span>or continue with</span>
                        </div>
                        <div className="social-buttons">
                            <button className="social-button" onClick={() => handleSocialLogin('Google')}>
                                <span>🔍</span>
                                Google
                            </button>
                        </div>
                        <div className="login-footer">
                        <p>
                            Don't have an account? <Link to="/register">Create one here</Link>
                        </p>
                    </div>
                    </div>

                </form>
            </div>
            </div>
            
        </div>
    )
}

export default Login;