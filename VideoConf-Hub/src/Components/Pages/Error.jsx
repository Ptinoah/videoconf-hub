import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>Oups, vous vous êtes perdu en chemin.</h1>
            <p>Appuyez sur ce bouton <button onClick={()=> navigate('/')}>uwu</button></p>
        </>
        
    );

}

export default Error;