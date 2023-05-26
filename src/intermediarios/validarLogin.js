const jwt = require('jsonwebtoken')
const { knex } = require('../config/bd')

const validarLogin = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Não autorizado' })
  }
  try {
    const token = authorization.split(' ')[1]
    const { id } = jwt.verify(token, process.env.JWT_PASSWORD)
    const usuarioLogado = await knex('usuarios').where('id', id).first()
    if (!usuarioLogado) {
      res.status(401).json({ mensagem: 'Não autorizado' })
    }
    const { senha: _, ...dadosUsuarioLogado } = usuarioLogado
    req.usuarioLogado = dadosUsuarioLogado
    next()
  } catch (error) {
    return res.status(500).json('Erro interno no servidor')
  }
}

module.exports = {
  validarLogin
}
