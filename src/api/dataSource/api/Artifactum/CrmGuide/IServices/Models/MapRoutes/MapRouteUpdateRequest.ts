import SaveImageRequest from '../../../../../Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest';
import EnumBizMapRouteType from '../../../../../Artifactum/CrmGuide/IServices/Models/MapRoutes/EnumBizMapRouteType';

export default class MapRouteUpdateRequest  {
	Id: number = 0;
	Title?: string = '';
	Description?: string = '';
	CountryId: number = 0;
	CityId: number = 0;
	Price?: number = null;
	PreviewImage: SaveImageRequest = null;
	Type: EnumBizMapRouteType = null;
	constructor(obj?: Partial<MapRouteUpdateRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
