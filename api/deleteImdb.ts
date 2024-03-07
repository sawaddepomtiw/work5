import express from "express";
import { conn } from "../dbconn";
import mysql from "mysql";


export const router = express.Router();

router.delete("/deleteMovie/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Movie where mid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });
router.delete("/deletePerson/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Person where pid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });
router.delete("/deleteStar/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Star where sid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });
router.delete("/deleteCreators/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Creators where cid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });