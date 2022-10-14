<template>
    <div class="map-route-location" :class="[ flexBlock ? 'flex-block' : '' ]">
        <div class="filter-col">
            <div class="select-wrap">
                <label for="" class="select-label"><span class="required">*</span>Страна</label>
                <ui-usable-dropdown :items="mapCountries" :keyField="'Id'" :nameFields="['Name']" v-model="innerCurrentCountry" :autocomplete="true"></ui-usable-dropdown>
            </div>
        </div>
        
        <div class="filter-col">
            <div class="select-wrap">
                <label for="" class="select-label"><span class="required">*</span>Город</label>
                <ui-usable-dropdown :items="listCities" v-model="innerCurrentCity"  :keyField="'Id'" :nameFields="['Name']"  :autocomplete="true"></ui-usable-dropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop, Watch } from 'vue-property-decorator'
    import CountriesGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"
    import ModelMapRoutesEdit from "./../models/ModelMapRouteEdit"
    
    @Component
    export default class MapRouteLocationComponent extends Vue {

        @Prop({ type: Array, default: (): CountriesGetListResponse[] => [] }) mapCountries: CountriesGetListResponse[]
        @Prop({ type: Array, default: (): CityGetListResponse[] => [] }) mapCities: CityGetListResponse[]
        @Prop({ type: Boolean, default: false }) flexBlock: boolean
        @Prop({ type: Number, default: null }) currentCountry: number
        @Prop({ type: Number, default: null }) currentCity: number
      

        // города


        listCities: CityGetListResponse[] = [];
        firstSelectedItem: any 
        addOne = true

        routeData: ModelMapRoutesEdit = null

        // страны
        innerCurrentCountry: number = null
        // города
        innerCurrentCity: number = null

        // изменение переменной currentCountry. При выборе другой страны, вызывается метод getListCities, который выдает список городов выбранной страны
        @Watch('innerCurrentCountry') changeCurrentCountry() { 
            this.getListCitiesWithoutAllCities()
            this.$emit('changeCountry', this.innerCurrentCountry)
            // console.log(this.innerCurrentCountry);
        } 

        @Watch('innerCurrentCity') changeCurrentCity() { 

            this.$emit('changeCity', this.innerCurrentCity)
            // console.log(this.innerCurrentCity, 'this.innerCurrentCity');
        }

        getListCities() {
            this.$api.CityService.GetListEvent.once((response) => {
                if (response.IsSuccess) {  
                } else {}
                this.listCities = response.Value
                this.listCities.unshift({ Id: null, Name: 'Все города', })
            })
            this.$api.CityService.GetList({ Search: '', CountryId: this.innerCurrentCountry })
        }

        getListCitiesWithoutAllCities() {
            this.$api.CityService.GetListEvent.once((response) => {
                if (response.IsSuccess) {  
                } else {}
                this.listCities = response.Value
                // this.listCities.unshift({ Id: null, Name: 'Все города', })
            })
            this.$api.CityService.GetList({ Search: '', CountryId: this.innerCurrentCountry })
        }

        created() {
            this.innerCurrentCountry = this.currentCountry
            this.innerCurrentCity = this.currentCity

            this.listCities = this.mapCities
            this.getListCities()
        }
        
    }
</script>

<style lang="less" scoped>

.required {
  color: red;
  font-size: 20px;
}


.select-wrap {
    margin-bottom: 14px;
}

.select-label {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #586174;
    display: inline-block;
}

.flex-block {
    margin-left: -10px;
    margin-right: -10px;
    display: flex;
    .filter-col {
        padding: 0 10px;
        flex: 0 0 50%;
        max-width: 50%;
    }
    label {
        display: none;
    }
}

@media all and (max-width: 736px) {
    .filter-item {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .flex-block { 
        margin-top: 14px;
        flex-direction: column; 
        align-items: flex-start; 
        .filter-col {
            flex: 0 0 100%;
            max-width: 100%;
            width: 100%;
        }
    }
}

</style>