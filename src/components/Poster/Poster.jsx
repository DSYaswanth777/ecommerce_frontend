import React from "react";
// import {Link} from "react-router-dom";
import SliderImg from "../../assets/images/image.jpg"
const Poster = (props) => {
return (
    // <Link to={`/movie/${props.id}`}>
    <div className="d-flex flex justify-content-start align-items-start gap-2 px-1 md-px-3">
        <div className="h-40 md-h-80">
            <img 
            src= {SliderImg} 
            // alt= {props.original_title} 
            className="w-100 h-100 rounded-md"
            />
        </div>
        <h3 >
                {/* {props.original_title} */}
                Hello Title
         </h3>
        <p>
        {/* {props.subtitle} */}
        Hi Subtitle
        </p>
    </div>
    // </Link>
)
};
export default Poster;