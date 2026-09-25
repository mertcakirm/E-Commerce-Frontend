import { HiOutlineCheckCircle } from "react-icons/hi2";

const PaymentSucces = () => {
    return (
        <div className='row justify-content-center text-center'>
            <div className="col-12 col-md-8 col-lg-6 py-5">
                <div className="mb-4">
                    <HiOutlineCheckCircle size={80} color="#16a34a" />
                </div>
                <h1 className="fw-bold text-dark mb-3">Siparişiniz Başarıyla Alındı!</h1>
                <p className="text-secondary mb-5" style={{fontSize: "16px"}}>
                    Siparişiniz güvenle onaylanmıştır. Sipariş durumunuzu ve kargo sürecinizi "Siparişlerim" bölümünden takip edebilirsiniz.
                </p>
                <a href="/urunler/tum-urunler" className="checkout-btn-primary px-5 py-3">
                    Alışverişe Devam Et
                </a>
            </div>
        </div>
    );
};

export default PaymentSucces;
