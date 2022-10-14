<template>    
    <layout>
        <div class="edit-route-wrap" >
            <h2 class="route-title">
                <img src="/assets/img/back-arrow.svg" alt="" @click="$router.back()">
                Редактирование точки</h2>

            <div class="popup-content-wrap">
                <ui-input 
                    :placeholder="'Южный Тай'" 
                    :type="'text'" 
                    :id="'title'" 
                    :label="'Название точки'" 
                    :required="true"
                    :min-lenghth="5" 
                    :showError="true"
                    v-model="title"
                    :requiredLabel="true"
                />

                <ui-textarea 
                    :label="'Описание маршрута'"
                    v-model="description"
                    :placeholder="'Введите точки'"
                    :type="'text'" 
                />
       
                <div class="upload-image">
                    <div class="add-image">
                        <image-preview-modal
                            ref="crop" 
                            v-model="image" 
                            :one-image=true
                            :aspect-ratio=289/450 
                            :el-hight=105 @input="addImg"
                            />
                        </div>
                    
                    <div class="row-image-array" v-if="pointData.Images">
                       
                        <div class="col-img" v-for="(item, key) in pointData.Images" :key="key">
                            <div class="image">
                                <img :src="item.PreviewlUrl" alt="">
                                <div class="close pointer" @click="removeResponseImage(item.Id,key)">
                                    <img src="/assets/img/del-img.svg" alt="">
                                </div>
                            </div>
                        </div>
                    
                        <div
                            v-for="(image, key) in imageArray"
                            :key="key"
                            col-auto>
                            <div style="width:100%;">
                                <div class="img m-2">
                                    <div class="close pointer" @click="removeInnerImage(key)">
                                        <img src="/assets/img/del-img.svg" alt="">
                                    </div>
                                    <crop-image-preview
                                        id="crop_preview"
                                        ref="croppreview"
                                        :el-height="150"
                                        :crop-params="image.cropImg"
                                        :aspect-ratio="289 / 450">
                                    </crop-image-preview>
                                </div>
                            </div> 
                        </div>
                        
                    </div>
                </div>             
                   
                <!-- <map-route-location 
                    :mapCountries="listCountries"
                    @changeCountry="getCurrentCountry"
                    @changeCity="getCurrentCity"
                    :currentCountry="pointData.CountryId"
                    :currentCity="pointData.CityId"
                />    -->

                <div class="block-title"><span class="required">*</span>Координаты</div>
                <div v-if="innerpointCoordStore || pointData"> 
                    <div class="point-item" >
                        <div class="point-img"><img src="/assets/img/warn.svg" alt=""></div>
                        <div class="coordinate" >  
                            <span>Долгота: {{ innerpointCoordStore ? innerpointCoordStore.lng : pointData.Coordinates.Longitude }}</span>
                        </div>
                    </div>

                    <div class="point-item">
                        <div class="point-img" ><img src="/assets/img/warn.svg" alt=""></div>
                        <div class="coordinate">  
                            <span>Широта: {{ innerpointCoordStore ? innerpointCoordStore.lat : pointData.Coordinates.Latitude }}</span>
                        </div>
                    </div>
                </div>
                
                <choose-on-map-link @on-show-modal-map="showPopup"></choose-on-map-link>

                <ui-input style="display: none"
                    :label="'Высота точки (м)'"
                    :placeholder="'2000'" 
                    :type="'text'" 
                    :id="'height'" 
                    :required="true"
                    v-model="height"
                    :showError="true"
                    :requiredLabel="true"
                />

                <div class="error-message" v-if="showError">Заполните все поля со звездочками</div>
            </div>

            <div class="ui-submit-group-button justify-content-end">
                <ui-submit-button @click="isValid()">Добавить</ui-submit-button>
            </div>
        </div>

        <popup-wrap :visible="!showPopupFlag" @on-close-modal="hidePopup">
            <choose-on-map 
                @point="getPoint" 
                @dragPoint="changeCoord" 
                :coordinate="innerCoordinate" 
                :showChooseOnMap="showChooseOnMapFlag" 
                @on-click="hidePopup"
                @addCoord="addCoord"
                :point="innerCoordinate">
            </choose-on-map>
        </popup-wrap>
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop, Watch } from 'vue-property-decorator'
    import CountriesDrop from "../../components/models/CountriesDrop";
    import CityDrop from "../../components/models/CityDrop";
    import PointsDrop from "../../components/models/PointsDrop";
    import ImagePreviewModel from "../../components/models/ImagePreviewModal"
    import SaveImageRequest from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest";
    import PointCoordinates from "../../components/models/PointCoordinates"
    import CountriesGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"
    import ModelSaveImageRequest from "@components/models/ModelSaveImageRequest";
    import MapPointItem from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointItem";
    import Position from "@components/ui-maps/position";
    import MapPointAddImageResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointAddImageResponse";
