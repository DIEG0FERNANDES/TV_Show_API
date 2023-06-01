import { Request, Response } from 'express';
import { cepRegExp } from './../utils/regex_utils';
import { getContainer } from './../injections/container';
import { ICepDAO } from './../dao/ICepDAO';
import { TYPES } from './../injections/types';
import { Cep } from './../models/Cep';
import 'reflect-metadata';

/**
 * FIXME
 */
export const getAsynchronousCepController = async () => {
  const container = await getContainer('mongodb');
  const cepDAO = container.get<ICepDAO>(TYPES.ICepDAO);
  const cepController = new CepController(cepDAO);
  return cepController;
}

export class CepController {
  private _cepDAO: ICepDAO;

  constructor(cepDAO: ICepDAO) {
    this._cepDAO = cepDAO;
  }

  async save(req: Request, res: Response) {
    const { cep: cepString, logradouro } = req.body;

    if (!cepString || typeof cepString !== 'string' || !cepRegExp.test(cepString)) {
      return res.status(400).json({ mensagensDeErro: ['Número de CEP inválido'] });
    }
    
    if (!logradouro || typeof logradouro !== 'string') {
      return res.status(400).json({ mensagensDeErro: ['Logradouro inválido'] });
    }
    
    const cepExistingObject = await this._cepDAO.findByCep(cepString);
    
    if (cepExistingObject) {
      return res.status(409).json({ mensagensDeErro: ['CEP já cadastrado'] });
    }

    const cepObject = new Cep(cepString, logradouro);

    await this._cepDAO.create(cepObject);
    res.status(201).json({ mensagem: 'CEP cadastrado com sucesso' });
  }
  
  async findByCep(req: Request, res: Response) {
    const { cep: cepString } = req.params;

    if (!cepString || typeof cepString !== 'string' || !cepRegExp.test(cepString))  {
      return res.status(400).json({ mensagem: 'CEP inválido' });
    }

    const cepExistingObject = await this._cepDAO.findByCep(cepString);

    if (!cepExistingObject) {
      return res.status(404).json({ mensagem: 'Logradouro não encontrado' });
    }

    res.json({ endereco: cepExistingObject });
  }

  async findByLogradouro(req: Request, res: Response) {
    const { logradouro } = req.params;
    
    if (!logradouro) {
      return res.status(400).json({ mensagem: 'CEP inválido' });
    }

    const cepExistingObject = await this._cepDAO.findByLogradouro(logradouro);

    if (!cepExistingObject) {
      return res.status(404).json({ mensagem: 'CEP não encontrado' });
    }

    res.json({ endereco: cepExistingObject });
  }
}