

export default class QuestDeleteRequest  {
	Id: number = 0;
	constructor(obj?: Partial<QuestDeleteRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
