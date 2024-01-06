const joi = require("joi");

const clientSchema = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
    }),

    email: joi.string().email().required().messages({
        "string.email": "O campo email precisa ter um formato válido",
        "any.required": "O campo email é obrigatório",
        "string.empty": "O campo email é obrigatório",
    }),

    cpf: joi.string().min(11).required().messages({
        "any.required": "O campo cpf é obrigatório",
        "string.empty": "O campo cpf é obrigatório",
        "string.min": "O cpf precisa conter, no mínimo, 11 caracteres",
    }),

    cep: joi.string().length(8).allow('').messages({
        "string.length": "O cep precisa conter exatamente 8 caracteres",
    }),

    rua: joi.string().allow('').messages({
        "string.empty": "O campo rua é obrigatório",
    }),

    numero: joi.string().allow('').messages({
        "string.empty": "O campo número é obrigatório",
    }),

    bairro: joi.string().allow('').messages({
        "string.empty": "O campo bairro é obrigatório",
    }),

    cidade: joi.string().allow('').messages({
        "string.empty": "O campo cidade é obrigatório",
    }),

    estado: joi.string().allow('').messages({
        "string.empty": "O campo estado é obrigatório",
    }),
});


module.exports = { clientSchema };
