import { User } from '../models/User'
import { IGenericDAO } from './IGenericDAO'

export interface IUserDAO extends IGenericDAO<User> {
  findByName(name: string): Promise<User[]>
}