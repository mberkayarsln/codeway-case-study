<template>
    <Navbar />
    <div class="home-wrapper">
        <div class="home-content">
            <Table />
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Table from '@/components/Table.vue';

</script>

<style scoped>
.home-wrapper {
    height: 100vh;
    padding: 1rem 2rem;
}
</style>