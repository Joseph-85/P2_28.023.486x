var express = require('express');
const XMLHttpRequest= require("xhr2");
const db = require ("./DB");

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
 const SECRET_KEY = "6LeqpyImAAAAAGCsh6gwxvwwb2X9zTC_jSWOD68r";
  const url = 
`https://www.google.com/recaptcha/api/siteverify?secret=${process.env["6LeqpyImAAAAAGCsh6gwxvwwb2X9zTC_jSWOD68r"]}&response=${req.body["g-recaptcha-response"]}`;
  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => {
  if (google_response.success == true) {


      router.post("/",function(req,res){
       
        let dt = new Date();
        let time = "";
        let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
         

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
var ip_address = '190.206.224.172';
let auth = '918dc043-079e-41ed-965f-aa3c87119e77';
let URL = "https://ipfind.co/?auth=" + auth + ip_address;
XMLHttp.onreadystatechange = function() {
if(this.readyState == 4 && this.status == 200) {
  let result = JSON.parse(this.responseText); 
  let _continent = result.continent;
  let _country = result.country;
  let _city = result.city;
  let input_country = documento.gentElemenById( 'country');
 input_country.value = _continent +"," +_country + ',' + _city;
}
}
XMLHttp.open('GET', URL, true);
XMLHttp.send();

        

      
      db.insert ();

     
      
      console.log({ })

      router.get("/For1", function (req,res,next){
  db.select(function (rows) {
    console.log (rows);
  });
  res.send("ok");
      });

      
        res.redirect("/");
      });
     
        

   


module.exports = router;
