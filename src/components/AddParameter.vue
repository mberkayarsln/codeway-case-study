<template>
    <tr v-if="layout === 'desktop'">
        <td>
            <input v-model="form.key" class="table-input" type="text" placeholder="New Parameter" />
        </td>
        <td>
            <input v-model="form.defaultValue" class="table-input" type="text" placeholder="Default Value" />
        </td>
        <td colspan="2">
            <input v-model="form.description" class="table-input" type="text" placeholder="New Description" />
        </td>
        <td>
            <Button @click="submitForm" type="add" />
        </td>
    </tr>

    <div v-else-if="layout === 'mobile'" class="card new-parameter-card">
        <h3 class="card-title">Add New Parameter</h3>
        <input v-model="form.key" class="table-input mobile-input" type="text" placeholder="New key..." />
        <input v-model="form.defaultValue" class="table-input mobile-input" type="text" placeholder="Default Value..." />
        <input v-model="form.description" class="table-input mobile-input" type="text" placeholder="Description..." />
        <div class="card-actions">
            <Button type="add" @click="submitForm" style="width: 100%" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';

defineProps<{
    layout: "desktop" | "mobile"
}>();

const emit = defineEmits(['add']);

const form = ref({
    key: "",
    defaultValue: "",
    description: "",
    countryValues: {}
});

const submitForm = () => {
    if (!form.value.key || !form.value.defaultValue || !form.value.description) {
        alert("Key, default value, and description are required.");
        return;
    }

    emit('add', { ...form.value });

    form.value = {
        key: "",
        defaultValue: "",
        description: "",
        countryValues: {}
    };
};
</script>

<style scoped>
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

.card-title {
    color: var(--text-white);
    margin-bottom: 1rem;
}

.card-actions {
    display: flex;
    justify-content: center;
    margin-top: 0.75rem;
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
</style>