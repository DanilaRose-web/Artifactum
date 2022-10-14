import MapPointCoordinates from '../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointCoordinates';

export default class ModelMapPointRequest {
    Id: number;
    Title: string;
    Description: string;
    PreviewUrl: string;
    Coordinates: MapPointCoordinates
    constructor(Id: number, Title: string, Description: string, PreviewUrl: string, Coordinates: MapPointCoordinates) {
        this.Id = Id
        this.Title = Title
        this.Description = Description
        this.PreviewUrl = PreviewUrl
        this.Coordinates = Coordinates
    }
}