import Logo from './logo.jsx'
const header = () => {
	return (
       
			<section className="header">
           
            <div className="top">
                <div>
                    <a href="#">
                    <Logo />
                    </a>
                </div>
                <nav>
                    <a className="menu-link" href="#">
                        La carte
                    </a>
                    <a className="menu-link" href="#">
                        Les recettes
                    </a>
                    <a className="menu-link" href="#">
                        Contact
                    </a>
                </nav>
            </div>
        </section>
        );
}
export default header