<template>    
    <div class="features-img">
        <slot />
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

.features-img {
    display: flex;
    align-items: center;
    width: 100%;
}

.features-img-ml {
    justify-content: flex-end;
}

.features-img img {
    max-width: 100%;
    height: auto;
}

@media all and (max-width: 1100px) {
    .features-img { margin-bottom: 40px; justify-content: center; }
}

</style>