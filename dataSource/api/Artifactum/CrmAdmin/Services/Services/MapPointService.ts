import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import MapPointDeleteRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/MapPoints/MapPointDeleteRequest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import MapPointsGetListResponse from '../../../../Artifactum/CrmAdmin/IServices/Models/MapPoints/MapPointsGetListResponse';

export default class MapPointService {
	webApiService: WebApiService;
	GetListEvent = new Events<WsResponseModel<MapPointsGetListResponse>>();
	DeleteEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('MapPointService', 'GetList', (res: WsResponseModel<MapPointsGetListResponse>) => {
			self.GetListEvent.trigger(res);
		});
		webApiService.on('MapPointService', 'Delete', (res: WsResponseModel<Boolean>) => {
			self.DeleteEvent.trigger(res);
		});
	}
	GetList() { 	
        this.webApiService.send('MapPointService', 'GetList' );
    }
	Delete(request: MapPointDeleteRequest = null) { 	
        this.webApiService.send('MapPointService', 'Delete' , request);
    }
	 // async methods
	async getListAsync(): Promise<MapPointsGetListResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetList.bind(this), this.GetListEvent)();
	}
	async deleteAsync(request: MapPointDeleteRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.Delete.bind(this), this.DeleteEvent)(request);
	}
}