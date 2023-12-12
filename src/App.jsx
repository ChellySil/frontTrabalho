import React, { useState } from 'react';
import TelaCursos from './Cursos';
import TelaProfessores from './Professores';
import TelaSalas from './Salas';
import TelaPeriodos from './Periodos';
import Menu from './Menu';
import './App.css';


function App() {
  const [telaAtual, setTelaAtual] = useState('');

  const renderizarTela = () => {
    switch (telaAtual) {
      case 'cursos':
        return <TelaCursos />;
      case 'professores':
        return <TelaProfessores />;
      case 'salas':
        return <TelaSalas />;
      case 'periodos':
        return <TelaPeriodos />;
      default:
        return <Menu setTelaAtual={setTelaAtual} />;
    }
  };

  return (
    <div>
      {renderizarTela()}
    </div>
  );
}

export default App;

