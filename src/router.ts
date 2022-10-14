import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import BaseLayout from "@layouts/base-layout.vue";
import PageHome from "@pages/home/home.vue";
import PageOther from "@pages/other/other.vue";
import PageMainScreen from "@pages/main-screen/main.vue";
import PageAboutApp from "@pages/about-app/about-app.vue";
import PageCountries from "@pages/countries/countries.vue";
import PagePartners from "@pages/partners/partners.vue";
import PageFeedback from "@pages/feedback/feedback.vue";
import PageIdea from "@pages/idea/idea.vue";
import PageContacts from "@pages/contacts/contacts.vue";
import PageDevelop from "@pages/develop-page/develop-page.vue";



const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "layout",
      path: "/",
      component: BaseLayout,
      children: [
        
        {
          name:"",
          path: "",
          component: PageMainScreen
        },
        {
          name:"main",
          path: "home",
          component: PageMainScreen
        },
        {
          name:"about-app",
          path: "about",
          component: PageAboutApp
        },
        {
          name:"partners",
          path: "partners",
          component: PagePartners
        },
        {
          name:"feedback",
          path: "feedback",
          component: PageDevelop
        },
        {
          name:"idea",
          path: "idea",
          component: PageDevelop
        },
        {
          name:"contacts",
          path: "contacts",
          component: PageDevelop
        },
        {
          name:"countries",
          path: "countries",
          component: PageCountries
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
        
      ]
    }
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
 // console.log(to, from, next);
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
    next();
  
});

export default router;
