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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" className="google-icon" />
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