import MapPointCoordinates from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointCoordinates";
    


    @Component({ name: 'create-map-route' })
    export default class PageUpdateMapPointComponent extends Vue {

        @Prop({ type: Boolean, default: false}) showAddWay: boolean;
        @Prop({ type: Object, default: null }) point: PointCoordinates; // получение координат точки
        @Prop({ type: Array, default: (): CountriesGetListResponse[] => [] }) mapCountries: CountriesGetListResponse[]

        title: string = ''
        description: string = ''
        height: string = ''
        imageUpload = true

        valid: boolean = false
        showError: boolean = false

        newCurrentCountry: number = null
        newCurrentCity: number = null
        showPopupFlag = false;
        // showAddPointFlag = false;
        showChooseOnMapFlag = true
        innerCoordinate: PointCoordinates = null

        pointData: MapPointItem = null
        pointRequestImages: MapPointAddImageResponse = null

        // Получение координат точки
        innerCoord:PointCoordinates = null
        innerpointCoordStore: Position = null


        @Watch('innerCoordinate') changeCoordinate() {
            // this.pointData.Coordinates.Longitude = this.innerCoordinate.lng
            // this.pointData.Coordinates.Latitude = this.innerCoordinate.lat
        }

        @Watch('pointRequestImages') changeImages() {
            console.log(`this.pointRequestImages`, this.pointRequestImages);
        }

        created() {
            // this.getListCountries()
            this.innerCoord = this.point;
            this.pointData = this.$store.getters.returnMapPoint
            this.height = this.pointData.Height.toString()
            this.title = this.pointData.Name
            this.description = this.pointData.Description
            console.log(this.pointData, 'pointData');
        }

        updated() {
            this.innerpointCoordStore = this.$store.getters.returnPointCoord
            
            console.log('this.innerpointCoordStore', this.innerpointCoordStore);
        }

        @Watch('coordinate') onChangeCoord(){
            // console.log('watch coordinate:',this.point);
            this.innerCoord = this.point;
        }

        hidePopup() {
            this.showPopupFlag = false
            this.showChooseOnMapFlag = true
        }

        showPopup() {
            this.showPopupFlag = !this.showPopupFlag
            this.showChooseOnMapFlag = !this.showChooseOnMapFlag
        }

        // // Получение стран
        // listCountries: CountriesGetListResponse[] = []
        // getCurrentCountry(innerCurrentCountry: number) {
        //     this.pointData.CountryId = innerCurrentCountry
        //     // console.log('newCurrentCountry', currentCountry);
        // }

        // getCurrentCity(innerCurrentCity: number) {
        //     this.pointData.CityId = innerCurrentCity
        //     // console.log('newCurrentCity', currentCity);
        // }

        getPoint(point: PointCoordinates){
            this.innerCoordinate = point;

        }

        addCoord(innerPointCor: PointCoordinates) {
            this.innerCoordinate = innerPointCor
            this.showPopupFlag = !this.showPopupFlag;
            this.showChooseOnMapFlag = !this.showChooseOnMapFlag
            console.log(this.innerCoordinate, 'innerCoordinate');
       }

        changeCoord(response: PointCoordinates) {
            this.innerCoordinate = response
        }

        // Получение городов
        listCities: CityGetListResponse[] = []
        currentCity: number = null
        

        mounted() {
        }

        // Добавление / удаление изображения
        fileName:string="";
        addImg(image: ImagePreviewModel,fileName:string) {
            this.imageArray.push({cropImg:image, fileName:fileName})
        }

        removeInnerImage(key: number) {
            this.imageArray.splice(key, 1) // key - уникальный параметр картинки. splice(кликнутый элемент, сколько элементов удалить)
        }

        async removeResponseImage(id: number,idAr:number) {
            // this.pointData.Images.forEach(image => {
            //     image.Id = key
            // })
            this.pointData.Images.splice(idAr, 1) // key - уникальный параметр картинки. splice(кликнутый элемент, сколько элементов удалить)
            await this.$api.MapPointService.deleteImageAsync(id)
        }

        getBase64(target:string):string {
            return target.substring(target.indexOf('base64')+7)
        }

        // getListCountries() {   
        //     this.$api.CountryService.GetListEvent.once((response) => {
        //         if (response.IsSuccess) {} 
        //         else {}
        //         this.listCountries = response.Value
        //         this.listCountries.unshift({Id: null, Name: 'Все страны'})
        //     })
        //     this.$api.CountryService.GetList()
        // }

        



        /* API */
        image: any = null
        imageArray: {cropImg:ImagePreviewModel,fileName:string}[] = []
        item: SaveImageRequest;

        async updateMapPoint() {
            // this.innerpointCoordStore = new MapPointCoordinates(this.innerpointCoordStore.lng, this.innerpointCoordStore.lat)
            let res = await this.$api.MapPointService.updateAsync({
                Id: Number(this.$route.params.id),
                Coordinates: this.pointData.Coordinates,
                Title: this.title,
                Description: this.description
            })
            if (res) {
                this.$router.back()
            }
            
        }   

       async addImages() {
            let imagesCropArray: SaveImageRequest[] = this.imageArray.map(item => { return { ImageBase64: this.getBase64(item.cropImg.ImageUrl), OriginalFileName: item.fileName, CropSettings: { X: item.cropImg.Left, Y:item.cropImg.Top, Width:item.cropImg.Width, Height:item.cropImg.Height } } } )
            imagesCropArray.forEach(async(image) =>  {
                let res = await this.$api.MapPointService.addImageAsync({
                    MapPointId: Number(this.$route.params.id),
                    Image: image
                })
                if (res) {
                    this.pointRequestImages = res
                    this.$router.back()
                }
            })
            
        }

        isValid() {
            if (this.title == '') {
                this.valid = false
                this.showError = true
                console.log("не отправилось");
                return
            } else {
                this.valid = true
                this.showError = false
                this.addImages()
                this.updateMapPoint()
                console.log("отправилось");
                this.$emit('validSuccess')
            }
        }
    }
    
</script>

<style lang="less" scoped>

.row-image-array {
    margin: 0 -5px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
}

.close {
    position: absolute;
    top: 5px;
    right: 10px;
    background: white;
    width: 19px;
    height: 19px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.flex-row {
    margin: 0 -5px;
    margin-top: 3px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.col-img {
    padding: 0 5px;
    // min-width: 96.33px;
    max-width: 106.33px;
}

.image {
    margin: 5px 0 15px 0;
    width: 96.33px;
    position: relative;
    z-index: 1;
}

.image img {
    max-width: 100%;
    height: 150px;
}

.block-title {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #586174;
}

.point-item {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}

.point-img {
    margin-right: 11px;
}

.coordinate {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #162147;
}

.coordinate  span {
    display: block;
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
    position: relative;
    z-index: 1;
    flex-wrap: wrap;
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
    margin: 5px !important;
}

.close {
    position: absolute;
    top: 5px;
    right: 10px;
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
    max-width: min-content;
    height: inherit;
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