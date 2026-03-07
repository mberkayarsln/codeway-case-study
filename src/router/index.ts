import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import SignInView from "@/views/SignInView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: { requiresAuth: true }
        },
        {
            path: "/sign-in",
            name: "sign-in",
            component: SignInView
        }
    ]
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    })
}

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth) {
        const user = await getCurrentUser();
        if (user) {
            next();
        } else {
            next("/sign-in");
        }
    }
    else {
        next();
    }
})

export default router;