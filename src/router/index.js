import { createRouter, createWebHashHistory } from "vue-router";
import Base from "@/views/Base.vue";
import Home from "@/views/Home.vue";
import Map from "@/views/Map.vue";
const routes = [
  {
    path: "/",
    component: Base,
  },
  {
    path: "/base",
    component: Home,
  },
  {
    path: "/map",
    component: Map,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
