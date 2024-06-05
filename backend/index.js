const express = require("express");
const cors = require("cors");
const app = express();
const pokemonRoute = require("./routes/pokemonRoute");

app.use(cors());

// Utilisation des routes
app.use("/api", pokemonRoute);

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
