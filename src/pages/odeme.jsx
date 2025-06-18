import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from "../components/childcomponents/navbar/navbar.jsx";
import Footer from "../components/childcomponents/footer";
import Odeme1 from "../components/odeme/odeme1";
import Odeme2 from "../components/odeme/odeme2";
import Odeme3 from "../components/odeme/odeme3";
import Odeme4 from "../components/odeme/odeme4";
import "./css/odeme.css";

const Odeme = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = 4;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        switch (location.pathname) {
            case '/siparis/ozet':
                setCurrentStep(1);
                break;
            case '/siparis/kargo':
                setCurrentStep(2);
                break;
            case '/siparis/odeme':
                setCurrentStep(3);
                break;
            case '/siparis/onay':
                setCurrentStep(4);
                break;
            default:
                window.location.href = "/"
                break;
        }
    }, [location.pathname]);

    useEffect(() => {
        updateProgress(currentStep);
    }, [currentStep]);

    const updateProgress = (step) => {
        const stepsElements = document.querySelectorAll('.step');
        stepsElements.forEach((stepElement) => {
            stepElement.classList.remove('current');
            if (parseInt(stepElement.id, 10) <= step) {
                stepElement.classList.add('current');
            }
        });
    };

    const handleNextStep = () => {
        setCurrentStep((prevStep) => (prevStep < steps ? prevStep + 1 : 1));
        switch (currentStep) {
            case 1:
                navigate('/siparis/kargo');
                break;
            case 2:
                navigate('/siparis/odeme');
                break;
            case 3:
                navigate('/siparis/onay');
                break;
            case 4:
                navigate('/siparis/ozet');
                break;
            default:
                break;
        }
    };

    const renderCurrentStepComponent = () => {
        switch (currentStep) {
            case 1:
                return <Odeme1/>;
            case 2:
                return <Odeme2/>;
            case 3:
                return <Odeme3/>;
            case 4:
                return <Odeme4/>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="container odeme-fluid">
                <div className="row">
                    <div className="col-12">
                        <section className="checkout-progress-indicator">
                            <div className="progress">
                                {[...Array(steps)].map((_, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`step${currentStep >= index + 1 ? ' current' : ''}`}
                                             id={index + 1}>
                                            <span>{index + 1}</span>
                                            <span>{['Sepet Özeti', 'Kargo', 'Ödeme', 'Onay'][index]}</span>
                                        </div>
                                        {index < steps - 1 && <div></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
                {renderCurrentStepComponent()}
            </div>
        </div>
    );
};

export default Odeme;
