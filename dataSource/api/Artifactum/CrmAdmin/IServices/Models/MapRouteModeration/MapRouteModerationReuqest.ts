import EnumMapRouteStatus from '../../../../../Artifactum/Entities/Enums/EnumMapRouteStatus';

export default class MapRouteModerationReuqest  {
	Id: number = 0;
	Description?: string = '';
	Status: EnumMapRouteStatus = null;
	constructor(obj?: Partial<MapRouteModerationReuqest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
