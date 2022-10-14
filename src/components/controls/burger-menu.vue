<template>    
    <section class="mobile-menu">
        <close-icon />

        <nav id="mobile-menu">
            <ul class="mobile-list one">
                <li class="mobile-list-item"><r-link route="about-app" class="mobile-list-link">О приложении</r-link></li>
                <li class="mobile-list-item"><r-link route="countries" class="mobile-list-link">Страны</r-link></li>
                <li class="mobile-list-item"><r-link route="idea" class="mobile-list-link">Идея</r-link></li>
                <li class="mobile-list-item"><r-link route="partners" class="mobile-list-link">Партнерам и авторам</r-link></li>
                <li class="mobile-list-item"><r-link route="feedback" class="mobile-list-link">Обратная связь</r-link></li>
                <li class="mobile-list-item"><r-link route="contacts" class="mobile-list-link">Контакты</r-link></li>
            </ul>
            
            <social-block />
            <nav-button class="enter-button burger-button">
                <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0)">
                <path
                    d="M7.39311 7.22557C8.38577 7.22557 9.24534 6.86954 9.94766 6.16711C10.65 5.46478 11.006 4.60545 11.006 3.61267C11.006 2.62024 10.65 1.76079 9.94755 1.05824C9.24511 0.356026 8.38566 0 7.39311 0C6.40034 0 5.541 0.356026 4.83868 1.05835C4.13635 1.76067 3.78021 2.62012 3.78021 3.61267C3.78021 4.60545 4.13635 5.4649 4.83879 6.16722C5.54123 6.86943 6.40068 7.22557 7.39311 7.22557Z"
                />
                <path
                    d="M13.7147 11.5343C13.6945 11.242 13.6535 10.9232 13.5932 10.5865C13.5323 10.2473 13.4539 9.92661 13.3601 9.63353C13.2631 9.3306 13.1313 9.03146 12.9683 8.74478C12.7992 8.44724 12.6005 8.18814 12.3776 7.97494C12.1445 7.75189 11.8591 7.57256 11.529 7.44176C11.2001 7.31164 10.8356 7.24572 10.4457 7.24572C10.2926 7.24572 10.1445 7.30855 9.85851 7.49474C9.6825 7.60953 9.47662 7.74228 9.24683 7.88911C9.05033 8.01431 8.78414 8.13161 8.45535 8.23781C8.13457 8.34161 7.80888 8.39425 7.48741 8.39425C7.16595 8.39425 6.84036 8.34161 6.51924 8.23781C6.1908 8.13172 5.92461 8.01442 5.72834 7.88922C5.50072 7.74377 5.29472 7.61102 5.11608 7.49463C4.83044 7.30843 4.68224 7.24561 4.52911 7.24561C4.1391 7.24561 3.77472 7.31164 3.44593 7.44187C3.11611 7.57245 2.83058 7.75178 2.59724 7.97505C2.37442 8.18837 2.17564 8.44735 2.00672 8.74478C1.84387 9.03146 1.71204 9.33049 1.61499 9.63364C1.52126 9.92673 1.44287 10.2473 1.38199 10.5865C1.32168 10.9227 1.28071 11.2417 1.26045 11.5346C1.24054 11.8216 1.23047 12.1195 1.23047 12.4204C1.23047 13.2034 1.47938 13.8373 1.97021 14.3048C2.45499 14.7661 3.09643 15.0001 3.87646 15.0001H11.0991C11.8791 15.0001 12.5203 14.7662 13.0052 14.3048C13.4961 13.8376 13.745 13.2036 13.745 12.4203C13.7449 12.118 13.7347 11.8199 13.7147 11.5343Z"
                />
                </g>
                <defs>
                <clipPath id="clip0">
                    <rect width="15" height="15.0001" />
                </clipPath>
                </defs>
            </svg>
            <span>Личный кабинет</span>
            </nav-button>

            <select-lang-burger />
        </nav>
        <popup-bg />
    </section>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {

    }
    
</script>

<style lang="css" scoped>

.mobile-menu {
    position: fixed;
    max-width: 400px;
    width: 100%;
    height: 100vh;
    top: 0;
    right: 0;
    background-color: white;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    z-index: 3;
    overflow-y: auto;
    -webkit-transform: translateX(400px);
    transform: translateX(400px);
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
}

.mobile-menu.active {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
}
#mobile-menu {
    margin: 150px 0 50px 0;
    padding: 0 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.mobile-list {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.mobile-list-item {
    margin-bottom: 25px;
    -webkit-transform: translateX(-30px);
    transform: translateX(-30px);
    width: 100%;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    visibility: hidden;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

.mobile-list-link {
    color: black;
    font-size: 17px;
    font-weight: 500;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

.mobile-list-link:hover {
    color: black;
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
}

.mobile-list-link:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    background-color: black;
    height: 2px;
    width: 0;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

.mobile-list-link.active {
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
}
.mobile-list-link:hover:after, .mobile-list-link.active:after {
    width: 100%;
}

.mobile-menu.active .mobile-list-item:nth-child(1) {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-transition-delay: 0.6s;
    transition-delay: 0.6s;
}

.mobile-menu.active .mobile-list-item:nth-child(2) {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-transition-delay: 0.7s;
    transition-delay: 0.7s;
}

.mobile-menu.active .mobile-list-item:nth-child(3) {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-transition-delay: 0.8s;
    transition-delay: 0.8s;
}

.mobile-menu.active .mobile-list-item:nth-child(4) {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-transition-delay: 0.9s;
    transition-delay: 0.9s;
}

.mobile-menu.active .mobile-list-item:nth-child(5) {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-transition-delay: 1s;
    transition-delay: 1s;
}

.mobile-menu.active .mobile-list-item:nth-child(6) {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-transition-delay: 1.1s;
    transition-delay: 1.1s;
}

.mobile-menu.active .mobile-list-item:nth-child(7) {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-transition-delay: 1.2s;
    transition-delay: 1.2s;
}



.close-icon-in-mob-menu {
    width: 20px;
    height: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    cursor: pointer;
    z-index: 4;
    position: fixed;
    top: 5px;
    left: 5px;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.close-icon-in-mob-menu:active,
.close-icon-in-mob-menu:hover {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
}

.close-icon-in-mob-menu span:nth-child(1) {
    width: 100%;
    height: 2px;
    -webkit-transform: rotate(-40deg) translateY(13px) translateX(-6px);
    transform: rotate(-45deg) translateY(6px) translateX(-7px);
    background: #9493A1;
}

.close-icon-in-mob-menu span:nth-child(2) {
    width: 100%;
    height: 2px;
    transform: rotate(45deg) translateY(-6px) translateX(-6.5px);
    background: #9493A1;
}

@media all and (max-height: 650px) {
    #mobile-menu {
        margin: 80px 0 50px 0;
    }
}

</style>