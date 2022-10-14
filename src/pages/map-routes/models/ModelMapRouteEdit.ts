
import EnumMapRouteType from '../../../api/dataSource/api/Artifactum/Entities/Enums/EnumMapRouteType';
import SaveImageRequest from '../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest';
import MapPointAddToRouteItem from '../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapPointAddToRouteItem';

export default class ModelMapRoutesEdit {
    Id: number;
    Title: string;
    Description: string;
    CountryId: number;
    CityId: number;
    Price: number;
    PreviewImage: SaveImageRequest;
    MapPointIds: Array<MapPointAddToRouteItem>; 
    Type: EnumMapRouteType
    constructor(
        Id: number,
        Title: string,
        Description: string,
        CountryId: number,
        CityId: number,
        Price: number,
        Type: EnumMapRouteType,
        PreviewImage: SaveImageRequest,
        MapPointIds: Array<MapPointAddToRouteItem>
    ) {
        this.Id = Id,
        this.Title = Title,
        this.Description = Description,
        this.Type = Type,
        this.Price = Price,
        this.PreviewImage = PreviewImage,
        this.CityId = CityId,
        this.CountryId = CountryId,
        this.MapPointIds = MapPointIds
    }
}