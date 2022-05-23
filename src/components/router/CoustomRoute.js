import Vue from "vue";
import VueRouter from "vue-router";
import GetApi from "../GetApi.vue";
import PostApi from "../PostApi"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    props:true,
    name: "GetApi",
    component: GetApi,
  },
  {
    path: "/about",
    name: "about",
    component: PostApi
  },
    {
    path: "/edit/:id",
    name: "edit",
    props:true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../EditApi.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
