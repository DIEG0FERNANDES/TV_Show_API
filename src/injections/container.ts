import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';
import { Db, MongoClient } from 'mongodb';
import { TYPES } from './types';
import DatabaseType from './../types/DatabaseType';

export const getContainer = async (database: DatabaseType): Promise<Container> => {
  const container = new Container();

  switch(database) {
    case 'mongodb':
      const connection = await MongoClient.connect('mongodb://localhost:27017');
      const db = connection.db('tvshows-mongo');
      container.bind<Db>(TYPES.DbConnector).toConstantValue(db);
      break;
      
    case 'postgres':
      const client = new PrismaClient();
      container.bind<PrismaClient>(TYPES.DbConnector).toConstantValue(client);
      break;
  }
    
  return container;
}