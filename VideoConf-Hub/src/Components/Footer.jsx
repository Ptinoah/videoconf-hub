const Footer = ({socials}) => {
    return (
        <footer className="footer-container">
            <div className="social-media-container">
                {socials.map(social => {
                    return <a key={social.name} href={social.link}><img src={social.icon} alt={social.name} width="50px" /></a>
                })}
            </div>
            <span>Copyright blablabla</span>
        </footer>
    )
}

export default Footer