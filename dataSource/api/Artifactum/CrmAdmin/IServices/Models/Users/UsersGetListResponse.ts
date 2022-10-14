import UserItem from '../../../../../Artifactum/CrmAdmin/IServices/Models/Users/UserItem';

export default class UsersGetListResponse  {
	Items: Array<UserItem> = null;
	constructor(obj?: Partial<UsersGetListResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
