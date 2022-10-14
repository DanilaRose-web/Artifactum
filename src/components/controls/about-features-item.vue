<template>    
    <div class="features-item">
        <div class="container-fluid">
            <div class="row">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script> 

<style lang="css" scoped>

.features-item {
    padding-top: 21px;
    padding-bottom: 44px;
}

.features-item-bg {
    padding-top: 55px;
    padding-bottom: 93px;
    background: rgb(229, 229, 229, 0.2);
}

@media all and (max-width: 576px) {
    .features-item-bg { padding-top: 30px; padding-bottom: 50px; }
}

</style>