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
                   
                <map-route-location 
                    :mapCountries="mapCountries"
                    @currentCountry="getCurrentCountry"
                    @currentCity="getCurrentCity"
                />   

                <div class="block-title">Координаты</div>
                <div class="point-item">
                    
                    <div class="point-img"><img src="assets/img/warn.svg" alt=""></div>
                    <div class="coordinate" v-if="point">  
                        <span>Долгота: {{ point.lng }}</span>
                        <span>Широта: {{ point.lat }}</span>
                    </div>
                </div>
                
                <choose-on-map-link @on-show-modal-map="$emit('on-show-modal-map')"></choose-on-map-link>

                <ui-input 
                    :label="'Высота точки (м)'"
                    :placeholder="'2000'" 
                    :type="'text'" 
                    :id="'heigth'" 
                    :required="true"
                    v-model="heigth"
                    :showError="true"
                    :requiredLabel="true"
                />
            </div>

            <div class="ui-submit-group-button justify-content-end">
                <ui-submit-button @click="next">Добавить</ui-submit-button>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop, Watch } from 'vue-property-decorator'
    import CountriesDrop from "../../components/models/CountriesDrop";
    import CityDrop from "../../components/models/CityDrop";
    import PointsDrop from "../../components/models/PointsDrop";
    import ImagePreviewModel from "../models/ImagePreviewModal"
    import SaveImageRequest from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Common/SaveImageRequest";
    import PointCoordinates from "../models/PointCoordinates"
    import CountriesGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"

    @Component
    export default  class CreateMapPointComponent extends Vue {
        @Prop({type: Boolean, default: false})
        showAddPoint: boolean;

        @Prop({ type: Object, default: null }) point: PointCoordinates; // получение координат точки
        
        radio: boolean = false

        heigth: string = ''
        title: string = ''
        description: string = ''
        height: number = null

        valid: boolean = false
        showError: boolean = false

        // Получение координат точки
        innerCoord:PointCoordinates = null
        created() {
            // console.log(this.point);
            this.innerCoord = this.point;
        }
        @Watch('coordinate') onChangeCoord(){
            console.log('watch coordinate:',this.point);
            this.innerCoord = this.point;
        }

        // Получение стран
        listCountries: Array<CountryList> = []
        currentCountry: number = null

        @Watch('currentCountry')
        changeCurrentCountry() {
            this.getListCities()
        } 
        getCurrentCountry(keyField: number) {
            this.currentCountry = keyField
        }

        // Получение городов
        listCities: Array<CityList> = null
        currentCity: number = null
        getCurrentCity(keyField: number) {
            this.currentCity = keyField;
        }

        getListCities() {
            // Получение городов
            this.$api.CityService.GetListEvent.once((response) => {
                if (response.IsSuccess) {
                    
                } else {}
                this.listCities = response.Value
                this.listCities.unshift({ Id: -1, Name: 'Все города' })
            })
            this.$api.CityService.GetList({ Search: '', CountryId: this.currentCountry, Take: null })
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

        /* Валидация */
        namePointRegex: RegExp = /[\w\s А-я_\s\-\.][^\d_\\\/\*\+\,\_\~\`\!\@\"\#\№\$\;\:\%\^\&\?\()]+$/; //'[\\w\s]+';
        heightPointRegex: RegExp = /[\d]+$/; //'[\\w\s]+';
        namePoint: string = ''
        descrPoint: string = ''
        heightPoint: string = ''

        /* API */
        image: any = null
        imageArray: {cropImg:ImagePreviewModel,fileName:string}[] = []
        item: SaveImageRequest;
        
        next() {
            if ( !this.GetRef("namePoint").checkValidation()  && !this.GetRef("heightPoint").checkValidation()) {
                return;
            } else if (!this.GetRef("namePoint").checkValidation() || !this.GetRef("heightPoint").checkValidation()) {
                return
            } 
            this.pointCreate()
        }

        async pointCreate() {      
            let imagesCropArray: SaveImageRequest[] = this.imageArray.map(item => { return { ImageBase64: this.getBase64(item.cropImg.ImageUrl), OriginalFileName: item.fileName, CropSettings: { X: item.cropImg.Left, Y:item.cropImg.Top, Width:item.cropImg.Width, Height:item.cropImg.Height } } } )
            let res = await this.$api.MapPointService.createAsync({
                Name: this.namePoint,
                Description: this.descrPoint,
                Height: Number(this.heightPoint),
                Coordinates: { Longitude: this.point.lng, Latitude: this.point.lat },
                Images: imagesCropArray
            })
        }

        isValid() {
            if (this.title == '' || this.height == null || this.newCurrentCountry == null || this.newCurrentCity == null || this.newSelectedPoints.length == 0) {
                
            }
        }
    }
    
</script>


<style lang="less" scoped>

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