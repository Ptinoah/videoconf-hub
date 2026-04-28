import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Authentification';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); 
        setError(''); 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Compte créé avec succès !");
            navigate('/'); 
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Cet e-mail est déjà utilisé.');
            } else if (err.code === 'auth/weak-password') {
                setError('Le mot de passe doit faire au moins 6 caractères.');
            } else {
                setError('Une erreur est survenue lors de la création du compte.');
            }
        }
    };

    const handleGoogleRegister = async () => {
        setError('');
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("Inscription avec Google réussie !");
            navigate('/');
        } catch (err) {
            console.error(err);
            setError("Erreur lors de l'inscription avec Google.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Créer un compte</h2>
                {error && <p className="auth-error">{error}</p>}
                
                <form onSubmit={handleRegister} className="auth-form">
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
                        placeholder="Mot de passe (min. 6 caractères)" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className="auth-input"
                    />
                    <button type="submit" className="auth-button">S'inscrire</button>
                </form>
                <div className="auth-divider">
                    <span>ou</span>
                </div>
                <button 
                    type="button" 
                    className="auth-button google-button" 
                    onClick={handleGoogleRegister}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="google-icon"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z" />
                        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z" />
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.2 7l6.2 5.2C39.9 36.3 44 30.8 44 24c0-1.3-.1-2.3-.4-3.5z" />
                    </svg>
                    S'inscrire avec Google
                </button>
                
                <p className="auth-switch">
                    Déjà un compte ? <span onClick={() => navigate('/login')}>Se connecter</span>
                </p>
            </div>
        </div>
    );
};

export default Register;