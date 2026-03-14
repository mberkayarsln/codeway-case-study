<template>
    <tr v-if="layout === 'desktop'">

        <td class="table-data">{{ parameter.key }}</td>
        <td class="table-data">{{ parameter.defaultValue || (parameter as any).value }}</td>
        <td class="table-data">{{ parameter.description }}</td>
        <td class="table-data">{{ parameter.createDate }}</td>
        <td style="display: flex; gap: 1rem;">
            <Button type="edit" @click="$emit('edit', parameter)" />
            <Button type="delete" @click="$emit('delete', parameter.id)" />
        </td>
    </tr>

    <div v-else-if="layout === 'mobile'" class="card">

        <p class="card-row"><span class="card-label">Parameter Key:</span> {{ parameter.key }}</p>
        <p class="card-row"><span class="card-label">Value:</span> {{ parameter.defaultValue || (parameter as any).value }}</p>
        <p class="card-row"><span class="card-label">Description:</span> {{ parameter.description }}</p>
        <p class="card-row"><span class="card-label">Create Date:</span> {{ parameter.createDate }}</p>
        <div class="card-actions">
            <Button type="edit" @click="$emit('edit', parameter)" />
            <Button type="delete" @click="$emit('delete', parameter.id)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import type { Parameter } from '@/types';

const props = defineProps<{
    parameter: Parameter;
    layout: "desktop" | "mobile";
}>()

const emit = defineEmits(['edit', 'delete']);

</script>

<style scoped>
.table-data {
    font-size: 1rem;
    color: var(--text-main);
}

th, td {
    padding: 10px 20px;
}

th:first-child, td:first-child {
    padding-left: 0;
}

th:last-child, td:last-child {
    padding-right: 0;
}

.table-input {
    padding: 0.75rem 0.5rem;
    width: 100%;
    background-color: transparent;
    border: 1px solid var(--border-gray);
    font-size: 1rem;
    color: var(--text-main);
    outline: none;
    border-radius: 8px;
}

.table-input::placeholder {
    color: var(--text-placeholder);
}

.mobile-input {
    margin-bottom: 0.75rem;
}

.card {
    background: var(--bg-dark);
    border: 1px solid var(--border-gray);
    border-radius: 12px;
    padding: 1rem 1.25rem;
}

.card-row {
    margin: 0.3rem 0;
    font-size: 0.95rem;
    color: var(--text-main);
}

.card-label {
    font-weight: 700;
    color: var(--text-white);
}

.card-actions {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.75rem;
}
</style>