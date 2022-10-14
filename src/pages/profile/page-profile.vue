<template>
    <layout>
        <template>
            

                <change-password />

               
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
    export default class PageStocksComponent extends Vue {
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