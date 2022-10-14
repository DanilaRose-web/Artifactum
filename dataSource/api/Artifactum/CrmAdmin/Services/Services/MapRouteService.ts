import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import MapRouteGetListRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/MapRoutes/MapRouteGetListRequest';
import MapRouteDeleteRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/MapRoutes/MapRouteDeleteRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import MapRouteGetListResponse from '../../../../Artifactum/CrmAdmin/IServices/Models/MapRoutes/MapRouteGetListResponse';

export default class MapRouteService {
	webApiService: WebApiService;
	GetListEvent = new Events<WsResponseModel<MapRouteGetListResponse>>();
	DeleteEvent = new Events<WsResponseModel<Boolean>>();
	CheckUserRoleEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('MapRouteService', 'GetList', (res: WsResponseModel<MapRouteGetListResponse>) => {
			self.GetListEvent.trigger(res);
		});
		webApiService.on('MapRouteService', 'Delete', (res: WsResponseModel<Boolean>) => {
			self.DeleteEvent.trigger(res);
		});
		webApiService.on('MapRouteService', 'CheckUserRole', (res: WsResponseModel<Boolean>) => {
			self.CheckUserRoleEvent.trigger(res);
		});
	}
	GetList(request: MapRouteGetListRequest = null) { 	
        this.webApiService.send('MapRouteService', 'GetList' , request);
    }
	Delete(request: MapRouteDeleteRequest = null) { 	
        this.webApiService.send('MapRouteService', 'Delete' , request);
    }
	CheckUserRole() { 	
        this.webApiService.send('MapRouteService', 'CheckUserRole' );
    }
	 // async methods
	async getListAsync(request: MapRouteGetListRequest = null): Promise<MapRouteGetListResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetList.bind(this), this.GetListEvent)(request);
	}
	async deleteAsync(request: MapRouteDeleteRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.Delete.bind(this), this.DeleteEvent)(request);
	}
	async checkUserRoleAsync(): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.CheckUserRole.bind(this), this.CheckUserRoleEvent)();
	}
}