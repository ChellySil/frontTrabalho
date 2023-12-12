import React, { useState, useEffect } from 'react';

function CadastroSala({
  numeroSala,
  andar,
  predio,
  capacidade,
  adicionarSala,
  salvarEdicaoSala,
  setNumeroSala,
  setAndar,
  setPredio,
  setCapacidade,
  modoEdicao,
}) {
  return (
    <div>
      <h2>Cadastro de Sala</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Número da Sala:
          <input
            type="text"
            value={numeroSala}
            onChange={(e) => setNumeroSala(e.target.value)}
          />
        </label>
        <br />
        <label>
          Andar:
          <input
            type="text"
            value={andar}
            onChange={(e) => setAndar(e.target.value)}
          />
        </label>
        <br />
        <label>
          Prédio:
          <input
            type="text"
            value={predio}
            onChange={(e) => setPredio(e.target.value)}
          />
        </label>
        <br />
        <label>
          Capacidade:
          <input
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
          />
        </label>
        <br />
        <button onClick={() => (modoEdicao ? salvarEdicaoSala() : adicionarSala())}>
          {modoEdicao ? 'Salvar Edição' : 'Adicionar Sala'}
        </button>
      </form>
    </div>
  );
}

function ListaSalas({
  dados,
  editarSala,
  excluirSala,
}) {
  return (
    <div>
      <h2>Lista de Salas</h2>
      <ul>
        {dados.map(item => (
          <li key={item.id}>
            <p>{`Número da Sala: ${item.numeroSala}`}</p>
            <p>{`Andar: ${item.andar}`}</p>
            <p>{`Prédio: ${item.predio}`}</p>
            <p>{`Capacidade: ${item.capacidade}`}</p>
            <button onClick={() => editarSala(item.id)}>Editar</button>
            <button onClick={() => excluirSala(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TelaSalas() {
  const [numeroSala, setNumeroSala] = useState('');
  const [andar, setAndar] = useState('');
  const [predio, setPredio] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [salaEmEdicao, setSalaEmEdicao] = useState(null);
  const [dadosSalas, setDadosSalas] = useState([]);

  const salvarDadosLocalStorage = (dados) => {
    localStorage.setItem('dadosSalas', JSON.stringify(dados));
  };

  const carregarDadosLocalStorage = () => {
    const dadosSalvos = localStorage.getItem('dadosSalas');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  };

  useEffect(() => {
    setDadosSalas(carregarDadosLocalStorage());
  }, []);

  const adicionarSala = () => {
    const novaSala = {
      id: gerarIdUnico(),
      numeroSala,
      andar,
      predio,
      capacidade,
    };

    setDadosSalas(prevDados => [...prevDados, novaSala]);
    salvarDadosLocalStorage([...dadosSalas, novaSala]);
    setNumeroSala('');
    setAndar('');
    setPredio('');
    setCapacidade('');
  };

  const editarSala = (id) => {
    const salaParaEditar = dadosSalas.find(sala => sala.id === id);
    setNumeroSala(salaParaEditar.numeroSala);
    setAndar(salaParaEditar.andar);
    setPredio(salaParaEditar.predio);
    setCapacidade(salaParaEditar.capacidade);

    setModoEdicao(true);
    setSalaEmEdicao(id);
  };

  const salvarEdicaoSala = () => {
    setDadosSalas(prevDados =>
      prevDados.map(sala =>
        sala.id === salaEmEdicao
          ? {
              ...sala,
              numeroSala,
              andar,
              predio,
              capacidade,
            }
          : sala
      )
    );
    salvarDadosLocalStorage(dadosSalas);
    setNumeroSala('');
    setAndar('');
    setPredio('');
    setCapacidade('');

    setModoEdicao(false);
    setSalaEmEdicao(null);
  };

  const excluirSala = (id) => {
    setDadosSalas(prevDados => prevDados.filter(sala => sala.id !== id));

    salvarDadosLocalStorage(dadosSalas);
  };

  const gerarIdUnico = () => {
    return new Date().getTime().toString();
  };

  return (
    <div>
      <CadastroSala
        numeroSala={numeroSala}
        andar={andar}
        predio={predio}
        capacidade={capacidade}
        adicionarSala={adicionarSala}
        salvarEdicaoSala={salvarEdicaoSala}
        setNumeroSala={setNumeroSala}
        setAndar={setAndar}
        setPredio={setPredio}
        setCapacidade={setCapacidade}
        modoEdicao={modoEdicao}
      />

      <ListaSalas
        dados={dadosSalas}
        editarSala={editarSala}
        excluirSala={excluirSala}
      />
    </div>
  );
}

export default TelaSalas;
