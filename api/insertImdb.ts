import express from "express";
import { conn } from "../dbconn";
import mysql from "mysql";


export const router = express.Router();

router.post("/insertMovie", (req, res) => {
    let data = req.body;
    
    let sql =
      "INSERT INTO `Movie` (`title`, `genre`, `duration`, `rating`, `description`, `url`) VALUES (?,?,?,?,?,?)";

    conn.query(sql, [data.title, data.genre, data.duration, data.rating, data.description, data.url], (err, result) => {
      if (err) {
        console.error("Error occurred during insertion:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});

router.post("/insertPerson", (req, res) => {
    let data = req.body;
    
    let sql =
      "INSERT INTO `Person` (`name`, `birthday`, `gerder`, `occupation`, `biography`, `url`) VALUES (?,?,?,?,?,?)";

    conn.query(sql, [data.name, data.birthday, data.gerder, data.occupation, data.biography, data.url], (err, result) => {
      if (err) {
        console.error("Error occurred during insertion:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});
router.post("/insertStar", (req, res) => {
    let data = req.body;
    
    let sql =
      "INSERT INTO `Star` (`MovieID`, `PersonID`, `role`,) VALUES (?,?,?)";

    conn.query(sql, [data.MovieID, data.PersonID, data.role,], (err, result) => {
      if (err) {
        console.error("Error occurred during insertion:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});
router.post("/insertCreators", (req, res) => {
    let data = req.body;
    
    let sql =
      "INSERT INTO `Creators` (`MovieID`, `PersonID`, `role`,) VALUES (?,?,?)";

    conn.query(sql, [data.MovieID, data.PersonID, data.role,], (err, result) => {
      if (err) {
        console.error("Error occurred during insertion:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});

