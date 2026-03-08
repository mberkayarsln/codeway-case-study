<template>
    <button class="button" :class="buttonClass">
        {{ buttonText }}
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ButtonType = "edit" | "delete" | "add";

const props = defineProps<{
    type: ButtonType;
}>();

const buttonText = computed(() => {
    switch (props.type) {
        case "edit":
            return "Edit";
        case "delete":
            return "Delete";
        case "add":
            return "ADD";
        default:
            return "Button";
    }
});

const buttonClass = computed(() => {
    switch (props.type) {
        case "edit":
            return "edit-button";
        case "delete":
            return "delete-button";
        case "add":
            return "add-button";
        default:
            return "";
    }
});

</script>

<style scoped>
.button {
    color: var(--text-white);
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    outline: none;
    font-weight: bold;
    font-size: 0.8rem;
}

.edit-button {
    background: linear-gradient(to top right, var(--btn-blue-grad-start), var(--btn-blue-grad-end));
}

.delete-button {
    background: linear-gradient(to top right, var(--btn-red-grad-start), var(--btn-red-grad-end));
}

.add-button {
    background: linear-gradient(to top right, var(--btn-turquoise-grad-start), var(--btn-turquoise-grad-end));
}
</style>