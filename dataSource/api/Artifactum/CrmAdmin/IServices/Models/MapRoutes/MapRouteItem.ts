

export default class MapRouteItem  {
	Id: number = 0;
	Name?: string = '';
	CountryId?: number = null;
	CityId?: number = null;
	Time: number = 0;
	Distance: number = 0;
	MapPointCount: number = 0;
	constructor(obj?: Partial<MapRouteItem>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
