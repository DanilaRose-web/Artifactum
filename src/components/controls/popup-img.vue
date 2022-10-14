<template>    
    <div class="popup-img">
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

.popup-img {
    max-width: 48px;
}

.popup-img img {
    margin-bottom: 45px;
    max-width: 100%;
    height: auto;
}

</style>