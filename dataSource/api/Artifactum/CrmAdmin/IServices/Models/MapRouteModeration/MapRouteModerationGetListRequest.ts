

export default class MapRouteModerationGetListRequest  {
	Search?: string = '';
	constructor(obj?: Partial<MapRouteModerationGetListRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
