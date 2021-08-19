import Vue from "vue"
import VueRouter from "vue-router"
import { authGuard } from "../auth/authGuard"

Vue.use(VueRouter)

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        layout: "content",
      },
    },
    {
      path: "/login",
      name: "auth-login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "blank",
      },
    },
    {
      path: "*",
      redirect: "error-404",
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue"),
      meta: {
        layout: "content",
      },
    },
    {
      path: "/event/:id",
      name: "eventSingle",
      component: () => import("../views/EventSingle.vue"),
      beforeEnter: authGuard,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})
