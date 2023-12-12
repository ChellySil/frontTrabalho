import React, { useState, useEffect } from 'react';

function CadastroCurso({
  nomeCurso,
  dataInicio,
  coordenadorCurso,
  modoEdicao,
  adicionarCurso,
  salvarEdicaoCurso,
  setNomeCurso,
  setDataInicio,
  setCoordenadorCurso,
}) {
  return (
    <div>
      <h2>Cadastro de Curso</h2>
     <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Nome do Curso:
          <input
            type="text"
            value={nomeCurso}
            onChange={(e) => setNomeCurso(e.target.value)}
          />
        </label>
        <br />
        <label>
          Data de Início do Curso:
          <input
            type="text"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </label>
        <br />
        <label>
          Coordenador do Curso:
          <input
            type="text"
            value={coordenadorCurso}
            onChange={(e) => setCoordenadorCurso(e.target.value)}
          />
        </label>
        <br />
        <button onClick={() => (modoEdicao ? salvarEdicaoCurso() : adicionarCurso())}>
          {modoEdicao ? 'Salvar Edição' : 'Adicionar Curso'}
        </button>
      </form>
    </div>
  );
}

function ListaCursos({
  dados,
  editarCurso,
  excluirCurso,
}) {
  return (
    <div>
      <h2>Lista de Cursos</h2>
      <ul>
        {dados.map(item => (
          <li key={item.id}>
            <p>{`Nome do Curso: ${item.nomeCurso}`}</p>
            <p>{`Data de Início do Curso: ${item.dataInicio}`}</p>
            <p>{`Coordenador do Curso: ${item.coordenadorCurso}`}</p>
            <button onClick={() => editarCurso(item.id)}>Editar</button>
            <button onClick={() => excluirCurso(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TelaCursos() {
  const [nomeCurso, setNomeCurso] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [coordenadorCurso, setCoordenadorCurso] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [cursoEmEdicao, setCursoEmEdicao] = useState(null);
  const [dadosCursos, setDadosCursos] = useState([]);

  const salvarDadosLocalStorage = (dados) => {
    localStorage.setItem('dadosCursos', JSON.stringify(dados));
  };

  const carregarDadosLocalStorage = () => {
    const dadosSalvos = localStorage.getItem('dadosCursos');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  };

  useEffect(() => {
    setDadosCursos(carregarDadosLocalStorage());
  }, []);

  const adicionarCurso = () => {
    const novoCurso = {
      id: gerarIdUnico(),
      nomeCurso,
      dataInicio,
      coordenadorCurso,
    };

    setDadosCursos(prevDados => [...prevDados, novoCurso]);
    salvarDadosLocalStorage([...dadosCursos, novoCurso]);
    setNomeCurso('');
    setDataInicio('');
    setCoordenadorCurso('');
  };

  const editarCurso = (id) => {
    const cursoParaEditar = dadosCursos.find(curso => curso.id === id);
    setNomeCurso(cursoParaEditar.nomeCurso);
    setDataInicio(cursoParaEditar.dataInicio);
    setCoordenadorCurso(cursoParaEditar.coordenadorCurso);
    setModoEdicao(true);
    setCursoEmEdicao(id);
  };

  const salvarEdicaoCurso = () => {
    setDadosCursos(prevDados =>
      prevDados.map(curso =>
        curso.id === cursoEmEdicao
          ? {
              ...curso,
              nomeCurso,
              dataInicio,
              coordenadorCurso,
            }
          : curso
      )
    );
    salvarDadosLocalStorage(dadosCursos);
    setNomeCurso('');
    setDataInicio('');
    setCoordenadorCurso('');
    setModoEdicao(false);
    setCursoEmEdicao(null);
  };

  const excluirCurso = (id) => {
    setDadosCursos(prevDados => prevDados.filter(curso => curso.id !== id));
    salvarDadosLocalStorage(dadosCursos);
  };

  const gerarIdUnico = () => {
    return new Date().getTime().toString();
  };

  return (
    <div>
      <CadastroCurso
        nomeCurso={nomeCurso}
        dataInicio={dataInicio}
        coordenadorCurso={coordenadorCurso}
        modoEdicao={modoEdicao}
        adicionarCurso={adicionarCurso}
        salvarEdicaoCurso={salvarEdicaoCurso}
        setNomeCurso={setNomeCurso}
        setDataInicio={setDataInicio}
        setCoordenadorCurso={setCoordenadorCurso}
      />

      <ListaCursos
        dados={dadosCursos}
        editarCurso={editarCurso}
        excluirCurso={excluirCurso}
      />
    </div>
  );
}

export default TelaCursos;
