var express = require('express');
const db = require ("./DB");
var router = express.Router();
const request = require ('request');
const IP = require ('ip');
const nodemailer = require('nodemailer');
require('dotenv').config();
var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/com', function(req, res, next) {
  res.render('com');
});

router.get('/ingres.ejs', (req, res) => {
  res.render('ingres');
 });

 router.post('/ingres.ejs', function(req, res, next) {
  let user = req.body.user
  let pass = req.body.pass
  if (user == process.env.username && pass == process.env.clave)  {
    db.select(function (rows) {
      
      res.render('For1', {rows: rows});
    });
  } else {
    res.render('ingres', { error: 'Datos incorrectos' });
  }
})

router.get('/For1', function(req, res, next) {
  db.select(function (rows) {
  
    res.render('contactos', {rows: rows});
  });

});




router.post('/', function(req, res, next) {  

  const cap = req.body['g-recaptcha-response'];
  const SecretKey = process.env["6LeqpyImAAAAAGCsh6gwxvwwb2X9zTC_jSWOD68r"];
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SecretKey}&response=${cap}`;
  let name = req.body.name;
  let email = req.body.email;
  let comment = req.body.comment;
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const Ip = ip.split(",")[0];
  let dt = new Date();
  let time = "";

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

  request(`http://ip-api.com/json/${Ip}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      let country = data.country;
      console.log({name, email, comment, date ,time, Ip, country});

      db.insert(name, email, comment, date, time, Ip, country);
      
      
      const trans = nodemailer.createTransport({
        host: process.env.hostemail,
        port: 465,
        secure: true,
        auth: {
            user: process.env.useremail,
            pass: process.env.passemail
        }
      });
      const mailOptions = {
        from: process.env.useremail,
      
        to: ['josephortegabre@gmail.com', 'programacion2ais@dispostable.com'],
      subject: 'Task 3',
        text: 'Un nuevo ususuario se ha registrado en el formulario:\n' + 'Nombre: ' + name + '\nCorreo: ' + email + '\nMensaje: ' + comment +'\nFecha:' + date +' hora: ' + time + '\nIP: ' + Ip + '\nUbicacion: ' + country
      };
      trans.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
        }});}});

        request(url, (err, response, body) => {
          if (body.success && body.score) {
            console.log('exitoso')
          } else {
            console.log('fracaso')
          }
        });
    
    res.redirect('/');
});

router.get('/For1', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});

module.exports = router; 
