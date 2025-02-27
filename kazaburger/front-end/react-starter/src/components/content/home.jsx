import Featured from './home/featured.jsx'
import Suggests from './home/suggests.jsx'
import KazaNews from './home/KazaNews.jsx'
import Testimonies from './home/testimonies.jsx'
const home = () => {
    return (
        <section className="home">
            <Featured />
            <Suggests />
            <KazaNews />
            <Testimonies />
        </section>
    );  
}
export default home
        