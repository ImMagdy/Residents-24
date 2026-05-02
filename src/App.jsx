import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import RegistrationForm from './components/RegistrationForm';
import SuccessPage from './components/SuccessPage';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome'); // 'welcome' | 'form' | 'success'

  const handleStartRegistration = () => {
    setCurrentPage('form');
  };

  const handleFormSubmitSuccess = () => {
    setCurrentPage('success');
  };

  return (
    <>
      {currentPage === 'welcome' && (
        <WelcomePage onNext={handleStartRegistration} />
      )}
      
      {currentPage === 'form' && (
        <RegistrationForm onSubmitSuccess={handleFormSubmitSuccess} />
      )}
      
      {currentPage === 'success' && (
        <SuccessPage />
      )}
    </>
  );
}

export default App;
