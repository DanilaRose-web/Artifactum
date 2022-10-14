

<script lang="ts">

    import Vue from "vue";
    import { Component, Watch, Prop } from 'vue-property-decorator'
    import FilterStatus from "../../../components/models/RoleDrop";
    import ListViewItem from 'list-view/src/listviewitem';
    import MapRouteGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRouteGetListResponse"
    import CountriesGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    import CityGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Cities/CityGetListResponse"

    @Component({ name: 'table-map-routes' })
    export default class TableMapRoutesComponent extends Vue { 

        @Prop({ type: Array, default: (): CountriesGetListResponse[] => [] }) mapCountries: CountriesGetListResponse[]

        filtersStatus: FilterStatus[] = [new FilterStatus(0, 'Статус'), new FilterStatus(1, 'На модерации'), new FilterStatus(2, 'Готов')]; 
        listRoutes: MapRouteGetListResponse = null;

        // страны
        currentCountry: number = null
        
        // города
        currentCity: number = null
        listCities: CityGetListResponse[] = []

        newCurrentCountry: number = null
        newCurrentCity: number = null

        // getSearch: string = ''

        getSearchResult(search: string) {
            // this.getSearch = search
            // console.log('search', this.getSearch);
            // this.getListRoutes()
        }

        getCurrentCountry(currentCountry: number) {
            this.newCurrentCountry = currentCountry
            console.log('newCurrentCountry', currentCountry);
        }

        getCurrentCity(currentCity: number) {
            this.newCurrentCity = currentCity
            console.log('newCurrentCity', currentCity);
        }

        openModal() {
            this.$emit('on-click')
        }
        
        

        getPagination() {
           
        }

        async deleteRoute(id: number) {
            let indexRoute = this.listRoutes.Items.findIndex(item => item.Id == id)
            this.listRoutes.Items.splice(indexRoute, 1)
            let req = await this.$api.MapRouteService.deleteAsync({Id: id})
            console.log(id);
        }

        created() {
            // this.getListRoutes()
        }

        chooseCurrentRoute(id: number) {
            let indexRoute = this.listRoutes.Items.findIndex(item => item.Id == id)
            console.log(id);
            this.$router.push({ name: 'page-edit-map-routes', params: { id: id.toString() } })   
        }
    }
    
</script>

<style lang="less" scoped>

.table-moderation {
    max-width: 1500px;
}

.filters-group {
    margin-bottom: 19px;
    margin-left: -10px;
    margin-right: -10px;
    flex-wrap: nowrap;
}

.filter-item {
    padding-left: 10px;
    padding-right: 10px;
}

.table-head-col:nth-child(1) {
    flex: 0 0 6%;
    max-width: 6%;
}

.table-head-col:nth-child(2) {
    flex: 0 0 19%;
    max-width: 19%;
}

.table-head-col:nth-child(3) {
    flex: 0 0 17%;
    max-width: 17%;
}

.table-head-col:nth-child(4) {
    flex: 0 0 17%;
    max-width: 17%;
}

.table-head-col:nth-child(5) {
    flex: 0 0 10%;
    max-width: 10%;
}

.table-head-col:nth-child(6) {
    flex: 0 0 13%;
    max-width: 13%;
}

.table-head-col:nth-child(7) {
    flex: 0 0 9%;
    max-width: 9%;
}

.table-head-col:nth-child(8), .table-head-col:nth-child(9), .table-head-col:nth-child(10) {
    flex: 0 0 3%;
    max-width: 3%;
}



.table-body-col:nth-child(1) {
    flex: 0 0 6%;
    max-width: 6%;
}

.table-body-col:nth-child(2) {
    flex: 0 0 19%;
    max-width: 19%;
}

.table-body-col:nth-child(3) {
    flex: 0 0 17%;
    max-width: 17%;
}

.table-body-col:nth-child(4) {
    flex: 0 0 17%;
    max-width: 17%;
}

.table-body-col:nth-child(5) {
    flex: 0 0 10%;
    max-width: 10%;
}

.table-body-col:nth-child(6) {
    flex: 0 0 13%;
    max-width: 13%;
}

.table-body-col:nth-child(7) {
    flex: 0 0 9%;
    max-width: 9%;
}

.table-body-col:nth-child(8), .table-body-col:nth-child(9), .table-body-col:nth-child(10) {
    flex: 0 0 3%;
    max-width: 3%;
}

.no-padding svg {
    fill: #586174;
}

.table.table-moderation{
    .ui-dropdown {
        .my-class {
            .ui-select {
                border: none;
            }
        }
    }
}
    

@media all and (max-width: 1570px) {
    .scroll-wrap { overflow-x: hidden; }
    .ways-mod-table-body { overflow-x: auto; }

    .table-head-col:nth-child(1) { min-width: 74.81px; }
    .table-head-col:nth-child(2) { min-width: 249.39px; }
    .table-head-col:nth-child(3) { min-width: 211.98px; }
    .table-head-col:nth-child(4) { min-width: 224.45px; }
    .table-head-col:nth-child(5) { min-width: 124.69px; }
    .table-head-col:nth-child(6) { min-width: 162.11px; }
    .table-head-col:nth-child(7) { min-width: 112.22px; }
    .table-head-col:nth-child(8), .table-head-col:nth-child(9) { min-width: 37.41px; }
   
    .table-body-col:nth-child(1) { min-width: 74.81px; }
    .table-body-col:nth-child(2) { min-width: 249.39px; }
    .table-body-col:nth-child(3) { min-width: 211.98px; }
    .table-body-col:nth-child(4) { min-width: 224.45px; }
    .table-body-col:nth-child(5) { min-width: 124.69px; }
    .table-body-col:nth-child(6) { min-width: 162.11px; }
    .table-body-col:nth-child(7) { min-width: 112.22px; }
    .table-body-col:nth-child(8), .table-body-col:nth-child(9) { min-width: 37.41px; }
}

@media all and (max-width: 736px) {
    .filters-group {
        flex-wrap: wrap;
        flex-direction: column;
        align-items: flex-start;
    }

    .filter-item {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

</style>