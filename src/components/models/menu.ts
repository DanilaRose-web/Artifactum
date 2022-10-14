import { Route } from "vue-router";
import MenuItem from "./menuItem";
// import router from "../router";

class MenuItemFactory {
  /**
   * Меню проектов начало
  */
  // static ProjectTasks =  new MenuItem({icon: 'assets/img/svg-sprite.svg#users-icon-menu', prefix: '', name: 'Список пользователей', routeName: 'page-users', childs: [
  // ]});
  // static ProjectListWays =  new MenuItem({icon: 'assets/img/svg-sprite.svg#quest-icon-menu', prefix: 'ways-list', name: 'Список маршрутов', routeName: 'ways-list', childs: []});
  // static ProjectWaysMod =  new MenuItem({icon: 'assets/img/svg-sprite.svg#users-icon-menu', prefix: 'ways-mod', name: 'Модерация маршрутов', routeName: 'ways-mod', childs: []});
  static MapRoute =  new MenuItem({icon: 'assets/img/svg-sprite.svg#ways-icon-menu', prefix: '', name: 'Маршруты', routeName: 'page-map-routes', childs: [
    // MenuItemFactory.ProjectListWays,
    // MenuItemFactory.ProjectWaysMod,
  ]});
  static Transactions =  new MenuItem({icon: 'assets/img/svg-sprite.svg#transaction-icon', prefix: '', name: 'Транзакции', routeName: 'page-transactions', childs: []});
  // static ProjectQuests =  new MenuItem({icon: 'assets/img/svg-sprite.svg#quest-icon-menu', prefix: '', name: 'Квесты', routeName: 'page-quests', childs: []});
  // static ProjectArtifacts =  new MenuItem({icon: 'assets/img/svg-sprite.svg#artifacts-icon-menu', prefix: '', name: 'Артефакты', routeName: 'page-artifacts', childs: []});
  // static MapDots =  new MenuItem({icon: 'assets/img/svg-sprite.svg#dots-icon-menu', prefix: '', name: 'Точки', routeName: 'page-map-points', childs: []});
  static Profile =  new MenuItem({icon: 'assets/img/svg-sprite.svg#stock-icon-menu', prefix: '', name: 'Профиль', routeName: 'page-profile', childs: []});
  /**
   * Меню проектов конец
  */
}
export default class MenuFactory {
  private static ProjectMenu = [ MenuItemFactory.MapRoute, MenuItemFactory.Transactions, MenuItemFactory.Profile ];

  static getProjectMenu(): MenuItem[] {
    this.addParams(this.ProjectMenu, {});
    let menuItems: MenuItem[] = this.ProjectMenu;
    return menuItems;
  }
  static addParams(menu: MenuItem[], params: Object) {
    menu.forEach(item => {
      item.routeParameters = params;
      if (item.childs.length > 0) {
        this.addParams(item.childs, params);
      }
    })
  }
}
