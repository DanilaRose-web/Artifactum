// export default class PointCoordinates {
//     constructor(public Lat: number, public Lng: number ) {
//     }
//  }

export default class PointCoordinates {
    lat: number;
    lng: number
    constructor(lat: number, lng: number ) {
        this.lat = lat,
        this.lng = lng
    }
 }