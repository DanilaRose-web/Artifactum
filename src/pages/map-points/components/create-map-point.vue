<template>    
    <div class="add-point" v-if="!showAddPoint">
        <popup-title :title="'Добавление точки'">
            <close-popup @on-click="$emit('on-click')"/>
        </popup-title>

        <div class="modal-content">
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

                    <div class="flex-block">
                        <div
                            v-for="(image, key) in imageArray"
                            :key="key"
                            col-auto>
                            <div style="width:100%;">
                                <div class="img m-2">
                                    <div class="close pointer" @click="removeInnerImage(key)">
                                        <img src="assets/img/del-img.svg" alt="">
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
                    :mapCountries="mapCountries"
                    @changeCountry="getCurrentCountry"
                    @changeCity="getCurrentCity"
                />    -->

                <div class="block-title"><span class="required">*</span>Координаты</div>
                <div class="point-item" v-if="innerpointCoordStore">
                    <div class="point-img"><img src="/assets/img/warn.svg" alt=""></div>
                    <div class="coordinate" >  
                        <span>Долгота: {{ innerpointCoordStore.lng }}</span>
                    </div>
                </div>

                 <div class="point-item" v-if="innerpointCoordStore">
                    <div class="point-img"><img src="/assets/img/warn.svg" alt=""></div>
                    <div class="coordinate" >  
                        <span>Широта: {{ innerpointCoordStore.lat }}</span>
                    </div>
                </div>
                
                <choose-on-map-link @on-show-modal-map="$emit('on-show-modal-map')"></choose-on-map-link>

                <ui-input style="display: none;"
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
        
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop, Watch } from 'vue-property-decorator'
    import CountriesDrop from "../../../components/models/CountriesDrop";
    import CityDrop from "../../../components/models/CityDrop";
    import PointsDrop from "../../../components/models/PointsDrop";
    import ImagePreviewModel from "../../../components/models/ImagePreviewModal"
    import SaveImageRequest from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest";
    import PointCoordinates from "../../../components/models/PointCoordinates"
    import CountriesGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"
    import ModelSaveImageRequest from "@components/models/ModelSaveImageRequest";
    import PointsList from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapPoints/MapPointGetListResponse"    

    @Component
    export default  class CreateMapPointComponent extends Vue {
        @Prop({type: Boolean, default: false})
        showAddPoint: boolean;

        @Prop({ type: Object, default: null }) point: PointCoordinates; // получение координат точки
        @Prop({ type: Array, default: (): CountriesGetListResponse[] => [] }) mapCountries: CountriesGetListResponse[]
        @Prop({ type: Number, default: null }) routeId: number
        @Prop({ type: Object }) pointCoord: any
        
        radio: boolean = false

        
        title: string = ''
        description: string = ''
        height: string = ''

        valid: boolean = false
        showError: boolean = false

        newCurrentCountry: number = null
        newCurrentCity: number = null
        // Получение стран
        listCountries: CountriesGetListResponse[] = []
        pointList: PointsList = null
        innerRouteId: number = null

        


        // Получение координат точки
        innerCoord:PointCoordinates = null
        innerMapPointCoord: any = null
        innerpointCoordStore: any = null
        innerPointCoord: any = null


        @Watch('routeId') changeRouteId() {
            this.innerRouteId = this.routeId
            // console.log(this.routeId, 'routeId');
        }

        @Watch('pointCoord') changeInnerpointCoordStore() {
            this.innerPointCoord = this.pointCoord
            // console.log('this.innerPointCoord', this.pointCoord);
        }
        @Watch('coordinate') onChangeCoord(){
            // console.log('watch coordinate:',this.point);
            this.innerCoord = this.point;
        }

        created() {
            this.innerCoord = this.point;
            this.innerRouteId = this.routeId
            // console.log(this.innerRouteId);

            this.innerPointCoord = this.pointCoord  
        }

        mounted() {
            // Получение стран
            this.$api.CountryService.GetListEvent.once((responce) => {
                if (responce.IsSuccess) {
                    
                } else {}
                this.listCountries = responce.Value
            })
            this.$api.CountryService.GetList()
        }

        updated() {
            this.innerpointCoordStore = this.$store.getters.returnPointCoord
            // console.log('this.innerpointCoordStore', this.innerpointCoordStore);
        }

    
        

        
        getCurrentCountry(innerCurrentCountry: number) {
            this.newCurrentCountry = innerCurrentCountry
            // console.log('newCurrentCountry', currentCountry);
        }

        getCurrentCity(innerCurrentCity: number) {
            this.newCurrentCity = innerCurrentCity
            // console.log('newCurrentCity', currentCity);
        }

        // getListPoints() {
        //     this.$api.MapPointService.GetListEvent.once((response) => {
        //         if (response.IsSuccess) {
                    
        //         } 
        //         this.pointList = response.Value
        //         // this.page.Count=response.Value.Page.Count
        //     })
        //     this.$api.MapPointService.GetList({Search: ''})
        // }

        // Получение городов
        listCities: CityGetListResponse[] = []
        currentCity: number = null
        

        
        // Добавление / удаление изображения
        fileName:string="";
        addImg(image: ImagePreviewModel,fileName:string) {
            this.imageArray.push({cropImg:image, fileName:fileName})
        }

        removeInnerImage(key: number) {
            this.imageArray.splice(key, 1) // key - уникальный параметр картинки. splice(кликнутый элемент, сколько элементов удалить)
        }

        getBase64(target:string):string {
            return target.substring(target.indexOf('base64')+7)
        }


        /* API */
        image: any = null
        imageArray: {cropImg:ImagePreviewModel,fileName:string}[] = []
        item: SaveImageRequest;

        async pointCreate() {      
            let imagesCropArray: SaveImageRequest[] = this.imageArray.map(item => { return { ImageBase64: this.getBase64(item.cropImg.ImageUrl), OriginalFileName: item.fileName, CropSettings: { X: item.cropImg.Left, Y:item.cropImg.Top, Width:item.cropImg.Width, Height:item.cropImg.Height } } } )
            let res = await this.$api.MapPointService.createAsync({
                Name: this.title,
                Description: this.description,
                MapRouteId: this.innerRouteId,
                Height: Number(this.height),
                Coordinates: { Longitude: this.innerpointCoordStore.lng, Latitude: this.innerpointCoordStore.lat },
                Images: imagesCropArray, 
            })
                // console.log("отправилось");
                this.$emit('validSuccess')
        }

        isValid() {
            if (this.title == '' || this.innerpointCoordStore == null) {
                this.valid = false
                this.showError = true
                // console.log("не отправилось");
                // console.log(this.title, this.newCurrentCountry, this.newCurrentCity, this.point);
                
                return
            } else {
                this.valid = true
                this.showError = false
                this.pointCreate()

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

.add-point {
    width: 100%;
}

.select-wrap {
    margin-bottom: 14px;
}

.modal-content {
    padding: 0 24px 27px 24px;
    width: 100%;
}

.popup-content-wrap {
    margin-bottom: 24px;
    padding-bottom: 26px;
    border-bottom: 1px solid #CED4DE;
}

.select-label {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #586174;
    display: inline-block;
}

.radio-group {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 35px;
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

.ui-submit-group-button {
    display: flex;
    align-items: center;
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

.block-title {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #586174;
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

.flex-block {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}

@media all and (max-width: 380px) {
    .modal-content { padding: 0 15px 27px 15px; }
}

</style>