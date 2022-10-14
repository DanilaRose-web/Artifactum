

export default class UserDeleteRequest  {
	Id: number = 0;
	constructor(obj?: Partial<UserDeleteRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
