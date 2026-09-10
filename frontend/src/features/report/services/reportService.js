import * as reportApi from "../api/reportApi";

export const reportService = {

    async getEquipmentReport() {
        const response = await reportApi.getEquipmentReport();
        return response.data;
    },

    async getIssueReport() {
        const response = await reportApi.getIssueReport();
        return response.data;
    },

    async getWorkOrderReport() {
        const response = await reportApi.getWorkOrderReport();
        return response.data;
    },

    async getEmployeeReport() {
        const response = await reportApi.getEmployeeReport();
        return response.data;
    }

};