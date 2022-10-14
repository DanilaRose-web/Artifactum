import Vue from "vue"

export default Vue.filter("transactionStatus", function(value: number) {
    switch (value) {
        case 0:
            return "Редактирование маршрута"; // указывам значение, которое хотим вывести в html
        case 1:
            return "Смена артефакта";
        case 2:
            return "Количество покупок на IOS";
        case 3: 
            return "Покупка маршрута";
        default:
            return 'Статус маршрута не определен'
    }
})
