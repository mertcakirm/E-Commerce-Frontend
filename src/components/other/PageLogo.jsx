import logo from "../../assets/mob_logo.png";

const PageLogo = ({size}) => {
    return (
        <div className="container my-5" data-aos="fade-up">
            <div className="row justify-content-center">
                <a style={{display: 'flex', justifyContent: 'center'}} className="logo-a" href="/">
                    <img src={logo} className={`img-fluid w-${size}`} alt=""/>
                </a>
            </div>
        </div>
    );
};

export default PageLogo;