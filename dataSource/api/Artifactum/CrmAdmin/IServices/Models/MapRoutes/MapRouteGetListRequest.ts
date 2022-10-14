

export default class MapRouteGetListRequest  {
	Search?: string = '';
	constructor(obj?: Partial<MapRouteGetListRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
