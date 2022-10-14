<template>    
    <div class="container-fluid">
        <div class="row">
            <advantages-item>
                <div class="advantages-item__icon"><img src="assets/img/advantages/icon1.svg" alt=""></div>
                <div class="advantages-item__quantity" id="count-1">1000</div>
                <div class="advantages-item__title">маршрутов</div>
            </advantages-item>

            <advantages-item>
                <div class="advantages-item__icon"><img src="assets/img/advantages/icon2.svg" alt=""></div>
                <div class="advantages-item__quantity" id="count-2">500</div>
                <div class="advantages-item__title">квестов</div>
            </advantages-item>

            <advantages-item>
                <div class="advantages-item__icon"><img src="assets/img/advantages/icon3.svg" alt=""></div>
                <div class="advantages-item__quantity" id="count-3">10К</div>
                <div class="advantages-item__title">авторов</div>
            </advantages-item>

            <advantages-item>
                <div class="advantages-item__icon"><img src="assets/img/advantages/icon4.svg" alt=""></div>
                <div class="advantages-item__quantity" id="count-4">2000</div>
                <div class="advantages-item__title">подарков</div>
            </advantages-item>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue{
        mounted() {

            // let el = document.querySelector('.section-advantages')
            // let c =  this.getBoundingClientRect()

            

            document.addEventListener("DOMContentLoaded", () => {
            function counter(id, start, end, duration) {
            let obj = document.getElementById(id),
            current = start,
            range = end - start,
            increment = end > start ? 1 : -1,
            step = Math.abs(Math.floor(duration / range)),
            timer = setInterval(() => {
                current += increment;
                obj.textContent = current;
                if (current == end) {
                clearInterval(timer);
                }
            }, step);
            }
            counter("count-1", 200, 1000, 2000);
            counter("count-2", 0, 500, 3000);
            counter("count-3", 0, 10, 3000);
            counter("count-4", 1200, 2000, 1000);
            });

        }
    }
    
</script>