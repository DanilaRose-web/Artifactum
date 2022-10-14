import EnumRole from '../../../../../Artifactum/Entities/Enums/EnumRole';

export default class UserItem  {
	Id: number = 0;
	Name?: string = '';
	Email?: string = '';
	DateCreate: Date = null;
	RoleId: EnumRole = null;
	constructor(obj?: Partial<UserItem>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
