const db = require('./db2');

(async () => {
    try {
        const [rows] = await db.query('SELECT NOW()');
        console.log('Conexión exitosa a MySQL Fecha y hora actual:', rows[0]);
    } catch (error) {
        console.error('Error de conexión:', error);
    }
})();