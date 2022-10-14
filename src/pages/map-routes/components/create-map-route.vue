<template>    
    <div class="add-way" v-if="!showAddWay">
        <popup-title :title="'Добавить маршрут'">
            <close-popup @on-click="$emit('on-click')"/>
        </popup-title>

        <div class="modal-content">
            <div class="popup-content-wrap">
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
                        <image-preview-modal v-if="!imageUpload"
                            ref="crop" 
                            v-model="image" 
                            :one-image=true
                            :aspect-ratio=80/80 
                            :el-hight=80 @input="addImg" />
                        </div>

                    <div class="flex-block">
                        <div>
                            <div style="width:100%;" v-if="imageArray">
                                <div class="img m-2">
                                    <div class="close pointer" @click="removeInnerImage()">
                                        <img src="assets/img/del-img.svg" alt="">
                                    </div>
                                    <crop-image-preview
                                        id="crop_preview"
                                        ref="croppreview"
                                        :el-height="150"
                                        :crop-params="imageArray.cropImg"
                                        :aspect-ratio="80 / 80">
                                    </crop-image-preview>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>                 

                <map-route-location 
                    :mapCountries="mapCountries"
                    @changeCountry="getCurrentCountry"
                    @changeCity="getCurrentCity"
                />

                <div class="select-wrap">
                    <label for="" class="select-label"><span class="required">*</span>Тип маршрута</label>
                    <ui-usable-dropdown :placeholder="'Тип маршрута'" :items="routeType" :value="0" :nameFields="['type']" @onSelected="getCurrentType"></ui-usable-dropdown>
                </div>

                <!-- <dropdown-points 
                    :mapPoints="mapPoints"
                    @selectedPoints="selectedPointsReq"
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
                        v-model="cost"
                        :showError="true"
                        :lightBg="true"
                        :noMargin="true"
                    />
                </div>

                <div class="error-message" v-if="showError">Заполните все поля со звездочками</div>
            </div>

            <div class="ui-submit-group-button justify-content-end">
                <ui-submit-button @click="isValid()">Добавить</ui-submit-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop, Watch } from 'vue-property-decorator'
    import ImagePreviewModel from "./../../../components/models/ImagePreviewModal"
    import SaveImageRequest from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest";
    import PointCoordinates from "@components/models/PointCoordinates";
    import MapPointGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointGetListResponse"
    import MapPointItem from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem"
    import ListViewItem from "list-view/src/listviewitem";
    import EqualMapPointItem from './../../../components/models/EqualMapPointItem';
    import LoginRequest from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Users/LoginRequest";
    import EnumMapRouteType from "../../../api/dataSource/api/Artifactum/Entities/Enums/EnumMapRouteType";
    import MapPointsIdsRequest from "../../../components/models/MapPointsIdsRequest"
    import CountriesGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"
    import ModelCreateRouteRequest from "../../../components/models/ModelCreateRouteRequest"
    import ModelSaveImageRequest from "../../../components/models/ModelSaveImageRequest"
    import MapRouteTypeDrop from "../../../components/models/MapRouteTypeDrop"
    import MapRouteListItem from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRouteListItem";
    import MapRouteGetListResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRouteGetListResponse";

    @Component({ name: 'create-map-route' })
    export default class CreateMapRouteComponent extends Vue {

        @Prop({ type: Boolean, default: false}) showAddWay: boolean;
        @Prop({ type: Object, default: null }) point: PointCoordinates; // получение координат точки
        @Prop({ type: Object, default: null }) mapPoints: MapPointGetListResponse;
        @Prop({ type: Array, default: (): CountriesGetListResponse[] => [] }) mapCountries: CountriesGetListResponse[]
        @Prop({ type: Object, default: null }) listRoutes: MapRouteGetListResponse;

        flexBlock = true

        // routeType: EnumMapRouteType = null
        routeType: MapRouteTypeDrop[] = [new MapRouteTypeDrop(0, 'Турист'), new MapRouteTypeDrop(1, 'Квест')]

        free: boolean = true
        sale: boolean = true
        costValue: boolean = true
        valid: boolean = false
        showError = false
        
        title: string = ''
        description: string = ''
        cost: string = ''

        // картинки
        image: ImagePreviewModel = null
        item: SaveImageRequest;
        fileName: string = ''
        imageArray: {cropImg:ImagePreviewModel, fileName: string} = null
        imageUpload: boolean = false // удаление кнопки "Добавить фото" при добавленной картинки
        imagesCropArray: ModelSaveImageRequest
        route: ModelCreateRouteRequest = null

        routeData: MapRouteListItem = null

        listRoutesItems: MapRouteGetListResponse = null

        newPointsList: MapPointGetListResponse = null
        newSelectedPoints: MapPointsIdsRequest[] = []
        
        listCities: CityGetListResponse[] = []
        newCurrentCountry: number = null
        newCurrentCity: number = null

        currentType: number = null

        @Watch('listRoutes') changeListRoutes() {
            this.listRoutesItems = this.listRoutes
            // console.log(this.listRoutesItems, 'listRoutes');
        }

        created() {
            this.listRoutesItems = this.listRoutes
            // console.log(this.listRoutesItems, 'listRoutes');
            this.routeData = this.$store.getters.returnRoute
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
                this.cost = null
                // console.log(`Бесплатный`, this.cost);
            }
          
        }

        saleActive() {
            if (this.sale) {
                this.free = false
                this.sale = true
                this.costValue = true
                this.cost = ''
                // console.log(`Платный`, this.cost);
            }
           
        }

        getCurrentCountry(innerCurrentCountry: number) {
            this.newCurrentCountry = innerCurrentCountry
            // console.log('innerCurrentCountry', innerCurrentCountry);
        }

        getCurrentCity(innerCurrentCity: number) {
            this.newCurrentCity = innerCurrentCity
            // console.log('newCurrentCity', this.newCurrentCity);
        }
        
        selectedPointsReq(requestSelectedPoints: MapPointsIdsRequest[]) {
            this.newSelectedPoints = requestSelectedPoints
            // console.log('newSelectedPoints', this.newSelectedPoints);
        }
                
 
        // добавление картинки в массив 
        addImg(image: ImagePreviewModel, fileName:string) {
            this.imageUpload = true
            this.imageArray = {cropImg: image, fileName: fileName}
            // console.log(fileName, 'fileName');
        }

        // удаление выбранной картинки
        removeInnerImage() {
            this.imageUpload = false // добавление конпки "Добавить Фото", после того, как картинка была удалена
            this.imageArray = null // key - уникальный параметр картинки. splice(кликнутый элемент, сколько элементов удалить)
        }

      
        @Watch('route') changeRoute() {
            // console.log(this.route, 'changeRoute');
        }

        async routeCreate() { 
            // console.log(`requestSelectedPoints`, this.requestSelectedPoints);

            /* SaveImageRequest - модель картинки, которую нужно отправить на серевер 
                imagesCropArray - создаем новый массив, в котором и будут находиться картинки, отправляемые на сервер,
                из массива imageArray (уже с картинками) формируем массив с теми параметрами, которые обозначены в модели SaveImageRequest и отправляем на сервер
            */
            

            this.imagesCropArray = new ModelSaveImageRequest( this.imageArray.cropImg.ImageUrl, this.imageArray.fileName,  { X: this.imageArray.cropImg.Left, Y:this.imageArray.cropImg.Top, Width:this.imageArray.cropImg.Width, Height:this.imageArray.cropImg.Height } );
            // console.log(`imagesCropArray`, this.imagesCropArray);
            
            try {
                let response = await this.$api.MapRouteService.createAsync({
                    Title: this.title,
                    Description: this.description,
                    PreviewUrl: this.imageArray.cropImg.ImageUrl,
                    CountryId: this.newCurrentCountry,
                    CityId: this.newCurrentCity, 
                    Price: Number(this.cost),
                    PreviewImage: this.imagesCropArray,
                    // MapPointsIds: this.newSelectedPoints,
                    Type: this.currentType
                })

                this.route = new ModelCreateRouteRequest(
                    this.title, 
                    this.description,
                    this.imageArray.cropImg.ImageUrl,
                    this.newCurrentCountry,
                    this.newCurrentCity,
                    Number(this.cost),
                    this.imagesCropArray,
                    this.newSelectedPoints,
                    this.currentType,
                    response
                )
                
                // console.log(response, 'response');

                // this.$store.commit("addRoute", this.route)
                this.$store.commit('addRouteCreate', this.route)
                this.$store.commit('addRoute', null)
                // console.log(this.routeData, 'routeData in Create Reoute');
                
                
                this.$router.push({ name: 'page-edit-map-routes', params: { id: response.toString() } }) 
            } catch {
            } finally {}
        }
    
        mounted() {
            var free = document.querySelector('#free');
            var cost = document.querySelector('#costed');
            var input = document.querySelector('.popup-input');

            free.addEventListener('click', function() {
                cost.removeAttribute('checked')
                // input.classList.add('hide')
            })
            cost.addEventListener('click', function() {
                cost.setAttribute('checked', 'checked')
                // input.classList.remove('hide')
                free.removeAttribute('checked')
            })
        }

        isValid() {
            if (this.title == '' || this.cost == '' || this.newCurrentCountry == null || this.newCurrentCity == null ) {
                this.valid = false
                this.showError = true
                // console.log("не отправилось");
                return
            } else if (this.imagesCropArray == null || this.imagesCropArray != null) {
                this.valid = true
                this.showError = false
                this.routeCreate()
                this.routeData = null
                // console.log("отправилось");
                // this.$emit('validSuccess')
                // this.$router.push({ name: 'page-edit-map-routes', params: { id: id.toString() } }) 
            } else {
                this.valid = true
                this.showError = false
                this.routeCreate()
                // console.log("отправилось");
                this.routeData = null
                // this.$emit('validSuccess')
                this.$router.push({ name: 'page-edit-map-route' })
            }
        }
    }
    
</script>

<style lang="less" scoped>

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

.light-bg input {
    background: #D7DEE9;
}

.flex-block {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
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