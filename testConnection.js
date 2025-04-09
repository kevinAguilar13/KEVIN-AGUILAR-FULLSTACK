const db = require('./db');
(async () => {
    try{
        const result = await db.query('select * from  usuario');
        console.log('conexion exitosa a la fecha y hora actual : ',result.rows[0]);
    }catch (error){
        console.error('error de conexion : ',error);
    }
})();