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
      name: "dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: {
        layout: "blank",
      },
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
      path: "*",
      redirect: "error-404",
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/Products.vue"),
      meta: {
        layout: "content",
      },
    },
    {
      path: "/consignors",
      name: "consignors",
      component: () => import("../views/Consignors.vue"),
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
