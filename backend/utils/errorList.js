const errorList = {
    NullReference: { code: 1001, status: 400, message: 'Referencia nula.' },
    DatabaseError: { code: 1002, status: 500, message: 'Error de base de datos.' },
    NotFound: { code: 1003, status: 404, message: 'Recurso no encontrado.' },
    Validation: { code: 1004, status: 422, message: 'Datos de entrada inválidos.' },
    Unauthorized: { code: 1005, status: 401, message: 'No autorizado.' },
    Forbidden: { code: 1006, status: 403, message: 'Acceso denegado.' },
    Unknown: { code: 1999, status: 500, message: 'Error desconocido.' }
  };
  
module.exports = errorList;
  