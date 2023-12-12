import React, { useState, useEffect } from "react";

function CadastroProfessor({
  nomeProfessor,
  disciplina,
  telefone,
  adicionarProfessor,
  salvarEdicaoProfessor,
  setNomeProfessor,
  setDisciplina,
  setTelefone,
  modoEdicao,
}) {
  return (
    <div>
      <h2>Cadastro de Professor</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Nome do Professor:
          <input
            type="text"
            value={nomeProfessor}
            onChange={(e) => setNomeProfessor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Disciplina:
          <input
            type="text"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
          />
        </label>
        <br />
        <label>
          Telefone:
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>
        <br />
        <button
          onClick={() =>
            modoEdicao ? salvarEdicaoProfessor() : adicionarProfessor()
          }
        >
          {modoEdicao ? "Salvar Edição" : "Adicionar Professor"}
        </button>
      </form>
    </div>
  );
}

function ListaProfessores({ dados, editarProfessor, excluirProfessor }) {
  return (
    <div>
      <h2>Lista de Professores</h2>
      <ul>
        {dados.map((item) => (
          <li key={item.id}>
            <p>{`Nome do Professor: ${item.nomeProfessor}`}</p>
            <p>{`Disciplina: ${item.disciplina}`}</p>
            <p>{`Telefone: ${item.telefone}`}</p>
            <button onClick={() => editarProfessor(item.id)}>Editar</button>
            <button onClick={() => excluirProfessor(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TelaProfessores() {
  const [nomeProfessor, setNomeProfessor] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [telefone, setTelefone] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);
  const [professorEmEdicao, setProfessorEmEdicao] = useState(null);
  const [dadosProfessores, setDadosProfessores] = useState([]);

  // Função para salvar os dados no localStorage
  const salvarDadosLocalStorage = (dados) => {
    localStorage.setItem("dadosProfessores", JSON.stringify(dados));
  };

  // Função para carregar os dados do localStorage
  const carregarDadosLocalStorage = () => {
    const dadosSalvos = localStorage.getItem("dadosProfessores");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  };

  useEffect(() => {
    // Carregar dados do localStorage ao montar o componente
    setDadosProfessores(carregarDadosLocalStorage());
  }, []);

  const adicionarProfessor = () => {
    const novoProfessor = {
      id: gerarIdUnico(),
      nomeProfessor,
      disciplina,
      telefone,
    };

    setDadosProfessores((prevDados) => [...prevDados, novoProfessor]);

    // Salvar os dados no localStorage
    salvarDadosLocalStorage([...dadosProfessores, novoProfessor]);

    // Limpar os campos do formulário
    setNomeProfessor("");
    setDisciplina("");
    setTelefone("");
  };

  const editarProfessor = (id) => {
    const professorParaEditar = dadosProfessores.find(
      (professor) => professor.id === id
    );

    // Preencher os campos do formulário com os dados do professor
    setNomeProfessor(professorParaEditar.nomeProfessor);
    setDisciplina(professorParaEditar.disciplina);
    setTelefone(professorParaEditar.telefone);

    setModoEdicao(true);
    setProfessorEmEdicao(id);
  };

  const salvarEdicaoProfessor = () => {
    setDadosProfessores((prevDados) =>
      prevDados.map((professor) =>
        professor.id === professorEmEdicao
          ? {
              ...professor,
              nomeProfessor,
              disciplina,
              telefone,
            }
          : professor
      )
    );

    // Salvar os dados no localStorage
    salvarDadosLocalStorage(dadosProfessores);

    // Limpar os campos do formulário
    setNomeProfessor("");
    setDisciplina("");
    setTelefone("");

    setModoEdicao(false);
    setProfessorEmEdicao(null);
  };

  const excluirProfessor = (id) => {
    setDadosProfessores((prevDados) =>
      prevDados.filter((professor) => professor.id !== id)
    );

    // Salvar os dados no localStorage
    salvarDadosLocalStorage(dadosProfessores);
  };

  const gerarIdUnico = () => {
    return new Date().getTime().toString();
  };

  return (
    <div>
      <CadastroProfessor
        nomeProfessor={nomeProfessor}
        disciplina={disciplina}
        telefone={telefone}
        adicionarProfessor={adicionarProfessor}
        salvarEdicaoProfessor={salvarEdicaoProfessor}
        setNomeProfessor={setNomeProfessor}
        setDisciplina={setDisciplina}
        setTelefone={setTelefone}
        modoEdicao={modoEdicao}
      />

      <ListaProfessores
        dados={dadosProfessores}
        editarProfessor={editarProfessor}
        excluirProfessor={excluirProfessor}
      />
    </div>
  );
}

export default TelaProfessores;
