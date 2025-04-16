const db = require('../config/db');


class ProductModel {
    // funcion para obtner todos los registros de la tabla productos
    async getALLProducts(){
        const result = await db.query('select * from producto');
        return result.rows
    }
    // funcion para obtener un registro por su ID
    async getProductByid(id){
        const result = await db.query('select * from producto where id = $1',[id]);
        return result.rows[0];
        // retorna el primer producto (deberia ser un unico por ID)
    }
    // fucnion para crear un nuevo registro
    async createProduct({nombre , precio, descripcion}){
        const result = await db.query(
            //utilizamos los placeholders (valores)
            'insert into producto(nombre , precio , descripcion) values ($1,$2,$3)returning *',
            [nombre,precio,descripcion]
        );
        return result.rows[0];
    }

 //funcion para actualizar un registro
    async updateProduct(id,{nombre,precio,descripcion}){
        const result = await db.query(
            'update producto set nombre = $1 , precio = $2 , descripcion = $3 where id = $4 returning *',
            [nombre,precio,descripcion,id]
        );
        return result.rows[0];
    }
    // funcion para eliminar registro
    async deleteProduct(id){
        await db.query('delete from producto where id = $1',[id]);
    }

   
}
module.exports = new ProductModel();

