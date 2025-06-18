let toggleRefreshData;


export const triggerToggleRefreshData = () => {
    if (toggleRefreshData) {
        toggleRefreshData();
    }
};
