const SuggestItem = ({ image, imageAlt, title, description, price }) => {
    return (
        <div>
            <img src={image} alt={imageAlt} />
            <h3>{title}</h3>
            <p>
                {description}

            </p>
            <span className="price h-3/3">{price}</span>
        </div>
    );
};
export default SuggestItem;
