import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Download, 
  Save, 
  FileText, 
  ArrowLeft, 
  Users, 
  User, 
  Heart, 
  Stethoscope, 
  Smile, 
  Activity, 
  Baby, 
  SmilePlus, 
  Apple, 
  Edit3,
  LogOut,
  Plus,
  Calendar,
  Trash2,
  Eye
} from 'lucide-react';
import { GoogleAuth } from './GoogleAuth';
import { MapaDentalInfantil } from './MapaDentalInfantil';
import { PDFExporter } from './PDFExporter';
import { PatientManager } from './PatientManager';

const OdontogramaUpdated = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, form, view
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome_crianca: '',
    data_nascimento: '',
    idade: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    cel: '',
    
    // Dados dos Pais
    nome_mae: '',
    idade_mae: '',
    profissao_mae: '',
    nome_pai: '',
    idade_pai: '',
    profissao_pai: '',
    
    // Motivo da Consulta
    motivo_consulta: '',
    alteracao_gestacao: '',
    
    // Necessidades Especiais
    necessidade_especial: null,
    qual_necessidade: '',
    comprometimento_coordenacao: null,
    qual_coordenacao: '',
    comprometimento_visual: null,
    qual_visual: '',
    comprometimento_comunicacao: null,
    qual_comunicacao: '',
    reacao_contrariado: '',
    reacao_profissionais: '',
    
    // Histórico Médico
    sofreu_cirurgia: null,
    qual_cirurgia: '',
    alteracoes_sanguineas: null,
    problemas_respiratorios: null,
    problemas_hepaticos: null,
    cardiopatias: null,
    problemas_gastricos: null,
    alergias_medicamento: '',
    alergias_alimentar: '',
    alergias_respiratoria: '',
    tratamentos_atuais: '',
    
    // Acompanhamentos
    fonoaudiologia: null,
    fisioterapia: null,
    psicologia: null,
    psiquiatrico: null,
    psiquiatrico_to: null,
    outro_tratamento: '',
    portador_ist: '',
    
    // Hábitos
    mama_peito: null,
    mamou_peito: null,
    ate_quando_mamou: '',
    toma_mamadeira: null,
    tomou_mamadeira: null,
    ate_quando_mamadeira: '',
    engasga_vomita: '',
    chupa_dedo: '',
    chupa_chupeta: '',
    outros_habitos: '',
    range_dentes: '',
    
    // Histórico Odontológico
    anos_primeira_consulta: '',
    tratamento_anterior: '',
    foi_dentista: null,
    qual_dentista: '',
    
    // Higiene Bucal
    escova_usa: '',
    creme_dental: '',
    higiene_bucal: '',
    vezes_dia_higiene: '',
    tomou_anestesia: null,
    gengiva_sangra: null,
    extracoes_dentarias: null,
    escova_lingua: null,
    usa_fio_dental: null,
    
    // Alimentação
    alimentacao_notas: '',
    
    // Mapa Dental
    mapa_dental: [],
    
    // Consultas
    consultas: [],
    
    // Responsável
    responsavel_nome: '',
    informacoes_verdadeiras: false,
    informacoes_adicionais: ''
  });

  const odontogramaRef = useRef(null);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedPatients = localStorage.getItem('odontograma_patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Salvar dados no localStorage
  const saveToStorage = (patientsData) => {
    localStorage.setItem('odontograma_patients', JSON.stringify(patientsData));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      nome_crianca: '',
      data_nascimento: '',
      idade: '',
      endereco: '',
      bairro: '',
      cep: '',
      cidade: '',
      cel: '',
      nome_mae: '',
      idade_mae: '',
      profissao_mae: '',
      nome_pai: '',
      idade_pai: '',
      profissao_pai: '',
      motivo_consulta: '',
      alteracao_gestacao: '',
      necessidade_especial: null,
      qual_necessidade: '',
      comprometimento_coordenacao: null,
      qual_coordenacao: '',
      comprometimento_visual: null,
      qual_visual: '',
      comprometimento_comunicacao: null,
      qual_comunicacao: '',
      reacao_contrariado: '',
      reacao_profissionais: '',
      sofreu_cirurgia: null,
      qual_cirurgia: '',
      alteracoes_sanguineas: null,
      problemas_respiratorios: null,
      problemas_hepaticos: null,
      cardiopatias: null,
      problemas_gastricos: null,
      alergias_medicamento: '',
      alergias_alimentar: '',
      alergias_respiratoria: '',
      tratamentos_atuais: '',
      fonoaudiologia: null,
      fisioterapia: null,
      psicologia: null,
      psiquiatrico: null,
      psiquiatrico_to: null,
      outro_tratamento: '',
      portador_ist: '',
      mama_peito: null,
      mamou_peito: null,
      ate_quando_mamou: '',
      toma_mamadeira: null,
      tomou_mamadeira: null,
      ate_quando_mamadeira: '',
      engasga_vomita: '',
      chupa_dedo: '',
      chupa_chupeta: '',
      outros_habitos: '',
      range_dentes: '',
      anos_primeira_consulta: '',
      tratamento_anterior: '',
      foi_dentista: null,
      qual_dentista: '',
      escova_usa: '',
      creme_dental: '',
      higiene_bucal: '',
      vezes_dia_higiene: '',
      tomou_anestesia: null,
      gengiva_sangra: null,
      extracoes_dentarias: null,
      escova_lingua: null,
      usa_fio_dental: null,
      alimentacao_notas: '',
      mapa_dental: [],
      consultas: [],
      responsavel_nome: '',
      informacoes_verdadeiras: false,
      informacoes_adicionais: ''
    });
  };

  const handleSavePatient = () => {
    if (!formData.nome_crianca.trim()) {
      alert('Nome da criança é obrigatório');
      return;
    }

    if (!formData.responsavel_nome.trim()) {
      alert('Nome do responsável é obrigatório');
      return;
    }

    const newPatient = {
      id: currentPatient ? currentPatient.id : Date.now().toString(),
      ...formData,
      created_at: currentPatient ? currentPatient.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    let updatedPatients;
    if (currentPatient) {
      updatedPatients = patients.map(p => p.id === currentPatient.id ? newPatient : p);
    } else {
      updatedPatients = [...patients, newPatient];
    }

    setPatients(updatedPatients);
    saveToStorage(updatedPatients);
    
    alert(currentPatient ? 'Ficha atualizada com sucesso!' : 'Ficha salva com sucesso!');
    setCurrentView('dashboard');
    setCurrentPatient(null);
    resetForm();
  };

  const handleEditPatient = (patient) => {
    setCurrentPatient(patient);
    setFormData(patient);
    setCurrentView('form');
  };

  const handleViewPatient = (patient) => {
    setCurrentPatient(patient);
    setFormData(patient);
    setCurrentView('view');
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Tem certeza que deseja excluir esta ficha?')) {
      const updatedPatients = patients.filter(p => p.id !== patientId);
      setPatients(updatedPatients);
      saveToStorage(updatedPatients);
    }
  };

  const handleNewPatient = () => {
    setCurrentPatient(null);
    resetForm();
    setCurrentView('form');
  };

  const handleAddConsulta = (consulta) => {
    const newConsulta = {
      id: Date.now().toString(),
      data: consulta.data,
      peso: consulta.peso,
      observacoes: consulta.observacoes,
      procedimentos: consulta.procedimentos
    };

    setFormData(prev => ({
      ...prev,
      consultas: [...(prev.consultas || []), newConsulta]
    }));
  };

  const filteredPatients = patients.filter(patient =>
    patient.nome_crianca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.responsavel_nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return <GoogleAuth onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat" 
         style={{backgroundImage: 'url(/bg.png)'}}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-teal-700/80 to-cyan-800/80"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Header */}
      <header className="glass-card rounded-none border-x-0 border-t-0 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                <img 
                  src="/logo.png" 
                  alt="Tio Paulo Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Tio Paulo</h1>
                <p className="text-emerald-100 text-sm">Ficha de Anamnese Odontológica</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-sm">{user.name}</span>
              </div>
              <Button
                onClick={() => setUser(null)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <PatientManager
            patients={filteredPatients}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onNewPatient={handleNewPatient}
            onEditPatient={handleEditPatient}
            onViewPatient={handleViewPatient}
            onDeletePatient={handleDeletePatient}
          />
        )}

        {currentView === 'form' && (
          <FormularioAnamnese
            formData={formData}
            onInputChange={handleInputChange}
            onSave={handleSavePatient}
            onCancel={() => {
              setCurrentView('dashboard');
              setCurrentPatient(null);
              resetForm();
            }}
            onAddConsulta={handleAddConsulta}
            isEditing={!!currentPatient}
          />
        )}

        {currentView === 'view' && (
          <VisualizarFicha
            patient={currentPatient}
            onEdit={() => setCurrentView('form')}
            onBack={() => {
              setCurrentView('dashboard');
              setCurrentPatient(null);
            }}
            odontogramaRef={odontogramaRef}
          />
        )}
      </main>
    </div>
  );
};

