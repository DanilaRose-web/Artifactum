import SaveImageRequest from '../../../../../Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest';
import EnumBizMapRouteType from '../../../../../Artifactum/CrmGuide/IServices/Models/MapRoutes/EnumBizMapRouteType';

export default class MapRouteCreateRequest  {
	Title?: string = '';
	Description?: string = '';
	PreviewUrl?: string = '';
	CountryId: number = 0;
	CityId: number = 0;
	Price?: number = null;
	PreviewImage: SaveImageRequest = null;
	Type: EnumBizMapRouteType = null;
	constructor(obj?: Partial<MapRouteCreateRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
