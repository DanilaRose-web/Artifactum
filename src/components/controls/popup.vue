<template>    
    <!-- v-if=":visible" -->
    <div class="wrap-modal">
        <div class="modal-window">
            <section class="contact">
                <div class="container-fluid modal-container">
                    <slot />
                </div>
                <close-icon class="popup-close" />
            </section>
            <popup-bg />
        </div>
        <div class="overlay-modal" @click="showPopupChangePassword = false"></div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{
        @Prop({type: Boolean, default: false})
        visible: Boolean
    }
    
</script>

<style lang="css" scoped>

.wrap-modal {
    padding: 40px 15px;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(60, 58, 99, 0, 0);
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

.wrap-modal.show {
    background: rgba(60, 58, 99, 0, 0.8);
    visibility: visible;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
    overflow-y: auto;
}

.overlay-modal {
    width: 100%;
    height: 100%;
    visibility: hidden;     
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
    opacity: 0;
    background: rgba(60, 58, 99, 0.8);
    backdrop-filter: blur(20px);
}

.overlay-modal.show {
    opacity: 1;
    visibility: visible;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
    background: rgba(60, 58, 99, 0.8)
}

.modal-window {
    margin: 0 auto;
    background-color: white;
    max-width: 624px;
    min-height: 358px;
    width: 100%;
    position: relative;
    z-index: 10;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    visibility: hidden;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

.modal-window.show {
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}


.modal-container {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form-popup .modal-window {
    padding-top: 59px;
    padding-bottom: 50px;
}

.form-popup .contact {
    max-width: 397px;
    width: 100%;
}

.popup-video .modal-window {
    max-width: 1214px;
    min-height: auto;
    max-height: 816px;
    /* height: 100%; */
    overflow: hidden;
    position: relative;
    padding-bottom: 42%;
    padding-top: 30px;
    height: 0;
}

.popup-video .contact {
    max-width: 100%;
    width: 100%;
    height: 100%;
}

.popup-video .modal-container {
    padding: 0;
    height: 100%;
}

@media all and (min-width: 1921px) {
    .popup-video .modal-window {
        padding-bottom: 0;
        padding-top: 0;
        max-width: 1214px;
        min-height: 803px;
        max-height: 803px;
        height: 100%;
    }

    .popup-video iframe {
        width: 1214px;
        height: 803px;
    }
}


</style>