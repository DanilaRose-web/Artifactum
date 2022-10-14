<template>    
    <layout>
        <div class="edit-route-wrap" >
            <h2 class="route-title">
                <img src="/assets/img/back-arrow.svg" alt="" @click="$router.back()">
                Редактирование маршрута</h2>

            <div class="popup-content-wrap" >
                <ui-input 
                    :placeholder="'Южный Тай'" 
                    :type="'text'" 
                    :id="'title'" 
                    :label="'Название маршрута'" 
                    :required="true"
                    :min-lenghth="5" 
                    :showError="true"
                    v-model="title"
                    :requiredLabel="true"
                />

                <ui-textarea 
                    :label="'Описание маршрута'"
                    v-model="description"
                    :placeholder="'Введите описание'"
                    :type="'text'" 
                />

                <div class="upload-image">
                    <div class="add-image">
                        <image-preview-modal v-if="imageUpload"
                            ref="crop" 
                            v-model="image" 
                            :one-image=true
                            :aspect-ratio=289/450 
                            :el-hight=105 @input="addImg" />
                        </div>
                    <div class="image" v-if="!imageUpload && routeItem && routeItem.PreviewUrl != null">
                        <img :src="routeItem.PreviewUrl" alt="">
                        <div class="close pointer" @click="removeResponseImage()">
                            <img src="/assets/img/del-img.svg" alt="">
                        </div>
                    </div>
                    <div class="flex-block">
                        <div>
                            
                            <div style="width:100%;" v-if="imageArray">
                                <div class="img m-2">
                                    <div class="close pointer" @click="removeInnerImage()">
                                        <img src="/assets/img/del-img.svg" alt="">
                                    </div>
                                    <crop-image-preview
                                        id="crop_preview"
                                        ref="croppreview"
                                        :el-height="150"
                                        :crop-params="imageArray.cropImg"
                                        :aspect-ratio="289 / 450">
                                    </crop-image-preview>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>                 

                <map-route-location
                    :mapCountries="listCountries"
                    :mapCities="listCities"
                    @changeCountry="getCurrentCountry"
                    :currentCountry="(routeData != null) ? routeData.CountryId : routeCreateData.CountryId"
                    @changeCity="getCurrentCity"
                    :currentCity="(routeData != null) ? routeData.CityId : routeCreateData.CityId"
                />

                <div class="select-wrap" v-if="routeData == null">
                    <label for="" class="select-label"><span class="required">*</span>Тип маршрута</label>
                    <ui-usable-dropdown :placeholder="'Тип маршрута'" :items="listTypes" :value="routeCreateData.Type" :nameFields="['type']" @onSelected="getCurrentType"></ui-usable-dropdown>
                </div>

                <div class="select-wrap" v-if="routeCreateData == null">
                    <label for="" class="select-label"><span class="required">*</span>Тип маршрута</label>
                    <ui-usable-dropdown  :placeholder="'Тип маршрута'" :items="listTypes" :value="routeData.Type" :nameFields="['type']" @onSelected="getCurrentType"></ui-usable-dropdown>
                </div>
