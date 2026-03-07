<template>
    <div class="signin-wrapper">
        <div class="signin-content">
            <div class="logo-container">
                <img src="@/assets/logo.png" alt="Logo" class="logo" />
            </div>

            <p class="signin-prompt">Please sign in</p>

            <p v-if="errorMessage" style="color: var(--text-error); margin-bottom: 1rem;">{{ errorMessage }}</p>

            <form @submit.prevent="handleSignIn" class="signin-form">
                <div class="input-wrapper email-input">
                    <input type="email" v-model="email" placeholder="E-mail address" required />
                </div>

                <div class="input-wrapper password-input">
                    <input type="password" v-model="password" placeholder="Password" required />
                </div>

                <button type="submit" class="signin-button" :disabled="isLoading">
                    <span v-if="isLoading">Signing in...</span>
                    <span v-else>Sign in</span>
                </button>
            </form>
        </div>

        <footer class="signin-footer">
            Codeway © 2021
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/firebase";

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const router = useRouter();

const handleSignIn = async () => {
    errorMessage.value = "";
    isLoading.value = true;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log('Logged in successfully:', userCredential.user.email);

        router.push('/');
    }
    catch (error: any) {
        console.error('Login failed:', error.message);

        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMessage.value = 'Invalid email or password.';
        } else {
            errorMessage.value = 'Failed to sign in. Please try again later.';
        }
    }
    finally {
        isLoading.value = false;
    }

};
</script>

<style scoped>
.signin-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 100vh;
    padding: 2rem 0;
}

.signin-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    max-width: 320px;
}

.logo-container {
    margin-bottom: 2rem;
}

.logo {
    width: 250px;
    max-width: 100%;
    height: auto;
}

.signin-prompt {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--text-dark-purple);
}

.signin-form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.input-wrapper {
    width: 100%;
}

.input-wrapper input {
    width: 100%;
    padding: 0.75rem 0.5rem;
    background-color: transparent;
    border: 1px solid var(--border-gray);
    font-size: 1.25rem;
    color: var(--text-main);
    outline: none;
    position: relative;
    transition: border-color 0.4s ease;
    z-index: 1;
}

.input-wrapper input::placeholder {
    color: var(--text-placeholder);
}

.input-wrapper input:focus {
    border-color: var(--border-pink);
    z-index: 2;
}

.email-input input {
    border-radius: 6px 6px 0 0;
    margin-bottom: -1px;
}

.password-input input {
    border-radius: 0 0 6px 6px;
}

.signin-button {
    width: 100%;
    margin-top: 14px;
    font-size: 1rem;
    font-weight: 500;
    padding: 1rem;
    background: linear-gradient(to top right, var(--btn-signin-grad-start), var(--btn-signin-grad-end));
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    color: var(--text-white);
}

.signin-footer {
    color: var(--text-placeholder);
}
</style>