var express = require('express');
const XMLHttpRequest= require("xhr2");
const db = require ("./DB");
const SECRET_KEY = "6LeqpyImAAAAAGCsh6gwxvwwb2X9zTC_jSWOD68r";
const fetch = require('node-fetch');





var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/com', function(req, res, next) {
  res.render('com');
});

router.post('/',(req,res)=>{
  const response_key = req.body["g-recaptcha-response"];
  const secret_key = process.env.KEY_PRIVATE;
  const url = 
`https://developers.google.com/recaptcha/docs/verify?secret=${secret_key}&response=${response_key}`;
  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => {
  if (google_response.success == true) {


      router.post("/",function(req,res,next){
        let Nombre = req.body.Nombre;
        let email = req.body.email;
        let Comentario = req.body.Comentario;
        let dt = new Date();
        let time = "";
        let ip = req.headers["x-forwarded-for"]  || req.socket.remoteAddress;
        if (ip){
          var list = ip.split(",");
          ip = list[list.length-1];
         } else {
          ip = req.connection.remoteAddress;
          }
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
    });

}
});


let XMLHttp = new XMLHttpRequest();
XMLHttp.onreadystatechange = function(){
if(this.readyState == 4 && this.status == 200) {
  let ipwhois = JSON.parse(this.responseText); 
console.log(ipwhois.country + ' ' + ipwhois.flag.emoji,country,city,);
}	
}



      XMLHttp.open('GET','http://ipwho.is/' + ip, true);
    XMLHttp.send();	
      
      console.log({Nombre, email, Comentario, date, time, ip, pais, clientCountry})
      
        res.redirect("/");
      });
     
        
  
router.get("/For1", function (req,res,next){
  db.select(function (rows) {
    console.log (rows);
  });
  res.send("ok");
      });
   


module.exports = router;
