const express = require("express");
const router = express.Router();

async function apiClient(endpoint, method, body = null) {
    const baseUrl = process.env.KAZABURGER_API_URL; 
    const url = `${baseUrl}${endpoint}`;
    
  
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + process.env.KAZABURGER_API_TOKEN,
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Erreur API : ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Erreur lors de l'appel à l'API : ${error.message}`);
    }
  }



  router.get("/product/:id", async (req, res) => {
    const productId = req.params.id;
  
    try {
      const data = await apiClient(`/product/${productId}`,req.method );
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get("/product/", async (req, res) => {
    const family = req.query.family;
    const title = req.query.title;
    if (!family && !title) {
        try {
            const data = await apiClient("/product", req.method);
            res.json(data);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        
    }

    if (family) {
    try {
        const data = await apiClient(`/product?family=${family}`, req.method); 
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }else if (title) {
        try {
            const data = await apiClient(`/product?title=${title}`,req.method); 
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});






router.get("/testimony/", async (req, res) => {
    const product= req.query.product;
    const user = req.query.user;
    if (!product && !user) {
        try {
            const data = await apiClient("/testimony", req.method );
            res.json(data);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        
    }

    if (product) {
    try {
        const data = await apiClient(`/testimony?product=${product}`, req.method ); 
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }else if (user) {
        try {
            const data = await apiClient(`/testimony?user=${user}`,req.method); 
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
  
});



router.get("/testimony/:id", async (req, res) => {
    const testimonyId = req.params.id;
  
    try {
      const data = await apiClient(`/testimony/${testimonyId}`,req.method );
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post("/testimony", async (req, res) => {
  donnees = {
    rating: req.body.rating,
    review: req.body.review,
    user: req.body.user,
    product: req.body.product 
  }
  try {
    fetch(process.env.KAZABURGER_API_URL + "/testimony/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.KAZABURGER_API_TOKEN
      }, body: JSON.stringify(donnees)
    })
  } catch (error) {
    throw new Error(`Erreur lors de l'appel à l'API : ${error.message}`);
  }
  
});

router.patch("/testimony/:id", async (req, res) => {
  res.send("témoignage " + req.params.id + " modifié");
});

router.delete("/testimony/:id", async (req, res) => {
  res.send("témoignage " + req.params.id + " supprimé");
});

router.get("/:val", async (req, res) => {
  console.log("un produit par id :val");
});

router.use((req, res) => {
  res.status(404);
  res.json({
    error: `${req.method + ":" + req.originalUrl} Page not found`,
  });
});

module.exports = router;