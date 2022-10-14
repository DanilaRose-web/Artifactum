<template>    
    <div class="kvest">
        <slot />
    
        <div class="kvest-descr">
            <div class="kvest-title"><slot name="title"></slot></div>
            <div class="kvest-subtitle"><slot name="subtitle"></slot></div>
        </div> 
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

.kvest {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.kvest:not(:last-child) {
    margin-bottom: 22px;
}

.icon-kvest {
    padding: 5%;
    margin-right: 30px;
    flex: 0 0 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #EDEAFF;
    border-radius: 10px;
}

.icon-kvest-light {
    background: #FFF2DC;
}

.icon-kvest img {
    max-width: 23px;
    width: 100%;
    height: auto;
}

.kvest-descr {
    padding: 4px;
}

.kvest-title {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;
    color: #282735;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.kvest-subtitle {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #737373;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.kvest:hover {
    /* padding: 23px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15); */
    transform: translateX(15px);
}

@media all and (max-width: 450px) {
    .icon-kvest { margin-right: 15px; }
}

@media all and (max-width: 400px) {
    .kvest { flex-direction: column; align-items: center; }
    .kvest-title, .kvest-subtitle { text-align: center; }
    .icon-kvest { margin-bottom: 15px; width: 90px; height: 90px; flex: auto; }
    .kvest-descr { max-width: 350px; }
    .kvest-title, .kvest-subtitle {
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

</style>