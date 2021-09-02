import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import { authGuard } from "../auth/authGuard"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/Products.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/create_product",
    name: "CreateProduct",
    component: () => import("../views/CreateProduct.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/product/:productid",
    name: "ProductDetail",
    component: () => import("../views/ProductDetail.vue"),
    beforeEnter: authGuard,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
