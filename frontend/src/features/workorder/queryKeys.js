export const workOrderKeys = {
    all: ["work-orders"],

    lists: () => [...workOrderKeys.all, "list"],

    list: () => [...workOrderKeys.lists()],

    details: () => [...workOrderKeys.all, "detail"],

    detail: (id) => [...workOrderKeys.details(), id],
};










// workorder
// │
// ├── components
// │   ├── WorkOrderColumns.js
// │   ├── WorkOrderForm.jsx
// │   ├── WorkOrderActions.jsx
// │   └── index.js
// │
// ├── hooks
// │   ├── useWorkOrders.js
// │   ├── useWorkOrder.js
// │   ├── useCreateWorkOrder.js
// │   ├── useUpdateWorkOrder.js
// │   ├── useDeleteWorkOrder.js
// │   ├── useAssignWorkOrder.js
// │   ├── useStartWorkOrder.js
// │   ├── useCompleteWorkOrder.js
// │   ├── useCancelWorkOrder.js
// │   └── index.js
// │
// ├── services
// │   └── workOrderService.js
// │
// ├── validation
// │   └── workOrderSchema.js
// │
// ├── queryKeys.js
// │
// └── pages
//     └── WorkOrderPage.jsx