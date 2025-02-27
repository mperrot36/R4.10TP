const rating = ({rating}) => {
    return (
        <span>
            {[...Array(rating)].map((e, i) => <span key={i} className="fa-solid fa-star text-secondary"></span>)}
            {[...Array(5-rating)].map((e, i) => <span key={i} className="fa-solid fa-star"></span>)}
           
        </span>
    );
}
export default rating;