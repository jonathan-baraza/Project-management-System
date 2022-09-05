const express = require("express");
const colors = require("colors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./config/db.js");
const cors = require("cors");

//graphql
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
app.use(cors());
//connect to database
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
