import EnumMapRouteStatus from '../../../../../Artifactum/Entities/Enums/EnumMapRouteStatus';

export default class MapRouteModerationItem  {
	Id: number = 0;
	OwnerId: number = 0;
	Title?: string = '';
	CountryId?: number = null;
	CityId?: number = null;
	MapPointCount: number = 0;
	MapRouteStatus: EnumMapRouteStatus = null;
	constructor(obj?: Partial<MapRouteModerationItem>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
