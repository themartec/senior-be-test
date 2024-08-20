import * as moment from 'moment';

export default class TimeUtil {
	static getLogMoment() {
		return moment().format('MMM/Do/YYYY h:mm:ssa');
	}

}
