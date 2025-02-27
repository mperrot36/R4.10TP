import Rating from "./rating.jsx";
const testimony = ({image,name,rating,review}) => {
    return (
<div>
                <img src={image} />
                <h3>{name}</h3>
                
                
                <Rating rating={rating} />
                <div>
                    {review}
                </div>
            </div>
    );
}
export default testimony;