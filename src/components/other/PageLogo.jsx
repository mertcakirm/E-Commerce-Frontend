import logo from "../../assets/mob_logo.png";

const PageLogo = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <a style={{display: 'flex', justifyContent: 'center'}} className="logo-a" href="/">
                    <img src={logo} className="img-fluid w-25" alt=""/>
                </a>
            </div>
        </div>
    );
};

export default PageLogo;