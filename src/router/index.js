import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TestView.vue')
  },
  {
    path: '/createteam',
    name: 'createteam',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateTeamView.vue')
  },
  {
    path: '/team',
    name: 'team',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/passages',
    name: 'passages',
    component: () => import('../views/PassagesView.vue')
  },
  {
    path: '/passage',
    name: 'passage',
    component: () => import('../views/PassageView.vue')
  },
  {
    path: '/createpassage',
    name: 'createpassage',
    component: () => import('../views/CreatePassageView.vue')
  },
  {
    path: '/problems',
    name: 'Problems',
    component: () => import('../views/ProblemsView.vue')
  },
  {
    path: '/problem',
    name: 'Problem',
    component: () => import('../views/ProblemView.vue')
  },
  {
    path: '/contest',
    name: 'contest',
    component: () => import('../views/ContestView.vue')
  },
  {
    path: '/createcontest',
    name: 'createcontest',
    component: () => import('../views/CreateContestView.vue')
  },
  {
    path: '/contestmore',
    name: 'contestmore',
    component: () => import('../views/ContestMore.vue')
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: () => import('../views/transfer.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
