import { HiArrowRight } from "react-icons/hi2";

const NextArrow = ({ className, style, onClick }) => {
    return (
        <button
            type="button"
            className={`modern-carousel-arrow modern-arrow-next ${className || ""}`}
            style={{ ...style }}
            onClick={onClick}
            aria-label="Sonraki Kategori"
        >
            <HiArrowRight size={18} />
        </button>
    );
};

export default NextArrow;
