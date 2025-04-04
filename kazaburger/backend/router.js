const express = require("express");
const bcrypt = require('bcrypt');
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
      const data = await apiClient(`/product/`,req.method );
      const filteredData = data.filter(item => item._id === productId);
      res.json(filteredData);
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
      const data = await apiClient(`/testimony/`,req.method );
      const filteredData = data.filter(item => item._id === testimonyId);
      res.json(filteredData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post("/testimony", async (req, res) => {
  const donnees = {
    rating: req.body.rating,
    review: req.body.review,
    user: req.body.user,
    product: req.body.product,
  };

  
  try {
    const data = await apiClient("/testimony", req.method, donnees);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/testimony/:id", async (req, res) => {
  const donnees = {
    rating: req.body.rating,
    review: req.body.review,
    user: req.body.user,
    product: req.body.product,
  };

  const testimonyId = req.params.id;
  try {
    const data = await apiClient(`/testimony/${testimonyId}`, req.method, donnees);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/testimony/:id", async (req, res) => {
  const testimonyId = req.params.id;
  try {
    const data = await apiClient(`/testimony/${testimonyId}`, req.method);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/", async (req, res) => {
  const email = req.query.email;
  const login = req.query.login;
  if (!email && !login) {
      try {
          const data = await apiClient("/user", req.method );
          res.json(data);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      
  }

  if (email) {
  try {
      const data = await apiClient(`/user?email=${email}`, req.method ); 
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
  }else if (login) {
      try {
          const data = await apiClient(`/user?login=${login}`,req.method); 
          res.json(data);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
});
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await apiClient(`/user/`,req.method );
      const filteredData = data.filter(item => item._id === userId);
      res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/user", async (req, res) => {
  const donnees = {
    login: req.body.login,
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  };

  try {
    
    const existingUsers = await apiClient(`/user?login=${donnees.login}&email=${donnees.email}`, "GET");

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Un utilisateur avec le même login ou email existe déjà." });
    }

    
    const data = await apiClient(`/user`, "POST", donnees);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/user/:id", async (req, res) => {
  const donnees = {
    name: req.body.name,
    password: req.body.password,
  };

  const userId = req.params.id;
  try {
    const data = await apiClient(`/user/${userId}`, "PATCH", donnees);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await apiClient(`/user/${userId}`, "DELETE");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/user", async (req, res) => {
  const donnees = {
    login: req.body.login,
    password: req.body.password,
  };
  if (!donnees.login || !donnees.password) {
    return res.status(400).json({ error: "Login et mot de passe sont requis." });
  }
  try {
    const users = await apiClient(`/user?login=${donnees.login}`, "GET");
    
    if (users.length === 0) {
      
      return res.status(401).json({ error: "Login ou mot de passe incorrect." });
    }
    const user = users[0];
    
    const isPasswordValid = await bcrypt.compare(donnees.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Login ou mot de passe incorrect." });
    }
    res.json({ message: "Authentification réussie."});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.use((req, res) => {
  res.status(404);
  res.json({
    error: `${req.method + ":" + req.originalUrl} Page not found`,
  });
});



module.exports = router;