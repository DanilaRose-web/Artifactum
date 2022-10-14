import MapRouteModerationItem from '../../../../../Artifactum/CrmAdmin/IServices/Models/MapRouteModeration/MapRouteModerationItem';

export default class MapRouteModerationGetListResponse  {
	Items: Array<MapRouteModerationItem> = null;
	constructor(obj?: Partial<MapRouteModerationGetListResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