<!-- 
                <dropdown-points
                    :mapPoints="pointList"
                    @selectedPoints="selectedPointsReq"
                    :selectedPointsResponse="selectedPointsResponse"
                    @selectedPontsRes="selectedPontsRes"
                    @on-click="showPopup"
                    @selectedPointsUpdate="getPointsUpdate"
                ></dropdown-points> -->


                <div class="radio-group">
                    <div class="form-item">
                        <label for="free" class="settings-form-radio-label">
                            <input
                                class="settings-form-radio-input"
                                type="radio"
                                id="free"
                                name="todo"
                                value="todo"
                                v-model="free"
                                @click="freeActive()"
                            />
                            <span class="settings-form-radio-title" >Бесплатный</span>
                        </label>
                    </div>


                    <div class="form-item" >
                        <label for="costed" class="settings-form-radio-label">
                            <input
                                class="settings-form-radio-input"
                                type="radio"
                                id="costed" 
                                name="todo"
                                value="todo"
                                v-model="sale"
                                checked
                                @click="saleActive()"
                            />
                            <span class="settings-form-radio-title" >Платный</span>
                        </label>
                    </div>

                    <ui-input 
                        v-if="costValue"
                        :placeholder="'Стоимость'" 
                        :type="'text'" 
                        :id="'cost'" 
                        :required="true"
                        v-model="price"
                        :showError="true"
                        :lightBg="true"
                        :noMargin="true"
                    />
                </div>

                <div class="title">
                    <span>Список точек</span>
                    <span class="add-point" @click="showPopup">Добавить точку</span>
                </div>
                <ui-table v-if="pointList" :Items="pointList.Items" :rowGap="1" :columnGap="1" :mb='true' w100 template-columns="100px 1.5fr 1fr 1fr 1fr 36px 36px">
                    <template slot="header">
                        <ui-table-header-item>#</ui-table-header-item>
                        <ui-table-header-item>Название точки</ui-table-header-item>
                        <ui-table-header-item>Широта</ui-table-header-item>
                        <ui-table-header-item>Долгота</ui-table-header-item>
                        <ui-table-header-item>Высота</ui-table-header-item>
                        <ui-table-header-item></ui-table-header-item>
                        <ui-table-header-item></ui-table-header-item>
                    </template>
                    

                    <template #body="data">
                        <ui-table-body-item >{{data.item.Id}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.Name}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.Coordinates.Longitude}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.Coordinates.Latitude}}</ui-table-body-item>
                        <ui-table-body-item >{{data.item.Height}}</ui-table-body-item>
                        <ui-table-body-item class="no-padding">
                            <img src="/assets/img/del.svg" alt="" >
                        </ui-table-body-item>
                        <ui-table-body-item class="no-padding">
                            <!-- <svg @click="updatePoint(data.item.Id)" width="12" height="12"><use xlink:href="/assets/img/svg-sprite.svg#map-route-edit-icon"></use></svg> -->
                            <img src="/assets/img/edit.svg" alt="" @click="currentPoint(data.item.Id)">
                        </ui-table-body-item>
                    </template>
                </ui-table>
              

                <ui-pagination :count="page.Count" :size="page.Size" ref="pagination" @onChange="onPaginationChanged($event)"></ui-pagination>

                <moderation-history 
                    :mapRouteId="mapRouteId"
                />
                
                <div class="error-message" v-if="showError">Заполните все поля со звездочками</div>
            </div>

            <div class="ui-submit-group-button justify-content-end">
                <ui-submit-button @click="isValid()">Добавить</ui-submit-button>
            </div>
        </div>

        <popup-wrap :visible="!showPopupFlag" @on-close-modal="hidePopup">
            <create-map-point 
                :point="innerCoordinate" 
                :showAddPoint="!showAddPointFlag" 
                @validSuccess="hidePopupValid"
                @on-show-modal-map="onShowModalMap"
                :mapCountries="listCountries"
                @on-click="hidePopup"
                :routeId="routeId">
            </create-map-point>
            <choose-on-map 
                @onGetCoord="getCoord"
                :pointCoord="innerPointCoord"
                :showChooseOnMap="!showChooseOnMapFlag" 
                @on-click="hidePopup"
                @updateCoord="updateCoord"
                @addCoord="addCoord">
            </choose-on-map>
        </popup-wrap>
        <!-- currentCity - добавить метод, который по умолчанию выводит  -->
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop, Watch } from 'vue-property-decorator'
    import ImagePreviewModel from "../../components/models/ImagePreviewModal"
    import SaveImageRequest from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest";
    import PointCoordinates from "@components/models/PointCoordinates";
    import MapPointGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointGetListResponse"
    import MapPointItem from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem"
    import ListViewItem from "list-view/src/listviewitem";
    import EqualMapPointItem from '../../components/models/EqualMapPointItem';
    import LoginRequest from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Users/LoginRequest";
    import EnumBizMapRouteType from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/EnumBizMapRouteType";
    import MapPointsIdsRequest from "../../components/models/MapPointsIdsRequest"
    import CountriesGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"
    import ModelSaveImageRequest from "../../components/models/ModelSaveImageRequest"
    import MapRouteTypeDrop from "../../components/models/MapRouteTypeDrop"
    import ModelMapRoutesEdit from "./models/ModelMapRouteEdit"
    import { filter } from "vue/types/umd";
    import MapRouteListItem from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRouteListItem";
    import EqualMapRouteType from "../../components/models/EqualMapRouteType"
    import MapPointShot from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapPointShot";
    import ModelCreateRouteRequest from "@components/models/ModelCreateRouteRequest";
    import MapRouteGetListResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRouteGetListResponse";
    import PointsList from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointGetListResponse"    
    import ModelMapPointRequest from "../map-points/models/ModelMapPointUpdate";
    import PageResponse from "src/api/dataSource/api/PaginationHelper/Lib/PageResponse";
    import MapRoutePointRelationShot from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRoutePointRelationShot";
    
    @Component({ name: 'create-map-route' })
    export default class PageUpdateMapRouteComponent extends Vue {

        @Prop({ type: Boolean, default: false}) showAddWay: boolean;
        @Prop({ type: Object, default: null }) point: PointCoordinates; // получение координат точки
        // @Prop({ type: Array, default: (): CountriesGetListResponse[] => [] }) mapCountries: CountriesGetListResponse[]
        // @Prop({ type: Array, default: (): CityGetListResponse[] => [] }) mapCities: CityGetListResponse[]
        // @Prop({ type: Number, default: 0 }) currentCountry: number
        // @Prop({ type: Number, default: 0 }) currentCity: number


        pointData: ModelMapPointRequest = null
        
        skip = 0;
        page: PageResponse = {
            Current: 0,
            Size: 10,
            Count: 0
        }

        flexBlock = true

        showPopupFlag = false;
        showAddPointFlag = false;
        showChooseOnMapFlag = true

        innerCoordinate: PointCoordinates = null

        routeType: EnumBizMapRouteType = null
        listTypes: MapRouteTypeDrop[] = [new MapRouteTypeDrop(0, 'Турист'), new MapRouteTypeDrop(1, 'Квест')]

        
        free: boolean = true
        sale: boolean = true
        costValue: boolean = true
        valid: boolean = false
        showError = false
        listRoutes: MapRouteGetListResponse = null
        routeItem: MapRouteListItem = null
        mapPoint: any = null
        
        title: string = ''
        description: string = ''
        price: string = ''

        routeData: MapRouteListItem = null
        routeCreateData: ModelCreateRouteRequest = null 
        routeId: number = null

        // картинки
        image: ImagePreviewModel = {Width: 0, Height: 0, Top: 0, Left: 0, ImageUrl: ''}
        item: SaveImageRequest;
        fileName: string = ''
        imageArray: {cropImg:ImagePreviewModel, fileName: string} = null
        imageUpload: boolean = false // удаление кнопки "Добавить фото" при добавленной картинки
        imagesCropArray: ModelSaveImageRequest

        newPointsList: MapPointGetListResponse = null
        newSelectedPoints: MapPointsIdsRequest[] = []
        newSelectedPointsRes: MapPointsIdsRequest[] = []
        listCities: CityGetListResponse[] = []
        listCountries: CountriesGetListResponse[] = []
        newCurrentCountry: number = null
        newCurrentCity: number = null
        currentCountryRoute: number = 1
        currentCityRoute: number = 1

        currentType: number = null
        pointList: MapPointGetListResponse = null;
        priceNumber: number = 0

        pointId: number = null
        pointNumber: number = null

        mapPointsUpdateRequest: MapRoutePointRelationShot[] = []
        mapRouteId: number = null
    

        selectedPointsResponse: MapPointShot[] = []

        // карта leaflet
        innerPointCoord: any = null
        pointCoordUpdate: any = null
        // pointInform: any = null

        @Watch('pointCoord') changeCoordinate() {
            this.innerPointCoord = this.pointCoordUpdate
            // console.log(this.innerPointCoord, 'this.pointCoord');
        }

        @Watch('listRoutes') changeList() {
            // console.log(this.listRoutes, 'маршруты');
        }

        @Watch('routeItem') changeRouteItems() {
            // console.log(this.routeItem, 'routeItem')
        }

        @Watch('routeCreateData.CountryId') changeRouteItem() {
            this.getListCities()
        }

        @Watch('routeCreateData') changeRoute() {
            // console.log(this.routeCreateData, 'routeCreateData'); 
        }
        beforeCreate() {
            this.routeData = this.$store.getters.returnRoute
            this.routeCreateData = this.$store.getters.returnRouteCreate
            if (this.routeData == null && this.routeCreateData == null) {
                this.$router.push({ name: 'page-map-routes' })
            }
            console.log(this.routeCreateData, 'routeCreateData beforeCreate');
            console.log(this.routeData, 'routeData beforeCreate');
            
        }
        created() {
            this.getListPoints()
            this.getListCountries()
            this.getListRoutes()
            this.routeData = this.$store.getters.returnRoute
            this.routeCreateData = this.$store.getters.returnRouteCreate
            this.mapRouteId = Number(this.$route.params.id)
        }


        mounted() {
            
            // this.pointList.Items.sort((a, b) => (a > b) ? 1 : 0)

            this.routeId = Number(this.$route.params.id)
            console.log(this.routeCreateData, 'this.routeCreateData');
            console.log(this.routeData, 'this.routeData');
            this.priceNumber = Number(this.price)

            if (this.routeData == null) {
                this.selectedPointsResponse == null
            }
            if (this.routeCreateData == null) {
                this.selectedPointsResponse = this.routeData.MapPoints
            }

            if (this.routeCreateData == null) {
                this.title = this.routeData.Title
                this.description = this.routeData.Description
                this.price = this.routeData.Price.toString()
            } 
            if (this.routeData == null) {
                this.title = this.routeCreateData.Title
                // console.log(this.title, 'Title');
                this.description = this.routeCreateData.Description
                this.price = this.routeCreateData.Price.toString()
            }

            var free = document.querySelector('#free');
            var cost = document.querySelector('#costed');
            var input = document.querySelector('.popup-input');

            free.addEventListener('click', function() {
                cost.removeAttribute('checked')
                
            })
            cost.addEventListener('click', function() {
                cost.setAttribute('checked', 'checked')
                // input.classList.remove('hide')
                free.removeAttribute('checked')
            })
        }

        getCoord(innerPointCor: any) { // получение координат при клике
        }

        updateCoord(innerPointCorUpdate: any) {
            this.pointCoordUpdate = innerPointCorUpdate
            this.pointCoordUpdate
            // console.log(this.pointCoordUpdate, 'this.pointCoordinateUpdate');
        }

        // onPaginationChanged(value:{Page:number,CountOnPage:number}) {
        //     // value {Page: 2, CountOnPage: 10}
        //     this.pageMapRoutes.Current=value.Page-1;
        //     this.skipRoutes = (value.Page-1) * value.CountOnPage;
        //     this.getListPoints()
        // }

        onPaginationChanged(value:{Page: number,CountOnPage: number}) {
            // value {Page: 2, CountOnPage: 10}
            this.page.Current = value.Page-1;
            this.skip = (value.Page-1) * value.CountOnPage;
            this.getListPoints()
        }

        hidePopup() {
            this.showPopupFlag = false
            this.showAddPointFlag = false
            this.showChooseOnMapFlag = true
        }

        hidePopupValid() {
            this.showPopupFlag = false
            this.showAddPointFlag = false
            this.showChooseOnMapFlag = true
            this.getListPoints()
        }

        onShowModalMap() {
            this.showAddPointFlag = false
            this.showChooseOnMapFlag = true
        }

        showPopup() {
            this.showPopupFlag = !this.showPopupFlag
            this.showChooseOnMapFlag = !this.showChooseOnMapFlag
            this.showAddPointFlag = !this.showAddPointFlag
            console.log("Работает");
        }

        addCoord(innerPointCor: any) {
            // this.innerPointCoord = innerPointCor
            // console.log(this.innerPointCoord, 'this.innerPointCoord'); 
            this.showChooseOnMapFlag = !this.showChooseOnMapFlag
            this.showAddPointFlag = !this.showAddPointFlag
        }

        changeCoord(response: PointCoordinates) {
            this.innerCoordinate = response
        }

        getPoint(point: PointCoordinates){
            this.innerCoordinate = point;
        }

        @Watch('routeData') changePoints() { }

        @Watch('price') changePrice() {
            console.log(this.price);
        }
        @Watch('routeCreateData') changeRouteCreateData() {
            this.title = this.routeCreateData.Title
            console.log(this.title, 'Title');
        }

        async getListPoints() {
            const res = await this.$api.MapPointService.getListAsync({
                MapRouteId: Number(this.$route.params.id),
                Page: {Skip:this.skip,Take:this.page.Size},
                // Page: {Skip: null,Take: null},
                Search: '',
                CityId: this.newCurrentCity,
                CountryId: this.newCurrentCountry,
            });
            if (res) {
                this.pointList = res;
                this.page.Count = res.Page.Count
                console.log(`this.pointList`, this.pointList);
            }
        }

        async getListRoutes() {
            const resRoutes = await this.$api.MapRouteService.getListAsync({Search: ''})
            if (resRoutes) {
                this.listRoutes = resRoutes
                this.routeItem = this.listRoutes.Items.find(item => item.Id.toString() == this.$route.params.id)
            }

        }


        getCurrentType(value: number) {
            this.currentType = value
            // console.log('current-type', this.currentType);  
        }

        freeActive() {
            if (this.free) {
                this.sale = false
                this.free = true
                this.costValue = false
                this.price = null
            }
        }

        saleActive() {
            if (this.sale) { 
                this.free = false
                this.sale = true
                this.costValue = true
                this.price = ''
            }
            
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
            this.$api.CityService.GetList({ CountryId: this.routeCreateData.CountryId })
        }

        
 
        getCurrentCountry(innerCurrentCountry: number) {
            if (this.routeData == null) {
                this.routeCreateData.CountryId = innerCurrentCountry
            }
            if (this.routeCreateData == null) {
                this.routeData.CountryId = innerCurrentCountry
            }
            
            // console.log('innerCurrentCountry', this.routeData.CountryId);
        }

        getCurrentCity(innerCurrentCity: number) {
            if (this.routeData == null) {
                this.routeCreateData.CityId = innerCurrentCity
            }
            if (this.routeCreateData == null) {
                this.routeData.CityId = innerCurrentCity
            }
        }

        getCurrentCountryRoute() {
            if (this.routeData == null) {
                this.currentCountryRoute = this.routeCreateData.CountryId
                this.currentCityRoute = this.routeCreateData.CityId
            }
            if (this.routeCreateData == null) {
                this.currentCountryRoute = this.routeData.CountryId
                this.currentCityRoute = this.routeData.CityId
            }
        }
        
        selectedPointsReq(requestSelectedPoints: MapPointsIdsRequest[]) {
            this.newSelectedPoints = requestSelectedPoints
            console.log('newSelectedPoints', this.newSelectedPoints);

            // console.log(this.routeData.MapPoints, 'точки из хранилища');
        }

        selectedPontsRes(reqSelectedPointsRes: MapPointsIdsRequest[]) {
            this.newSelectedPointsRes = reqSelectedPointsRes
            // console.log('this.newSelectedPointsRes', this.newSelectedPointsRes);
            
        }
                
 
        // добавление картинеи в массив 
        addImg(image: ImagePreviewModel, fileName:string) {
            this.imageUpload = false
            this.imageArray = {cropImg: image, fileName: fileName}
            // console.log(`imageArray`, this.imageArray);
        }

        // удаление выбранной картинки
        removeInnerImage() {
            this.imageUpload = true // добавление конпки "Добавить Фото", после того, как картинка была удалена
            this.imageArray = null // key - уникальный параметр картинки. splice(кликнутый элемент, сколько элементов удалить)
            this.image.ImageUrl = null
        }

        removeResponseImage() {
            this.routeItem.PreviewUrl = null
            this.imageUpload = true
        }

        async deletePoint(id:number) {
            let indexPoint = this.pointList.Items.findIndex(item => item.Id == id)
            this.pointList.Items.splice(indexPoint, 1)

            let req = await this.$api.MapPointService.deleteAsync({Id: id})
        }

        async currentPoint(id: number) {
            this.mapPoint = this.pointList.Items.find(item => item.Id == id)
            // console.log(`id выбранной точки`, this.point.Name);
            
            this.$router.push({ name: 'page-update-map-point', params: { id: id.toString() } })
            this.$store.commit('addPoint', this.mapPoint)

            // this.pointData = new ModelMapPointRequest(this.mapPoint.Id, this.mapPoint.Name, this.mapPoint.Description, this.mapPoint.PreviewUrl, this.mapPoint.Coordinates)
        }

        getPointsUpdate(mapPointsUpdateReq: MapRoutePointRelationShot[]) {
            this.mapPointsUpdateRequest = mapPointsUpdateReq
            this.mapPointsUpdateRequest.forEach(point => {
            })
            console.log(this.mapPointsUpdateRequest, 'mapPointsUpdateRequest');
        }

        async MapRoutePointRelatioUpdate() {
            console.log(this.routeId, 'routeId');
            console.log(this.mapPointsUpdateRequest, 'mapPointsUpdateRequest');
            
            try {
                let res = await this.$api.MapRouteService.updateMapRoutePointRelationAsync({
                    MapPointsRelation: this.mapPointsUpdateRequest,
                    MapRouteId: this.routeId
                })
            } catch {
            }
        }

        async updateMapRoute() {
            //    console.log(this.routeItem.PreviewUrl, 'PreviewUrl');
               if (this.routeData == null) {
                   if (this.routeItem.PreviewUrl == null) {
                    this.imagesCropArray = new ModelSaveImageRequest( this.imageArray.cropImg.ImageUrl, this.imageArray.fileName,  { X: this.imageArray.cropImg.Left, Y:this.imageArray.cropImg.Top, Width:this.imageArray.cropImg.Width, Height:this.imageArray.cropImg.Height } );
                    
                    let request1 = await this.$api.MapRouteService.updateAsync({ 
                        Id: Number(this.$route.params.id),
                        CountryId: this.routeCreateData.CountryId,
                        CityId: this.routeCreateData.CityId, 
                        PreviewImage: this.imagesCropArray,
                        Type: this.currentType, 
                        Title: this.title,
                        Description: this.description,
                        Price: Number(this.price),
                     })
                     this.MapRoutePointRelatioUpdate()              
                    this.$router.push({ name: 'page-map-routes' })
                }
               
                else {
                    let request = await this.$api.MapRouteService.updateAsync({ 
                        Id: Number(this.$route.params.id),
                        CountryId: this.routeCreateData.CountryId,
                        CityId: this.routeCreateData.CityId, 
                        PreviewImage: null,
                        Type: this.currentType, 
                        Title: this.title,
                        Description: this.description,
                        Price: Number(this.price),
                    })
                    this.MapRoutePointRelatioUpdate()   
                    this.$router.push({ name: 'page-map-routes' })
                } 
               }

               if (this.routeCreateData == null) {
                   if (this.routeItem.PreviewUrl == null) {
                    this.imagesCropArray = new ModelSaveImageRequest( this.imageArray.cropImg.ImageUrl, this.imageArray.fileName,  { X: this.imageArray.cropImg.Left, Y:this.imageArray.cropImg.Top, Width:this.imageArray.cropImg.Width, Height:this.imageArray.cropImg.Height } );
                    
                    let request1 = await this.$api.MapRouteService.updateAsync({ 
                        Id: Number(this.$route.params.id),
                        CountryId: this.routeData.CountryId,
                        CityId: this.routeData.CityId, 
                        PreviewImage: this.imagesCropArray,
                        Type: this.currentType, 
                        Title: this.title,
                        Description: this.description,
                        Price: Number(this.price),
                     })                   
                     this.MapRoutePointRelatioUpdate()   
                    this.$router.push({ name: 'page-map-routes' })
                    
                    
                }

               
                else {
                    let request = await this.$api.MapRouteService.updateAsync({ 
                        Id: Number(this.$route.params.id),
                        CountryId: this.routeData.CountryId,
                        CityId: this.routeData.CityId, 
                        PreviewImage: null,
                        Type: this.currentType, 
                        Title: this.title,
                        Description: this.description,
                        Price: Number(this.price),
                    })
                    this.MapRoutePointRelatioUpdate()   
                    this.$router.push({ name: 'page-map-routes' })

                    
                } 

               }
        }

        isValid() {
            if (this.title == '' || this.price.toString() == '') {
                this.valid = false
                this.showError = true
                console.log("не отправилось");
                return
            } else if (this.imagesCropArray == null || this.imagesCropArray != null) {
                this.valid = true
                this.showError = false
                this.updateMapRoute()
                this.moderationMapRoute()
                this.routeCreateData = null
                this.routeData = null
                console.log("отправилось");
            } else {
                this.valid = true
                this.showError = false
                this.updateMapRoute()
                this.moderationMapRoute()
                this.routeCreateData = null
                this.routeData = null
                console.log("отправилось");
            }
        }

        async moderationMapRoute() {
            try {
                let response = await this.$api.MapRouteService.moderationMapRouteAsync({MapRouteId: this.routeId})
            } catch {}
        }
    }
    
