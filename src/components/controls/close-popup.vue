<template>    
    <div class="close-popup" @click="$emit('on-click')">
        <img src="assets/img/close.svg" alt="">
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop } from 'vue-property-decorator'

    @Component
    export default  class ClosePopupComponent extends Vue { 
    }
    
</script>

<style lang="css" scoped>

.close-popup {
    margin-left: 45px;
    cursor: pointer;
    min-width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    transition: all 0.2s ease;
}

.close-popup:hover {
    background: white;
}

.close-popup img {
    max-width: 100%;
    height: auto;
}

@media all and (max-width: 540px) {
    .close-popup {
        margin-left: 15px;
    }
}

</style>