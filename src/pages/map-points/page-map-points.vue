<template>
    <layout>
        <template>
            <div class="table-wrap">
                <table-head>
                    <table-title>Точки</table-title>
                    <!-- <table-head-button class="open-modal" @on-click="showPopup">Добавить точку</table-head-button> -->
                </table-head>

                <div class="filters-group row">
                    
                    <div class="filter-item col-12">
                        <map-route-location
                            :flexBlock="true" 
                            :mapCountries="listCountries"
                            :mapCities="listCities"
                            @currentCountry="getCurrentCountry"
                            @currentCity="getCurrentCity"
                        />
                    </div>
                </div>
                    
                <table-search 
                    @serchResult="getSearchResult"
                />

                
                <ui-table v-if="pointList" :Items="pointList.Items" :rowGap="1" :columnGap="1" :mb='true' w100 template-columns="100px 2fr 1.7fr 1.7fr 36px 36px">
                    <template slot="header">
                        <ui-table-header-item>#</ui-table-header-item>
                        <ui-table-header-item>Название точки</ui-table-header-item>
                        <ui-table-header-item>Страна, город</ui-table-header-item>
                        <ui-table-header-item>Высота</ui-table-header-item>
                        <ui-table-header-item></ui-table-header-item>
                        <ui-table-header-item></ui-table-header-item>
                    </template>
                    

                    <template #body="data">
                        <ui-table-body-item >{{data.item.Id}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.Name}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.CountryName}}, {{data.item.CityName}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.Height}}</ui-table-body-item>
                        <ui-table-body-item class="no-padding">
                            <img src="assets/img/del.svg" alt="" @click="deletePoint(data.item.Id)">
                        </ui-table-body-item>
                        <ui-table-body-item class="no-padding">
                            <svg @click="updatePoint(data.item.Id)" width="12" height="12"><use xlink:href="/assets/img/svg-sprite.svg#map-route-edit-icon"></use></svg>
                        </ui-table-body-item>
                    </template>
                </ui-table>
              

                <ui-pagination :count="page.Count" :size="page.Size" ref="pagination" @onChange="onPaginationChanged($event)"></ui-pagination>
            </div>
        </template>

        
        <!-- <popup-wrap :visible="!showPopupFlag" @on-close-modal="hidePopup">
            <create-map-point 
                :point="innerCoordinate" 
                :showAddPoint="!showAddPointFlag" 
                @validSuccess="hidePopup"
                @on-show-modal-map="onShowModalMap" 
                :mapCountries="listCountries"
                @on-click="hidePopup">
            </create-map-point>
            <choose-on-map 
                @point="getPoint" 
                @dragPoint="changeCoord" 
                :coordinate="innerCoordinate" 
                :showChooseOnMap="!showChooseOnMapFlag" 
                @on-click="hidePopup"
                @addCoord="addCoord">
            </choose-on-map>
        </popup-wrap> -->
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop, Watch } from "vue-property-decorator";
    import 'vue-select/dist/vue-select.css';
    import PointCoordinates from "../../components/models/PointCoordinates"
    import CountriesGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"
    import PageResponse from "src/api/dataSource/api/PaginationHelper/Lib/PageResponse";
    import PointsList from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointGetListResponse"    
    import ModelMapPointRequest from "./models/ModelMapPointUpdate"
    import MapPointItem from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem";
    
    @Component
    export default class PageMapPointsComponent extends Vue {

        @Prop({ type: Array, default: (): CountriesGetListResponse[] => [] }) mapCountries: CountriesGetListResponse[]
        @Prop({ type: Array, default: (): CityGetListResponse[] => [] }) mapCities: CityGetListResponse[]

        showMenuFlag = false;
        showPopupFlag = false;
        showAddPointFlag = false;
        showChooseOnMapFlag = true

        newCurrentCountry: number = null
        newCurrentCity: number = null

        getSearch: string = ''

        listCountries: CountriesGetListResponse[] = []
        listCities: CityGetListResponse[] = null

        innerCoordinate: PointCoordinates = null
        pointList: PointsList = null
        point: any = null

        pointData: ModelMapPointRequest = null

        skip = 0;
        page: PageResponse = {
            Current: 0,
            Size: 10,
            Count: 0
        }

        @Watch('pointList') changePoint() {
            console.log(this.pointList.Items, 'points');
            
        }

        onPaginationChanged(value:{Page:number,CountOnPage:number}) {
            // value {Page: 2, CountOnPage: 10}
            this.page.Current=value.Page-1;
            this.skip = (value.Page-1) * value.CountOnPage;
            this.getListPoints()
        }

        getSearchResult(search: string) {
            this.getSearch = search
            // if (this.newCurrentCountry == 0 || this.newCurrentCity == 0) {
            //     this.getSearch = null
            // }
            // console.log('search', this.getSearch);
        }

        getPoint(point: PointCoordinates){
            this.innerCoordinate = point;
        }

        showMenu() {
            this.showMenuFlag = !this.showMenuFlag;
        }

        hidePopup() {
            this.showPopupFlag = false
            this.showAddPointFlag = false
            this.showChooseOnMapFlag = true
        }

        onShowModalMap() {
            this.showAddPointFlag = false
            this.showChooseOnMapFlag = true
        }

        showPopup() {
            this.showPopupFlag = !this.showPopupFlag
            this.showChooseOnMapFlag = !this.showChooseOnMapFlag
            this.showAddPointFlag = !this.showAddPointFlag
            // console.log("Работает");
        }

        addCoord() {
            this.showChooseOnMapFlag = !this.showChooseOnMapFlag
            this.showAddPointFlag = !this.showAddPointFlag
        }

        changeCoord(response: PointCoordinates) {
            this.innerCoordinate = response
        }


        getCurrentCountry(currentCountry: number) {
            this.newCurrentCountry = currentCountry
        }

        @Watch('newCurrentCountry') changeCountry() {
            this.getListCities()
            console.log('newCurrentCountry', this.newCurrentCountry);
        }

        getCurrentCity(currentCity: number) {
            this.newCurrentCity = currentCity
            // console.log('newCurrentCity', currentCity);
        }

        @Watch('newCurrentCity') changeCity() {
            // console.log('newCurrentCity', this.newCurrentCity);
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
            })
            this.$api.CityService.GetList({ 
                Search: '',
            })
        }

        getListPoints() {
            
            this.$api.MapPointService.GetListEvent.once((response) => {
                if (response.IsSuccess) {
                    
                } 
                this.pointList = response.Value
                this.page.Count = response.Value.Page.Count
            })
            this.$api.MapPointService.GetList({
                Page: {Skip:this.skip,Take:this.page.Size},
                Search: '',
                CityId: this.newCurrentCity,
                CountryId: this.newCurrentCountry,
                MapRouteId: null
            })
        }

        async deletePoint(id:number) {
            let indexPoint = this.pointList.Items.findIndex(item => item.Id == id)
            this.pointList.Items.splice(indexPoint, 1)

            let req = await this.$api.MapPointService.deleteAsync({Id: id})
        }

        async updatePoint(id: number) {
            this.point = this.pointList.Items.find(item => item.Id == id)
            // console.log(`id выбранной точки`, this.point.Name);
            
            this.$router.push({ name: 'page-update-map-point', params: { id: id.toString() } })
            this.$store.commit('addPoint', this.point)
            this.pointData = new ModelMapPointRequest(this.point.Id, this.point.Name, this.point.Description, this.point.PreviewUrl, this.point.CountryId, this.point.CityId)
        }

        created() {
            this.getListPoints()
            this.getListCountries()
            // console.log(this.pointList.Items, 'pointList');
        }

          
        
    }
</script>

<style lang="css" scoped>

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

</style>