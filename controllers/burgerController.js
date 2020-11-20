const express = require("express");
const { end } = require("../config/connection.js");
const connection = require("../config/connection.js");

const router = express.Router();

const burger = require("../models/burgers.js");


// working
router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
});

// working
router.post("/api/burgers", function(req, res) {
  connection.query("INSERT INTO burgers(name, devour) VALUES (?,?)", [req.body.name,req.body.devour],(err,result)=>{
    if(err) {
      return res.status(500).end();
    }
    res.json({ id: result.insertId })
    console.log({ id: result.insertId });
    console.log(req.body.name);
    console.log(req.body.devour);
  })

    // burger.create([
    //   "name", "sleepy"
    // ], [
    //   req.body.name, req.body.devour
    // ], function(result) {
    //   // Send back the ID of the new quote
    //   res.json({ id: result.insertId });
    // });
});

// in progress

// app.put("/api/plans/:id", (req,res)=>{
//   connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.params.id], (err,result)=>{
//     if(err){
//       return res.status(500).end();
//     } else if (result.changedRows === 0){
//       return res.status(404).end();
//     }
//     res.status(200).end();
//   })
// })

// working
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({devour: 1}, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// incomplete
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});

module.exports = router;