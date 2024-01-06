const joi = require("joi");

const productSchema = joi.object({
    descricao: joi.string().required().messages({
        "any.required": "O campo descrição é obrigatório",
        "string.empty": "O campo descrição é obrigatório",
    }),

    quantidade_estoque: joi.number().integer().positive().required().messages({
        "any.required": "O campo quantidade_estoque é obrigatório",
        "number.positive": "o campo quantidade_estoque recebe um valor maior que 0."
    }),

    valor: joi.number().positive().min(1).required().messages({
        "any.required": "O campo valor é obrigatório",
        "number.positive": "o campo quantidade_estoque recebe um valor maior que 0."
    }),

    categoria_id: joi.number().integer().required().messages({
        "any.required": "O campo valor é obrigatório",
    }),
});

module.exports = { productSchema };
