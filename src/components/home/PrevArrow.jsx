import { HiArrowLeft } from "react-icons/hi2";

const PrevArrow = ({ className, style, onClick }) => {
    return (
        <button
            type="button"
            className={`modern-carousel-arrow modern-arrow-prev ${className || ""}`}
            style={{ ...style }}
            onClick={onClick}
            aria-label="Önceki Kategori"
        >
            <HiArrowLeft size={18} />
        </button>
    );
};

export default PrevArrow;
