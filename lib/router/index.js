import Vue from 'vue';
import routes from './routes.js';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

export var router = new VueRouter({
  linkActiveClass: "active",
  routes: routes });