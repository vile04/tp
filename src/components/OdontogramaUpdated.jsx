import React, { useState, useEffect, useRef } from 'react';
import { supabase, patientService, odontogramaService } from '../lib/supabase';
import PDFGenerator from './PDFGenerator';
import PatientList from './PatientList';
import ToothSurface from './ToothSurface';
import { Users, FileText, Calendar, Plus, Save, FileDown, RotateCcw } from 'lucide-react';

const OdontogramaUpdated = () => {
  const [currentView, setCurrentView] = useState('nova-ficha');
  const [patientData, setPatientData] = useState({
    nome: '',
    dataNascimento: '',
    idade: '',
    cel: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    nomeMae: '',
    idadeMae: '',
    profissaoMae: '',
    nomePai: '',
    idadePai: '',
    profissaoPai: '',
    motivoConsulta: '',
    alteracaoGestacao: '',
    necessidadeEspecial: '',
    qualNecessidadeEspecial: '',
    comprometimentoCoordenacaoMotora: '',
    qualComprometimentoCoordenacaoMotora: '',
    comprometimentoVisual: '',
    qualComprometimentoVisual: '',
    comprometimentoComunicacao: '',
    qualComprometimentoComunicacao: '',
    reacaoContrariado: '',
    reacaoProfissionaisSaude: '',
    sofreuCirurgia: '',
    qualCirurgia: '',
    alteracoesSanguineas: '',
    problemasRespiratorios: '',
    problemasHepaticos: '',
    cardiopatias: '',
    problemasGastricos: '',
    alergiasMedicamento: '',
    alergiasAlimentar: '',
    alergiasRespiratoria: '',
    tratamentosAtuais: '',
    fonaudiologia: '',
    fisioterapia: '',
    psicologia: '',
    psiquiatrico: '',
    to: '',
    outroTratamento: '',
    portadorIST: '',
    pacienteMamaNoPeito: '',
    jaMamouNoPeito: '',
    ateQuandoMama: '',
    pacienteTomaMamadeira: '',
    jaTomouMamadeira: '',
    ateQuandoMamadeira: '',
    engasgaVomita: '',
    chupaDedo: '',
    chupaChupeta: '',
    outrosHabitos: '',
    rangeDentes: '',
    primeiraConsultaAnos: '',
    tratamentoAnterior: '',
    jaFoiDentista: '',
    qualDentista: '',
    qualEscova: '',
    qualCremeDental: '',
    higieneBucal: '',
    quantasVezesAoDia: '',
    tomouAnestesia: '',
    gengivaSangra: '',
    realizouExtracoes: '',
    escovaLingua: '',
    usaFioDental: '',
    alimentacao: '',
    informacaoAdicional: '',
    responsavel: '',
    data: new Date().toLocaleDateString('pt-BR')
  });

  const [teethStatus, setTeethStatus] = useState({});
  const [consultas, setConsultas] = useState([]);
  const [novaConsulta, setNovaConsulta] = useState({ data: '', peso: '' });
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const odontogramaRef = useRef();

  // Dentes permanentes e decíduos
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
  const upperChildTeeth = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
  const lowerChildTeeth = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setIsLoading(true);
      const data = await patientService.getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientDataChange = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleYesNoChange = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSurfaceClick = (toothNumber, surface) => {
    setTeethStatus(prev => ({
      ...prev,
      [toothNumber]: {
        ...prev[toothNumber],
        [surface]: !prev[toothNumber]?.[surface]
      }
    }));
  };

  const addConsulta = () => {
    if (novaConsulta.data && novaConsulta.peso) {
      setConsultas(prev => [...prev, { ...novaConsulta, id: Date.now() }]);
      setNovaConsulta({ data: '', peso: '' });
    }
  };

  const savePatient = async () => {
    try {
      setIsLoading(true);
      
      const patientToSave = {
        ...patientData,
        teeth_status: teethStatus,
        consultas: consultas
      };

      if (selectedPatient) {
        await patientService.updatePatient(selectedPatient.id, patientToSave);
      } else {
        await patientService.createPatient(patientToSave);
      }

      alert('Ficha salva com sucesso!');
      loadPatients();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
      alert('Erro ao salvar ficha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPatientData({
      nome: '',
      dataNascimento: '',
      idade: '',
      cel: '',
      endereco: '',
      bairro: '',
      cep: '',
      cidade: '',
      nomeMae: '',
      idadeMae: '',
      profissaoMae: '',
      nomePai: '',
      idadePai: '',
      profissaoPai: '',
      motivoConsulta: '',
      alteracaoGestacao: '',
      necessidadeEspecial: '',
      qualNecessidadeEspecial: '',
      comprometimentoCoordenacaoMotora: '',
      qualComprometimentoCoordenacaoMotora: '',
      comprometimentoVisual: '',
      qualComprometimentoVisual: '',
      comprometimentoComunicacao: '',
      qualComprometimentoComunicacao: '',
      reacaoContrariado: '',
      reacaoProfissionaisSaude: '',
      sofreuCirurgia: '',
      qualCirurgia: '',
      alteracoesSanguineas: '',
      problemasRespiratorios: '',
      problemasHepaticos: '',
      cardiopatias: '',
      problemasGastricos: '',
      alergiasMedicamento: '',
      alergiasAlimentar: '',
      alergiasRespiratoria: '',
      tratamentosAtuais: '',
      fonaudiologia: '',
      fisioterapia: '',
      psicologia: '',
      psiquiatrico: '',
      to: '',
      outroTratamento: '',
      portadorIST: '',
      pacienteMamaNoPeito: '',
      jaMamouNoPeito: '',
      ateQuandoMama: '',
      pacienteTomaMamadeira: '',
      jaTomouMamadeira: '',
      ateQuandoMamadeira: '',
      engasgaVomita: '',
      chupaDedo: '',
      chupaChupeta: '',
      outrosHabitos: '',
      rangeDentes: '',
      primeiraConsultaAnos: '',
      tratamentoAnterior: '',
      jaFoiDentista: '',
      qualDentista: '',
      qualEscova: '',
      qualCremeDental: '',
      higieneBucal: '',
      quantasVezesAoDia: '',
      tomouAnestesia: '',
      gengivaSangra: '',
      realizouExtracoes: '',
      escovaLingua: '',
      usaFioDental: '',
      alimentacao: '',
      informacaoAdicional: '',
      responsavel: '',
      data: new Date().toLocaleDateString('pt-BR')
    });
    setTeethStatus({});
    setConsultas([]);
    setSelectedPatient(null);
  };

  const generatePDF = () => {
    PDFGenerator.generatePDF(patientData, teethStatus, odontogramaRef);
  };

  const YesNoButtons = ({ field, value, onChange, placeholder }) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(field, 'sim')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          value === 'sim' 
            ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
            : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/20'
        }`}
      >
        SIM
      </button>
      <button
        type="button"
        onClick={() => onChange(field, 'não')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          value === 'não' 
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
            : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/20'
        }`}
      >
        NÃO
      </button>
      {placeholder && value === 'sim' && (
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
          value={patientData[`qual${field.charAt(0).toUpperCase() + field.slice(1)}`] || ''}
          onChange={(e) => handlePatientDataChange(`qual${field.charAt(0).toUpperCase() + field.slice(1)}`, e.target.value)}
        />
      )}
    </div>
  );

  if (currentView === 'pacientes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <span className="text-white font-bold text-xl">TP</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Tio Paulo</h1>
                <p className="text-white/80">Ficha de Anamnese</p>
              </div>
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setCurrentView('pacientes')}
                className="px-6 py-3 bg-green-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-green-400/30 shadow-lg shadow-green-500/25 flex items-center gap-2"
              >
                <Users size={18} />
                Pacientes
              </button>
              <button
                onClick={() => setCurrentView('nova-ficha')}
                className="px-6 py-3 bg-blue-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-blue-400/30 shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                <FileText size={18} />
                Nova Ficha
              </button>
              <button
                onClick={() => setCurrentView('consultas')}
                className="px-6 py-3 bg-orange-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-orange-400/30 shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <Calendar size={18} />
                Consultas
              </button>
            </nav>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total de Pacientes</p>
                  <p className="text-3xl font-bold text-white">{patients.length}</p>
                </div>
                <Users className="text-white/60" size={32} />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Fichas Este Mês</p>
                  <p className="text-3xl font-bold text-white">{patients.length}</p>
                </div>
                <FileText className="text-white/60" size={32} />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Média de Idade</p>
                  <p className="text-3xl font-bold text-white">0 anos</p>
                </div>
                <Calendar className="text-white/60" size={32} />
              </div>
            </div>
          </div>

          <PatientList 
            patients={patients} 
            onSelectPatient={(patient) => {
              setSelectedPatient(patient);
              setPatientData(patient);
              setTeethStatus(patient.teeth_status || {});
              setConsultas(patient.consultas || []);
              setCurrentView('nova-ficha');
            }}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'consultas') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <span className="text-white font-bold text-xl">TP</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Tio Paulo</h1>
                <p className="text-white/80">Ficha de Anamnese</p>
              </div>
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setCurrentView('pacientes')}
                className="px-6 py-3 bg-green-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-green-400/30 shadow-lg shadow-green-500/25 flex items-center gap-2"
              >
                <Users size={18} />
                Pacientes
              </button>
              <button
                onClick={() => setCurrentView('nova-ficha')}
                className="px-6 py-3 bg-blue-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-blue-400/30 shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                <FileText size={18} />
                Nova Ficha
              </button>
              <button
                onClick={() => setCurrentView('consultas')}
                className="px-6 py-3 bg-orange-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-orange-400/30 shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <Calendar size={18} />
                Consultas
              </button>
            </nav>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Consultas Agendadas</h2>
            <p className="text-white/80">Em desenvolvimento...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <span className="text-white font-bold text-xl">TP</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Tio Paulo</h1>
              <p className="text-white/80">Ficha de Anamnese</p>
            </div>
          </div>
          <nav className="flex gap-2">
            <button
              onClick={() => setCurrentView('pacientes')}
              className="px-6 py-3 bg-green-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-green-400/30 shadow-lg shadow-green-500/25 flex items-center gap-2 hover:bg-green-500/90 transition-all duration-200"
            >
              <Users size={18} />
              Pacientes
            </button>
            <button
              onClick={() => setCurrentView('nova-ficha')}
              className="px-6 py-3 bg-blue-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-blue-400/30 shadow-lg shadow-blue-500/25 flex items-center gap-2 hover:bg-blue-500/90 transition-all duration-200"
            >
              <FileText size={18} />
              Nova Ficha
            </button>
            <button
              onClick={() => setCurrentView('consultas')}
              className="px-6 py-3 bg-orange-500/80 backdrop-blur-sm text-white rounded-lg font-medium border border-orange-400/30 shadow-lg shadow-orange-500/25 flex items-center gap-2 hover:bg-orange-500/90 transition-all duration-200"
            >
              <Calendar size={18} />
              Consultas
            </button>
          </nav>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Nova Ficha de Anamnese</h2>
            <p className="text-white/80 text-lg">Preencha as informações do paciente</p>
          </div>

          {/* Dados Pessoais */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="text-white/80" size={24} />
              Dados Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Nome da Criança *</label>
                <input
                  type="text"
                  value={patientData.nome}
                  onChange={(e) => handlePatientDataChange('nome', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Data de Nascimento *</label>
                <input
                  type="date"
                  value={patientData.dataNascimento}
                  onChange={(e) => handlePatientDataChange('dataNascimento', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Idade</label>
                <input
                  type="text"
                  value={patientData.idade}
                  onChange={(e) => handlePatientDataChange('idade', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Celular</label>
                <input
                  type="text"
                  value={patientData.cel}
                  onChange={(e) => handlePatientDataChange('cel', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Endereço</label>
                <input
                  type="text"
                  value={patientData.endereco}
                  onChange={(e) => handlePatientDataChange('endereco', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Bairro</label>
                <input
                  type="text"
                  value={patientData.bairro}
                  onChange={(e) => handlePatientDataChange('bairro', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">CEP</label>
                <input
                  type="text"
                  value={patientData.cep}
                  onChange={(e) => handlePatientDataChange('cep', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Cidade</label>
                <input
                  type="text"
                  value={patientData.cidade}
                  onChange={(e) => handlePatientDataChange('cidade', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Dados dos Pais */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Dados dos Pais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Mãe</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Nome da Mãe</label>
                    <input
                      type="text"
                      value={patientData.nomeMae}
                      onChange={(e) => handlePatientDataChange('nomeMae', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Idade</label>
                    <input
                      type="text"
                      value={patientData.idadeMae}
                      onChange={(e) => handlePatientDataChange('idadeMae', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Profissão</label>
                    <input
                      type="text"
                      value={patientData.profissaoMae}
                      onChange={(e) => handlePatientDataChange('profissaoMae', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Pai</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Nome do Pai</label>
                    <input
                      type="text"
                      value={patientData.nomePai}
                      onChange={(e) => handlePatientDataChange('nomePai', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Idade</label>
                    <input
                      type="text"
                      value={patientData.idadePai}
                      onChange={(e) => handlePatientDataChange('idadePai', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Profissão</label>
                    <input
                      type="text"
                      value={patientData.profissaoPai}
                      onChange={(e) => handlePatientDataChange('profissaoPai', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Motivo da Consulta */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="text-white/80" size={24} />
              Motivo da Consulta
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Qual o motivo da consulta?</label>
                <textarea
                  value={patientData.motivoConsulta}
                  onChange={(e) => handlePatientDataChange('motivoConsulta', e.target.value)}
                  placeholder="Descreva o motivo da consulta..."
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent h-24 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Mãe teve alguma alteração durante a gestação?</label>
                <textarea
                  value={patientData.alteracaoGestacao}
                  onChange={(e) => handlePatientDataChange('alteracaoGestacao', e.target.value)}
                  placeholder="Descreva as alterações..."
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent h-24 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Necessidades Especiais */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              💚 Necessidades Especiais
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Possui necessidade especial?</label>
                <YesNoButtons 
                  field="necessidadeEspecial" 
                  value={patientData.necessidadeEspecial} 
                  onChange={handleYesNoChange}
                  placeholder="Qual?"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Possui comprometimento de coordenação motora?</label>
                <YesNoButtons 
                  field="comprometimentoCoordenacaoMotora" 
                  value={patientData.comprometimentoCoordenacaoMotora} 
                  onChange={handleYesNoChange}
                  placeholder="Qual?"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Possui comprometimento visual?</label>
                <YesNoButtons 
                  field="comprometimentoVisual" 
                  value={patientData.comprometimentoVisual} 
                  onChange={handleYesNoChange}
                  placeholder="Qual?"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Possui comprometimento de comunicação?</label>
                <YesNoButtons 
                  field="comprometimentoComunicacao" 
                  value={patientData.comprometimentoComunicacao} 
                  onChange={handleYesNoChange}
                  placeholder="Qual?"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Como o paciente reage quando é contrariado?</label>
                <textarea
                  value={patientData.reacaoContrariado}
                  onChange={(e) => handlePatientDataChange('reacaoContrariado', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent h-20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Como o paciente reage diante de profissionais da saúde?</label>
                <textarea
                  value={patientData.reacaoProfissionaisSaude}
                  onChange={(e) => handlePatientDataChange('reacaoProfissionaisSaude', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent h-20 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Histórico Médico */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🏥 Histórico Médico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Sofreu alguma cirurgia?</label>
                <YesNoButtons 
                  field="sofreuCirurgia" 
                  value={patientData.sofreuCirurgia} 
                  onChange={handleYesNoChange}
                  placeholder="Qual?"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Problemas respiratórios?</label>
                <YesNoButtons 
                  field="problemasRespiratorios" 
                  value={patientData.problemasRespiratorios} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Alterações sanguíneas?</label>
                <YesNoButtons 
                  field="alteracoesSanguineas" 
                  value={patientData.alteracoesSanguineas} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Problemas hepáticos?</label>
                <YesNoButtons 
                  field="problemasHepaticos" 
                  value={patientData.problemasHepaticos} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Cardiopatias?</label>
                <YesNoButtons 
                  field="cardiopatias" 
                  value={patientData.cardiopatias} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Problemas gástricos?</label>
                <YesNoButtons 
                  field="problemasGastricos" 
                  value={patientData.problemasGastricos} 
                  onChange={handleYesNoChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Alergias a medicamentos</label>
                <input
                  type="text"
                  value={patientData.alergiasMedicamento}
                  onChange={(e) => handlePatientDataChange('alergiasMedicamento', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Alergias alimentares</label>
                <input
                  type="text"
                  value={patientData.alergiasAlimentar}
                  onChange={(e) => handlePatientDataChange('alergiasAlimentar', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Alergias respiratórias</label>
                <input
                  type="text"
                  value={patientData.alergiasRespiratoria}
                  onChange={(e) => handlePatientDataChange('alergiasRespiratoria', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-white text-sm font-medium mb-2">Tratamentos atuais</label>
              <textarea
                value={patientData.tratamentosAtuais}
                onChange={(e) => handlePatientDataChange('tratamentosAtuais', e.target.value)}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent h-20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Acompanhamentos e Hábitos */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              📈 Acompanhamentos e Hábitos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Fonoaudiologia?</label>
                <YesNoButtons 
                  field="fonaudiologia" 
                  value={patientData.fonaudiologia} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Fisioterapia?</label>
                <YesNoButtons 
                  field="fisioterapia" 
                  value={patientData.fisioterapia} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Psicologia?</label>
                <YesNoButtons 
                  field="psicologia" 
                  value={patientData.psicologia} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Psiquiátrico?</label>
                <YesNoButtons 
                  field="psiquiatrico" 
                  value={patientData.psiquiatrico} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">TO?</label>
                <YesNoButtons 
                  field="to" 
                  value={patientData.to} 
                  onChange={handleYesNoChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Outro tratamento?</label>
                <input
                  type="text"
                  value={patientData.outroTratamento}
                  onChange={(e) => handlePatientDataChange('outroTratamento', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">É portador de alguma IST?</label>
                <input
                  type="text"
                  value={patientData.portadorIST}
                  onChange={(e) => handlePatientDataChange('portadorIST', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Hábitos */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🍼 Hábitos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Paciente mama no peito?</label>
                <YesNoButtons 
                  field="pacienteMamaNoPeito" 
                  value={patientData.pacienteMamaNoPeito} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Já mamou no peito?</label>
                <div className="flex gap-2">
                  <YesNoButtons 
                    field="jaMamouNoPeito" 
                    value={patientData.jaMamouNoPeito} 
                    onChange={handleYesNoChange}
                  />
                  <input
                    type="text"
                    placeholder="Até quando?"
                    value={patientData.ateQuandoMama}
                    onChange={(e) => handlePatientDataChange('ateQuandoMama', e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Paciente toma mamadeira?</label>
                <YesNoButtons 
                  field="pacienteTomaMamadeira" 
                  value={patientData.pacienteTomaMamadeira} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Já tomou mamadeira?</label>
                <div className="flex gap-2">
                  <YesNoButtons 
                    field="jaTomouMamadeira" 
                    value={patientData.jaTomouMamadeira} 
                    onChange={handleYesNoChange}
                  />
                  <input
                    type="text"
                    placeholder="Até quando?"
                    value={patientData.ateQuandoMamadeira}
                    onChange={(e) => handlePatientDataChange('ateQuandoMamadeira', e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Engasga ou vomita com facilidade?</label>
                <input
                  type="text"
                  value={patientData.engasgaVomita}
                  onChange={(e) => handlePatientDataChange('engasgaVomita', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Chupa o dedo?</label>
                <input
                  type="text"
                  value={patientData.chupaDedo}
                  onChange={(e) => handlePatientDataChange('chupaDedo', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Chupa chupeta?</label>
                <input
                  type="text"
                  value={patientData.chupaChupeta}
                  onChange={(e) => handlePatientDataChange('chupaChupeta', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Possui outros hábitos?</label>
                <input
                  type="text"
                  value={patientData.outrosHabitos}
                  onChange={(e) => handlePatientDataChange('outrosHabitos', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Range os dentes?</label>
                <input
                  type="text"
                  value={patientData.rangeDentes}
                  onChange={(e) => handlePatientDataChange('rangeDentes', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Histórico Odontológico */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🔄 Histórico Odontológico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Quantos anos na primeira consulta?</label>
                <input
                  type="text"
                  value={patientData.primeiraConsultaAnos}
                  onChange={(e) => handlePatientDataChange('primeiraConsultaAnos', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Como foi o tratamento anterior?</label>
                <input
                  type="text"
                  value={patientData.tratamentoAnterior}
                  onChange={(e) => handlePatientDataChange('tratamentoAnterior', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Já foi ao dentista?</label>
                <div className="flex gap-2">
                  <YesNoButtons 
                    field="jaFoiDentista" 
                    value={patientData.jaFoiDentista} 
                    onChange={handleYesNoChange}
                  />
                  <input
                    type="text"
                    placeholder="Qual?"
                    value={patientData.qualDentista}
                    onChange={(e) => handlePatientDataChange('qualDentista', e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Higiene Bucal */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🦷 Higiene Bucal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Qual escova usa?</label>
                <input
                  type="text"
                  value={patientData.qualEscova}
                  onChange={(e) => handlePatientDataChange('qualEscova', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Qual creme dental usa?</label>
                <input
                  type="text"
                  value={patientData.qualCremeDental}
                  onChange={(e) => handlePatientDataChange('qualCremeDental', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Quem faz a higiene bucal?</label>
                <input
                  type="text"
                  value={patientData.higieneBucal}
                  onChange={(e) => handlePatientDataChange('higieneBucal', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Quantas vezes ao dia?</label>
                <input
                  type="text"
                  value={patientData.quantasVezesAoDia}
                  onChange={(e) => handlePatientDataChange('quantasVezesAoDia', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Já tomou anestesia?</label>
                <YesNoButtons 
                  field="tomouAnestesia" 
                  value={patientData.tomouAnestesia} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Gengiva sangra com facilidade?</label>
                <YesNoButtons 
                  field="gengivaSangra" 
                  value={patientData.gengivaSangra} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Já realizou extrações dentárias?</label>
                <YesNoButtons 
                  field="realizouExtracoes" 
                  value={patientData.realizouExtracoes} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Escova a língua?</label>
                <YesNoButtons 
                  field="escovaLingua" 
                  value={patientData.escovaLingua} 
                  onChange={handleYesNoChange}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Usa fio dental?</label>
                <YesNoButtons 
                  field="usaFioDental" 
                  value={patientData.usaFioDental} 
                  onChange={handleYesNoChange}
                />
              </div>
            </div>
          </div>

          {/* Alimentação e Outras Informações */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🍎 Alimentação e Outras Informações
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Vamos falar sobre a alimentação do paciente:</label>
                <textarea
                  value={patientData.alimentacao}
                  onChange={(e) => handlePatientDataChange('alimentacao', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent h-24 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Alguma informação adicional não relatada?</label>
                <textarea
                  value={patientData.informacaoAdicional}
                  onChange={(e) => handlePatientDataChange('informacaoAdicional', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent h-24 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Mapa Dental */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Mapa Dental</h3>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              {/* Dentes superiores permanentes */}
              <div className="flex justify-center gap-2 mb-3">
                {upperTeeth.map(tooth => (
                  <ToothButton 
                    key={tooth} 
                    number={tooth} 
                    isSelected={teethStatus[tooth]} 
                    onClick={handleToothClick} 
                  />
                ))}
              </div>
              
              {/* Dentes superiores decíduos */}
              <div className="flex justify-center gap-2 mb-6">
                <div className="w-48"></div>
                {upperChildTeeth.map(tooth => (
                  <ToothButton 
                    key={tooth} 
                    number={tooth} 
                    isSelected={teethStatus[tooth]} 
                    onClick={handleToothClick} 
                  />
                ))}
              </div>
              
              {/* Dentes inferiores decíduos */}
              <div className="flex justify-center gap-2 mb-3">
                <div className="w-48"></div>
                {lowerChildTeeth.map(tooth => (
                  <ToothButton 
                    key={tooth} 
                    number={tooth} 
                    isSelected={teethStatus[tooth]} 
                    onClick={handleToothClick} 
                  />
                ))}
              </div>
              
              {/* Dentes inferiores permanentes */}
              <div className="flex justify-center gap-2">
                {lowerTeeth.map(tooth => (
                  <ToothButton 
                    key={tooth} 
                    number={tooth} 
                    isSelected={teethStatus[tooth]} 
                    onClick={handleToothClick} 
                  />
                ))}
              </div>
            </div>
            <p className="text-center text-white/80 mt-4">Clique nos dentes para selecionar problemas dentários</p>
          </div>

          {/* Histórico de Consultas */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Histórico de Consultas</h3>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-white text-sm font-medium mb-2">Data do Atendimento</label>
                <input
                  type="date"
                  value={novaConsulta.data}
                  onChange={(e) => setNovaConsulta(prev => ({ ...prev, data: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex-1">
                <label className="block text-white text-sm font-medium mb-2">Peso (kg)</label>
                <input
                  type="text"
                  placeholder="Ex: 25.5"
                  value={novaConsulta.peso}
                  onChange={(e) => setNovaConsulta(prev => ({ ...prev, peso: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addConsulta}
                  className="px-6 py-3 bg-green-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-green-500/90 font-medium border border-green-400/30 shadow-lg shadow-green-500/25 flex items-center gap-2 transition-all duration-200"
                >
                  <Plus size={18} />
                  Adicionar
                </button>
              </div>
            </div>
            
            {consultas.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-white text-lg">Nenhuma consulta registrada ainda</p>
                <p className="text-white/60 text-sm">Adicione a primeira consulta acima</p>
              </div>
            ) : (
              <div className="space-y-3">
                {consultas.map(consulta => (
                  <div key={consulta.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex justify-between border border-white/30">
                    <span className="text-white font-medium">{consulta.data}</span>
                    <span className="text-white font-medium">{consulta.peso} kg</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Responsável */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Responsável</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Nome do Responsável *</label>
                <input
                  type="text"
                  value={patientData.responsavel}
                  onChange={(e) => handlePatientDataChange('responsavel', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="declaracao" className="w-5 h-5 rounded" />
                <label htmlFor="declaracao" className="text-white text-sm">
                  Declaro que todas as informações prestadas são verdadeiras
                </label>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-center pb-8">
            <button
              type="button"
              onClick={savePatient}
              disabled={isLoading}
              className="px-8 py-4 bg-green-600/80 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-green-600/90 disabled:opacity-50 border border-green-500/30 shadow-lg shadow-green-500/25 flex items-center gap-3 transition-all duration-200"
            >
              <Save size={20} />
              {isLoading ? 'Salvando...' : 'Salvar Ficha'}
            </button>
            <button
              type="button"
              onClick={generatePDF}
              className="px-8 py-4 bg-red-600/80 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-red-600/90 border border-red-500/30 shadow-lg shadow-red-500/25 flex items-center gap-3 transition-all duration-200"
            >
              <FileDown size={20} />
              Exportar PDF
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-8 py-4 bg-gray-600/80 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-gray-600/90 border border-gray-500/30 shadow-lg shadow-gray-500/25 flex items-center gap-3 transition-all duration-200"
            >
              <RotateCcw size={20} />
              Limpar Formulário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OdontogramaUpdated;

