import React from "react";

function Menu({ setTelaAtual }) {
  const handleButtonClick = (tela) => {
    setTelaAtual(tela);
  };

  return (
    <div>
      <h2>Escolha uma Tela</h2>
      <button onClick={() => handleButtonClick("cursos")}>Cursos</button>
      <button onClick={() => handleButtonClick("professores")}>
        Professores
      </button>
      <button onClick={() => handleButtonClick("salas")}>Salas</button>
      <button onClick={() => handleButtonClick("periodos")}>Períodos</button>

    </div>
  );
}

export default Menu;
