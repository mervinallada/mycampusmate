import { createRouter, createWebHistory } from "vue-router";

// CREATE ROUTER INSTANCE TO BE USED BY THE APP
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: () => import("@/pages/login.vue"),
    },
    {
      path: "/register",
      component: () => import("@/pages/register.vue"),
    },
    {
      path: "/admin/dashboard",
      component: () => import("@/pages/admin/dashboard.vue"),
    },
    {
      path: "/admin/user-applications",
      component: () => import("@/pages/admin/applications/index.vue"),
    },
    {
      path: "/admin/user-applications/:id",
      component: () => import("@/pages/admin/applications/[id].vue"),
    },
    {
      path: "/admin/settings",
      component: () => import("@/pages/admin/settings.vue"),
    },
    {
      path: "/admin/community",
      component: () => import("@/pages/admin/community.vue"),
    },
    {
      path: "/admin/messages",
      component: () => import("@/pages/admin/messages.vue"),
    },
    {
      path: "/admin/reported-posts",
      component: () => import("@/pages/admin/reports.vue"),
    },
    {
      path: "/student/newsfeed",
      component: () => import("@/pages/student/dashboard.vue"),
    },
    {
      path: "/student/messages/:id",
      component: () => import("@/pages/student/messages.vue"),
    },
    {
      path: "/student/group-chat",
      component: () => import("@/pages/student/group-chat.vue"),
    },
    {
      path: "/student/group-chat/:id",
      component: () => import("@/pages/student/group-chat-convo.vue"),
    },
    {
      path: "/student/profile",
      component: () => import("@/pages/student/profile.vue"),
    },
    {
      path: "/student/help",
      component: () => import("@/pages/student/help.vue"),
    },
    {
      path: "/student/users",
      component: () => import("@/pages/student/users.vue"),
    },
  ],
});

export default router;
