
import React from "react";

const Formulaire = () => {
  return (
    <div className="formulaire">
      <form >
      <FormBlockInput id="username" label="Nom d'utilisateur" placeholder="Entrez votre nom d'utilisateur"></FormBlockInput>

      <FormBlockInput id="email" label="email" placeholder="Entrez votre email"></FormBlockInput>
      <FormBlockInput id="mot de passe" label="mot de passe" placeholder="Entrez votre mot de passe"></FormBlockInput>

        

        <div>
          <button className="button" type="submit">Valider</button>
        </div>
      </form>
    </div>
  );
};

export default Formulaire;
