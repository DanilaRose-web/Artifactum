import IEqual from "component-models/src/iequal";
import MapRouteTypeDrop from "../models/MapRouteTypeDrop";

export default class EqualMapRouteType implements IEqual<MapRouteTypeDrop> {
    Value: MapRouteTypeDrop; // в Value определяем MapPointItem
            
    public constructor(value: MapRouteTypeDrop) {
        this.Value = value;
    }
    Equal(object: any): boolean {
        var obj = object as EqualMapRouteType; // в переменную obj присавиваем данный класс
        if(obj == null) return false; // если obj = null  
        return this.Value.id == obj.Value.id; // иначе, сравниваются id
    }
    EqualRelation(object: any): boolean {
        return null;
    }
    ToString(): String {
       return this.Value.type || 'Нет названия объекта' // возвращает имя options в select, если его нет, то выведет 'Нет названия объекта'
    }
}