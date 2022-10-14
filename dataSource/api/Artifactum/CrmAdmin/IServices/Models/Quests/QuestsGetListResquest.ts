

export default class QuestsGetListResquest  {
	Search?: string = '';
	constructor(obj?: Partial<QuestsGetListResquest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
