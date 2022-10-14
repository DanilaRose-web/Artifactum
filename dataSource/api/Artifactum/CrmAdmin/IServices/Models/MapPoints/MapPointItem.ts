

export default class MapPointItem  {
	Id: number = 0;
	Title?: string = '';
	CountryId?: number = null;
	CityId?: number = null;
	OwnerId: number = 0;
	constructor(obj?: Partial<MapPointItem>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
