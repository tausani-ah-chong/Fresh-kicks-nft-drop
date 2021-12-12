import React, { FunctionComponent } from 'react';
import Footer from './components/footer';
import Header from './components/header';
import NavigationBar from './components/navigation-bar';
import './styles.css';

const App: FunctionComponent = () => {
  return (
    <>
      <NavigationBar />
      <Header />
      <Footer />
    </>
  );
};

export default App;
