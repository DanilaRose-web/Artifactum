<template>    
    <popup class="popup-video">
        <iframe width="1214" height="700" max-width="1214" src="https://www.youtube.com/embed/qNZIJmEZ91g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </popup>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{
        isClickedContinue: boolean = false;
        emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        email: string = "";


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

.popup-video iframe {
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
}





</style>