</script>

<style lang="less" scoped>

.no-padding {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.no-padding img, .no-padding svg {
    cursor: pointer;
    width: 13px;
    height: 13px;
}

.title {
    margin-bottom: 20px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.add-point {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #5D58B7;
    cursor: pointer;
    position: relative;
    text-decoration: none;
}


// .add-point::after {
//     content: '';
//     position: absolute;
//     bottom: -2px;
//     left: 0;
//     width: 100%;
//     height: 1px;
//     background:#5D58B7;
//     z-index: 0;
//     transition: all 0.2s ease;
// }

// .add-point:hover::after {
//     width: 0;
// }

.image {
    margin: 5px 0 15px 0;
    max-width: 96.33px;
    position: relative;
    z-index: 1;
}

.image img {
    max-width: 100%;
    height: 150px;
}

.route-title {
    display: flex;
    align-items: center;
}

.route-title img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    cursor: pointer;
}

.required {
    color: red;
    font-size: 20px;
}

.error-message {
    padding: 3px;
    border: 1px solid red;
    min-height: 20px;
    line-height: 20px;
    text-align: center;
    color: red;
    font-size: 15px;
    font-weight: 500;
}

.add-way {
    width: 100%;
}

.modal-content {
    padding: 0 24px 27px 24px;
    width: 100%;
}

.select-wrap {
    margin-bottom: 14px;
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
}

.popup-content-wrap {
    margin-bottom: 24px;
    padding-bottom: 26px;
    border-bottom: 1px solid #CED4DE;
}

.radio-group {
    margin-top: 25px;
    display: flex;
    align-items: center;
    position: relative;
    min-height: 35px;
}

.form-item {
    margin-top: -15px;
}

.control-input.light-bg input.has-error {
  border: 1px solid @uiInputErrorBorderColor;
}

.settings-form-radio-label {
    display: flex;
    margin-bottom: 4px;
    cursor: pointer;
}

.settings-form-radio-label {
    margin-right: 15px;
}

.settings-form-radio-input {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    /* display: none; */
}
.settings-form-radio-label .settings-form-radio-input:checked + .settings-form-radio-title:before  {
    box-shadow: inset 0 0 0 3px #fff;
    border: 1px solid #CED4DE;
}

.settings-form-radio-label .settings-form-radio-input[checked] + .settings-form-radio-title:before {
    box-shadow: inset 0 0 0 3px #fff;
    border: 1px solid #CED4DE;
}
  

.settings-form-radio-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #162147;
    display: flex;
}
.settings-form-radio-title:before {
    display: flex;
    content: "";
    background-color: #5D58B7;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 6px;
    transition: 0.25s;
    box-shadow: inset 0 0 0 10px #fff;
    border: 1px solid #CED4DE;
}

.add-way {
    .ui-dropdown {
        .my-class {
            .ui-select {
                min-height: 35px;
            }
        }
    }
}

.ui-submit-group-button {
    display: flex;
    align-items: center;
}

.upload-image .add-image > div {
    display: inline-block;
    text-align: center;
    width: 100%;
}

.m-2 {
    position: relative;
}

.close {
    position: absolute;
    top: 5px;
    right: 5px;
    background: white;
    width: 19px;
    height: 19px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.close img {
    width: 10px;
    height: auto;
}

.light-bg input {
    background: #D7DEE9;
}

.flex-block {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}

.route-title {
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 22px;
    line-height: 21px;
    color: #162147;
}

.edit-route-wrap {
    margin-top: 29px;
    padding: 26px;
    background: white;
    max-width: 1200px;
}

@media all and (max-width: 500px) {
    .radio-group {
        flex-wrap: wrap;
        justify-content: space-between;
    }
}

@media all and (max-width: 380px) {
    .modal-content { padding: 0 10px 27px 10px; }
}


</style>