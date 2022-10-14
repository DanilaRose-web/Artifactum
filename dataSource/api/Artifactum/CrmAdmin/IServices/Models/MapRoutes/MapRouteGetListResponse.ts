import MapRouteItem from '../../../../../Artifactum/CrmAdmin/IServices/Models/MapRoutes/MapRouteItem';

export default class MapRouteGetListResponse  {
	Items: Array<MapRouteItem> = null;
	constructor(obj?: Partial<MapRouteGetListResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
