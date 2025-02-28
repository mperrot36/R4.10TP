const SuggestItem = ({ image, title, description, price }) => {
    return (
        <div>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>
                {description}

            </p>
            <span className="price h-3/3">{price}</span>
        </div>
    );
};
export default SuggestItem;
