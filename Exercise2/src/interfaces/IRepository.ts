export interface IRepository<T> {
  save(entity: T): void;
  findById(id: string): T | undefined;
  findAll(): T[];
  delete(id: string): boolean;
}
