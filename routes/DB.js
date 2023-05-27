const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(":memory:", (err) =>{
    if (err) {
        return console.error(err.message);
    }
    console.log("connected to the in-memory SQLite database.");
    
    db.run("CREATE TABLE IF NOT EXISTS For1 (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre VARCHAR (50) NOT NULL,email Email NOT NULL, Comentario VARCHAR(10000)NOT NULL,date DATETIME NOT NULL, time TEXT NOT NULL, ip TEXT NOT NULL,pais TEXT NOT NULL,country VARCHAR(10000))");
});




module.exports = {
    insert: function (Nombre, email, Comentario, date, time, ip) {
        db.run("INSERT INTO For1 (Nombre, email, Comentario,date,time,ip,pais,country) VALUES(?,?,?,?,?,?,$pais,?)", [Nombre, email, Comentario, date, time , ip], function (err) {
            if (err) {
                return console.log(err.message);

            }
            console.log("A row has been inserted with rowid ${this.lastID}");
        });
    },
    select: function (callback){
        db.all("SELECT * FROM For1", [], (err, rows) =>{
            if (err){
                throw err;
            }
            callback(rows);
        });
    }
}