<template>
    <div class="edit-route-wrap">
        <h2 class="route-title password-title">
            Смена пароля
        </h2>

        <div class="popup-content-wrap">     
            <ui-input 
                :placeholder="'Введите старый пароль'" 
                :label="'Старый пароль'"
                :type="'password'" 
                :id="'old-password'" 
                :required="true"
                :min-lenghth="5" 
                :showError="true"
                :hasError="hasError"
                v-model="oldPassword"
                :requiredLabel="true"> 
            </ui-input>
            
            <ui-input 
                :placeholder="'Новый пароль'" 
                :label="'Введите новый пароль'"
                :type="'password'" 
                :id="'new-password'" 
                :required="true"
                :min-lenghth="5" 
                :showError="true"
                :hasError="hasError"
                v-model="newPassword"
                :requiredLabel="true"> 
            </ui-input>
               
            <ui-input 
                :placeholder="'Повторите пароль'" 
                :label="'Повторите пароль'"
                :type="'password'" 
                :id="'repeat-password'" 
                :required="true"
                :min-lenghth="5" 
                :showError="true"
                :hasError="hasError"
                v-model="repeatPassword"
                :requiredLabel="true"
                @keydown.enter="logIn"> 
            </ui-input>

            <div class="error-message" v-if="showError">Заполните все поля со звездочками</div>
        </div>

        <div class="ui-submit-group-button justify-content-end">
            <ui-submit-button @click="isValid()">Изменить</ui-submit-button>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import 'vue-select/dist/vue-select.css';
    
    @Component
    export default class PageStocksComponent extends Vue {
        showMenuFlag = false;
        access = false
        hasError = false

        showMenu() {
            this.showMenuFlag = !this.showMenuFlag;
        }
    }
</script>

<style lang="css" scoped>

.popup-content-wrap {
    margin-bottom: 24px;
    padding-bottom: 26px;
    border-bottom: 1px solid #CED4DE;
}

.edit-route-wrap {
    margin-top: 29px;
    padding: 26px;
    background: white;
}

.route-title {
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 22px;
    line-height: 21px;
    color: #162147;
}

.ui-submit-group-button {
    display: flex;
}

</style>