const express = require("express");
const app = express();
const pokemonRoutes = require("./routes/pokemonRoute");

// Utilisation des routes
app.use("/api", pokemonRoutes);

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
