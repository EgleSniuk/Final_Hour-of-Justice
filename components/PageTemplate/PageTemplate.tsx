import React, { useState } from 'react';
import Header from '../Header/Header';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import Footer from '../Footer/Footer';
import styles from './styles.module.css';

interface PageTemplateProps {
  children: React.ReactNode;
}

export default function PageTemplate({ children }: PageTemplateProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Header onMenuClick={toggleSidebar} />
      <SidebarMenu isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
