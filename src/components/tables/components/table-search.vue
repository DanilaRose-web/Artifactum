<template>    
    <div action="" class="table-search">
        <ui-input 
            :placeholder="'Поиск...'" 
            :type="'text'" 
            :id="'search'" 
            :required="false"
            v-model="search"
            :showError="false"
            :noMargin="true"
            @keydown.enter="$emit('serchResult', search)"
        />

        <button class="search-btn" @click="$emit('serchResult', search)"><span>Поиск</span></button>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class TableSearchComponent extends Vue{
        search: string = ''
    }
    
</script>

<style lang="css" scoped>

.table-search {
    margin-bottom: 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.table-search input {
    padding-left: 22px;
    padding-right: 10px;
    max-width: 100%;
    width: 100%;
    border: 1px solid #CED4DE;
    min-height: 35px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #545661;
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

@media all and (max-width: 450px) {
    .table-search { flex-direction: column; align-items: flex-start; }
    .search-btn { margin-left: 0; margin-top: 10px; }
}

</style>