let express = require('express');
let mysql = require('mysql');
let bodyParser  = require("body-parser");
let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'id12883170_root',
  database : 'id12883170join_us'
});

app.get("/", (req, res)=>{
    let totalUsers = "SELECT COUNT(*) AS count FROM users";
    connection.query(totalUsers, function(err, results){
        if(err) throw err;
        let count = results[0].count; 
        res.render("home", {count: count});
    });
});

app.post("/register", (req, res)=>{
    let person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, (err, result)=>{
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(8080, ()=>{
    console.log("Server running on 8080!");
});