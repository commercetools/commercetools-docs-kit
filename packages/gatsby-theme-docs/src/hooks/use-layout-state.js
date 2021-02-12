import { useState, useCallback } from 'react';

const useLayoutState = () => {
  // State for the sidebar menu
  const [isSidebarMenuOpen, setSidebarMenuOpen] = useState(false);
  const toggleSidebarMenu = useCallback(() => {
    setSidebarMenuOpen((prev) => !prev);
  }, [setSidebarMenuOpen]);
  const closeSidebarMenu = useCallback(() => {
    setSidebarMenuOpen(false);
  }, [setSidebarMenuOpen]);

  // State for the top menu
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const toggleTopMenu = useCallback(() => {
    setIsTopMenuOpen((prev) => !prev);
  }, [setIsTopMenuOpen]);
  const closeTopMenu = useCallback(() => {
    setIsTopMenuOpen(false);
  }, [setIsTopMenuOpen]);

  // State for the search dialog
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const openSearchDialog = useCallback(() => {
    setIsSearchDialogOpen(true);
    // Additionally make sure to close the top menu
    closeTopMenu();
  }, [setIsSearchDialogOpen, closeTopMenu]);
  const closeSearchDialog = useCallback(() => {
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
      closeTopMenu,
    },
    searchDialog: {
      isSearchDialogOpen,
      openSearchDialog,
      closeSearchDialog,
    },
  };
};

export default useLayoutState;
