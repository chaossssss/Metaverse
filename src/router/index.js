import { createRouter, createWebHistory } from "vue-router";
import Base from "@/views/Base.vue";
import Home from "@/views/Home.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/base",
    component: Base,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
