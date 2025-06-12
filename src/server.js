const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product_routes");

dotenv.config();
const app = express();
const authRoutes = require("./routes/auth");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json'); // đường dẫn đúng tới file

app.use(express.json());
app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
