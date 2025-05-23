import kampanya from "../../assets/kampanya.jpg";

const Profil_kampanyalar = () => {
    return (
        <div className="row kampanya-row">
            <div className="col-lg-3">
                <a href="#" className="kampanya-card">
                    <img src={kampanya} className="img-fluid w-100" alt=""/>
                    <div>Bu hafta tişörtlerde %20 indirim</div>
                </a>
            </div>
            <div className="col-lg-3">
                <a href="#" className="kampanya-card">
                    <img src={kampanya} className="img-fluid w-100" alt=""/>
                    <div>Bu hafta tişörtlerde %20 indirim</div>
                </a>
            </div>
            <div className="col-lg-3">
                <a href="#" className="kampanya-card">
                    <img src={kampanya} className="img-fluid w-100" alt=""/>
                    <div>Bu hafta tişörtlerde %20 indirim</div>
                </a>
            </div>
            <div className="col-lg-3">
                <a href="#" className="kampanya-card">
                    <img src={kampanya} className="img-fluid w-100" alt=""/>
                    <div>Bu hafta tişörtlerde %20 indirim</div>
                </a>
            </div>
            <div className="col-lg-3">
                <a href="#" className="kampanya-card">
                    <img src={kampanya} className="img-fluid w-100" alt=""/>
                    <div>Bu hafta tişörtlerde %20 indirim</div>
                </a>
            </div>
        </div>
    )
}


export default Profil_kampanyalar;