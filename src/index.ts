import 'reflect-metadata'

import { IUserDAO } from './dao/IUserDAO'
import { getContainer } from './injections/container'
import { TYPES } from './injections/types'
import { User } from './models/User'

const run = async () => {
  const container = await getContainer()
  const dao = container.get<IUserDAO>(TYPES.IUserDAO)

  const user1 = new User(
    'Dwight Schrute',
    'dwight@dundermifflin.com',
    new Date('1970-01-20')
  )

  const id = await dao.create(user1)
  console.log(`ID: ${id}`)

  let user = await dao.findOne(id)
  console.log(user)

  const updated = await dao.update(id, {
    email: 'salesman_number1@dundermifflin.com',
  })
  console.log(`Atualizado: ${updated}`)

  user = await dao.findOne(id)
  console.log(user)

  const users = await dao.findByName('dwight')
  console.log(users)

  const deleted = await dao.delete(id)
  console.log(`Removido: ${deleted}`)

  console.log('Mal feito desfeito')
}

run()