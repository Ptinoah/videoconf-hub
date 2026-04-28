import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Authentification';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('E-mail ou mot de passe incorrect.');
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("Connexion Google réussie !");
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la connexion avec Google.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Se connecter</h2>
                {error && <p className="auth-error">{error}</p>}
                
                <form onSubmit={handleLogin} className="auth-form">
                    <input 
                        type="email" 
                        placeholder="Adresse e-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        className="auth-input"
                    />
                    <input 
                        type="password" 
                        placeholder="Mot de passe" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className="auth-input"
                    />
                    <button type="submit" className="auth-button">Connexion</button>
                </form>
                <div className="auth-divider">
                    <span>ou</span>
                </div>
                <button type="button" className="auth-button google-button" onClick={handleGoogleLogin}>
                    <svg
                        className="google-icon"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.225 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z" />
                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.144 35.091 26.715 36 24 36c-5.204 0-9.617-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.084 5.565h.003l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                    </svg>
                    Continuer avec Google
                </button>
                
                <p className="auth-switch">
                    Pas encore de compte ? <span onClick={() => navigate('/register')}>S'inscrire</span>
                </p>
            </div>
        </div>
    );
};

export default Login;