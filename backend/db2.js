const mysql = require('mysql2/promise'); // Importamos la versión con Promesas

class Database {
    constructor() {
        this.pool = mysql.createPool({
            user: 'root',           // Usuario de MySQL (comúnmente 'root')
            host: 'localhost',      // Servidor donde está la DB
            database: 'mydb',    // Nombre de la base de datos
            password: 'admin123',      // Contraseña del usuario
            port: 3306,             // Puerto por defecto de MySQL
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    query(text, params) {
        return this.pool.query(text, params);
    }
}
module.exports = new Database();