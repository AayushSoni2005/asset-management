import api from "@/api/axios";

export const getEquipmentReport = () =>
    api.get("/reports/equipment");

export const getIssueReport = () =>
    api.get("/reports/issues");

export const getWorkOrderReport = () =>
    api.get("/reports/work-orders");

export const getEmployeeReport = () =>
    api.get("/reports/employees");