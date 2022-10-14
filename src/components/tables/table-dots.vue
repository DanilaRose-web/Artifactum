<template>    
    <table-main class="table-dots">
        <table-head>
            <table-title>Точки</table-title>
            <table-head-button @on-click="$emit('on-click')">Добавить точку</table-head-button>
        </table-head>

        <table-search />

        <div class="scroll-wrap"></div>
        <div class="table-body dots-table-body">
            <table-row>
                <table-head-col><span>#</span></table-head-col>
                <table-head-col><span>Название точки </span></table-head-col>
                <table-head-col><span>Страна, город</span></table-head-col>
                <table-head-col><span>Автор</span></table-head-col>
                <table-head-col></table-head-col>
            </table-row>

            <table-row>
                <table-body-col><span>1</span></table-body-col>
                <table-body-col><span>Озеро любви </span></table-body-col>
                <table-body-col><span>Приднестровье, Владимировка</span></table-body-col>
                <table-body-col><span>Дже́ннифер Шре́йдер Ло́уренс</span></table-body-col>
                <table-body-col class="no-padding"><img src="assets/img/del.svg" alt=""></table-body-col>
            </table-row>

            <table-row>
                <table-body-col><span>1</span></table-body-col>
                <table-body-col><span>Озеро любви </span></table-body-col>
                <table-body-col><span>Приднестровье, Владимировка</span></table-body-col>
                <table-body-col><span>Дже́ннифер Шре́йдер Ло́уренс</span></table-body-col>
                <table-body-col class="no-padding"><img src="assets/img/del.svg" alt=""></table-body-col>
            </table-row>

            <table-row>
                <table-body-col><span>1</span></table-body-col>
                <table-body-col><span>Озеро любви </span></table-body-col>
                <table-body-col><span>Приднестровье, Владимировка</span></table-body-col>
                <table-body-col><span>Дже́ннифер Шре́йдер Ло́уренс</span></table-body-col>
                <table-body-col class="no-padding"><img src="assets/img/del.svg" alt=""></table-body-col>
            </table-row>
        </div>
    </table-main>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'
    import RoleDrop from "../../components/models/RoleDrop";
    import ListViewItem from 'list-view/src/listviewitem';

    @Component
    export default  class TableDotsComponent extends Vue {

    }
    
</script>

<style lang="less">

.table-users {
    .ui-box-menu {
        border: none;
        background: white;
    }
}

</style>

<style lang="css" scoped>

.table-head-col:nth-child(1) {
    flex: 0 0 10%;
    max-width: 10%;
}

.table-head-col:nth-child(2) {
    flex: 0 0 31%;
    max-width: 31%;
}

.table-head-col:nth-child(3) {
    flex: 0 0 34%;
    max-width: 34%;
}

.table-head-col:nth-child(4) {
    flex: 0 0 21%;
    max-width: 21%;
}

.table-head-col:nth-child(5) {
    flex: 0 0 4%;
    max-width: 4%;
}





.table-body-col:nth-child(1) {
    flex: 0 0 10%;
    max-width: 10%;
}

.table-body-col:nth-child(2) {
    flex: 0 0 31%;
    max-width: 31%;
}

.table-body-col:nth-child(3) {
    flex: 0 0 34%;
    max-width: 34%;
}

.table-body-col:nth-child(4) {
    flex: 0 0 21%;
    max-width: 21%;
}

.table-body-col:nth-child(5) {
    flex: 0 0 4%;
    max-width: 4%;
}

@media all and (max-width: 1300px) {
    .scroll-wrap { overflow-x: hidden; }
    .dots-table-body { overflow-x: auto; }

    .table-head-col:nth-child(1) { min-width: 86.8px; }
    .table-head-col:nth-child(2) { min-width: 269.08px; }
    .table-head-col:nth-child(3) { min-width: 295.11px; }
    .table-head-col:nth-child(4) { min-width: 182.27px; }
    .table-head-col:nth-child(5) { min-width: 36px; }

    .table-body-col:nth-child(1) { min-width: 86.8px; }
    .table-body-col:nth-child(2) { min-width: 269.08px; }
    .table-body-col:nth-child(3) { min-width: 295.11px; }
    .table-body-col:nth-child(4) { min-width: 182.27px; }
    .table-body-col:nth-child(5) { min-width: 36px; }
}

</style>