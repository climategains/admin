import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "@/composables/UseAuthUser";

const routes = [
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("@/pages/EmailConfirmation.vue"),
  },
  {
    name: "Home",
    path: "/",
    component: () => import("@/pages/Home.vue"),
  },
  {
    name: "Admin",
    path: "/admin",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/components/Dashboard.vue"),
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'home',
        name: 'dashboard',
        component: () => import("@/pages/dash.vue"),
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'profile',
        name: 'profile',
        component: () => import("@/pages/Profile.vue"),
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'programmes/new',
        name: 'new_programme',
        component: () => import("@/pages/programmes/new.vue"),
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'programmes/new/:id',
        name: 'applyprogramme',
        component: () => import("@/pages/programmes/apply.vue")
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'forms',
        name: 'forms',
        component: () => import("@/pages/Forms.vue"),
      },
      {
        path: 'contacts',
        name: 'contacts_page',
        component: () => import("@/pages/Contacts.vue"),
      },
      {
        path: 'programmes',
        name: 'programmes',
        component: () => import("@/pages/programmes/index.vue"),
      },
      {
        path: 'users',
        name: 'users',
        component: () => import("@/pages/users/index.vue"),
      },
      {
        path: 'organizations',
        name: 'organizations',
        component: () => import("@/pages/organizations/index.vue"),
      },
      {
        path: 'organizations/new',
        name: 'new_organization',
        component: () => import("@/pages/organizations/new.vue"),
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import("@/pages/projects/index.vue"),
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    component: () => import("@/pages/ForgotPassword.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/pages/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    to.meta.requiresAuth &&
    !Object.keys(to.query).includes("fromEmail")
  ) {
    return { name: "Login" };
  }
});

export default router;
