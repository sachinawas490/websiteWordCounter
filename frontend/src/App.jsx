import React from 'react';
import InputSection from './Components/InputSection';
import Header from './Components/Header';
import ResultSection from './Components/ResultSection';

function App() {
  return (
    <div className="bg-slate-950 w-screen h-screen border-2 border-yellow-600 rounded-xl overflow-y-auto">
      <Header />
      <InputSection />
      <ResultSection />
    </div>
  );
}

export default App;
