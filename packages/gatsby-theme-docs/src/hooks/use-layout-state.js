import React from 'react';

const useLayoutState = () => {
  // State for the sidebar menu
  const [isSidebarMenuOpen, setSidebarMenuOpen] = React.useState(false);
  const toggleSidebarMenu = React.useCallback(() => {
    setSidebarMenuOpen((prev) => !prev);
  }, [setSidebarMenuOpen]);
  const closeSidebarMenu = React.useCallback(() => {
    setSidebarMenuOpen(false);
  }, [setSidebarMenuOpen]);

  // State for the top menu
  const [isTopMenuOpen, setIsTopMenuOpen] = React.useState(false);
  const toggleTopMenu = React.useCallback(() => {
    setIsTopMenuOpen((prev) => !prev);
  }, [setIsTopMenuOpen]);
  const closeTopMenu = React.useCallback(() => {
    setIsTopMenuOpen(false);
  }, [setIsTopMenuOpen]);

  // State for the search dialog
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);
  const openSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(true);
    // Additionally make sure to close the top menu
    closeTopMenu();
  }, [setIsSearchDialogOpen, closeTopMenu]);
  const closeSearchDialog = React.useCallback(() => {
    setIsSearchDialogOpen(false);
  }, [setIsSearchDialogOpen]);

  return {
    sidebar: {
      isSidebarMenuOpen,
      toggleSidebarMenu,
      closeSidebarMenu,
    },
    topMenu: {
      isTopMenuOpen,
      toggleTopMenu,
    },
    searchDialog: {
      isSearchDialogOpen,
      openSearchDialog,
      closeSearchDialog,
    },
  };
};

export default useLayoutState;
