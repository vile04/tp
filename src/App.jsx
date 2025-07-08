import React from 'react';
import { lazy, Suspense } from 'react';
import './App.css';

// Lazy loading do componente principal
const OdontogramaUpdated = lazy(() => import('./components/OdontogramaUpdated'));

// Componente de loading
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat" 
       style={{backgroundImage: 'url(/bg.png)'}}>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-teal-700/80 to-cyan-800/80"></div>
    <div className="relative z-20 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
      <p className="text-white text-lg">Carregando Sistema...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        <OdontogramaUpdated />
      </Suspense>
    </div>
  );
}

export default App;

