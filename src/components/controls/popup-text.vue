<template>    
    <div class="popup-text">
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

.popup-text {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    max-width: 360px;
    color: #282735;
}

</style>