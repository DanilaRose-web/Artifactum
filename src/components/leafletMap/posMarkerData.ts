import MarkerTemplate from "@components/ui-maps/markerTemplate";
import Position from "@components/ui-maps/position";

export default class PosMarkerData extends MarkerTemplate {
  // info: MarkerInfo;
  id: number;
  code: string = "";
  
  // employees: Array<MapEmployeeItemResponse>;
  constructor(data: PosMarkerData) {
    super();
    this.id = data.id;
    this.draggable = !!data.draggable;
    this.positionPoint =
      data.positionPoint == null
        ? null
        : new Position(
            data.positionPoint.lat || 0,
            data.positionPoint.lng || 0
          );

  }

}
