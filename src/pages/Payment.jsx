import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentBasket from "../components/odeme/PaymentBasket.jsx";
import PaymentAddress from "../components/odeme/PaymentAddress.jsx";
import PaymentCardInfo from "../components/odeme/PaymentCardInfo.jsx";
import PaymentSucces from "../components/odeme/PaymentSucces.jsx";
import "./css/Payment.css";
import { HiOutlineCheck } from "react-icons/hi2";

const Payment = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    const stepsData = [
        { id: 1, title: 'Sepet Özeti', path: '/siparis/ozet' },
        { id: 2, title: 'Teslimat & Kargo', path: '/siparis/kargo' },
        { id: 3, title: 'Ödeme', path: '/siparis/odeme' },
        { id: 4, title: 'Onay', path: '/siparis/onay' },
    ];

    useEffect(() => {
        switch (location.pathname) {
            case '/siparis/ozet': setCurrentStep(1); break;
            case '/siparis/kargo': setCurrentStep(2); break;
            case '/siparis/odeme': setCurrentStep(3); break;
            case '/siparis/onay': setCurrentStep(4); break;
            default: window.location.href = "/"; break;
        }
    }, [location.pathname]);

    const renderCurrentStepComponent = () => {
        switch (currentStep) {
            case 1: return <PaymentBasket />;
            case 2: return <PaymentAddress />;
            case 3: return <PaymentCardInfo />;
            case 4: return <PaymentSucces />;
            default: return null;
        }
    };

    return (
        <div className="checkout-page-wrapper">
            <div className="container odeme-fluid">
                
                {/* Modern Checkout Stepper */}
                {currentStep < 4 && (
                    <div className="checkout-stepper-container" data-aos="fade-down">
                        <div className="checkout-stepper-track">
                            {stepsData.slice(0, 3).map((step, index) => {
                                const isCompleted = currentStep > step.id;
                                const isCurrent = currentStep === step.id;
                                
                                return (
                                    <div key={step.id} className={`checkout-step-node ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}>
                                        <div className="step-circle">
                                            {isCompleted ? <HiOutlineCheck size={18} /> : <span>{step.id}</span>}
                                        </div>
                                        <span className="step-title">{step.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Aktif Bileşen Render Alanı */}
                <div className="checkout-content-area" data-aos="fade-up">
                    {renderCurrentStepComponent()}
                </div>
                
            </div>
        </div>
    );
};

export default Payment;
