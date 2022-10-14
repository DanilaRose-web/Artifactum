<template>    
    <div class="select-box select-box-burger">
        <div class="options-container options-container2">          
            <div class="option option2">
                <input type="radio" class="radio" id="grade-a1" name="category" />
                <label for="grade-a1">
                    <div class="flag"><img src="assets/img/ru-flag.svg" alt=""></div>
                </label>
            </div>

            <div class="option option2">
                <input type="radio" class="radio" id="grade-b1" name="category" />
                <label for="grade-b1">
                    <div class="flag"><img src="assets/img/en-flag.png" alt=""></div>
                </label>
            </div>

            <div class="option option2">
                <input type="radio" class="radio" id="grade-c1" name="category" />
                <label for="grade-c1">
                    <div class="flag"><img src="assets/img/lv-flag.png" alt=""></div>
                </label>
            </div>
        </div>
        <div class="selected selected2">
            <div class="flag"><img src="assets/img/ru-flag.svg" alt=""></div>
        </div> 
        </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component } from 'vue-property-decorator'

    @Component
    export default  class FooterDefaultComponent extends Vue {
        toggle: boolean = true

        mounted() {
            const selected = document.querySelector(".selected2");
            const optionsContainer = document.querySelector(".options-container2");
            const optionsList = document.querySelectorAll(".option2");
            console.log(optionsList);
            

            selected.addEventListener("click", () => {
                // if (this.toggle) {
                //     optionsContainer.classList.add("active");
                // } else {
                //     optionsContainer.classList.remove("active");
                // }
                optionsContainer.classList.toggle("active");
            });

            optionsList.forEach(option => {
                option.addEventListener("click", () => {
                    selected.innerHTML = option.querySelector("label").innerHTML;
                    optionsContainer.classList.remove("active");
                });
            });
        }
    }
    
</script>

<style lang="css" scoped>

.select-box {
    margin-right: 70px;
    margin-left: 10px;
    display: flex;
    width: 60px;
    height: 24px;
    align-items: center;
    position: relative;
}

.select-box-burger {
    margin-top: 20px;
}

.select-box .options-container {
    max-height: 0;
    opacity: 0;
    transition: all 0.4s;
    overflow: hidden;
    order: 1;
    position: absolute;
    top: 30px;
    background: transparent;
}

.flag {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.flag img {
    width: 24px;
    height: 16px;
}

.selected {
    padding-left: 5px;
    position: relative;
    width: 60px;
    height: 16px;
    background-color: transparent;
    order: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.selected::after {
    content: url("/assets/img/lang-arrow.svg");	
	display: inline-block;
	text-rendering: auto;
	position: absolute;
	right: 5px;
	top: 50%;
	transition: transform .5s;
	transform: translateY(-50%);
}

.select-box .options-container.active {
  max-height: 240px;
  min-height: 85px;
  opacity: 1;
  overflow-y: auto;
  width: 50px;
}

.select-box .options-container.active + .selected::after {
  transform: translateY(-50%) rotateX(180deg);
}

/* .select-box .options-container::-webkit-scrollbar {
  width: 8px;
  background: #0d141f;
  background: #81878f;
  background: #f1f2f3;
  border-radius: 0 5px 5px 0;
}

.select-box .options-container::-webkit-scrollbar-thumb {
  background: #525861;
  background: #81878f;
  border-radius: 0 5px 5px 0;
} */
.select-box .option,
.selected {
  cursor: pointer;
}

.select-box .option {
    padding-left: 5px;
    height: 26px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
}

.select-box .option:hover {
    background: #EDEAFF;
    /* background: black; */
}

.select-box label {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.select-box .option .radio {
  display: none;
}

@media all and (max-width: 1350px) {
    .select-box { margin-left: 0; }
}


@media all and (max-width: 1150px) {
  .select-box-main {
    display: none;
  }

  .locale--burger {
      margin-bottom: 25px;
      display: flex;
      font-size: 17px;
      font-weight: 500;
  }
}

</style>