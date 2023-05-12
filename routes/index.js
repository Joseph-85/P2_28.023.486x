var express = require('express');
const db = require ("./DB");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/com', function(req, res, next) {
  res.render('com');
});

router.post("/",function(req,res,next){
  let Nombre = req.body.Nombre;
  let email = req.body.email;
  let Comentario = req.body.Comentario;
  let dt = new Date();
  let time = "";
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  let pais = req.body.pais;

  if(dt.getHours() >=12){
    time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "PM"; 
}
else{
    time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "AM";
}
 
let _date = dt.toLocaleString();
let date = "";

for (let d = 0; d  <= 9; d++) {
    if(_date[d] == "/"){
        date +="-";
        continue;
    }
    else if(_date[d]== ","){
        continue;
    }
    date += _date[d];
}


if(ip){
    let ip_ls = ip.split(",");
    ip = ip_ls[ip_ls.length -1];
}
else{
    console.log("IP no se pudo formatiar");
}

db.insert (Nombre,email,Comentario,date,time,ip, pais);

console.log({Nombre, email, Comentario, date, time, ip, pais})

  res.redirect("/");
}); 

router.get("/For1", function (req,res,next){
  db.select(function (rows) {
    console.log (rows);
  });
  res.send("ok");
});

module.exports = router;
