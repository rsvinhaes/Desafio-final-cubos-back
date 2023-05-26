const { knex } = require('../config/bd')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const emailCadastrado = await knex('usuarios').where({ email }).first()
    if (emailCadastrado) {
      return res.status(400).json({ mensagem: 'Email ou senha inválidos' })
    }
    const usuariosCadastrados = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*')
    const { senha: _senha, ...usuarioCadastrado } = usuariosCadastrados[0]

    return res.status(201).json(usuarioCadastrado)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  const { id } = req.params
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const usuariosCadastrados = await knex('usuarios').update({ nome, email, senha: senhaCriptografada }).where('id', id).returning('*')
    const { senha: _senha, ...usuarioCadastrado } = usuariosCadastrados[0]
    return res.status(201).json(usuarioCadastrado)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

const deletarUsuario = async (req, res) => {
  const { id } = req.params

  try {
    await knex('usuarios').where('id', id).del()
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' })
  }
}

module.exports = {
  cadastrarUsuario,
  editarUsuario,
  deletarUsuario
}
