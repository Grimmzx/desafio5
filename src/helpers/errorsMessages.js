module.exports = {
    TRIP_NOT_FOUND: {
        id: 'joyasNoEncontradas',
        statusCode: 404,
        message: 'Joyas no encontradas',
        description: 'Las Joyas con el ID asignado no existen en la base de datos',
    },
    SERVER_ERROR: {
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor. Prueba más tarde',
        description: 'Error inesperado en el servidor',
    }
}
