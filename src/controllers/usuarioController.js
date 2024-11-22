import {
   CriarUsuario,
   obterUsuarioEmail
  } from "../data/repositories/usuarioRepository.js";
import { Usuario } from "../models/usuarioModel.js";


const criarUsuario = async (req, res) => {
    try {
      const usuario = new Usuario({
        ...req.body
      });

      const usuValidacao = await obterUsuarioEmail(usuario);


      if(usuValidacao.length > 0)
        res.status(409).send('Email já Cadastrado!')
      
      else{
        const transacaoId = await CriarUsuario(usuario);
  
      res.send({
        message: "Usuário criado com sucesso!"
      });

      }
      
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };


  export {criarUsuario}