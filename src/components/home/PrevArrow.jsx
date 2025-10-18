import {HiOutlineChevronLeft} from "react-icons/hi";

const PrevArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block"}}
            onClick={onClick}
        >
            <HiOutlineChevronLeft size={40} />
        </div>
    );
};
export default PrevArrow;