import { useState, useEffect } from 'react';
import './CookieConsent.css';
import { setCookie, getCookie } from './cookie.js';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const cookieConsent = getCookie('cookieConsent');
        const cookieDecline = getCookie('cookieDecline');

        if (cookieConsent || cookieDecline) {
            setIsVisible(false);
        }
    }, []);

    const handleAccept = () => {
        setCookie('cookieConsent', 'true', 365);
        setIsVisible(false);
    };

    const handleDecline = () => {
        setCookie('cookieDecline', 'true', 365);
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="cookie-consent-container" data-aos="fade-up">
            <p>
                Bu site çerezler kullanmaktadır. Daha fazla bilgi için{' '}
                <a href="/bilgilendirmeler">gizlilik politikamıza</a> göz atabilirsiniz.
            </p>
            <div className="cookie-consent-buttons">
                <button onClick={handleAccept} className="cookie-consent-button accept">Kabul Et</button>
                <button onClick={handleDecline} className="cookie-consent-button decline">Reddet</button>
            </div>
        </div>
    );
};

export default CookieConsent;