export const usePrimeFunctions = () => {
    let dialog = useConfirm();
    const toast = useToast();
    const utilStore = useUtilStore()
    const deleteDialog = (message: string = "ایا از انجام این عملیات اطمینان دارید!!؟؟", header: string = "حذف",
                          acceptFunction: Function, rejectFunction?: () => void) => {
        dialog.require({
            message: message,
            header: header,
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'بیخیال شدم',
                severity: 'danger',
                outlined: true
            },
            acceptProps: {
                label: 'بله حذف اش کن'
            },
            accept: async () => {
                utilStore.globalLoading = true
                await acceptFunction!()
                utilStore.globalLoading = false
            },
            reject: rejectFunction,
        })
    };
    const successToast = () => {
        toast.add({
            summary: "عملیات با موفقیت انجام شد.",
            severity: 'success',
            life: 4000
        });
    };
    return {deleteDialog, successToast};
}