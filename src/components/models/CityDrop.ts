import IEqual from "component-models/src/iequal";

export default class CityDrop implements IEqual<CityDrop> {
    id: number;
    role: string;
            
    public constructor(id: number, role: string) {
        this.id = id;
        this.role = role
    }
    
    public Equal(object: CityDrop) {
        return this.id == object.id;
    }
    public EqualRelation(object: CityDrop): boolean {
        return null;
    }
    public ToString() {
        return `${this.role}`;
    }
}