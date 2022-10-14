<template>    
    <table-main class="table-users">
        <table-head>
            <table-title>Список пользователей</table-title>
        </table-head>

        <table-search />

        <div class="scroll-wrap" >
            <div class="table-body users-table-body">
                <table-row>
                    <table-head-col><span>#</span></table-head-col>
                    <table-head-col><span>Имя пользователя</span></table-head-col>
                    <table-head-col><span>E-mail</span></table-head-col>
                    <table-head-col><span>Дата регистрации</span></table-head-col>
                    <table-head-col><span>Роль</span></table-head-col>
                    <table-head-col></table-head-col>
                </table-row>

                
                <table-row v-for="userItem in usersGetListResponse" :key="userItem.Id">
                    <table-body-col><span></span></table-body-col>
                    <table-body-col><span>{{ userItem }}</span></table-body-col>
                    <table-body-col><span>example@gamnil.com</span></table-body-col>
                    <table-body-col><span>22.01.2020</span></table-body-col>
                    <table-body-col class="no-padding-left">
                        <ui-usable-dropdown :class="[ noBorder ? 'no-border' : '' ]" :items="listRoles" :value="0" :nameFields="['role']" />
                    </table-body-col>
                    <table-body-col class="no-padding"><img class="delete" src="assets/img/del.svg" alt=""></table-body-col>
                </table-row>

                <table-row>
                    <table-body-col><span>2</span></table-body-col>
                    <table-body-col><span>Алекса́ндра А́нна Дадда́рио</span></table-body-col>
                    <table-body-col><span>example@gamnil.com</span></table-body-col>
                    <table-body-col><span>22.01.2020</span></table-body-col>
                    <table-body-col class="no-padding-left">
                        <ui-usable-dropdown :class="[ noBorder ? 'no-border' : '' ]" :items="listRoles" :value="0" :nameFields="['role']" />
                    </table-body-col>
                    <table-body-col class="no-padding"><img class="delete" src="assets/img/del.svg" alt=""></table-body-col>
                </table-row>
                
                <table-row>
                    <table-body-col><span>2</span></table-body-col>
                    <table-body-col><span>Алекса́ндра А́нна Дадда́рио</span></table-body-col>
                    <table-body-col><span>example@gamnil.com</span></table-body-col>
                    <table-body-col><span>22.01.2020</span></table-body-col>
                    <table-body-col class="no-padding-left">
                        <ui-usable-dropdown :class="[ noBorder ? 'no-border' : '' ]" :items="listRoles" :value="0" :nameFields="['role']" />
                    </table-body-col>
                    <table-body-col class="no-padding"><img class="delete" src="assets/img/del.svg" alt=""></table-body-col>
                </table-row>
            </div>
        </div>
    </table-main>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'
    import RoleDrop from "../../../components/models/RoleDrop";
    import ListViewItem from 'list-view/src/listviewitem';
    // import UsersGetListResponse from "..//../api/dataSource/api/Artifactum/CrmAdmin/IServices/Models/Users/UsersGetListResponse"
    // import UsersGetListResponse from "../../../api/dataSource/api/Artifactum/CrmGuide/"
    // import UserItem from "../../../api/dataSource/api/Artifactum/CrmAdmin/IServices/Models/Users/UserItem"

    @Component
    export default  class TableUsersComponent extends Vue {
        dropdownItems: Array<ListViewItem<any>> = new Array<ListViewItem<any>>();
        listRoles: RoleDrop[] = [new RoleDrop(0, 'Менеджер'), new RoleDrop(1, 'Администратор')];
        noBorder = true

        /* API */

        // userItem: UserItem = null
        // usersGetListResponse: Array<UsersGetListResponse> = null

        // async created() {
        //     let response: UsersGetListResponse = null
        //     try {
        //         // срабатывает, когда все успешно
        //         response =  await this.$api.UserService.getListAsync({ Search: '' })
        //     }
        //     catch {
        //         // срабатывает в случае ошибки
        //         console.log("Ошибка")
        //     }
        //     finally {
        //         // срабатывает в любом случае
        //     }
        // }

        // created() {
        //     this.$api.UserService.GetListEvent.once((response) => {
        //         if (response.IsSuccess) {
                    
        //         } else {

        //         }
        //     })
        //     this.$api.UserService.GetList({ Search: '' })
        // }
        
    }
    
</script>

<style lang="less" scoped>

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
    flex: 0 0 27%;
    max-width: 27%;
}

.table-head-col:nth-child(3) {
    flex: 0 0 22.5%;
    max-width: 22.5%;
}

.table-head-col:nth-child(4) {
    flex: 0 0 17%;
    max-width: 17%;
}

.table-head-col:nth-child(5) {
    flex: 0 0 20%;
    max-width: 20%;
}

.table-head-col:nth-child(6) {
    flex: 0 0 3.5%;
    max-width: 3.5%;
}


.table-body-col:nth-child(1) {
    flex: 0 0 10%;
    max-width: 10%;
}

.table-body-col:nth-child(2) {
    flex: 0 0 27%;
    max-width: 27%;
}

.table-body-col:nth-child(3) {
    flex: 0 0 22.5%;
    max-width: 22.5%;
}

.table-body-col:nth-child(4) {
    flex: 0 0 17%;
    max-width: 17%;
}

.table-body-col:nth-child(5) {
    flex: 0 0 20%;
    max-width: 20%;
}

.table-body-col:nth-child(6) {
    flex: 0 0 3.5%;
    max-width: 3.5%;
}

.delete {
    cursor: pointer;
}

@media all and (max-width: 1300px) {
    .scroll-wrap { overflow-x: hidden; }
    .users-table-body { overflow-x: auto; }

    .table-head-col:nth-child(1) { min-width: 90.39px; }
    .table-head-col:nth-child(2) { min-width: 244.08px; }
    .table-head-col:nth-child(3) { min-width: 203.39px; }
    .table-head-col:nth-child(4) { min-width: 153.67px; }
    .table-head-col:nth-child(5) { min-width: 180.8px; }
    .table-head-col:nth-child(6) { min-width: 31.63px; }

    .table-body-col:nth-child(1) { min-width: 90.39px; }
    .table-body-col:nth-child(2) { min-width: 244.08px; }
    .table-body-col:nth-child(3) { min-width: 203.39px; }
    .table-body-col:nth-child(4) { min-width: 153.67px; }
    .table-body-col:nth-child(5) { min-width: 180.8px; }
    .table-body-col:nth-child(6) { min-width: 31.63px; }
}

</style>