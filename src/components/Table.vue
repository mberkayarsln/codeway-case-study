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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';

const parameters = ref([
    {
        key: 'min_version',
        value: '1.4.4',
        description: 'Minimum required version of the app',
        createDate: '10/05/2021 01:58'
    },
    {
        key: 'latest_version',
        value: '1.4.7',
        description: 'Latest version of the app',
        createDate: '10/05/2021 01:58'
    },
    {
        key: 'pricing_tier',
        value: 't6',
        description: 'Pricing tier of the user',
        createDate: '07/07/2021 11:13'
    }
]);
</script>


<style scoped>

th, td {
  padding: 10px 20px;
}

th:first-child, td:first-child {
  padding-left: 0;
}

th:last-child, td:last-child {
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
</style>