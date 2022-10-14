import MapPointItem from '../../../../../Artifactum/CrmAdmin/IServices/Models/MapPoints/MapPointItem';

export default class MapPointsGetListResponse  {
	Items: Array<MapPointItem> = null;
	constructor(obj?: Partial<MapPointsGetListResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
