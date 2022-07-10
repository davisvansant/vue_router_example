import { createRouter, createWebHistory } from "vue-router";
import useDataStore from "../stores/data";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";

function checkAuthentication() {
  const store = useDataStore();

  if (store.data.authenticated === false) {
    router.push("/");
  }
}

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: [checkAuthentication],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
