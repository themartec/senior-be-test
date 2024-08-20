import { BaseRepository } from '../base';
import { ISubscriberData, ISubscriberEntity } from './../../interfaces/subscriber.interface';
import SubscriberModel, { SubscriberDocument } from './subscriber.model';

class SubscriberRepository extends BaseRepository<ISubscriberData, ISubscriberEntity, SubscriberDocument> {

	constructor() {
		super(SubscriberModel);
	}

}

export default SubscriberRepository;
