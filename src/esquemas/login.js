const joi = require('joi')

const esquemaLogin = joi.object({
  email: joi.string().email().required().messages({
    'string.base': 'O nome é um campo de texto',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório'
  }),
  senha: joi.string().min(5).required().messages({
    'string.base': 'A senha é um campo de texto',
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha deve conter no mínimo 5 caracteres'
  })
})

module.exports = {
  esquemaLogin
}
