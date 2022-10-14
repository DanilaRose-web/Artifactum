<template>
    <layout>
        <fullpage>
            <header-main />
    
            <section-main />
            <section-about />
            <section-advantages />
            <section-share />
            <seciton-bun />
    
            <footer-default />
        </fullpage>

        <overlay />
        <burger-menu />
        <section-enter>
            
        </section-enter>
        <section-forget-password />

        <!-- <popup>
            <popup-img><img :src="notificationSrc" alt="Ура"></popup-img>
            <popup-text>{{notificationText}}</popup-text>
        </popup> -->

        <popup-change-password :visible="showPopupChangePassword" @close="closePopupChangePassword" @change="changePassword" />

        <!-- <popup-change-email /> -->
    </layout>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import EnumTypeModalNotification from "../../../models/enums/EnumTypeModalNotification";

    @Component
    export default class MainScreenComponent extends Vue {
        popup: boolean = true
        showPopupChangePassword = false;   
        
        // notificationModalTypes: {
        //     type: EnumTypeModalNotification,
        //     text: string,
        //     img: string
        // } [] = [
        //     {type: EnumTypeModalNotification.first, text: 'text1', img: 'img1'},
        //     {type: EnumTypeModalNotification.second, text: 'text2', img: 'img2'},
        //     {type: EnumTypeModalNotification.third, text: 'text3', img: 'img3'}
        // ]
        currentNotificationModel: EnumTypeModalNotification = null;
        get notificationSrc() {
            return 'assets/img/check.svg'
        }
        get notificationText() {
            if (this.currentNotificationModel == EnumTypeModalNotification.first) {
                return 'dsfyuysdf';
            } 
            return ''
        }
        closePopupChangePassword() {

        }
        changePassword() {
            //res = запрос на изменение в базу
            if (true) {
                this.currentNotificationModel = EnumTypeModalNotification.first;
            } else {
                this.currentNotificationModel = EnumTypeModalNotification.second;
            }           
        }
        mounted() {

            var mobileMenu = document.querySelector('.mobile-menu');
            var mobileMenuIcon = document.querySelector('.mobile-menu-icon');
            var overlay = document.querySelector('.overlay');
            var closeIcon = document.querySelectorAll('.close-icon');
            var closePopup = document.querySelectorAll('.popup-close')
            var fullpage = document.querySelector('.fullpage');
            var enterBtn = document.querySelectorAll('.enter-button')
            var enterPa = document.querySelector('.enter-pa')
            var overlayModal = document.querySelector('.overlay-modal');
            var modal = document.querySelector('.modal-window');
            var wrapModal = document.querySelector('.wrap-modal');
            var openModal = document.querySelectorAll('.modal-button');
            var closeModal = document.querySelector('.close-modal');
            var mobileLink = document.querySelectorAll('.mobile-list-item')
            var pass = document.querySelector('input[type="password"]');
            var eye = document.querySelector('.eye')
            var forgetPassPopup = document.querySelector('.section-forget-password')
            var forgetPassLink = document.querySelectorAll('.forget-password')
            console.log(forgetPassPopup);
            
            
            mobileMenuIcon.addEventListener('click', function(){
                if (!mobileMenuIcon.classList.contains('active')) {
                    mobileMenuIcon.classList.add('active');
                } else {
                    mobileMenuIcon.classList.remove('active');
                }

                if (!mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.add('active');
                    overlay.classList.add('show');
                    fullpage.classList.add('hide');
                } else {
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('show');
                    fullpage.classList.remove('hide');
                }
            })  

            for (let i = 0; i < enterBtn.length; i++) {
                enterBtn[i].addEventListener('click', function() {
                if (!enterPa.classList.contains('active')) {
                    enterPa.classList.add('active');
                    overlay.classList.add('show');
                    fullpage.classList.add('hide-enter');
                    fullpage.classList.remove('hide');
                    mobileMenu.classList.remove('active');
                } else {
                    enterPa.classList.remove('active');
                    overlay.classList.remove('show');
                    fullpage.classList.remove('hide-enter');
                }
            })
            }

            for (let i = 0; i < mobileLink.length; i++) {
                mobileLink[i].onclick = function () {
                    if (!mobileLink[i].classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        mobileMenuIcon.classList.remove('active');
                        overlay.classList.remove('show');
                        fullpage.classList.remove('hide');
                    }   
                };
            }

            for (let i = 0; i < closeIcon.length; i++) {
                closeIcon[i].addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    mobileMenuIcon.classList.remove('active')
                    overlay.classList.remove('show');
                    fullpage.classList.remove('hide');
                    fullpage.classList.remove('hide-enter');
                    enterPa.classList.remove('active')
                    forgetPassPopup.classList.remove('active')
                }) 
            }

            for (let i = 0; i < closePopup.length; i++) {
                closePopup[i].addEventListener('click', function() {
                    modal.classList.remove('show');
                    overlayModal.classList.remove('show');
                    wrapModal.classList.remove('show');
                })
            }

            for (let i = 0; i < forgetPassLink.length; i++) {
                forgetPassLink[i].addEventListener('click', function() {
                    if (!forgetPassPopup.classList.contains('active')) {
                        forgetPassPopup.classList.add('active');
                        overlay.classList.add('show');
                        fullpage.classList.add('hide-enter');
                        fullpage.classList.remove('hide');
                        mobileMenu.classList.remove('active');
                    } else {
                        forgetPassPopup.classList.remove('active');
                        overlay.classList.remove('show');
                        fullpage.classList.remove('hide-enter');
                    }
                })
            }
       

            
                
            

            overlay.addEventListener('click', function() {
                overlay.classList.remove('show');
                mobileMenu.classList.remove('active');
                mobileMenuIcon.classList.remove('active');
                fullpage.classList.remove('hide');
                fullpage.classList.remove('hide-enter');
                enterPa.classList.remove('active')
                forgetPassPopup.classList.remove('active')
            })

            document.body.onkeydown = function (e) {
                if (e.keyCode == 27) {
                    mobileMenu.classList.remove('active');
                    mobileMenuIcon.classList.remove('active');
                    overlay.classList.remove('show');
                    fullpage.classList.remove('hide');
                    enterPa.classList.remove('active')
                    fullpage.classList.remove('hide-enter');
                    modal.classList.remove('show');
                    overlayModal.classList.remove('show');
                    wrapModal.classList.remove('show');
                    forgetPassPopup.classList.remove('active')
                }
            };

            console.log(overlayModal);

            for (let i = 0; i < openModal.length; i++) {
                openModal[i].onclick = open;
            }

            openModal.onclick = open;
            overlayModal.onclick = close;

            function open() {
                modal.classList.add('show');
                overlayModal.classList.add('show');
                wrapModal.classList.add('show');
            }

            function close() {
                modal.classList.remove('show');
                overlayModal.classList.remove('show');
                wrapModal.classList.remove('show');
            }
        };
    }
</script>

<style lang="css" scoped>

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

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    visibility: hidden;
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
    z-index: 2;
}

.overlay.show {
    opacity: 0.8;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
    visibility: visible;
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
}

@media all and (max-width: 1000px) {
    .ellipse-yellow {
        top: inherit;
        bottom: 50px;
    }
}


</style>