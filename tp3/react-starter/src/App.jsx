import "./App.css";
import Formulaire from "./components/formulaire"; // Import du composant formulaire

function App() {
  return (
    <div className="m-5">
      <header className="title">
        <h1 className="text-center">Mon formulaire</h1>
      </header>

      <div className="center">
        {/* Utilisation du composant */}
        <Formulaire />
      </div>
    </div>
  );
}

export default App;