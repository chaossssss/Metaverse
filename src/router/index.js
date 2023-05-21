import { createRouter, createWebHistory } from "vue-router";
import Base from "@/views/Base.vue";
import Home from "@/views/Home.vue";
const routes = [
  {
    path: "/",
    component: Base,
  },
  {
    path: "/base",
    component: Home,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
