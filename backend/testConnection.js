const db = require('./config/db');
(async () => {
    try{
        const result = await db.query('select NOW ()');
        console.log('conexion exitosa a la fecha y hora actual : ',result.rows[0]);
    }catch (error){
        console.error('error de conexion : ',error);
    }
})();