 import React, { useState, useEffect } from 'react';

 function CadastroPeriodo({
   numeroPeriodo,
   semestreAno,
   dataInicio,
   dataFim,
   turno,
   cursoId,
   cursos,
   adicionarPeriodo,
   salvarEdicaoPeriodo,
   setNumeroPeriodo,
   setSemestreAno,
   setDataInicio,
   setDataFim,
   setTurno,
   setCursoId,
   modoEdicao,
 }) {
   const handleFormSubmit = (e) => {
     e.preventDefault();

     const cursoSelecionado = cursos.find(curso => curso.id === cursoId);
     if (!cursoSelecionado) {
       console.error('Curso não encontrado. Selecione um curso válido.');
       return;
     }
     if (modoEdicao) {
       salvarEdicaoPeriodo();
     } else {
       adicionarPeriodo();
     }
   };

   return (
     <div>
       <h2>Cadastro de Período</h2>
       <form onSubmit={handleFormSubmit}>
         <label>
           Número do Período:
           <input
             type="text"
             value={numeroPeriodo}
             onChange={(e) => setNumeroPeriodo(e.target.value)}
           />
         </label>
         <br />
         <label>
           Semestre/Ano do Período:
           <input
             type="text"
             value={semestreAno}
             onChange={(e) => setSemestreAno(e.target.value)}
           />
         </label>
         <br />
         <label>
           Data de Início:
           <input
             type="date"
             value={dataInicio}
             onChange={(e) => setDataInicio(e.target.value)}
           />
         </label>
         <br />
         <label>
           Data de Fim:
           <input
             type="date"
             value={dataFim}
             onChange={(e) => setDataFim(e.target.value)}
           />
         </label>
         <br />
         <label>
           Turno:
           <select value={turno} onChange={(e) => setTurno(e.target.value)}>
             <option value="Matutino">Matutino</option>
             <option value="Vespertino">Vespertino</option>
             <option value="Noturno">Noturno</option>
           </select>
         </label>
         <br />
         <label>
           Curso:
           <select value={cursoId} onChange={(e) => setCursoId(e.target.value)}>
             {Array.isArray(cursos) && cursos.length > 0 ? (
               cursos.map(curso => (
                 <option key={curso.id} value={curso.id}>
                   {curso.nomeCurso}
                 </option>
               ))
             ) : (
               <option value="">Nenhum curso disponível</option>
             )}
           </select>
         </label>
         <br />
         <button type="submit">
           {modoEdicao ? 'Salvar Edição' : 'Adicionar Período'}
         </button>
       </form>
     </div>
   );
 }

 function ListaPeriodos({
   dados,
   editarPeriodo,
   excluirPeriodo,
 }) {
   return (
     <div>
       <h2>Lista de Períodos</h2>
       <ul>
         {Array.isArray(dados) && dados.length > 0 ? (
           dados.map(item => (
             <li key={item.id}>
               <p>{`Número do Período: ${item.numeroPeriodo}`}</p>
               <p>{`Semestre/Ano: ${item.semestreAno}`}</p>
               <p>{`Data de Início: ${item.dataInicio}`}</p>
               <p>{`Data de Fim: ${item.dataFim}`}</p>
               <p>{`Turno: ${item.turno}`}</p>
               <p>{`Curso: ${item.cursoNome}`}</p>
               <button onClick={() => editarPeriodo(item.id)}>Editar</button>
               <button onClick={() => excluirPeriodo(item.id)}>Excluir</button>
             </li>
           ))
         ) : (
           <li>Nenhum período disponível</li>
         )}
       </ul>
     </div>
   );
 }

 function TelaPeriodos() {
   useEffect(() => {
     setDadosPeriodos(carregarDadosLocalStorage('dadosPeriodos'));
     const cursos = carregarDadosLocalStorage('dadosCursos');
     console.log('Cursos carregados:', cursos);
     setDadosCursos(cursos);
   }, []);

   const [numeroPeriodo, setNumeroPeriodo] = useState('');
   const [semestreAno, setSemestreAno] = useState('');
   const [dataInicio, setDataInicio] = useState('');
   const [dataFim, setDataFim] = useState('');
   const [turno, setTurno] = useState('Matutino');
   const [cursoId, setCursoId] = useState('');
   const [modoEdicao, setModoEdicao] = useState(false);
   const [periodoEmEdicao, setPeriodoEmEdicao] = useState(null);
   const [dadosPeriodos, setDadosPeriodos] = useState([]);
   const [dadosCursos, setDadosCursos] = useState([]);

   const salvarDadosLocalStorage = (chave, dados) => {
     localStorage.setItem(chave, JSON.stringify(dados));
   };

   const carregarDadosLocalStorage = (chave) => {
     const dadosSalvos = localStorage.getItem(chave);
     return dadosSalvos ? JSON.parse(dadosSalvos) : [];
   };

   useEffect(() => {
     setDadosPeriodos(carregarDadosLocalStorage('dadosPeriodos'));
     setDadosCursos(carregarDadosLocalStorage('dadosCursos'));
   }, []);

   const adicionarPeriodo = () => {
     const novoPeriodo = {
       id: gerarIdUnico(),
       numeroPeriodo,
       semestreAno,
       dataInicio,
       dataFim,
       turno,
       cursoId,
       cursoNome: dadosCursos.find(curso => curso.id === cursoId)?.nomeCurso || 'Curso não encontrado',
     };
     setDadosPeriodos(prevDados => [...prevDados, novoPeriodo]);
     salvarDadosLocalStorage('dadosPeriodos', [...dadosPeriodos, novoPeriodo]);
     setNumeroPeriodo('');
     setSemestreAno('');
     setDataInicio('');
     setDataFim('');
     setTurno('Matutino');
     setCursoId('');
   };

   const editarPeriodo = (id) => {
     const periodoParaEditar = dadosPeriodos.find(periodo => periodo.id === id);
     setNumeroPeriodo(periodoParaEditar.numeroPeriodo);
     setSemestreAno(periodoParaEditar.semestreAno);
     setDataInicio(periodoParaEditar.dataInicio);
     setDataFim(periodoParaEditar.dataFim);
     setTurno(periodoParaEditar.turno);
     setCursoId(periodoParaEditar.cursoId);

     setModoEdicao(true);
     setPeriodoEmEdicao(id);
   };

   const salvarEdicaoPeriodo = () => {
     setDadosPeriodos(prevDados =>
       prevDados.map(periodo =>
         periodo.id === periodoEmEdicao
           ? {
               ...periodo,
               numeroPeriodo,
               semestreAno,
               dataInicio,
               dataFim,
               turno,
               cursoId,
               cursoNome: dadosCursos.find(curso => curso.id === cursoId)?.nomeCurso || 'Curso não encontrado',
             }
           : periodo
       )
     );
     salvarDadosLocalStorage('dadosPeriodos', dadosPeriodos);
     setNumeroPeriodo('');
     setSemestreAno('');
     setDataInicio('');
     setDataFim('');
     setTurno('Matutino');
     setCursoId('');

     setModoEdicao(false);
     setPeriodoEmEdicao(null);
   };

   const excluirPeriodo = (id) => {
     setDadosPeriodos(prevDados => prevDados.filter(periodo => periodo.id !== id));
     salvarDadosLocalStorage('dadosPeriodos', dadosPeriodos);
   };

   const gerarIdUnico = () => {
     return new Date().getTime().toString();
   };

   return (
     <div>
       <CadastroPeriodo
         numeroPeriodo={numeroPeriodo}
         semestreAno={semestreAno}
         dataInicio={dataInicio}
         dataFim={dataFim}
         turno={turno}
         cursoId={cursoId}
         cursos={dadosCursos}
         adicionarPeriodo={adicionarPeriodo}
         salvarEdicaoPeriodo={salvarEdicaoPeriodo}
         setNumeroPeriodo={setNumeroPeriodo}
         setSemestreAno={setSemestreAno}
         setDataInicio={setDataInicio}
         setDataFim={setDataFim}
         setTurno={setTurno}
         setCursoId={setCursoId}
         modoEdicao={modoEdicao}
       />

       <ListaPeriodos
         dados={dadosPeriodos}
         editarPeriodo={editarPeriodo}
         excluirPeriodo={excluirPeriodo}
       />
     </div>
   );
 }

 export default TelaPeriodos;
