import React from "react";

function Calendario() {
  const infosDias = [
    { dia: 10, horario: "14:00", professor: "Prof. Fulano", sala: "Sala A" },
    { dia: 11, horario: "15:30", professor: "Prof. Ciclano", sala: "Sala B" },
  ];
  const renderizarInfoDia = (dia) => {
    const infoDia = infosDias.find((info) => info.dia === dia);

    if (infoDia) {
      return (
        <div>
          <p>{`Horário: ${infoDia.horario}`}</p>
          <p>{`Professor: ${infoDia.professor}`}</p>
          <p>{`Sala: ${infoDia.sala}`}</p>
        </div>
      );
    }

    return null; 
  };

  const criarDiasNovembro = () => {
    const diasNovembro = [];

    for (let dia = 1; dia <= 30; dia++) {
      diasNovembro.push(
        <div key={dia}>
          <p>{`Dia ${dia}`}</p>
          {renderizarInfoDia(dia)}
        </div>
      );
    }

    return diasNovembro;
  };

  return (
    <div>
      <h2>Calendário de Horários - Novembro</h2>
      {criarDiasNovembro()}
    </div>
  );
}

export default Calendario;
