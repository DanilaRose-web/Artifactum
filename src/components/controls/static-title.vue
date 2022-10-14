<template> 
    <div class="static-title">
        <div class="container-fluid">
            <h1><div class="title-wrap"><span><slot /></span></div></h1>
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

.static-title {
    padding: 33px 0;
    background: #FAFAFA;
}

.static-title .title-wrap {
    padding: 0 0 0 17px;
    position: relative;
    font-weight: 600;
    font-size: 24px;
    /* line-height: 50%; */
    text-transform: uppercase;
    color: #282735;
}

.static-title .title-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: #FFB83A;
    border-radius: 5px;
}

@media all and (max-width: 400px) {
    .static-title .title-wrap {
        font-size: calc((100vw - 280px)/(400 - 280) * (24 - 19) + 19px);
    }
}

@media all and (max-width: 340px) {
    .static-title {
        padding: 25px 0;
    }
}

</style>