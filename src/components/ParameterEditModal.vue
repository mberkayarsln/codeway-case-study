<template>
    <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
        <div class="modal-card">
            <h2 class="modal-title">Edit Parameter</h2>
            
            <div class="form-group">
                <label>Key</label>
                <input v-model="form.key" class="table-input" type="text" />
            </div>
            
            <div class="form-group">
                <label>Description</label>
                <input v-model="form.description" class="table-input" type="text" />
            </div>

            <div class="form-group">
                <label>Default Value</label>
                <input v-model="form.defaultValue" class="table-input" type="text" />
            </div>

            <div class="form-group">
                <label class="country-values-label">
                    Country Values
                    <Button type="add" @click="addCountryValue">+ Add</Button>
                </label>
                
                <div v-for="(val, code) in form.countryValues" :key="code" class="country-value-row">
                    <input 
                        class="table-input code-input" 
                        type="text" 
                        placeholder="e.g. TR" 
                        :value="code"
                        @input="updateCountryKey(code, ($event.target as HTMLInputElement).value)"
                    />
                    <input 
                        v-model="form.countryValues[code]" 
                        class="table-input val-input" 
                        type="text" 
                        placeholder="Value" 
                    />
                    <Button type="delete" @click="removeCountryValue(code)" />
                </div>
                
                <div v-if="Object.keys(form.countryValues).length === 0" class="no-countries">
                    No country specific values setup.
                </div>
            </div>

            <div class="modal-actions">
                <Button type="cancel" @click="closeModal">Cancel</Button>
                <Button type="save" @click="saveForm">Save</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from './Button.vue';
import type { Parameter } from '@/types';

const props = defineProps<{
    parameter: Parameter | null;
    isOpen: boolean;
}>();

const emit = defineEmits(['close', 'save']);

const form = ref({
    id: "",
    key: "",
    description: "",
    defaultValue: "",
    countryValues: {} as Record<string, string>,
    updatedAt: ""
});

watch(() => props.isOpen, (newVal) => {
    if (newVal && props.parameter) {
        form.value = {
            id: props.parameter.id,
            key: props.parameter.key,
            description: props.parameter.description,
            defaultValue: props.parameter.defaultValue || (props.parameter as any).value || "",
            countryValues: { ...(props.parameter.countryValues || {}) },
            updatedAt: props.parameter.updatedAt
        };
    }
});

const closeModal = () => {
    emit('close');
};

const saveForm = () => {
    if (!form.value.key || !form.value.description || !form.value.defaultValue) {
        alert("Key, Default Value and Description are required.");
        return;
    }

    emit('save', { ...form.value });
};

const addCountryValue = () => {
    const newKey = "";
    form.value.countryValues[newKey] = "";
};

const updateCountryKey = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;
    
    const newCountryValues: Record<string, string> = {};
    for (const [k, v] of Object.entries(form.value.countryValues)) {
        if (k === oldKey) {
            newCountryValues[newKey] = v;
        } else {
            newCountryValues[k] = v;
        }
    }
    form.value.countryValues = newCountryValues;
};

const removeCountryValue = (code: string) => {
    const { [code]: removed, ...rest } = form.value.countryValues;
    form.value.countryValues = rest;
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-card {
    background: var(--bg-dark);
    border: 1px solid var(--border-gray);
    border-radius: 12px;
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-title {
    color: var(--text-white);
    margin-top: 0;
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1.25rem;
}

.form-group label {
    display: block;
    color: var(--text-main);
    margin-bottom: 0.5rem;
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

.table-input:focus {
    border-color: var(--btn-blue-grad-start);
}

.country-values-label {
    display: flex !important;
    justify-content: space-between;
    align-items: center;
}

.country-value-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    align-items: center;
}

.code-input {
    flex: 1;
}

.val-input {
    flex: 3;
}

.no-countries {
    color: var(--text-placeholder);
    font-size: 0.9rem;
    font-style: italic;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
}
</style>
