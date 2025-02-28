import { useEffect, useState } from "react";
import SuggestItem from "../suggests/suggestItem";
import useFetch from "../../../services/useFetch";


const DEFAULT_IMAGE = "../../../assets/images/no_image.png";

/**
* On melange et on retourne une partie
* @param {*} array
* @param {*} length
* @returns
*/
function shuffleArray(array, length=0) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return length?array.slice(0,length):array;
    }
    export {shuffleArray};


const Suggests = () => {
    const { data, loading, error } = useFetch("http://kazaburger.e-mingo.net/api/suggest");
    const [suggestions, setSuggestions] = useState([]);
    
    useEffect(() => {
        if (data && Array.isArray(data)) {
            const burgers = data
                
                
                .map(item => ({
                    image: item.product.pictures?.[0] || DEFAULT_IMAGE,
                    title: item.product.title || "Burger probablement délicieux mais anonyme",
                    description: item.description || "Ce burger est très mystérieux",
                    price: item.product.price ? `${item.product.price} €` : "Prix aléatoire",
                }));
            const shuffleBurgers=shuffleArray(burgers,3)
            setSuggestions(shuffleBurgers);
        }
        
    }, [data]);


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className="suggests">
            <h2>Nos suggestions</h2>
            <div className="content">
                {Array.isArray(suggestions) && suggestions.map((item, i) => (
                    <SuggestItem key={i} {...item} />
                ))}
            </div>
        </section>
    );
};

export default Suggests;
