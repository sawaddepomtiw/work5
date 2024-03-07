import express from "express";
import { conn } from "../dbconn";


export const router = express.Router();

router.get("/getMovie", (req, res) => {
    conn.query('select * from Movie', (err, result, fields)=>{     
        res.json(result);
    })
});
router.get("/getPerson", (req, res) => {
    conn.query('select * from Person', (err, result, fields)=>{     
        res.json(result);
    })
});
router.get("/getStar", (req, res) => {
    conn.query('select * from Star', (err, result, fields)=>{     
        res.json(result);
    })
});
router.get("/getCreator", (req, res) => {
    conn.query('select * from Creators', (err, result, fields)=>{     
        res.json(result);
    })
});

// router.get("/getAll/fields", (req, res) => {
//     const movieQuery = `
//         SELECT *
//         FROM Movie
//         LEFT JOIN Star ON Movie.mid = Star.MovieID
//         LEFT JOIN Creators ON Movie.mid = Creators.MovieID
//         LEFT JOIN Person ON Star.PersonID = Person.pid OR Creators.PersonID = Person.pid
//     `;

//     conn.query(
//         movieQuery,
//         [req.query.mid, "%" + req.query.title + "%"],
//         (err, movieResult, fields) => {
//             if (err) throw err;
//             // ทำสิ่งที่คุณต้องการกับข้อมูล movieResult และ fields ก่อนส่งไปยัง client
//             res.json({ movieResult});
//         }
//     );
// });
router.get("/getAll/fields", (req, res) => {

    const StarQuery = `SELECT *
        FROM Movie
        INNER JOIN Star ON Movie.mid = Star.MovieID
        INNER JOIN Person ON Person.pid = Star.PersonID
        WHERE title IS NOT NULL AND title LIKE ?`
    ;
    const CreatorsQuery = `SELECT *
        FROM Movie
        INNER JOIN Creators ON Movie.mid = Creators.MovieID
        INNER JOIN Person ON Person.pid = Creators.PersonID
        WHERE title IS NOT NULL AND title LIKE ?`
    ;

    conn.query(StarQuery,
        ["%" + req.query.title + "%"],
        (err, Starresult, fields) => {
        if (err) throw err;
        conn.query(CreatorsQuery,
            ["%" + req.query.title + "%"],
            (err, Creatorsresult, fields)=>{
                if (err) throw err;

                const result = {
                    star: Starresult,
                    creators: Creatorsresult
                };
                res.json(result);
            })
        }
    );
});




//     const creatorsQuery = `
//       SELECT Person.* 
//       FROM Person 
//       INNER JOIN Creators ON Person.PersonID = Creators.PersonID 
//       INNER JOIN Movie ON Creators.MovieID = Movie.MovieID 
//       WHERE Movie.Title LIKE ?
//     `;




//   router.get("/getAll/fields", (req, res) => {

//     const movieQuery = `
//       SELECT * 
//       FROM Movie 
//       WHERE (mid IS NULL OR mid = ?) OR (title IS NULL OR title like ?)
//     `;
    
//     const starsQuery = `
//       SELECT Person.* 
//       FROM Person 
//       INNER JOIN Stars ON Person.PersonID = Stars.PersonID 
//       INNER JOIN Movie ON Stars.MovieID = Movie.MovieID 
//       WHERE Movie.Title LIKE ?
//     `;

//     const creatorsQuery = `
//       SELECT Person.* 
//       FROM Person 
//       INNER JOIN Creators ON Person.PersonID = Creators.PersonID 
//       INNER JOIN Movie ON Creators.MovieID = Movie.MovieID 
//       WHERE Movie.Title LIKE ?
//     `;

//     conn.query(
//         movieQuery, // ใช้ movieQuery แทนการคิวรีเพื่อเรียกข้อมูลภาพยนตร์
//         [req.query.mid, "%" + req.query.title + "%"],
//         (err, movieResults, fields) => {
//             if (err) throw err;
            
//             // หลังจากคิวรีภาพยนตร์สำเร็จ ให้ทำการคิวรีดาต้าเบสเพื่อหาดาราที่เป็นดาราในภาพยนตร์
//             conn.query(
//                 starsQuery,
//                 ["%" + req.query.title + "%"],
//                 (err, starsResults, fields) => {
//                     if (err) throw err;
                    
//                     // หลังจากคิวรีดาต้าเบสเพื่อหาดาราสำเร็จ ให้ทำการคิวรีดาต้าเบสเพื่อหาผู้สร้างภาพยนตร์
//                     conn.query(
//                         creatorsQuery,
//                         ["%" + req.query.title + "%"],
//                         (err, creatorsResults, fields) => {
//                             if (err) throw err;
                            
//                             // สร้าง object เพื่อเก็บผลลัพธ์ทั้งหมดและส่งกลับให้กับไคลเอนต์
//                             const results = {
//                                 movies: movieResults,
//                                 stars: starsResults,
//                                 creators: creatorsResults
//                             };
//                             res.json(results);
//                         }
//                     );
//                 }
//             );
//         }
//     );
// });

  