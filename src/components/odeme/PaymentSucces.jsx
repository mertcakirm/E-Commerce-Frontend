import {MdOutlineDone} from "react-icons/md";

const PaymentSucces = () => {
    return (
        <div className='row'>
            <div className="col-12 onay-svg-parent">
                <div className="d-flex justify-content-center align-items-center p-3" style={{background:'green',borderRadius:'200px'}}>
                    <MdOutlineDone size={50} color="white" />
                </div>
                <h2 className='onay-metin'>Siparişiniz Onaylandı</h2>
                <a href="/">Anasayfaya Gitmek İçin Tıklayınız</a>
            </div>
        </div>
    )
}


export default PaymentSucces;