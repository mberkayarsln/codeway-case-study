import { ref } from "vue";
import { fetchWithAuth } from "@/services/api";
import type { Parameter } from "@/types";

export function useParameters() {
    const parameters = ref<Parameter[]>([]);

    const loadParameters = async () => {
        try {
            const data = await fetchWithAuth("/api/parameters");
            parameters.value = data.parameters || [];
        } catch (error) {
            console.error("Error loading parameters:", error);
        }
    }

    const addParameter = async (newParamData: { key: string, defaultValue: string, description: string, countryValues?: Record<string, string> }) => {
        try {
            const createdParameter = await fetchWithAuth("/api/parameters", {
                method: "POST",
                body: JSON.stringify(newParamData)
            });

            parameters.value.unshift(createdParameter);
        } catch (error) {
            console.error('Failed to add parameter:', error);
            alert("Parametre eklenirken bir hata oluştu.");
        }
    };

    const updateParameter = async (updatedData: Parameter) => {
        try {
            const response = await fetchWithAuth(`/api/parameters/${updatedData.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    key: updatedData.key,
                    defaultValue: updatedData.defaultValue,
                    countryValues: updatedData.countryValues,
                    description: updatedData.description,
                    updatedAt: updatedData.updatedAt
                })
            });

            const index = parameters.value.findIndex(p => p.id === updatedData.id);
            if (index !== -1) {
                parameters.value[index] = response;
            }
        } catch (error: any) {
            console.error('Failed to update parameter:', error);
            if (error.status === 409) {
                alert("This parameter has been modified by someone else. Refreshing to get the latest data.");
                await loadParameters();
            } else {
                alert("Parametre güncellenirken bir hata oluştu.");
            }
        }
    };

    const deleteParameter = async (id: string) => {
        if (!confirm("Bu parametreyi silmek istediğinize emin misiniz?")) return;

        try {
            await fetchWithAuth(`/api/parameters/${id}`, {
                method: "DELETE"
            });

            parameters.value = parameters.value.filter(p => p.id !== id);
        } catch (error) {
            console.error('Failed to delete parameter:', error);
            alert("Parametre silinirken bir hata oluştu.");
        }
    };

    return {
        parameters,
        loadParameters,
        addParameter,
        updateParameter,
        deleteParameter
    };
}