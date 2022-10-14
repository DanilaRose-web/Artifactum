import IEqual from "component-models/src/iequal";

export default class RoleDrop  {
  id: number;
  role: string;
        
  public constructor(id: number, role: string) {
    this.id = id;
    this.role = role
  }
}