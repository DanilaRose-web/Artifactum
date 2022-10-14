import EnumRole from '../../../../../Artifactum/Entities/Enums/EnumRole';

export default class SetRoleForUserRequest  {
	UserId: number = 0;
	RoleId: EnumRole = null;
	constructor(obj?: Partial<SetRoleForUserRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
