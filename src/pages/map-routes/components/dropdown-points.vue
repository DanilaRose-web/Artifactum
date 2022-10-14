<template>
    <div class="dropdown-points" >
        <div class="select-wrap child-select">
            <label for="" class="select-label"><span class="required">*</span>Добавить точку</label>
            <div class="flex-block-select" v-for="(source, index) in selectMapPoints" :key="source.Id">
                <ui-dropdown :items="source"></ui-dropdown>
                <img class="select-img" src="/assets/img/basket.svg" alt="" @click="deletePoint(index)">
                <img class="select-img" src="/assets/img/warn.svg" alt="">
            </div>
        </div>

        <div class="select-wrap" v-if="pointsListResponse">
            <div class="flex-block-select">
                <ui-dropdown :items="d0"  :placeholder="'Выберите точку'" @change="selectPoint">
                </ui-dropdown>
                <img v-if="sel" class="select-img" src="/assets/img/add.svg" alt="" @click="addSelectedPoint()" />
                <svg class="select-img" @click="$emit('on-click')" width="12" height="12"><use xlink:href="/assets/img/svg-sprite.svg#createMapPoint"></use></svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { Component, Prop, Watch } from "vue-property-decorator"
    import MapPointGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointGetListResponse"
    import MapPointItem from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem"
    import ListViewItem from "list-view/src/listviewitem";
    import EqualMapPointItem from './../../../components/models/EqualMapPointItem'
    import MapPointsIdsRequest from "../../../components/models/MapPointsIdsRequest"
    import ModelCreateRouteRequest from "../../../components/models/ModelCreateRouteRequest"
    import MapPointShot from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapPointShot";
    import MapRoutePointRelationShot from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRoutePointRelationShot";


    @Component
    export default class DropdownPointsComponent extends Vue {
        
        @Prop({ type: Object, default: null }) mapPoints: MapPointGetListResponse;
        @Prop({ type: Array, default: (): MapPointShot[] => [] }) selectedPointsResponse: MapPointShot[]


        // точки
        requestSelectedPoints: MapPointsIdsRequest[] = [] 
        // requestSelectedPointsResponse: MapPointsIdsRequest[] = [] 
        pointsListResponse: MapPointGetListResponse = null;
        selectValue:  ListViewItem<MapPointItem>[] = [] // точки
        selectMapPoints: Array<Array<ListViewItem<MapPointItem>>> = []// dropdown
        mapPointsUpdateReq: MapRoutePointRelationShot[] = []
        sel = false // убирает кнопку "добавить точку", пока не выбрана точка
        d0: ListViewItem<MapPointItem>[] = [] // убирает добавленную точку из нулевого дропдауна

        @Watch('mapPoints')
        changeMapPoints() {
            this.pointsListResponse = this.mapPoints;
            if (this.selectedPointsResponse.length > 0) {
                this.selectMapPoints = this.selectedPointsResponse.map(el => {
                let listPoints = this.SetMapPoints(el.MapPointId);
                return listPoints
            });
            }
            // if (this.selectMapPoints.length > 0) {
            //     console.log(`not empty`, this.selectMapPoints);
            //     // this.d0 = []
            // }
            this.initD0()
          
            console.log('pointsListResponse watch', this.pointsListResponse);
        }

        @Watch('selectMapPoints') changePointsUpdate() {
            this.selectedMapPointsUpdate()
            // console.log(this.mapPointsUpdateReq, 'mapPointsUpdateReq');
            
        }

  
        
        created() {  
            // this.d0 = []
            if (this.d0) {
                console.log(`this.d0`, this.d0);
            }
            this.pointsListResponse = this.mapPoints;
            let tmp = JSON.stringify(this.selectValue)
            let d1 = JSON.parse(tmp) 
        }
        
        initD0(){
            var list = this.pointsListResponse.Items.map((value, index) => {
                //const this.selectValue?this.selectValue.Value.Value.Id:0==value.Id
                var point =  new ListViewItem<MapPointItem>(new EqualMapPointItem(value), false, false);
                // console.log('SetMapPoints list', point);
                return point;
            });
            this.d0 = list
            console.log(`d0`, this.d0);
        }

        SetMapPoints(id: number):Array<ListViewItem<MapPointItem>>{
            var list = this.pointsListResponse.Items.map((value, index) => {
                //const this.selectValue?this.selectValue.Value.Value.Id:0==value.Id
                var point = new ListViewItem<MapPointItem>(new EqualMapPointItem(value), value.Id == id, false);
                // console.log('SetMapPoints list', point);
                return point;
             });
            // console.log('SetMapPoints', list);
            return list;
        }

        // SetResponsePoints(id: number): Array<ListViewItem<MapPointShot>> {
        //     var listResponse = this.pointsListResponse.Items.map((value, index) => {
        //         var point =  new ListViewItem<MapPointShot>(new EqualMapPointItem(value), value.Id == id, false);
        //         // console.log('SetMapPoints list', point);
        //         return point;
        //      });
        //     // console.log('SetMapPoints', list);
        //     return listResponse;
        // }

        // selectedPoints() {
        //     /* Для пояснения: selectMapPoints (dropdown) - выбранные точки, ListViewItem(Точки) - selectValue  */
        //     let count = 0 // счетчик, которые увеличивается при каждой итерации цикла
        //     this.selectMapPoints.forEach(dropdown => { // проходимся по массиву selectMapPoints (dropdown). В каждом проходе - перебираем цикл listViewItem (точки)
        //         dropdown.forEach(listViewItem => { // проходимся по массиву listViewItem(точки)
        //             if (listViewItem.Selected) { // на каждом проходе проверяем, если точка выбрана (selected = true), помещаем ее в массив, который нужно отправить на сервер
        //                 this.requestSelectedPoints.push({PointId: listViewItem.Value.Value.Id, Number: count}) // помещаем выбранные точки в массив, для отправки на сервер
        //                 count++ // при каждой итерации цикла увеличиваем k на 1
        //             }
        //         })
        //     })
        // }

        // удаление точки (dropdown)
        deletePoint(id: number) {
            this.selectMapPoints.splice(id, 1);
            
        }



        // добавление точки
        addSelectedPoint(id: number, disabled:boolean=true) {
           this.sel=false;
            
            if (this.selectValue[0]) {
                id = this.selectValue[0].Value.Value.Id
                // console.log("addPoint selectValue", this.selectValue[0].Value.Value);
                let temp 
                this.selectMapPoints.push(this.SetMapPoints(id)) // помещаем в массив id выбранной точки
                // console.log("addPoint selectMapPoints", this.selectMapPoints);
            } 
            // console.log(this.selectValue, 'this.selectValue Id');
            // this.selectMapPoints.forEach(dropdown => {
            //     dropdown.forEach(point => {
            //         if (point.Value.Value.Id==id) {
            //             point.Disabled=disabled;
            //         }
            //     })
            // })
            // console.log(` this.selectMapPoints`,  this.selectMapPoints);
            
            
            this.selectedPointsReq();
            this.d0.forEach(el=>{
                if(el.Value.Value.Id == this.selectValue[0].Value.Value.Id){
                    el.Disabled=true
                }
                el.Selected=false;
            })
            this.selectValue=[];
            
            //1 в disable
            //2 this.selectValue []
        }

        // получаем id выбранной точки
        selectPoint(value: ListViewItem<MapPointItem>[]) { 
            this.sel = true;
            this.selectValue = value; // id выбранной точки
            // // console.log(this.selectValue); 
        }

        selectedPointsReq() {
            this.requestSelectedPoints = []
            let k = 0
            this.selectMapPoints.forEach(dropdown => {
                dropdown.forEach(listViewItem => {
                    if (listViewItem.Selected) {
                        this.requestSelectedPoints.push({PointId: listViewItem.Value.Value.Id, Number:k})
                        k++
                        // console.log('requestSelectedPoints', this.requestSelectedPoints);
                        
                    }
                })
            })
            this.$emit('selectedPoints', this.requestSelectedPoints) 
            
        }

        selectedMapPointsUpdate() {
            // this.mapPointsUpdateReq = []
            // let k = 0
            // this.selectMapPoints.forEach(dropdown => {
            //     dropdown.forEach(listViewItem => {
            //         if (listViewItem.Selected) {
            //             this.mapPointsUpdateReq.push({ MapPointId: listViewItem.Value.Value.Id, Number:k})
            //             k++
            //             // console.log('requestSelectedPoints', this.requestSelectedPoints);
            //         }
            //     })
            // })
            // this.$emit('selectedPointsUpdate', this.mapPointsUpdateReq) 
        }

    }
</script>

<style lang="less">

.required {
  color: red;
  font-size: 20px;
}

.dropdown-points {
    margin-top: 14px;
}

.flex-block-select {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.select-label {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #586174;
    display: inline-block;
}

.select-img {
    margin-left: 14px;
    cursor: pointer;
    width: 17px;
    height: auto;
}

svg.select-img {
    width: 20px;
    height: auto;
    fill: #5D58B7;
}

.dropdown-points .ui-dropdown .ui-options.active .ui-box-menu .ui-list-view .ui-list-view-item.disabled  {
  display: none;
}

</style>