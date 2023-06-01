export interface IGenericDAO<T> {
  create(obj: T): Promise<string>
  update(id: string, obj: any): Promise<boolean>
  delete(id: string): Promise<boolean>
  findOne(id: string): Promise<T>
  find(criteria: any, options?: any): Promise<T[]>
}