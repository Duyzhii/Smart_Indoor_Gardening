import React from 'react';
import { ControlModeProvider } from '../context/ControlModeContext';
import MoreDropDown from '@/components/MoreDropdown';
import DashboardPage from '../dashboard/page';

const AppWrapper: React.FC = () => {
  return (
    <ControlModeProvider>
      <div className="app-container">
        <header>
          <MoreDropDown 
            buttonClassName="your-button-class" 
            iconClassName="your-icon-class" 
            buttonLabel="Menu" 
          />
        </header>
        <main>
          <DashboardPage />
        </main>
      </div>
    </ControlModeProvider>
  );
};

export default AppWrapper;