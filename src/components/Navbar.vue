<template>
    <nav class="navbar" ref="navbarRef">
        <div class="logo">
            <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
        </div>
        <div class="profile">
            <button class="profile-trigger" @click.stop="toggleDropdown">
                <img src="@/assets/profile.svg" alt="Profile" class="profile-image" />
                <img src="@/assets/chevron.svg" alt="Chevron" class="chevron"
                    :class="{ 'chevron--open': isDropdownOpen }" />
            </button>
            <div v-if="isDropdownOpen" class="dropdown">
                <button class="dropdown-item" @click="signOutUser">Sign out</button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const signOutUser = async () => {
    await signOut(getAuth());
    isDropdownOpen.value = false;
    router.push('/sign-in');
};
</script>

<style scoped>
.navbar {
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-image {
    height: 32px;
}

.profile {
    position: relative;
}

.profile-trigger {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
}

.profile-image {
    height: 32px;
    display: block;
}

.chevron {
    color: var(--text-light-gray);
    transition: transform 0.2s ease;
}

.chevron--open {
    transform: rotate(180deg);
}

.dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    min-width: 140px;
    background: var(--bg-orange);
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    padding: 0.25rem;
    z-index: 1000;
}

.dropdown-item {
    width: 100%;
    text-align: left;
    background: transparent;
    color: var(--text-white);
    border: none;
    font-weight: bold;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
}
</style>