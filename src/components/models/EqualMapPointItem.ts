import IEqual from "component-models/src/iequal";
import MapPointItem from '../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem'

export default class EqualMapPointItem implements IEqual<MapPointItem> {
    Value: MapPointItem; // в Value определяем MapPointItem
            
    public constructor(value: MapPointItem) {
        this.Value = value;
    }
    Equal(object: any): boolean {
        var obj = object as EqualMapPointItem; // в переменную obj присавиваем данный класс
        if(obj == null) return false; // если obj = null  
        return this.Value.Id == obj.Value.Id; // иначе, сравниваются id
    }
    EqualRelation(object: any): boolean {
        return null;
    }
    ToString(): String {
       return this.Value.Name || 'Нет названия объекта' // возвращает имя options в select, если его нет, то выведет 'Нет названия объекта'
    }
}