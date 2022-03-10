import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/main/Login";
import ForgotPwd from "../views/main/ForgotPwd";
import ResetPwd from "../views/main/ResetPwd";
import store from '../store/index'
import Register from "../views/main/Register";
import Verify from "../views/main/Verify";
import ContactUs from "../views/main/ContactUs";
import AboutUs from "../views/main/AboutUs";
import MasterIndex from "../views/master/index";
import UserIndex from "../views/user/index";
import MainIndex from "../views/main/index";
import MasterDashboard from "../views/master/Dashboard"
import UserDashboard from "../views/user/Dashboard"
import NotFound from "../views/error/NotFound";
import Home from "../views/main/Home";
import {Roles} from "../utils/role";
import Unauthorized from "../views/error/Unauthorized";
import Customers from "../views/master/Customers";
import Campuses from "../views/master/Campuses";
import Credits from "../views/master/Credits";
import Invoices from "../views/master/Invoices";
import Messages from "../views/master/Messages";
import MyUsers from "../views/master/MyUsers";
import NicheAchieve from "../views/master/NicheAchieve";
import Templates from "../views/master/Templates";
import Transactions from "../views/master/Transactions";
import University from "../views/master/University";
import ContactList from "../views/master/ContactList";
import MyCustomers from "../views/master/MyCustomers";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'main',
        redirect: '/app',
        component: MainIndex,
        children: [
            {
                path: '/app',
                name: 'Home',
                component: Home
            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
            },
            {
                path: '/forgot-pwd',
                name: 'ForgotPwd',
                component: ForgotPwd
            },
            {
                path: '/verify',
                name: 'Verify',
                component: Verify
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/reset-pwd',
                name: 'ResetPwd',
                component: ResetPwd
            },
            {
                path: '/contact-us',
                name: 'ContactUs',
                component: ContactUs
            },
            {
                path: '/about-us',
                name: 'AboutUs',
                component: AboutUs
            },
        ],
    },

    {
        path: '/master',
        name: 'index',
        redirect: '/master/dashboard',
        component: MasterIndex,
        children: [
            {
                path: 'dashboard',
                name: 'Master',
                component: MasterDashboard,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'customers',
                name: 'Customers',
                component: Customers,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'contact-list',
                name: 'ContactList',
                component: ContactList,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'my-customers',
                name: 'MyCustomers',
                component: MyCustomers,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'campuses',
                name: 'Campuses',
                component: Campuses,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'credits',
                name: 'Credits',
                component: Credits,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'invoices',
                name: 'Invoices',
                component: Invoices,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'messages',
                name: 'Messages',
                component: Messages,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'my-users',
                name: 'MyUsers',
                component: MyUsers,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'niche-achieve',
                name: 'NicheAchieve',
                component: NicheAchieve,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'templates',
                name: 'Templates',
                component: Templates,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'transactions',
                name: 'Transactions',
                component: Transactions,
                meta: {loginRequired: true, role: Roles.Admin},
            },
            {
                path: 'university',
                name: 'University',
                component: University,
                meta: {loginRequired: true, role: Roles.Admin},
            }
        ],
    }, {
        path: '/user',
        name: 'user',
        redirect: '/user/dashboard',
        component: UserIndex,
        children: [
            {
                path: 'dashboard',
                name: 'User',
                component: UserDashboard,
                meta: {loginRequired: true, role: Roles.Admin},
            }
        ],
    },

    {
        path: '*',
        component: NotFound
    },
    {
        name: 'Unauthorized',
        path: '/unauthorized',
        component: Unauthorized
    }


]

const router = new VueRouter({
    routes,
    mode: "history",
})

// router.beforeEach((to, from, next) => {
//     let current_user = getCurrentUser();
//     const {loginRequired, role} = to.meta;
//     if (loginRequired && !isAuthenticated()) {
//         return next({name: 'Login', query: {return: to.path}})
//     }
//     if (loginRequired && isAuthenticated() && role.name !== current_user.role) {
//         return next({name: 'Unauthorized', query: {name: role.urlName}})
//     }
//
//     store.dispatch('main/a_loading', true);
//     next()
// })
router.afterEach(() => {
    store.dispatch('main/a_loading', false)
})
export default router
