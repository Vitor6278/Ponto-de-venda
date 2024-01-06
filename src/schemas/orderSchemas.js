const joi = require('joi');

const orderSchema = joi.object({
    cliente_id: joi.number().required().positive().messages({
        "any.required": "O ID do cliente é um campo obrigatório.",
        "number.positive": "O ID fornecido está invalido"
    }),

    observacao: joi.string().allow(null, ''),

    pedido_produtos: joi.array().items(
      joi.object({

        produto_id: joi.number().required().positive().messages({
            "any.required": "O ID do produto é um campo obrigatório.",
            "number.positive": "o campo produto_id recebe um valor maior que 0."
        }),

        quantidade_produto: joi.number().integer().positive().required().messages({
            "any.required": "A quantidade de produto é um campo obrigatório.",
            "number.positive": "o campo quantidade_produto recebe um valor maior que 0."
        })
      })

    ).min(1).required().messages({
        "any.required": "Informe quais são os produtos para prosseguir com o pedido.",
    })
  });


module.exports = { orderSchema };
