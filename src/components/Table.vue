<template>
    <table class="table">
        <thead>
            <tr>
                <th class="table-header">Parameter Key</th>
                <th class="table-header">Value</th>
                <th class="table-header">Description</th>
                <th class="table-header">Create Date</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="parameter in parameters" :key="parameter.key">
                <td class="table-data">{{ parameter.key }}</td>
                <td class="table-data">{{ parameter.value }}</td>
                <td class="table-data">{{ parameter.description }}</td>
                <td class="table-data">{{ parameter.createDate }}</td>
                <td style="display: flex; gap: 1rem;">
                    <Button type="edit" />
                    <Button type="delete" />
                </td>
            </tr>
            <tr>
                <td>
                    <input class="table-input" type="text" placeholder="Add new parameter..." />
                </td>
                <td>
                    <input class="table-input" type="text" placeholder="Add new parameter..." />
                </td>
                <td>
                    <input class="table-input" type="text" placeholder="Add new parameter..." />
                </td>
                <td>
                    <input class="table-input" type="text" placeholder="Add new parameter..." />
                </td>
                <td>
                    <Button type="add" />
                </td>
            </tr>
        </tbody>
    </table>

    <div class="cards">
        <div class="card" v-for="parameter in parameters" :key="parameter.key">
            <p class="card-row"><span class="card-label">Parameter Key:</span> {{ parameter.key }}</p>
            <p class="card-row"><span class="card-label">Value:</span> {{ parameter.value }}</p>
            <p class="card-row"><span class="card-label">Description:</span> {{ parameter.description }}</p>
            <p class="card-row"><span class="card-label">Create Date:</span> {{ parameter.createDate }}</p>
            <div class="card-actions">
                <Button type="edit" />
                <Button type="delete" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from './Button.vue';
import { fetchWithAuth } from '@/services/api';

interface Parameter {
    key: string;
    value: string;
    description: string;
    createDate: string;
}

const parameters = ref<Parameter[]>([]);

const loadParameters = async () => {
    try {
        const data = await fetchWithAuth("/api/parameters");
        parameters.value = data.parameters || [];
    } catch (error) {
        console.error('Failed to load parameters:', error);
    }
};

onMounted(() => {
    loadParameters();
});

</script>


<style scoped>
.cards {
    display: none;
}

th,
td {
    padding: 10px 20px;
}

th:first-child,
td:first-child {
    padding-left: 0;
}

th:last-child,
td:last-child {
    padding-right: 0;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table-header {
    font-size: 1.5rem;
    font-weight: 100;
    color: var(--text-light-gray);
    text-align: left;
}

.table-data {
    font-size: 1rem;
    color: var(--text-main);
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

@media (max-width: 768px) {
    .table {
        display: none;
    }

    .cards {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>