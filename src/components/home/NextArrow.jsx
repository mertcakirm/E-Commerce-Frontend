import {HiOutlineChevronRight} from "react-icons/hi";

const NextArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block"}}
            onClick={onClick}
        >
            <HiOutlineChevronRight size={40} />

        </div>
    );
};

export default NextArrow;