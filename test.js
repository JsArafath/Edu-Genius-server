// api to get users data
    app.get("/users", async (req, res) => {
      const query = {};
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // admin to see all sellers and all nuyers route
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send({ isAdmin: user?.role === "admin" });
    });

    // api to check sellers to access add a products and my products
    app.get("/users/seller/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send({ isSeller: user?.role === "Seller" });
    });

    // api to check buyers to access my orders on dashboard
    app.get("/users/buyers/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send({ isBuyer: user?.role === "Buyer" });
    });

    // show all sellers users on all sellers route
    app.get("/users/allsellers", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      const allsellers = users.filter((user) => user?.role === "Seller");
      res.send(allsellers);
    });
    
    // api to show all buyers users on all buyers route
    app.get("/users/allbuyers", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      const allbuyers = users.filter((user) => user?.role === "Buyer");
      res.send(allbuyers);
    });