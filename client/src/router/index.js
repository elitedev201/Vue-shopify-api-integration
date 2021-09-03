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
  {
    path: "/payouts",
    name: "Payouts",
    component: () => import("../views/Payouts.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/payout/:vendor",
    name: "PayoutDetail",
    component: () => import("../views/PayoutDetail.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/consignors",
    name: "Consignors",
    component: () => import("../views/Consignors.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/consignor/:id",
    name: "ConsignorDetail",
    component: () => import("../views/ConsignorDetail.vue"),
    beforeEnter: authGuard,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
