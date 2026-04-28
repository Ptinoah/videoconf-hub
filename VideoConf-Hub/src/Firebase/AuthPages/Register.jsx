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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" className="google-icon" />
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