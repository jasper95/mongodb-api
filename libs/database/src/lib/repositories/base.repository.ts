import { Model, Document, UpdateQuery, FilterQuery, ProjectionType } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(document: Partial<T>): Promise<T> {
    return this.model.create(document)
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>
  ): Promise<T | null> {
    return this.model.findOne(entityFilterQuery, projection)
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id);
  }

  async update(id: string, document: UpdateQuery<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, document);
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndRemove(id);
  }
}