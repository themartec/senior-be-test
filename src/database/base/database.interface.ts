import mongoose from 'mongoose';

type Query<T> = mongoose.FilterQuery<T>;
type QueryOptions = mongoose.QueryOptions;

interface IRepository<TData, TEntity, TDocument> {
	create(doc: TData): Promise<TEntity>;
	bulkCreate(docs: TData[]): Promise<TEntity[]>;
	findOneAndUpdate(query: Query<TDocument>, doc: Partial<TData>, opt?: QueryOptions): Promise<Partial<TEntity>|null>;
	update(query: Query<TDocument>, doc: Partial<TData>, opt?: QueryOptions): Promise<{[key: string]: any}>;
	bulkUpdate(query: Query<TDocument>, doc: Partial<TData>, opt?: QueryOptions): Promise<{[key: string]: any}>;
	findAll(opt?: QueryOptions): Promise<TEntity[]>;
	findOneByQuery(query: Query<TDocument>, opt?: QueryOptions): Promise<TEntity | null>;
	findManyByQuery(query: Query<TDocument>, opt?: QueryOptions): Promise<TEntity[]>;
	findOneByObjectId(id: string, opt?: QueryOptions): Promise<TEntity | null>;
	findManyByObjectIds(ids: string[], opt?: QueryOptions): Promise<TEntity[]>;
	findOneAndDelete(query: any, opt?: QueryOptions): Promise<TEntity|null>;
	bulkDelete(query: any, opt?: QueryOptions): Promise<void>;
}

interface IAuditableEntity {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export {
	IRepository,
	IAuditableEntity,
	Query,
	QueryOptions,
};