// Componente do Formulário de Anamnese
const FormularioAnamnese = ({ formData, onInputChange, onSave, onCancel, onAddConsulta, isEditing }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onCancel}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isEditing ? 'Editar Ficha' : 'Nova Ficha de Anamnese'}
            </h1>
            {formData.nome_crianca && (
              <p className="text-emerald-100">{formData.nome_crianca}</p>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="dados-pessoais" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="dados-pessoais" className="text-white data-[state=active]:bg-white/20">
            <User className="w-4 h-4 mr-2" />
            Dados
          </TabsTrigger>
          <TabsTrigger value="necessidades" className="text-white data-[state=active]:bg-white/20">
            <Heart className="w-4 h-4 mr-2" />
            Necessidades
          </TabsTrigger>
          <TabsTrigger value="medico" className="text-white data-[state=active]:bg-white/20">
            <Stethoscope className="w-4 h-4 mr-2" />
            Médico
          </TabsTrigger>
          <TabsTrigger value="habitos" className="text-white data-[state=active]:bg-white/20">
            <Baby className="w-4 h-4 mr-2" />
            Hábitos
          </TabsTrigger>
          <TabsTrigger value="odontologico" className="text-white data-[state=active]:bg-white/20">
            <Smile className="w-4 h-4 mr-2" />
            Odonto
          </TabsTrigger>
          <TabsTrigger value="mapa" className="text-white data-[state=active]:bg-white/20">
            <SmilePlus className="w-4 h-4 mr-2" />
            Mapa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dados-pessoais">
          <DadosPessoais formData={formData} onInputChange={onInputChange} />
        </TabsContent>

        <TabsContent value="necessidades">
          <NecessidadesEspeciais formData={formData} onInputChange={onInputChange} />
        </TabsContent>

        <TabsContent value="medico">
          <HistoricoMedico formData={formData} onInputChange={onInputChange} />
        </TabsContent>

        <TabsContent value="habitos">
          <Habitos formData={formData} onInputChange={onInputChange} />
        </TabsContent>

        <TabsContent value="odontologico">
          <HistoricoOdontologico formData={formData} onInputChange={onInputChange} />
        </TabsContent>

        <TabsContent value="mapa">
          <MapaEConsultas 
            formData={formData} 
            onInputChange={onInputChange}
            onAddConsulta={onAddConsulta}
          />
        </TabsContent>
      </Tabs>

      {/* Responsável e Botões */}
      <div className="mt-8 space-y-6">
        <Card className="glass-card border-white/30">
          <CardHeader>
            <CardTitle className="text-white">Responsável</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Nome do Responsável *</Label>
              <Input
                value={formData.responsavel_nome}
                onChange={(e) => onInputChange('responsavel_nome', e.target.value)}
                className="glass-input text-white"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="informacoes_verdadeiras"
                checked={formData.informacoes_verdadeiras}
                onChange={(e) => onInputChange('informacoes_verdadeiras', e.target.checked)}
                className="w-4 h-4 text-emerald-600 bg-white/20 border-white/30 rounded focus:ring-emerald-500"
              />
              <Label htmlFor="informacoes_verdadeiras" className="text-white text-sm">
                Declaro que todas as informações prestadas são verdadeiras
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={onCancel}
            variant="outline"
            className="glass-button text-white border-white/30 hover:bg-white/20"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            className="glass-button bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Atualizar Ficha' : 'Salvar Ficha'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Componente para visualizar ficha
const VisualizarFicha = ({ patient, onEdit, onBack, odontogramaRef }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Ficha de Anamnese</h1>
            <p className="text-emerald-100">{patient.nome_crianca}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={onEdit}
            className="glass-button text-white hover:bg-white/20"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <PDFExporter patient={patient} odontogramaRef={odontogramaRef} />
        </div>
      </div>

      <div ref={odontogramaRef} className="space-y-6">
        <FichaCompleta patient={patient} />
      </div>
    </div>
  );
};

export default OdontogramaUpdated;