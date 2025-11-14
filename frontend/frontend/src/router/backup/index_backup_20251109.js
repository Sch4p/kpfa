/* eslint-disable vue/multi-word-component-names */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
//import Players from '../views/Players.vue'
import News from '../views/News.vue'
import JoinUsForm from "../views/JoinUsForm.vue"
import FanAuth from "../views/FanAuth.vue"
import Teams from "../views/Teams.vue"
//import eShop from '../views/eShop.vue';
import ProductDetail from "@/views/ProductDetail.vue";
import Orders from "../views/Orders.vue";






const routes = [
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
  path: "/order-summary/:id",
  name: "OrderSummary",
  component: () => import("../views/OrderSummary.vue"),
  props: true,
  },
  { path: '/', name: 'Home', component: Home },
  {
  path: '/videos',
  name: 'AcademyVideos',
  component: () => import('@/views/AcademyVideos.vue'),
  },
  { path: '/about', 
  name: 'AboutContact', 
  component: () => import('../views/AboutContact.vue') },
  { path: '/cart', 
  name: 'Cart', 
  component: () => import('../views/Cart.vue') },
  { path: '/checkout', 
  name: 'Checkout', 
  component: () => import('../views/Checkout.vue') },
  { path: '/matches', name: 'Matches', component: () => import('@/views/Matches.vue')},
  {
  path: '/matches/:id',
  name: 'MatchDetail',
  component: () => import('@/views/MatchDetail.vue'),
  props: true
  },
  //{ path: '/cart', name: 'Cart', component: Cart }, 
  { path: '/news', name: 'News', component: News },
  {
  path: '/news/:id',
  name: 'NewsDetail',
  component: () => import('@/views/NewsDetail.vue'),
  },
  { path: '/join-us', name: 'JoinUsForm', component: JoinUsForm },
  { path: '/fan-auth', name: 'FanAuth', component: FanAuth },
  {
  path: "/eshop",
  name: "eShop",
  component: () => import("@/views/eShop.vue"),
  },
   {
    path: "/eshop/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true, // allows route params to be passed as props
  },
 
  {path: '/Players/:id',
   name: 'PlayerDetail',
   component: () => import('../views/PlayerDetail.vue'),
   props: true
  },
  {
    path: "/candidate-checkout/:candidateId",
    name: "CandidateRegistrationCheckout",
    component: () => import("@/views/CheckOut_Candidate.vue"),
    props: true, // allows us to access route param as a prop inside the component
  },
  {
  path: "/candidate/dashboard/:candidateId",
  name: "CandidateDashboard",
  component: () => import("@/views/CandidateDashboard.vue"),
  props: true,
 },

{
  path: "/mock-payment",
  name: "MockPayment",
  component: () => import("@/views/MockPayment.vue"),
  props: route => ({ reference: route.query.ref })
},
{
  path: "/candidate/payment-success",
  name: "CandidatePaymentSuccess",
  component: () => import("@/views/CandidatePaymentSuccess.vue"),
},



{
  path: '/teams',
  component: Teams,
  children: [
     {
      path: '', // default tab = Men
      name: 'Men',
      component: () => import('@/views/Men.vue')
      },
      {
        path: 'women',
        name: 'Women',
        component: () => import('@/views/Women.vue')
      },
      {
        path: 'junior',
        name: 'Junior',
        component: () => import('@/views/Junior.vue')
      },
      
      {
        path: 'player/:team/:id',
        name: 'PlayerDetail',
        component: () => import('@/views/PlayerDetail.vue'),
        props: true
      },
     
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
