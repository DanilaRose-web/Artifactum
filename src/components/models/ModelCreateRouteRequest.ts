import SaveImageRequest from '../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest';
import MapPointAddToRouteItem from '../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapPointAddToRouteItem';
import EnumMapRouteType from '../../api/dataSource/api/Artifactum/Entities/Enums/EnumMapRouteType';

export default class ModelCreateRouteRequest  {
    

	// Title: string;
	// Description: string;
	// PreviewUrl: string;
	// CountryId: number;
	// CityId: number;
	// Price?: number;
	// PreviewImage: SaveImageRequest;
	// MapPointsIds: Array<MapPointAddToRouteItem>;
	// Type: EnumMapRouteType;
	constructor(
        public Title: string,
        public Description: string,
        public PreviewUrl: string,
        public CountryId: number,
        public CityId: number,
        public Price: number,
        public PreviewImage: SaveImageRequest,
        public MapPointsIds: Array<MapPointAddToRouteItem>,
        public Type: EnumMapRouteType,
        public id?: number
    ) {
      
        // this.Title = Title;
        // this.Description = Description
        // this.PreviewUrl = PreviewUrl
        // this.CountryId = CountryId
        // this.CityId = CityId
        // this.Price = Price
        // this.PreviewImage = PreviewImage
        // this.MapPointsIds = MapPointsIds
        // this.Type = Type
	}
}