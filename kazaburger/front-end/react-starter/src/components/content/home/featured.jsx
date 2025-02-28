import { useEffect, useState, useCallback, useRef } from "react";
import useFetch from "../../../services/useFetch";

const Featured = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const { data, loading, error } = useFetch("http://kazaburger.e-mingo.net/api/featured");
    const featuredRef = useRef(null);

   
    useEffect(() => {
        if (data?.length > 0 && featuredRef.current) {
            featuredRef.current.style.backgroundImage = 
                `url(${data[0]?.product?.pictures?.[0] || ""})`;
        }
    }, [data]);

    const nextSlide = useCallback(() => {
        if (!data?.length) return;
        
        setCurrentIndex(prev => {
            const newIndex = (prev + 1) % data.length;
       
            if(featuredRef.current) {
                featuredRef.current.style.backgroundImage = 
                    `url(${data[newIndex]?.product?.pictures?.[0] || ""})`;
            }
            return newIndex;
        });
    }, [data]);

    const previousSlide = useCallback(() => {
        if (!data?.length) return;
        
        setCurrentIndex(prev => {
            const newIndex = (prev - 1 + data.length) % data.length;
            
            if(featuredRef.current) {
                featuredRef.current.style.backgroundImage = 
                    `url(${data[newIndex]?.product?.pictures?.[0] || ""})`;
            }
            return newIndex;
        });
    }, [data]);

    useEffect(() => {
        let interval;
        if (isPlaying && data?.length) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => interval && clearInterval(interval);
    }, [isPlaying, nextSlide, data]);

   
    const slideOut = () => setIsPlaying(true);
    const slideOver = () => setIsPlaying(false);
    const PrevNextClick = (direction) => {
        if (direction === "prev") {
            previousSlide();
        } else {
            nextSlide();
        }}
        
    return (
        <section 
            className="featured" 
            ref={featuredRef}
            onMouseLeave={slideOut} 
            onMouseEnter={slideOver}
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 0.5s ease-in-out"
            }}
        >
            <div className="content">
            <button
                onClick={() => PrevNextClick("prev")}
                className="absolute left-10 cursor-pointer top-7/9 -translate-y-1/2 text-white/20 hover:text-secondary/50 text-9xl m-10"
                aria-label="Précédent"
            >
                ‹
            </button>
            
            <button
                onClick={() => PrevNextClick("suivant")}
                className="absolute right-10 cursor-pointer top-7/9 -translate-y-1/2 text-white/20 hover:text-secondary/50 text-9xl m-10"
                aria-label="Suivant"
            >
                ›
            </button>
                <h1 className="text-white opacity-75">
                    {data?.[currentIndex]?.product?.title || "Chargement..."}
                </h1>
                <p className="price opacity-75">
                    {data?.[currentIndex]?.product?.price || "..."} €
                </p>
                <p>
                    <a href="#" className="btn-lg opacity-75 ">
                        Commander
                    </a>
                </p>
            </div>
        </section>
    );
};

export default Featured;