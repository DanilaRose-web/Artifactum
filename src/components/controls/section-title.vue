<template>    
    <h2 class="section-title"><slot></slot></h2>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.section-title {
    margin: 0 auto;
    margin-bottom: 40px;
    max-width: 1140px;
    font-weight: 600;
    font-size: 48px;
    line-height: 57px;
    text-align: center;
    text-transform: uppercase;
    color: #282735;
}

.ta-left {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 60px;
    text-align: left;
    max-width: 525px;
}

.section-title strong {
    position: relative;
    line-height: 0;
    z-index: 1;
    white-space: nowrap;
}

.section-title strong::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 60%;
    bottom: 0;
    left: 0;
    background: #FFD995;
    z-index: -1;
}

.title-small {
    max-width: 520px;
}

.media-sm, .media-lg {
    display: none;
} 

.fz-38 {
    font-size: 38px;
}

@media all and (max-width: 992px) {
    .section-title {
        font-size: calc((100vw - 460px)/(992 - 460) * (48 - 38) + 38px);
        line-height: 116%;
    }

    .title-center {
        margin: 0 auto;
        margin-bottom: 40px;
        text-align: center;
    }
}

@media all and (max-width: 992px) {
    .media-sm {
        display: block;
        font-size: calc((100vw - 460px)/(992 - 460) * (48 - 38) + 38px);
        line-height: 116%;
    }

    .section-title {
        font-size: calc((100vw - 460px)/(992 - 460) * (48 - 38) + 38px);
        line-height: 116%;
    }
}

@media all and (max-width: 460px) {
    .media-sm, .section-title {
        font-size: calc((100vw - 280px)/(460 - 280) * (38 - 23) + 23px);
    }
}

@media all and (min-width: 993px) {
    .media-lg {
        display: block;
    }
}

</style>