import express from "express";
import { router as index } from "./api/index";
import { router as getImdb } from "./api/getImdb";
import { router as insertImdb } from "./api/insertImdb";
import { router as deleteImdb } from "./api/deleteImdb";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", index);
app.use("/getimdb", getImdb);
app.use("/insertimdb", insertImdb);
app.use("/deleteimdb", deleteImdb);

// app.use("/", (req, res) => {
//   res.send("Hello World!!!");
// });