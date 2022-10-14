import { WebApiService } from '../../../../plugins/webApiService'
import { Events } from '../../../../plugins/events'
import EventToAsyncDecorator from '../../../../plugins/eventToAsyncDecorator'
import QuestDeleteRequest from '../../../../Artifactum/CrmAdmin/IServices/Models/Quests/QuestDeleteRequest';
import QuestsGetListResquest from '../../../../Artifactum/CrmAdmin/IServices/Models/Quests/QuestsGetListResquest';
import WsResponseModel from '../../../../SchemaBuilderServer/Models/WsResponseModel';
import QuestGetListResponse from '../../../../Artifactum/CrmAdmin/IServices/Models/Quests/QuestGetListResponse';

export default class QuestService {
	webApiService: WebApiService;
	DeleteEvent = new Events<WsResponseModel<Boolean>>();
	GetListEvent = new Events<WsResponseModel<QuestGetListResponse>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('QuestService', 'Delete', (res: WsResponseModel<Boolean>) => {
			self.DeleteEvent.trigger(res);
		});
		webApiService.on('QuestService', 'GetList', (res: WsResponseModel<QuestGetListResponse>) => {
			self.GetListEvent.trigger(res);
		});
	}
	Delete(request: QuestDeleteRequest = null) { 	
        this.webApiService.send('QuestService', 'Delete' , request);
    }
	GetList(request: QuestsGetListResquest = null) { 	
        this.webApiService.send('QuestService', 'GetList' , request);
    }
	 // async methods
	async deleteAsync(request: QuestDeleteRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.Delete.bind(this), this.DeleteEvent)(request);
	}
	async getListAsync(request: QuestsGetListResquest = null): Promise<QuestGetListResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetList.bind(this), this.GetListEvent)(request);
	}
}