<template>    
    <div class="mobile-menu-icon">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

        

    }
    
</script>

<style lang="css" scoped>

.mobile-menu-icon {
    margin-left: 21px;
    width: 30px;
    height: 23px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    cursor: pointer;
    z-index: 4;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    top: 38px;
    right: 15px;
    display: none;
}

.mobile-menu-icon span {
    width: 100%;
    height: 3px;
    background: white;
    border-radius: 20px;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.mobile-menu-icon.active {
    opacity: 0;
}

@media all and (max-width: 1150px) {
    .mobile-menu-icon {
        display: flex;
    }
}

@media all and (max-width: 600px) {
    .violet-icon span {
        background: #46438D;
    }
}

</style>