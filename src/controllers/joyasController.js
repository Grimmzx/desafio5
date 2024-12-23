const { obtenerJoya, getJoyas, getJoyasByFilters, getTotalItems } = require('../models/joyasModel');

const generarHATEOAS = (joyas) => {
    return joyas.map((joya) => ({
        id: joya.id,
        nombre: joya.nombre,
        precio: joya.precio,
        categoria: joya.categoria,
        metal: joya.metal,
        stock: joya.stock,
        href: `/joyas/${joya.id}`,
    }));
};

const obtenerJoyas = async (req, res) => {
    const { limits = 10, page = 1, order_by = "id_ASC" } = req.query;
    const [orderField, orderDirection] = order_by.split("_");

if (limits <= 0 || page <= 0) {
    return res.status(400).send("Los parametros limits y page deben ser positivos");
}
    try {
        if (!["ASC", "DESC"].includes(orderDirection.toUpperCase())) {
            return res.status(400).send("El parámetro order_by debe terminar en ASC o DESC");
        }

        const totalItems = await getTotalItems();
        const totalPages = Math.ceil(totalItems /limits);
        
        const joyas = await getJoyas(Number(limits), Number(page), orderField, orderDirection);

        const joyasHATEOAS = generarHATEOAS(joyas);

        res.json({
            total: joyasHATEOAS.length,
            totalpages: totalPages,
            currentPage: page,
            joyas: joyasHATEOAS
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
};

const obtenerJoyasConFiltros = async (req, res) => {
    try {
        const joyas = await getJoyasByFilters(req.query);

   
        const joyasHATEOAS = generarHATEOAS(joyas);

        res.json({
            total: joyasHATEOAS.length,
            joyas: joyasHATEOAS,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
};

const getJoya = async (req, res) => {
    const { id } = req.params;
    try {
        const joya = await obtenerJoya(id);
        if (!joya) {
            return res.status(404).send("No se consiguió ninguna joya con este id");
        }
        res.json(joya);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    obtenerJoyas,
    obtenerJoyasConFiltros,
    getJoya,
};