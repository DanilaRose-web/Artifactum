

export default class QuestItem  {
	Name?: string = '';
	CountryId?: number = null;
	CityId?: number = null;
	Time: number = 0;
	Distance: number = 0;
	PointsCount: number = 0;
	constructor(obj?: Partial<QuestItem>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
