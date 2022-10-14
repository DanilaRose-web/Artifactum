<template>    
    <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 video-item-col">
        <div class="video-item">
          
                <slot />
            
           
                <div class="video-item-descr">
                    <div class="video-item-title"><slot name="title"></slot></div>
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

.vide-row-item {
    margin-left: -6px;
    margin-right: -6px;
}

.video-col-item {
    padding-left: 6px;
    padding-right: 6px;
    min-height: 62px;
}

.video-item-col {
    padding-left: 6px;
    padding-right: 6px;
    margin-bottom: 30px;
    display: flex;
}

.video-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    width: 100%;
    transition: all 0.3s ease;
}

.video-item:not(:last-child) {
    margin-bottom: 22px;
}

.icon-video-item {
    /* padding: 9%; */
    margin-right: 12px;
    /* flex: 0 0 25%; */
    width: 70px;
    height: 70px;
    min-width: 70px;
    /* width: 100%;
    height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
    background: #EDEAFF;
    border-radius: 10px;
}


.icon-video-item img {
    /* max-width: 23px; */
    width: 23px;
    height: 23px;
    /* height: auto; */
}

.video-item-descr {
    padding: 4px;
}

.video-item-title {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #282735;
    /* display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden; */
}

.video-item:hover {
    /* padding: 23px; */
    /* box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15); */
    transform: translateY(-10px);
}

@media all and (max-width: 576px) {
    .video-item {
        justify-content: flex-start;
    }
}

@media all and (max-width: 450px) {
    .icon-video-item { margin-right: 15px; }
}

@media all and (max-width: 400px) {
    .video-item { flex-direction: column; align-items: center; }
    .video-item-title, .video-item-subtitle { text-align: center; }
    .icon-video-item { margin-bottom: 15px; width: 90px; height: 90px; flex: auto; margin-right: 0; }
    .video-item-descr { max-width: 350px; }
    .video-item-title, .video-item-subtitle {
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}


</style>