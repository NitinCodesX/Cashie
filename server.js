const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = require("./utils/cors")
require("colors");
const connectDB = require("./config/config");
dotenv.config();
connectDB();
const app = express();
// CORS stands for Cross-Origin Resource Sharing. It allows us to relax the security applied to an API. This is done by bypassing the Access-Control-Allow-Origin headers, which specify which origins can access the API.
// In other words, CORS is a browser security feature that restricts cross-origin HTTP requests with other servers and specifies which domains access your resources.
app.use(cors(corsOptions));
app.use(express.json());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))

//Morgan tells which URL is hit and the time taken with status code
app.use(morgan("dev"));

//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require('./routes/userRoutes'))
app.use("/api/bills",require("./routes/billsRoute"))
app.use("/api/home",require("./routes/homeRoute"))
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgMagenta);
});
