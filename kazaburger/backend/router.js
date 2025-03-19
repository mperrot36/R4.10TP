const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

// Route pour obtenir toutes les témoignages
router.get("/testimony", async (req, res) => {
    const url = `${process.env.KAZABURGER_API_URL}/testimonies`;
    const token = process.env.KAZABURGER_API_TOKEN;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Échec de la récupération des témoignages.");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un témoignage spécifique par ID
router.get("/testimony/:id", async (req, res) => {
    const { id } = req.params;
    const url = `${process.env.KAZABURGER_API_URL}/testimonies/${id}`;
    const token = process.env.KAZABURGER_API_TOKEN;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Témoignage non trouvé.");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour ajouter un nouveau témoignage
router.post("/testimony", async (req, res) => {
    const { user, content } = req.body; 
    const url = `${process.env.KAZABURGER_API_URL}/testimonies`;
    const token = process.env.KAZABURGER_API_TOKEN;

    const donnees = {
        user,
        content
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donnees)
        });

        if (!response.ok) {
            throw new Error("Échec de l'ajout du témoignage.");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour modifier un témoignage spécifique par ID
router.patch("/testimony/:id", async (req, res) => {
    const { id } = req.params;
    const { user, content } = req.body; 
    const url = `${process.env.KAZABURGER_API_URL}/testimonies/${id}`;
    const token = process.env.KAZABURGER_API_TOKEN;

    const donnees = {
        user,
        content
    };

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donnees)
        });

        if (!response.ok) {
            throw new Error("Échec de la modification du témoignage.");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un témoignage spécifique par ID
router.delete("/testimony/:id", async (req, res) => {
    const { id } = req.params;
    const url = `${process.env.KAZABURGER_API_URL}/testimonies/${id}`;
    const token = process.env.KAZABURGER_API_TOKEN;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Échec de la suppression du témoignage.");
        }

        res.json({ message: `Témoignage ${id} supprimé avec succès.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Gestion des erreurs 404
router.use((req, res) => {
    res.status(404).send(`${req.method} : ${req.originalUrl} Page not found`);
});

module.exports = router;
