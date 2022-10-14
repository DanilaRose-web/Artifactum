import QuestItem from '../../../../../Artifactum/CrmAdmin/IServices/Models/Quests/QuestItem';

export default class QuestGetListResponse  {
	Items: Array<QuestItem> = null;
	constructor(obj?: Partial<QuestGetListResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
