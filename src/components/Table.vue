<template>
    <table class="table">
        <thead>
            <tr>
                <th class="table-header">Parameter Key</th>
                <th class="table-header">Default Value</th>
                <th class="table-header">Description</th>
                <th class="table-header">Create Date</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <ParameterItem 
                v-for="parameter in parameters" 
                :key="parameter.id" 
                :parameter="parameter"
                layout="desktop"
                @edit="openEditModal"
                @delete="deleteParameter"
            />
            
            <AddParameter layout="desktop" @add="addParameter" />
        </tbody>
    </table>

    <div class="cards">
        <ParameterItem 
            v-for="parameter in parameters" 
            :key="parameter.id" 
            :parameter="parameter"
            layout="mobile"
            @edit="openEditModal"
            @delete="deleteParameter"
        />
        
        <AddParameter layout="mobile" @add="addParameter" />
    </div>

    <ParameterEditModal
        :is-open="isEditModalOpen"
        :parameter="currentEditParameter"
        @close="closeEditModal"
        @save="handleSaveEdit"
    />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ParameterItem from './ParameterItem.vue';
import AddParameter from './AddParameter.vue';
import ParameterEditModal from './ParameterEditModal.vue';
import { useParameters } from '@/composables/useParameters';

const { 
    parameters, 
    loadParameters, 
    addParameter, 
    updateParameter, 
    deleteParameter 
} = useParameters();

const isEditModalOpen = ref(false);
const currentEditParameter = ref(null);

const openEditModal = (parameter: any) => {
    currentEditParameter.value = parameter;
    isEditModalOpen.value = true;
};

const closeEditModal = () => {
    isEditModalOpen.value = false;
    currentEditParameter.value = null;
};

const handleSaveEdit = async (updatedData: any) => {
    await updateParameter(updatedData);
    closeEditModal();
};

onMounted(() => {
    loadParameters();
});
</script>

<style scoped>
.cards {
    display: none;
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