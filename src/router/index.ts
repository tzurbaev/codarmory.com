import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    name: 'weapons.index',
    path: '/weapons/:categoryId?',
    component: () => import('@/weapons/views/WeaponsView.vue'),
    props: true,
  },
  {
    name: 'weapons.show',
    path: '/weapons/:categoryId/:weaponId',
    component: () => import('@/weapons/views/WeaponView.vue'),
    props: true,
  },
  {
    name: 'attachments.index',
    path: '/attachments/:categoryId?',
    component: () => import('@/attachments/views/AttachmentsView.vue'),
    props: true,
  },
  {
    name: 'attachments.show',
    path: '/attachments/:categoryId/:attachmentId/:slug',
    component: () => import('@/attachments/views/AttachmentView.vue'),
    props: true,
  },
  {
    name: 'changelog',
    path: '/changelog',
    component: () => import('@/changelog/views/Changelog.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'errors.404',
    component: () => import('@/views/Error404.vue'),
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(from, to) {
    if (from && to && from.path === to.path) {
      return false;
    }

    return { top: 0 };
  },
});
