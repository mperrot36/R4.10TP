import Testimony from "../testimonies/testimony.jsx";
import useFetch from "../../../services/useFetch";
import { useEffect, useState } from "react";

const DEFAULT_IMAGE = "../../../assets/images/no_image.png"
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
const testimonies  = () => {
    const { data, loading, error } = useFetch("http://kazaburger.e-mingo.net/api/testimony");
    const [suggestions, setSuggestions] = useState([]);
    
    useEffect(() => {
        if (data && Array.isArray(data)) {
            const people = data
                
                .map(item => ({
                    image: "https://i.pravatar.cc/150"+String(item.review.length+item.user.length+item.rating) || DEFAULT_IMAGE,
                    name: item.user || "Une personne",
                    rating: item.rating || 5,
                    review: item.review || "vraiment exceptionnel"
                }));
            const shufflePeople=shuffleArray(people,4)
            setSuggestions(shufflePeople);
        }
        
    }, [data]);


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
	return (<section className="testimony">
        <h2>Nos clients témoignent </h2>
      
        <div className="content">
        {suggestions.map((item, i) => <Testimony key={i} {...item} />)}
        </div>
    </section>);
}
export default testimonies