import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/index.vue"),
  },
  {
    path: "/prodetail",
    name: "ProjectDetail",
    component: () => import("../views/ProDetail/index.vue"),
    props: (route) => ({ pid: route.query.pid }),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

export default router;
