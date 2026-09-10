import { ENDPOINTS } from "@/api/endpoints";
import { del, get, patch, post, put } from "@/api/request";

const workOrderService = {
    getWorkOrders() {
        return get(ENDPOINTS.WORK_ORDERS.BASE);
    },

    getWorkOrderById(id) {
        return get(ENDPOINTS.WORK_ORDERS.BY_ID(id));
    },

    createWorkOrder(data) {
        return post(ENDPOINTS.WORK_ORDERS.BASE, data);
    },

    updateWorkOrder(id, data) {
        return put(ENDPOINTS.WORK_ORDERS.BY_ID(id), data);
    },

    deleteWorkOrder(id) {
        return del(ENDPOINTS.WORK_ORDERS.BY_ID(id));
    },

    assignWorkOrder(id) {
        return patch(ENDPOINTS.WORK_ORDERS.ASSIGN(id));
    },

    startWorkOrder(id) {
        return patch(ENDPOINTS.WORK_ORDERS.START(id));
    },

    completeWorkOrder(id) {
        return patch(ENDPOINTS.WORK_ORDERS.COMPLETE(id));
    },

    cancelWorkOrder(id) {
        return patch(ENDPOINTS.WORK_ORDERS.CANCEL(id));
    },
};

export default workOrderService;