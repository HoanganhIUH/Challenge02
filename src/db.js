// Import đối tượng Pool từ thư viện pg (PostgreSQL client cho Node.js).
// Pool giúp bạn tạo connection pool – tức là quản lý nhiều kết nối đến database hiệu quả hơn (tốt hơn Client khi chạy production).
// const { Pool } = require("pg");
// require("dotenv").config();
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// module.exports = pool;
// testdb.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Connection failed:", err);
  } else {
    console.log("✅ Connected successfully at:", res.rows[0].now);
  }

});
module.exports = pool;