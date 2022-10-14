<template>    
    <h5 class="subtitle"><slot></slot></h5>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.subtitle, .subtitle p {
    margin-top: 25px;
    font-weight: 500;
    font-size: 20px;
    line-height: 125%;
    color: #737373;
    max-width: 975px;
}

.subtitle p {
    margin-top: 0;
}

.subtitle p:not(:first-child) {
    margin-top: 25px;
}

.subtitle p strong {
    color: #6D69C9;
    font-weight: 700;
}

.ta-center {
    margin: 0 auto;
    text-align: center;
}

.subtitle-media-sm, .subtitle-media-lg {
    display: none;
}

.main-subtitle {
    max-width: 73%;
}


@media all and (max-width: 1000px) {
    .subtitle-media-md {
        max-width: 560px;
    }

    .ta-1000 {
        margin: 0 auto;
        text-align: center;
    }
}

@media all and (max-width: 992px) {
    .subtitle-media-sm {
        display: block;
    }
}

@media all and (min-width: 993px) {
    .subtitle-media-lg {
        display: block;
    }
}

@media all and (max-width: 350px) {
    .subtitle, .subtitle p {
        font-size: 18px;
    }
}

</style>