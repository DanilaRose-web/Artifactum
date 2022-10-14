<template>    
    <table-main class="table-ways">
        <table-head>
            <table-title>Список маршрутов</table-title>
            <table-head-button @on-click="$emit('on-click')">Добавить маршрут</table-head-button>
        </table-head>

        <table-search />

        <div class="scroll-wrap">
            <div class="table-body ways-list-table-body" v-if="listResponse.Item">
                <table-row>
                    <table-head-col><span>#</span></table-head-col>
                    <table-head-col><span>Название маршрута</span></table-head-col>
                    <table-head-col><span>Страна, город</span></table-head-col>
                    <table-head-col><span>Продолжительность</span></table-head-col>
                    <table-head-col><span>Расстояние</span></table-head-col>
                    <table-head-col>Кол-во точек</table-head-col>
                    <table-head-col class="no-padding"></table-head-col>
                </table-row>

                <table-row v-for="item in listRoutes.Items" :key="item.Id">
                    <table-body-col><span>{{ listRoutes.Items }}</span></table-body-col>
                    <table-body-col><span>{{ item.CountryId }}, {{ item.CityId }}</span></table-body-col>
                    <table-body-col><span></span></table-body-col>
                    <table-body-col><span>1 year</span></table-body-col>
                    <table-body-col><span>1600км</span></table-body-col>
                    <table-body-col>147</table-body-col>
                    <table-body-col class="no-padding"><img src="assets/img/del.svg" alt=""></table-body-col>
                </table-row>

                <table-row>
                    <table-body-col><span>1</span></table-body-col>
                    <table-body-col><span>New York, Brooklyn</span></table-body-col>
                    <table-body-col><span>USA, New York</span></table-body-col>
                    <table-body-col><span>1 year</span></table-body-col>
                    <table-body-col><span>1600км</span></table-body-col>
                    <table-body-col>147</table-body-col>
                    <table-body-col class="no-padding"><img src="assets/img/del.svg" alt=""></table-body-col>
                </table-row>
            </div>
        </div>
    </table-main>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'
    import MapRouteGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/MapRoutes/MapRouteGetListResponse"

    @Component
    export default  class TableWaysComponent extends Vue {
        listRoutes: MapRouteGetListResponse;
        

        getListRoutes() {
            this.$api.MapRouteService.GetListEvent.once((response) => {
                if (response.IsSuccess) {
                    
                } else {}
                this.listRoutes = response.Value
            })
            this.$api.MapRouteService.GetList({Search: ''})
        }
    }
    
</script>

<style lang="css" scoped>

.table-head-col:nth-child(1) {
    flex: 0 0 9%;
    max-width: 9%;
}

.table-head-col:nth-child(2) {
    flex: 0 0 26.2%;
    max-width: 26.2%;
}

.table-head-col:nth-child(3) {
    flex: 0 0 20.5%;
    max-width: 20.5%;
}

.table-head-col:nth-child(4) {
    flex: 0 0 16%;
    max-width: 16%;
}

.table-head-col:nth-child(5) {
    flex: 0 0 12%;
    max-width: 12%;
}

.table-head-col:nth-child(6) {
    flex: 0 0 13%;
    max-width: 13%;
}

.table-head-col:nth-child(7) {
    flex: 0 0 3.5%;
    max-width: 3.5%;
}



.table-body-col:nth-child(1) {
    flex: 0 0 9%;
    max-width: 9%;
}

.table-body-col:nth-child(2) {
    flex: 0 0 26.2%;
    max-width: 26.2%;
}

.table-body-col:nth-child(3) {
    flex: 0 0 20.5%;
    max-width: 20.5%;
}

.table-body-col:nth-child(4) {
    flex: 0 0 16%;
    max-width: 16%;
}

.table-body-col:nth-child(5) {
    flex: 0 0 12%;
    max-width: 12%;
}

.table-body-col:nth-child(6) {
    flex: 0 0 13%;
    max-width: 13%;
}

.table-body-col:nth-child(7) {
    flex: 0 0 3.5%;
    max-width: 3.5%;
}

@media all and (max-width: 1430px) {
    .scroll-wrap { overflow-x: hidden; }
    .ways-list-table-body { overflow-x: auto; }

    .table-head-col:nth-child(1) { min-width: 91.52px; }
    .table-head-col:nth-child(2) { min-width: 266.45px; }
    .table-head-col:nth-child(3) { min-width: 208.48px; }
    .table-head-col:nth-child(4) { min-width: 162.72px; }
    .table-head-col:nth-child(5) { min-width: 122.03px; }
    .table-head-col:nth-child(6) { min-width: 132.2px; }
    .table-head-col:nth-child(7) { min-width: 36px; }

    .table-body-col:nth-child(1) { min-width: 91.52px; }
    .table-body-col:nth-child(2) { min-width: 266.45px; }
    .table-body-col:nth-child(3) { min-width: 208.48px; }
    .table-body-col:nth-child(4) { min-width: 162.72px; }
    .table-body-col:nth-child(5) { min-width: 122.03px; }
    .table-body-col:nth-child(6) { min-width: 132.2px; }
    .table-body-col:nth-child(7) { min-width: 36px; }
}

</style>