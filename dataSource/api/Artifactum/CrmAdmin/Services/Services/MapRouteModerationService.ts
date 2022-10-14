import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import MapRouteModerationGetListRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/MapRouteModeration/MapRouteModerationGetListRequest';
import MapRouteModerationReuqest from '../../../../Artifactum/CrmAdmin/IServices/Models/MapRouteModeration/MapRouteModerationReuqest';
import MapRouteModerationDeleteRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/MapRouteModeration/MapRouteModerationDeleteRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import MapRouteModerationGetListResponse from '../../../../Artifactum/CrmAdmin/IServices/Models/MapRouteModeration/MapRouteModerationGetListResponse';

export default class MapRouteModerationService {
	webApiService: WebApiService;
	GetListEvent = new Events<WsResponseModel<MapRouteModerationGetListResponse>>();
	ModerationEvent = new Events<WsResponseModel<Boolean>>();
	DeleteEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('MapRouteModerationService', 'GetList', (res: WsResponseModel<MapRouteModerationGetListResponse>) => {
			self.GetListEvent.trigger(res);
		});
		webApiService.on('MapRouteModerationService', 'Moderation', (res: WsResponseModel<Boolean>) => {
			self.ModerationEvent.trigger(res);
		});
		webApiService.on('MapRouteModerationService', 'Delete', (res: WsResponseModel<Boolean>) => {
			self.DeleteEvent.trigger(res);
		});
	}
	GetList(request: MapRouteModerationGetListRequest = null) { 	
        this.webApiService.send('MapRouteModerationService', 'GetList' , request);
    }
	Moderation(request: MapRouteModerationReuqest = null) { 	
        this.webApiService.send('MapRouteModerationService', 'Moderation' , request);
    }
	Delete(request: MapRouteModerationDeleteRequest = null) { 	
        this.webApiService.send('MapRouteModerationService', 'Delete' , request);
    }
	 // async methods
	async getListAsync(request: MapRouteModerationGetListRequest = null): Promise<MapRouteModerationGetListResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetList.bind(this), this.GetListEvent)(request);
	}
	async moderationAsync(request: MapRouteModerationReuqest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.Moderation.bind(this), this.ModerationEvent)(request);
	}
	async deleteAsync(request: MapRouteModerationDeleteRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.Delete.bind(this), this.DeleteEvent)(request);
	}
}