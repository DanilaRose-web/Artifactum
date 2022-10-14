import IEqual from "component-models/src/iequal";

export default class CountriesDrop implements IEqual<CountriesDrop> {
    id: number;
    role: string;
            
    public constructor(id: number, role: string) {
        this.id = id;
        this.role = role
    }
    
    public Equal(object: CountriesDrop) {
        return this.id == object.id;
    }
    public EqualRelation(object: CountriesDrop): boolean {
        return null;
    }
    public ToString() {
        return `${this.role}`;
    }
}