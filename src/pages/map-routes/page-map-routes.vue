<template>
    <layout>
        <template>
            <div class="table-wrap">
                <table-head>
                    <table-title>Список маршрутов</table-title>
                    <table-head-button class="open-modal" @on-click="showPopup">Добавить маршрут</table-head-button>
                </table-head>

                <div class="filters-group row">
                    <div class="filter-item col-3">
                        <ui-usable-dropdown  class="ui-usable-dropdown" :items="filtersStatus" :value="null" :nameFields="['status']" @onSelected="getCurrentStatus" />
                    </div>
                    <div class="filter-item col-3">
                        <ui-usable-dropdown  class="ui-usable-dropdown" :items="listTypes" :value="null" :nameFields="['type']" @onSelected="getCurrentType" />
                    </div>
                    <div class="filter-item col-6">
                        <map-route-location
                            :flexBlock="true" 
                            :mapCountries="listCountries"
                            :mapCities="listCities"
                            @changeCountry="getCurrentCountry"
                            @changeCity="getCurrentCity"
                            :currentCountry="null"
                            :currentCity="0"
                        />
                    </div>
                </div>
                    
                <table-search 
                    @serchResult="getSearchResult"
                />

                <ui-table v-if="listRoutes" :rowGap="1" :columnGap="1" :mb='true' :Items="listRoutes.Items" w100 template-columns="100px 1.9fr 1.9fr 1fr 1fr 1fr 36px 36px 36px">
                    <template slot="header">
                        <ui-table-header-item>#</ui-table-header-item>
                        <!-- <ui-table-header-item>Имя автора</ui-table-header-item> -->
                        <ui-table-header-item>Название маршрута</ui-table-header-item>
                        <ui-table-header-item>Страна, город</ui-table-header-item>
                        <ui-table-header-item>Кол-во точек</ui-table-header-item>
                        <ui-table-header-item>Продолжительность</ui-table-header-item>
                        <ui-table-header-item>Расстояние</ui-table-header-item>
                        <ui-table-header-item class="no-padding"></ui-table-header-item>
                        <ui-table-header-item class="no-padding"></ui-table-header-item>
                        <ui-table-header-item class="no-padding"></ui-table-header-item>
                    </template>
                       

                    <template #body="data">
                        <ui-table-body-item >{{data.item.Id}}</ui-table-body-item>
                        <!-- <ui-table-body-item >{{data.item.Owner.NickName}}</ui-table-body-item> -->
                        <ui-table-body-item >{{data.item.Title}} </ui-table-body-item>
                        <ui-table-body-item >{{data.item.CountryName}}, {{data.item.CityName}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.PointsCount}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.Time}} </ui-table-body-item>
                        <ui-table-body-item >{{data.item.Distance}}</ui-table-body-item>
                        <ui-table-body-item class="no-padding in-process"><img src="assets/img/clock.svg" alt=""></ui-table-body-item>
                        <ui-table-body-item class="no-padding"><img src="assets/img/del.svg" alt="" @click="deleteRoute(data.item.Id)"></ui-table-body-item>
                        <ui-table-body-item class="no-padding">
                            <!-- <svg @click="chooseCurrentRoute(data.item.Id)" width="12" height="12"><use xlink:href="/assets/img/svg-sprite.svg#map-route-edit-icon"></use></svg> -->
                            <img src="/assets/img/edit.svg" alt="" @click="chooseCurrentRoute(data.item.Id)">
                        </ui-table-body-item>
                    </template>
                </ui-table>

                <ui-pagination :count="page.Count" :size="page.Size" ref="pagination" @onChange="onPaginationChanged($event)"></ui-pagination>
            </div>
        </template>

        
        <popup-wrap :visible="!showPopupFlag" @on-click="showPopup" @on-close-modal="hidePopup">
            <create-map-route 
                :point="innerCoordinate" 
                :showAddWay="!showAddWayFlag" 
                @on-click="hidePopup" 
                @validSuccess="hidePopup"
                @on-show-modal-map="onShowModalMap"
                :mapPoints="pointsList"
                :mapCountries="listCountries"
                :listRoutes="listRoutes">
            </create-map-route>
        </popup-wrap>
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Watch, Prop } from "vue-property-decorator";
    import 'vue-select/dist/vue-select.css';
    import PointCoordinates from "../../components/models/PointCoordinates" 
    import MapPointGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointGetListResponse" // массив точек с сервера
    import MapPointItem from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem"
    import ImagePreviewModel from "../../components/models/ImagePreviewModal"
    import SaveImageRequest from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest";
    import CountriesGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"
    import MapRouteGetListResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRouteGetListResponse";
    import PageResponse from "src/api/dataSource/api/PaginationHelper/Lib/PageResponse";
    import FilterStatus from "../../components/models/FilterStatusDrop";
    import ModelMapRoutesEdit from "./models/ModelMapRouteEdit";
    import Store from "./store/MapRoute"
    import MapRouteTypeDrop from "../../components/models/MapRouteTypeDrop"
    import MapRouteListItem from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRouteListItem";
    import MapRouteStatus from "./models/MapRouteStatus"
    import ModelCreateRouteRequest from "@components/models/ModelCreateRouteRequest";

    
    @Component
    export default class PageMapRoutesComponent extends Vue {
        @Watch('$route', { immediate: true, deep: true })
        onUrlChange(newVal: any) {}

        @Prop({ type: Array, default: (): CountriesGetListResponse[] => [] }) mapCountries: CountriesGetListResponse[]
        @Prop({ type: Array, default: (): CityGetListResponse[] => [] }) mapCities: CityGetListResponse[]
        @Prop({ type: Number, default: 0 }) currentCountry: number
        @Prop({ type: Number, default: 0 }) currentCity: number
        // @Prop({ type: Object, default: null }) mapPoints: MapPointGetListResponse;
        
        filtersStatus: MapRouteStatus[] = [new FilterStatus(null, 'Статус'), new FilterStatus(0, 'Новый'), new FilterStatus(2, 'На модерации'), new FilterStatus(3, 'Готово'), new FilterStatus(4, 'Отклонено')]; 
        listTypes: MapRouteTypeDrop[] = [new MapRouteTypeDrop(null, 'Тип'), new MapRouteTypeDrop(0, 'Турист'), new MapRouteTypeDrop(1, 'Квест')]

        innerItems: Array<any> = [];
        totalCounts = 0;

        page: PageResponse = {
            Current: 0,
            Size: 3,
            Count: 0
        }

        skip = 0;

        pointsList: MapPointGetListResponse = null;
        innerCoordinate: PointCoordinates = null

        showMenuFlag = false;
        showPopupFlag = false;
        showAddWayFlag = false
        showModWayFlag = true
        showChooseOnMapFlag = true

        listCountries: CountriesGetListResponse[] = []
        listCities: CityGetListResponse[] = null
        listRoutes: MapRouteGetListResponse = null;
        newCurrentCountry: number = null
        newCurrentCity: number = null
        route: any = null
        currentType: number = null
        currentStatus: number = null

        routeCreateData: ModelCreateRouteRequest = null 

        getSearch: string = ''

        // routeData: ModelMapRoutesEdit = null

        
        
        onSort(value:any){
            console.log(`value`, value);

        }
        onPaginationChanged(value:{Page:number,CountOnPage:number}) {
            // value {Page: 2, CountOnPage: 10}
            this.page.Current=value.Page-1;
            this.skip = (value.Page-1) * value.CountOnPage;

            console.log(this.skip, this.page.Size, this.page.Count);
            
            this.getListRoutes() 
        }

        getCurrentCountry(innerCurrentCountry: number) {
            this.newCurrentCountry = innerCurrentCountry
        }

        @Watch('newCurrentCountry') changeCountry() {
            this.getListCities()
        }

        getCurrentCity(innerCurrentCity: number) {
            this.newCurrentCity = innerCurrentCity
            // console.log('newCurrentCity', currentCity);
        }

        getSearchResult(search: string) {
            this.getSearch = search 
            this.getListRoutes()
        }

        getPoint(point: PointCoordinates){
            this.innerCoordinate = point;
        }

        getCurrentType(value: number) {
            this.currentType = value
            // console.log('current-type', this.currentType);  
        }

        getCurrentStatus(value: number) {
            this.currentStatus = value
        }

        getListCountries() {
            this.$api.CountryService.GetListEvent.once((response) => {
                if (response.IsSuccess) {} 
                else {}
                this.listCountries = response.Value
                this.listCountries.unshift({Id: null, Name: 'Все страны'})
            })
            this.$api.CountryService.GetList()
        }

        getListCities() {
            this.$api.CityService.GetListEvent.once((response) => {
                if (response.IsSuccess) {  
                } else {}
                this.listCities = response.Value
                this.listCities.unshift({ Id: null, Name: 'Все города', })
            })
            this.$api.CityService.GetList({ Search: '' })
        }

        getListRoutes() {
            this.$api.MapRouteService.GetListEvent.once((response) => {
                if (response.IsSuccess) {
                    
                } else {}
                this.listRoutes = response.Value;
                this.page.Count=response.Value.Page.Count
                // console.log('Маршруты',this.listRoutes.Items);
                
            })
            this.$api.MapRouteService.GetList({
                Search: this.getSearch,
                CountryId: this.newCurrentCountry,
                CityId: this.newCurrentCity,
                Page: {Skip:this.skip,Take:this.page.Size},
                ShowPassed: false,
                LeftTopCoordinates: null,
                RightBottomCoordinates: null,
                Type: this.currentType,
            })
        }

        showMenu() {
            this.showMenuFlag = !this.showMenuFlag;
        }

        onShowModalMap() {
            this.showAddWayFlag = false
            this.showModWayFlag = false
            this.showChooseOnMapFlag = true
            // console.log("Работает");
        }

        onShowModWay() {
            this.showAddWayFlag = false
            this.showChooseOnMapFlag = false
            this.showModWayFlag = true
            // console.log("Работает");
        }

        showPopup() {
            this.showPopupFlag = !this.showPopupFlag
            this.showAddWayFlag = !this.showAddWayFlag
            this.showModWayFlag = !this.showModWayFlag
            this.showChooseOnMapFlag = !this.showChooseOnMapFlag
        }

        hidePopup() {
            this.showPopupFlag = false
            this.showAddWayFlag = false
            this.showModWayFlag = true
            this.showChooseOnMapFlag = true
        }

        closeModPopup() {
            this.showAddWayFlag = true
            this.showModWayFlag = false
        }

        addCoord() {
            this.showChooseOnMapFlag = !this.showChooseOnMapFlag
            this.showAddWayFlag = !this.showAddWayFlag
        }

        changeCoord(response: PointCoordinates) {
            this.innerCoordinate = response
        }

        async deleteRoute(id: number) {
            let indexRoute = this.listRoutes.Items.findIndex(item => item.Id == id)
            this.listRoutes.Items.splice(indexRoute, 1)

            let req = await this.$api.MapRouteService.deleteAsync({Id: id})
            console.log('indexRoute', indexRoute);
        }

        chooseCurrentRoute(id: number) {
            this.route = this.listRoutes.Items.find(item => item.Id == id)
            this.$router.push({ name: 'page-edit-map-routes', params: { id: id.toString() } }) 

            // this.routeData = new ModelMapRoutesEdit(this.route.Id, this.route.Title, this.route.Description, this.route.CountryId, this.route.CityId, this.route.Price);
            console.log(`Выбранный маршрут`, this.route);  
            this.$store.commit("addRoute", this.route)
            this.$store.commit("addRouteCreate", null)
        }

        created() {
            this.getListRoutes()
            this.getListCountries()
            // this.getListCities()
            this.$api.MapPointService.GetListEvent.once((response) => {
            this.pointsList = response.Value
            })
            this.$api.MapPointService.GetList({Search: ''}) 
            this.routeCreateData = this.$store.getters.returnRouteCreate
            
        }
    }
</script>

<style lang="css" scoped>

.no-padding img, .no-padding svg {
    width: 13px;
    height: auto;
}

.filters-group {
    margin: 0 -10px;
}

.filter-item {
    padding: 0 10px;
}

.table-wrap {
    margin-top: 29px;
    padding: 26px;
    background: white;
}

.ui-table .ui-table-body-item.no-padding {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.ui-table .ui-table-body-item.in-process {
    background: #FFB83A;
}

</style>