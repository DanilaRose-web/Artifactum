import { WebApiService } from './plugins/webApiService';
import BaseWsService from './Artifactum/CrmAdmin/Services/Services/BaseWsService';
import MapPointService from './Artifactum/CrmAdmin/Services/Services/MapPointService';
import MapRouteModerationService from './Artifactum/CrmAdmin/Services/Services/MapRouteModerationService';
import MapRouteService from './Artifactum/CrmAdmin/Services/Services/MapRouteService';
import QuestService from './Artifactum/CrmAdmin/Services/Services/QuestService';
import UserService from './Artifactum/CrmAdmin/Services/Services/UserService';
import WsCallbacks from './WebSocketControllers/Core/WsCallbacks'

export default class ApiDataSource {
	webApiService: WebApiService;
	BaseWsService: BaseWsService;
	MapPointService: MapPointService;
	MapRouteModerationService: MapRouteModerationService;
	MapRouteService: MapRouteService;
	QuestService: QuestService;
	UserService: UserService;
	WsCallbacks: WsCallbacks;
	constructor(webApiUrl: string) {
		this.webApiService = new WebApiService(webApiUrl);
		this.BaseWsService = new BaseWsService(this.webApiService);
		this.MapPointService = new MapPointService(this.webApiService);
		this.MapRouteModerationService = new MapRouteModerationService(this.webApiService);
		this.MapRouteService = new MapRouteService(this.webApiService);
		this.QuestService = new QuestService(this.webApiService);
		this.UserService = new UserService(this.webApiService);
		this.WsCallbacks = new WsCallbacks(this.webApiService);
	}

}
