import Vue from "vue"

export default Vue.filter("filterMapRouteModerationStatus", function(value: number) {
    switch (value) {
        case 0:
            return "Новый"; // указывам значение, которое хотим вывести в html
        case 1:
            return "На модерации";
        case 2:
            return "Одобрено";
        case 3: 
            return "Отклонено";
        default:
            break;
    }
})
