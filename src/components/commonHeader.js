import { useState } from "react";
import PropTypes from "prop-types";
import { MainNavbar } from "./main-navbar";
import { MainSidebar } from "./main-sidebar";

export const CommonHeader = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <MainNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <MainSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

CommonHeader.propTypes = {
  children: PropTypes.node,
};
