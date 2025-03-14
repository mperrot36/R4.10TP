const express = require("express");
const router = express.Router();

// Route pour obtenir toutes les témoignages
router.get("/testimony", async (req, res) => {
    res.json({
        user: req.query.user,
    });
});

// Route pour obtenir un témoignage spécifique par ID
router.get("/testimony/:id", async (req, res) => {
    res.send("Un témoignage pour l'ID " + req.params.id);
});

// Route pour ajouter un nouveau témoignage
router.post("/testimony", async (req, res) => {
    // Ici, vous pouvez gérer l'ajout du témoignage, par exemple en utilisant un body parser pour récupérer les données
    res.send("Nouveau témoignage ajouté");
});

// Route pour modifier un témoignage spécifique par ID
router.patch("/testimony/:id", async (req, res) => {
    res.send("Témoignage " + req.params.id + " modifié");
});


router.delete("/testimony/:id", async (req, res) => {
    res.send("Témoignage " + req.params.id + " supprimé");
});


router.use((req, res) => {
    res.status(404).send(`${req.method} : ${req.originalUrl} Page not found`);
});

module.exports = router;
