<template>    
    <popup class="form-popup">
        <popup-title>Смена e-mail</popup-title>
        <pos-input-label
            ref="emai4"
            label="Введите e-mail"
            v-model="emai4"
            htmlClass="form-item"
            name="email4"
            type="email"
            placeholder="example@gmail.com"
            :required="true"
            :regex="email4Regex">
            <svg width="12" height="12"><use xlink:href="assets/img/svg-sprite.svg#email-input-icon"></use></svg>
        </pos-input-label>
        <form-button @click="next()">Сменить</form-button>
    </popup>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{
        isClickedContinue: boolean = false;
        email4Regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        email4: string = "";

        next() {
            this.isClickedContinue = true;
            //если проходит валидация
            if ( !this.GetRef("email").checkValidation()) {
            return;
            } 
            this.$router.push({name: 'countries'})
        }
    }
    
</script>

<style lang="css" scoped>


</style>