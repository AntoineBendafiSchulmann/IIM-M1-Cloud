const express = require("express");
const app = express();
const pokemonRoute = require("./routes/pokemonRoute");

// Utilisation des routes
app.use("/api", pokemonRoute);

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
