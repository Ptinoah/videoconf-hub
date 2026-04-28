import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Authentification';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        
        return () => unsubscribe();
    }, []);
    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Vérification de l'accès...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;