import * as _ from 'lodash';
import mongoose from 'mongoose';
import { IRepository, Query, QueryOptions } from './database.interface';

type Document = mongoose.Document;
class BaseRepository<TData, TEntity, TDocument extends Document> implements IRepository<TData, TEntity, TDocument> {
	protected model: mongoose.Model<TDocument, {}>;

	constructor(model: mongoose.Model<TDocument, {}>) {
		this.model = model;
	}

	public async create(doc: TData): Promise<TEntity> {
		const resDoc = await this.model.create(doc);

		return this._mapToEntity(resDoc);
	}

	public async bulkCreate(docs: TData[]): Promise<TEntity[]> {
		const resDocs = await this.model.create(docs);

		return _.map(resDocs, r => this._mapToEntity(r));
	}

	async findOrCreate(query: Query<TDocument>, doc: TData, opt?: QueryOptions): Promise<TEntity> {
		const resDoc = this.model.findOneAndUpdate(query, doc as object, { upsert: true });

		return resDoc as TEntity;
	}

	async findOneAndReplace(query: Query<TDocument>, doc: TData, opt?: QueryOptions): Promise<TEntity | null> {
		return this.model.findOneAndReplace(query, doc as object, opt);
	}


	async findOneAndUpdate(
		query: Query<TDocument>, doc: Partial<TData>, opt?: QueryOptions): Promise<Partial<TEntity> | null> {
		return this.model.findOneAndUpdate(query, doc, opt).exec() as any;
	}

	async update(query: Query<TDocument>, doc: Partial<TData>, opt?: QueryOptions): Promise<{ [key: string]: any }> {
		return this.model.updateOne(query, doc, opt).exec();
	}

	async bulkUpdate(query: Query<TDocument>, doc: Partial<TData>, opt?: QueryOptions): Promise<{ [key: string]: any }> {
		return this.model.updateMany(query, doc, opt).exec();
	}

	async findAll(opt?: QueryOptions): Promise<TEntity[]> {
		const resDocs = await this.model.find({}, undefined, opt).exec();

		return _.map(resDocs, r => this._mapToEntity(r));
	}

	async findOneByQuery(query: Query<TDocument>, opt?: QueryOptions): Promise<TEntity | null> {
		const resDoc = await this.model.findOne(query, undefined, opt).exec();

		return resDoc ? this._mapToEntity(resDoc) : null;
	}

	async findManyByQuery(query: Query<TDocument>, opt?: QueryOptions): Promise<TEntity[]> {
		const resDocs = await this.model.find(query, undefined, opt).exec();

		return _.map(resDocs, r => this._mapToEntity(r));
	}

	async findOneByObjectId(id: string, opt?: QueryOptions): Promise<TEntity | null> {
		const resDoc = await this.model.findById(id, undefined, opt).exec();

		return resDoc ? this._mapToEntity(resDoc) : null;
	}

	async findManyByObjectIds(ids: string[], opt?: QueryOptions): Promise<TEntity[]> {
		const query = { _id: { $in: ids } };
		const resDocs = await this.model.find(query, undefined, opt).exec();

		return _.map(resDocs, r => this._mapToEntity(r));
	}

	public async findOneAndDelete(query: any, opt?: QueryOptions): Promise<TEntity | null> {
		return this.model.findOneAndDelete(query, opt).exec() as any;
	}

	public async bulkDelete(query: any, opt?: QueryOptions): Promise<void> {
		await this.model.deleteMany(query, opt).exec();
	}

	/**
	 * @private
	 * @protected
	 * @param doc
	 * @returns
	 */
	protected _mapToEntity(doc: TDocument): TEntity {
		return doc.toJSON() as TEntity;
	}

}

export default BaseRepository;
