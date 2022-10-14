<template>
    <layout>
        <template>
            <div class="table-wrap">
                <table-head>
                    <table-title>Артефакты</table-title>
                </table-head>
                    
                <table-search 
                />

                <ui-table :rowGap="1" :columnGap="1" :mb='true'  w100 template-columns="100px 2fr 1.7fr 1.7fr 1fr 1fr 36px">
                    <template slot="header">
                        <ui-table-header-item>#</ui-table-header-item>
                        <ui-table-header-item>Название маршрута</ui-table-header-item>
                        <ui-table-header-item>Страна, город</ui-table-header-item>
                        <ui-table-header-item>Продолжительность</ui-table-header-item>
                        <ui-table-header-item>Расстояние</ui-table-header-item>
                        <ui-table-header-item>Кол-во точек</ui-table-header-item>
                        <ui-table-header-item class="no-padding"></ui-table-header-item>
                    </template>
                       

                    <template #body="data">
                        <ui-table-body-item >{{data}}</ui-table-body-item>
                        <ui-table-body-item ></ui-table-body-item>
                        <ui-table-body-item ></ui-table-body-item>
                        <ui-table-body-item ></ui-table-body-item>
                        <ui-table-body-item ></ui-table-body-item>
                        <ui-table-body-item ></ui-table-body-item>
                        <ui-table-body-item ></ui-table-body-item>
                    </template>
                </ui-table>

                <ui-pagination :count="page.Count" :size="page.Size" ref="pagination" @onChange="onPaginationChanged($event)"></ui-pagination>
            </div>
        </template>
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import 'vue-select/dist/vue-select.css';
    import PageResponse from "src/api/dataSource/api/PaginationHelper/Lib/PageResponse";
    import CountriesGetListResponse from "../../api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Countries/CountriesGetListResponse"
    
    @Component
    export default class PageArtifactsComponent extends Vue {
        showMenuFlag = false;

        skip = 0;
        getSearch: string = ''
        page: PageResponse = {
            Current: 0,
            Size: 10,
            Count: 0
        }

        showMenu() {
            this.showMenuFlag = !this.showMenuFlag;
        }

        onPaginationChanged(value:{Page:number,CountOnPage:number}) {
            // value {Page: 2, CountOnPage: 10}
            this.page.Current=value.Page-1;
            this.skip = (value.Page-1) * value.CountOnPage;
        }

        getSearchResult(search: string) {
            this.getSearch = search
            // if (this.newCurrentCountry == 0 || this.newCurrentCity == 0) {
            //     this.getSearch = null
            // }
            console.log('search', this.getSearch);
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