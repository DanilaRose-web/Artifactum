<template>    
    <section class="main">
        <main-image />
        <div class="main-flex container-fluid">
            <descr-block class="mb">
                <main-title />
                <subtitle class="ta-1000 main-subtitle subtitle-media-md subtitle-small">Пандемия не повод сидеть дома!</subtitle>
                <button-group />
            </descr-block>
        </div>

        <div class="ellipse-yellow"> 
            <img src="assets/img/main/Ellipse-yellow.svg" alt="">
        </div>

        
    </section>
    
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{

    }
    
</script>

<style lang="css" scoped>

.main {
    min-height: 904px;
    position: relative;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.main-flex {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.ellipse-violet {
    right: 0;
}

.ellipse-yellow {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.ellipse-yellow img {
    max-width: 100%;
    height: auto;
}

@media all and (max-width: 1000px) {
    .main {
        display: block;
        min-height: auto;
    }

    .main-flex {
        padding-bottom: 70px;
        justify-content: center;
    }

    .ellipse-yellow {
        top: inherit;
        bottom: -20px;
        left: -150px;
    }
}

@media all and (max-width: 480px) {
    .ellipse-yellow {
        bottom: -80px;
    }
}

</style>