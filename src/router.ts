import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import BaseLayout from "@layouts/base-layout.vue";

import LayoutRouter from "@layouts/layout-router/layout-router.vue";


/* Страницы */
import PageHome from "@pages/home/home.vue";
import PageOther from "@pages/other/other.vue";
import PageTransaction from "@pages/transactions/page-transactions.vue";
// import PageWaysMod from "@pages/ways/ways-mod.vue";
import PageMapRoutes from "@pages/map-routes/page-map-routes.vue";
import PageEditMapRoutes from "@pages/map-routes/page-edit-map-routes.vue";

import PageArtifacts from "@pages/artifacts/page-artifacts.vue";
import PageMapPoints from "@pages/map-points/page-map-points.vue";
import PageUpdateMapPoint from "@pages/map-points/page-update-map-point.vue";
import PageProfile from "@pages/profile/page-profile.vue";
import PageSign from "@pages/sign-in/sign-in.vue";

/* Компоненты */
import MenuComponent from "./components/ui-menu/menu-sidebar.vue"

import TableUsersComponent from "./components/tables/table-users.vue"
import TableWaysComponent from "./components/tables/table-ways.vue"
import TableMapRoutesComponent from "./components/map-routes/componets/table-map-routes.vue"
import TableQuestComponent from "./components/tables/table-quest.vue"
import TableDotsComponent from "./components/tables/table-dots.vue"
import GetProfileResponse from "./api/dataSource/api/Artifactum/CrmGuide/IServices/Models/Profiles/GetProfileResponse";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name:"sign-in",
      component: PageSign,
    },
        // {
        //   name:"sign-in",
        //   path: "sign-in",
        //   component: PageSign,
        // },
        {
          path: "",
          component: LayoutRouter,
          children: [
          {
            name:"page-transactions",
            path: "page-transactions",
            components: {
              default: PageTransaction,
              menu: MenuComponent
            }
          },
          {
            name:"page-map-routes",
            path: "page-map-routes",
            components: {
              default: PageMapRoutes,
              menu: MenuComponent
            }
          },
          {
            name:"page-edit-map-routes",
            path: "page-edit-map-routes/:id",
            components: {
              default: PageEditMapRoutes,
              menu: MenuComponent
            }
          },
          {
            name:"page-artifacts",
            path: "page-artifacts",
            components: {
              default: PageArtifacts,
              menu: MenuComponent
            }
          },
          {
            name:"page-map-points",
            path: "page-map-points",
            components: {
              default: PageMapPoints,
              menu: MenuComponent
            }
          },
          {
            name:"page-update-map-point",
            path: "page-update-map-point/:id",
            components: {
              default: PageUpdateMapPoint,
              menu: MenuComponent
            }
          },
          {
            name:"page-profile",
            path: "page-profile",
            components: {
              default: PageProfile,
              menu: MenuComponent
            }
          },
        ]
      }, 
      {
        name:"sign-in",
        path: "sign-in",
        component: PageSign
      }, 
      {
          name:"home",
          path: "",
          component: PageHome
        },
        {
          name:"other",
          path: "other/:id?",
          component: PageOther
        }
      
        // {
        //   path: "Новости",
        //   component: EmptyLayout,
        //   children:[
        //     {
        //       name: "news",
        //       path: "",
        //       component: PageNews,
        //       meta: {
        //         title: "Новости"
        //       }
        //     },
        //     {
        //       name: "news-detail",
        //       path: ":code",
        //       component: PageNewsDetail
        //     }
        //   ]
        // },
        
      
    
    // {
    //     name: loginRoute.name,
    //     path: "/" + routeLangPrefix + "/login",
    //     component: LoginComponent,
    //     meta: {
    //         allowAnonymous: true,
    //         title: "Авторизация"
    //     }
    // },
    // {
    //     name: '404',
    //     path: "*",
    //     component: LoginComponent,
    //     meta: {
    //         allowAnonymous: true,
    //         title: "Авторизация"
    //     }
    // },
  ]
});

router.beforeEach((to, from, next) => {

 
  console.log(`route user`, Vue.$api.User);
  // debugger
if (!Vue.$api.User && to.path!='/') {
  Vue.$api.AccountService.GetProfileEvent.once((response) => {
  if(response.IsSuccess) {
    Vue.$api.SetUser({Id:38, Email:response.Value.Email, FullName:response.Value.FullName})
      next()
    }
   
    
  })
  Vue.$api.AccountService.GetProfile()
  // console.log(`route user`, Vue.$api.User);

  next('/')
}
  //var title = Vue.$mainStore.PageTitle;
  // if (to.meta.title) {
  //   if (title) title = `${to.meta.title} | ${title}`;
  //   else title = to.meta.title;
  // }
  // document.title = title;
  // console.log("document.head.title", document.head.title);


  // if(!Vue.$mainStore.SchoolInfo){
  //   Vue.$api.SchoolService.GetSchoolInfoEvent.once(()=>{
  //     next();
  //   });
  //   Vue.$api.SchoolService.GetSchoolInfo();
  // }
  // else
    next() ;
  
});

export default router;
