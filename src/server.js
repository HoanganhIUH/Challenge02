const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product_routes");

dotenv.config();
const app = express();
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
