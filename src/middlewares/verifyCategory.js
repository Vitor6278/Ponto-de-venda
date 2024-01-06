const knex = require("../connections/database");

const checkExistenceCategory = async (req, res, next) => {
    const categoria = req.body?.categoria_id || req.query?.categoria_id;
    if (!categoria) return next();
    try {
        const verifyCategory = await knex("categorias").where("id", categoria);

        if (!verifyCategory[0]) {
            return res.status(404).json({ mensagem: "Categoria não cadastrada no sistema." });
        }
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Erro interno do sistema.");
    }
};

module.exports = {
    checkExistenceCategory,
};
