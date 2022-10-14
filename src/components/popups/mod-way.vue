<template>    
    <div class="mod-way" v-if="!showModWay">
            <popup-title :title="'Модерация маршрута'" @on-click="$emit('on-click')">
                <user />
                <close-popup @on-click="$emit('on-click')"/>
            </popup-title>
                
        <div class="modal-content">
            <div class="popup-content-wrap">
                <div class="block">
                    <div class="block-title">Название маршрута</div>
                    <div class="block-descr">{{ title }}</div>
                </div>

                <div class="block">
                    <div class="block-title">Описание маршрута</div>
                    <div class="block-descr">Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,</div>
                </div>

                <div class="block-img block">
                    <img src="assets/img/img.jpg" alt="Картинка, выбранная вами">
                </div>

                <div class="block">
                    <div class="block-title">Точки</div>
                    <div class="point-item">
                        <div class="point-img"><img src="assets/img/warn.svg" alt=""></div>
                        <div class="point-name">Озеро любви, Приднестровье</div>
                    </div>

                    <div class="point-item">
                        <div class="point-img"><img src="assets/img/warn.svg" alt=""></div>
                        <div class="point-name">Озеро любви, Приднестровье</div>
                    </div>
                </div>

                <div class="block block-button">
                    <div class="button-cost">Бесплатный</div>
                    <div class="button-cost">1200 руб</div>
                </div>
            </div>

            <div class="ui-submit-group-button justify-content-end">
                <ui-submit-button class="bg-red" @click="$emit('closeModPopup')">Отклонить</ui-submit-button>
                <ui-submit-button>Одобрить</ui-submit-button>
            </div>

            <pos-textarea-label
                ref="descr"
                label="Добавить комментарий"
                v-model="descr"
                htmlClass=""
                name="descr"
                type="text"
                placeholder="Введите комментарий..."
                :required="false">
            </pos-textarea-label>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from "vue";
    import { Component, Prop, Watch } from 'vue-property-decorator'

    @Component
    export default  class ModWayComponent extends Vue {
        @Prop({type: Boolean, default: false})
        showModWay: boolean;

        @Prop({ type: String, default: null }) title: string;

        pointTitle: string = ''

        @Watch('title') onChangeCoord(){
            this.pointTitle = this.title;
            console.log(this.title);
        }

        descr: string = ''
    }
    
</script>

<style lang="less" scoped>

.mod-way {
    width: 100%;
}

.modal-content {
    padding: 0 24px 27px 24px;
    width: 100%;
}

.popup-content-wrap {
    margin-bottom: 22px;
    padding-bottom: 37px;
    border-bottom: 1px solid #CED4DE;
}

.block {
    margin-bottom: 30px;
}

.block-img {
    margin-bottom: 37px;
    max-width: 120px;
    width: 100%;
}

.point-item {
    display: flex;
    align-items: center;
}


.point-item:not(:last-child) {
    margin-bottom: 5px;
}

.point-img {
    margin-right: 11px;
}

.point-name {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #162147;
}

.block-title {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #586174;
}

.block-descr {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #162147;
}

.block-button {
    display: flex;
    align-items: center;
}

.button-cost {
    background: #E7E7F2;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #5D58B7;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 130px;
    width: 100%;
    min-height: 35px;
}

.button-cost:not(:last-child) {
    margin-right: 15px;
}

.ui-submit-group-button {
    margin-bottom: 36px;
    display: flex;
    align-items: center;
}

@media all and (max-width: 380px) {
    .modal-content { padding: 0 15px 27px 15px; }
}

</style>