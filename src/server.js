const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product_routes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
