import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import UsersGetListRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/Users/UsersGetListRequest';
import UserDeleteRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/Users/UserDeleteRequest';
import SetRoleForUserRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/Users/SetRoleForUserRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import UsersGetListResponse from '../../../../Artifactum/CrmAdmin/IServices/Models/Users/UsersGetListResponse';

export default class UserService {
	webApiService: WebApiService;
	GetListEvent = new Events<WsResponseModel<UsersGetListResponse>>();
	DeleteEvent = new Events<WsResponseModel<Boolean>>();
	SetRoleForUserEvent = new Events<WsResponseModel<Boolean>>();
	CheckUserRoleEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('UserService', 'GetList', (res: WsResponseModel<UsersGetListResponse>) => {
			self.GetListEvent.trigger(res);
		});
		webApiService.on('UserService', 'Delete', (res: WsResponseModel<Boolean>) => {
			self.DeleteEvent.trigger(res);
		});
		webApiService.on('UserService', 'SetRoleForUser', (res: WsResponseModel<Boolean>) => {
			self.SetRoleForUserEvent.trigger(res);
		});
		webApiService.on('UserService', 'CheckUserRole', (res: WsResponseModel<Boolean>) => {
			self.CheckUserRoleEvent.trigger(res);
		});
	}
	GetList(request: UsersGetListRequest = null) { 	
        this.webApiService.send('UserService', 'GetList' , request);
    }
	Delete(request: UserDeleteRequest = null) { 	
        this.webApiService.send('UserService', 'Delete' , request);
    }
	SetRoleForUser(request: SetRoleForUserRequest = null) { 	
        this.webApiService.send('UserService', 'SetRoleForUser' , request);
    }
	CheckUserRole() { 	
        this.webApiService.send('UserService', 'CheckUserRole' );
    }
	 // async methods
	async getListAsync(request: UsersGetListRequest = null): Promise<UsersGetListResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetList.bind(this), this.GetListEvent)(request);
	}
	async deleteAsync(request: UserDeleteRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.Delete.bind(this), this.DeleteEvent)(request);
	}
	async setRoleForUserAsync(request: SetRoleForUserRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.SetRoleForUser.bind(this), this.SetRoleForUserEvent)(request);
	}
	async checkUserRoleAsync(): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.CheckUserRole.bind(this), this.CheckUserRoleEvent)();
	}
}