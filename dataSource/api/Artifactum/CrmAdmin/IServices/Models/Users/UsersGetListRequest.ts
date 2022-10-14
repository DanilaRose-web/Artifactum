

export default class UsersGetListRequest  {
	Search?: string = '';
	constructor(obj?: Partial<UsersGetListRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
