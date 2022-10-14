<template>
    <layout>
        <template>
            <div class="table-wrap">
                <table-head>
                    <table-title>Транзакции</table-title>
                </table-head>

                <div class="filters-group row">
                    <!-- <div class="filter-item col-3">
                        <ui-input 
                            :placeholder="'Дата от'" 
                            :type="'text'" 
                            :min-lenghth="10" 
                            :showError="false"
                            v-model="from"> 
                        </ui-input>
                    </div>

                    <div class="filter-item col-3">
                        <ui-input 
                            :placeholder="'Дата до'" 
                            :type="'text'" 
                            :min-lenghth="10" 
                            :showError="false"
                            v-model="to"
                            @keydown.enter="logIn"> 
                        </ui-input>
                    </div> -->

                    <ui-date-picker  v-model="From"
                        dateFormat="D MMM YYYY"
                        minimumView="days"
                        maximumView="years"
                        initialView="days">
                    </ui-date-picker>

                    <ui-date-picker  v-model="To"
                        dateFormat="D MMM YYYY"
                        minimumView="days"
                        maximumView="years"
                        initialView="days">
                    </ui-date-picker>

                    <button class="search-btn" @click="getSearchResult"><span>Поиск</span></button>

                </div>
                    
                <!-- <table-search 
                    @serchResult="getSearchResult"
                /> -->

                <ui-table v-if="listTransactions" :rowGap="1" :columnGap="1" :mb='true' :Items="listTransactions.Tansactions" w100 template-columns="100px 1fr 1fr 1fr">
                    <template slot="header">
                        <ui-table-header-item>#</ui-table-header-item>
                        <ui-table-header-item>Количество</ui-table-header-item>
                        <ui-table-header-item>Дата</ui-table-header-item>
                        <ui-table-header-item>Тип</ui-table-header-item>
                        <!-- <ui-table-header-item class="no-padding"></ui-table-header-item> -->
                    </template>
                       

                    <template #body="data">
                        <ui-table-body-item >{{ data.item.Id }}</ui-table-body-item>
                        <ui-table-body-item >{{ data.item.Amount }}</ui-table-body-item>
                        <ui-table-body-item >{{ data.item.Date | momentDate('DD.MM.YYYY  hh:mm') }}</ui-table-body-item> 
                        <ui-table-body-item >{{ data.item.Type | transactionStatus }}</ui-table-body-item> 
                        <!-- <ui-table-body-item class="no-padding">
                            <img src="/assets/img/edit.svg" alt="">
                        </ui-table-body-item> -->
                    </template>
                </ui-table>

                <!-- <ui-pagination :count="page.Count" :size="page.Size" ref="pagination" @onChange="onPaginationChanged($event)"></ui-pagination> -->
            </div>
        </template>
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import 'vue-select/dist/vue-select.css';
    import PageResponse from "src/api/dataSource/api/PaginationHelper/Lib/PageResponse"
    import MapRouteTypeDrop from "../../components/models/MapRouteTypeDrop"
    import MapRouteStatus from "../../components/models/FilterStatusDrop"
    import FilterStatus from "../../components/models/FilterStatusDrop";
    import GetTransactionResponse from "src/api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Users/GetTransactionResponse";
    import TransactionType from "../../components/models/TransactionType"


    @Component
    export default class PageUsersComponent extends Vue {

        skip = 0;
        getSearch: string = ''
        page: PageResponse = {
            Current: 0,
            Size: 10,
            Count: 0
        }
        From: Date = new Date(2021,1,22)
        To: Date = new Date

        listTransactions: GetTransactionResponse = null

        transactionTypes: TransactionType[] = [new MapRouteTypeDrop(null, 'Тип'), new MapRouteTypeDrop(0, 'Редактирование маршрута'), new MapRouteTypeDrop(1, 'Смена артефакта'), new MapRouteTypeDrop(1, 'Количество покупок на IOS'), new MapRouteTypeDrop(1, 'Покупка маршрута')]
        currentType = 0

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
            this.getListTransactions()
            console.log('search', this.getSearch);
        }

        created() {
            this.getListTransactions()
        }

        async getListTransactions() {
            let req = await this.$api.AccountService.getTransactionAsync({From: this.From, To: this.To})
            if (req) {
                this.listTransactions = req
            }
        }

        getCurrentType(value: number) {
            this.currentType = value
        }
        
    }
</script>

<style lang="css" scoped>

.filters-group {
    margin-bottom: 20px;
}

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

.search-btn {
    margin-left: 14px;
    background: #FFB83A;
    max-width: 96px;
    width: 100%;
    min-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
}

</style>  