export default class MapRouteStatus  {
    id: number;
    status: string;
          
    public constructor(id: number, status: string) {
      this.id = id;
      this.status = status
    }
  }