const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const { auth } = require("express-oauth2-jwt-bearer");

//middlewares
app.use(cors());

//authenticated all route req that they are taking jwt token with them

//if any route is unprotected ( not login user ) it will throw error to the frontend that unotherized users
const jwtCheck = auth({
  audience: "I am the identifier ",
  issuerBaseURL: "https://code-er7.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce on all endpoints
app.use(jwtCheck);
 
//routes
app.get("/", (req, res) => {
  res.send("hello from index route");
});
app.get("/protected", async (req, res) => {
  //getting userInfo from the token we recived 
  try {
    const accesssToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get("https://code-er7.us.auth0.com/userinfo", {
      headers: {
        authorization: `Bearer ${accesssToken}`,
      },
    });
    const userInfo = response.data;
    res.send(userInfo);
  } catch (error) {
    res.send(error.message);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).send(message);
});

app.listen(4000, () => console.log("server on port 4000"));
