let toggleRefreshData;

export const setToggleRefreshData = (toggleFunc) => {
  toggleRefreshData = toggleFunc;
};

export const triggerToggleRefreshData = () => {
  if (toggleRefreshData) {
    toggleRefreshData();
  }
};
