const joi = require('joi')

const esquemaProduto = joi.object({
  titulo: joi.string().required().messages({
    'string.base': 'O título é um campo de texto',
    'any.required': 'O campo título é obrigatório',
    'string.empty': 'O campo título é obrigatório'
  }),
  descricao: joi.string().required().messages({
    'string.base': 'A descrição é um campo de texto',
    'any.required': 'O campo descrição é obrigatório',
    'string.empty': 'O campo descrição é obrigatório'
  }),
  quantidade: joi.string().required().messages({
    'string.base': 'A quantidade é um campo de texto',
    'any.required': 'O campo quantidade é obrigatório',
    'string.empty': 'O campo quantidade é obrigatório'
  }),
  valor: joi.string().required().messages({
    'string.base': 'O valor é um campo de texto',
    'any.required': 'O campo valor é obrigatório',
    'string.empty': 'O campo valor é obrigatório'
  })
  // id_usuario: joi.number().required().messages({
  //   'number.base': 'O id é um campo numérico',
  //   'any.required': 'O id é obrigatório'
  // })
})

module.exports = {
  esquemaProduto
}
