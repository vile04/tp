import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapaDentalInfantil } from './MapaDentalInfantil';
import { User, Heart, Stethoscope, Baby, Smile, SmilePlus, Apple, Calendar, Plus, Trash2 } from 'lucide-react';

// Componente para campos Sim/Não
const CampoSimNao = ({ label, value, onChange, textField, textValue, onTextChange }) => {
  return (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${label}-sim`}
            name={label}
            checked={value === true}
            onChange={() => onChange(true)}
            className="w-4 h-4 text-emerald-600 bg-white/20 border-white/30"
          />
          <label htmlFor={`${label}-sim`} className="text-white text-sm">Sim</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${label}-nao`}
            name={label}
            checked={value === false}
            onChange={() => onChange(false)}
            className="w-4 h-4 text-emerald-600 bg-white/20 border-white/30"
          />
          <label htmlFor={`${label}-nao`} className="text-white text-sm">Não</label>
        </div>
      </div>
      {textField && value === true && (
        <div className="mt-2">
          <Label className="text-white text-sm">{textField}</Label>
          <Input
            value={textValue || ''}
            onChange={(e) => onTextChange(e.target.value)}
            className="glass-input text-white mt-1"
          />
        </div>
      )}
    </div>
  );
};

// Dados Pessoais
export const DadosPessoais = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Dados Pessoais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Nome da Criança *</Label>
              <Input
                value={formData.nome_crianca}
                onChange={(e) => onInputChange('nome_crianca', e.target.value)}
                className="glass-input text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Data de Nascimento *</Label>
              <Input
                type="date"
                value={formData.data_nascimento}
                onChange={(e) => onInputChange('data_nascimento', e.target.value)}
                className="glass-input text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white">Idade</Label>
              <Input
                type="number"
                value={formData.idade}
                onChange={(e) => onInputChange('idade', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            <div>
              <Label className="text-white">Celular</Label>
              <Input
                type="tel"
                value={formData.cel}
                onChange={(e) => onInputChange('cel', e.target.value)}
                className="glass-input text-white"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-white">Endereço</Label>
            <Input
              value={formData.endereco}
              onChange={(e) => onInputChange('endereco', e.target.value)}
              className="glass-input text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">Bairro</Label>
              <Input
                value={formData.bairro}
                onChange={(e) => onInputChange('bairro', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            <div>
              <Label className="text-white">CEP</Label>
              <Input
                value={formData.cep}
                onChange={(e) => onInputChange('cep', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            <div>
              <Label className="text-white">Cidade</Label>
              <Input
                value={formData.cidade}
                onChange={(e) => onInputChange('cidade', e.target.value)}
                className="glass-input text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Dados dos Pais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-emerald-300">Mãe</h3>
              <div>
                <Label className="text-white">Nome da Mãe</Label>
                <Input
                  value={formData.nome_mae}
                  onChange={(e) => onInputChange('nome_mae', e.target.value)}
                  className="glass-input text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Idade</Label>
                  <Input
                    type="number"
                    value={formData.idade_mae}
                    onChange={(e) => onInputChange('idade_mae', e.target.value)}
                    className="glass-input text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Profissão</Label>
                  <Input
                    value={formData.profissao_mae}
                    onChange={(e) => onInputChange('profissao_mae', e.target.value)}
                    className="glass-input text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-emerald-300">Pai</h3>
              <div>
                <Label className="text-white">Nome do Pai</Label>
                <Input
                  value={formData.nome_pai}
                  onChange={(e) => onInputChange('nome_pai', e.target.value)}
                  className="glass-input text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Idade</Label>
                  <Input
                    type="number"
                    value={formData.idade_pai}
                    onChange={(e) => onInputChange('idade_pai', e.target.value)}
                    className="glass-input text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Profissão</Label>
                  <Input
                    value={formData.profissao_pai}
                    onChange={(e) => onInputChange('profissao_pai', e.target.value)}
                    className="glass-input text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Motivo da Consulta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Qual o motivo da consulta?</Label>
            <Textarea
              value={formData.motivo_consulta}
              onChange={(e) => onInputChange('motivo_consulta', e.target.value)}
              className="glass-input text-white h-24 resize-none"
              placeholder="Descreva o motivo da consulta..."
            />
          </div>
          
          <div>
            <Label className="text-white">Mãe teve alguma alteração durante a gestação?</Label>
            <Textarea
              value={formData.alteracao_gestacao}
              onChange={(e) => onInputChange('alteracao_gestacao', e.target.value)}
              className="glass-input text-white h-24 resize-none"
              placeholder="Descreva as alterações..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Necessidades Especiais
export const NecessidadesEspeciais = ({ formData, onInputChange }) => {
  return (
    <Card className="glass-card border-white/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span>Necessidades Especiais</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CampoSimNao
          label="Possui necessidade especial?"
          value={formData.necessidade_especial}
          onChange={(value) => onInputChange('necessidade_especial', value)}
          textField="Qual?"
          textValue={formData.qual_necessidade}
          onTextChange={(value) => onInputChange('qual_necessidade', value)}
        />
        
        <CampoSimNao
          label="Possui comprometimento de coordenação motora?"
          value={formData.comprometimento_coordenacao}
          onChange={(value) => onInputChange('comprometimento_coordenacao', value)}
          textField="Qual?"
          textValue={formData.qual_coordenacao}
          onTextChange={(value) => onInputChange('qual_coordenacao', value)}
        />
        
        <CampoSimNao
          label="Possui comprometimento visual?"
          value={formData.comprometimento_visual}
          onChange={(value) => onInputChange('comprometimento_visual', value)}
          textField="Qual?"
          textValue={formData.qual_visual}
          onTextChange={(value) => onInputChange('qual_visual', value)}
        />
        
        <CampoSimNao
          label="Possui comprometimento de comunicação?"
          value={formData.comprometimento_comunicacao}
          onChange={(value) => onInputChange('comprometimento_comunicacao', value)}
          textField="Qual?"
          textValue={formData.qual_comunicacao}
          onTextChange={(value) => onInputChange('qual_comunicacao', value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-white">Como o paciente reage quando é contrariado?</Label>
            <Textarea
              value={formData.reacao_contrariado}
              onChange={(e) => onInputChange('reacao_contrariado', e.target.value)}
              className="glass-input text-white h-20 resize-none"
            />
          </div>
          
          <div>
            <Label className="text-white">Como o paciente reage diante de profissionais da saúde?</Label>
            <Textarea
              value={formData.reacao_profissionais}
              onChange={(e) => onInputChange('reacao_profissionais', e.target.value)}
              className="glass-input text-white h-20 resize-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Histórico Médico
export const HistoricoMedico = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Stethoscope className="w-5 h-5" />
            <span>Histórico Médico</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CampoSimNao
            label="Sofreu alguma cirurgia?"
            value={formData.sofreu_cirurgia}
            onChange={(value) => onInputChange('sofreu_cirurgia', value)}
            textField="Qual?"
            textValue={formData.qual_cirurgia}
            onTextChange={(value) => onInputChange('qual_cirurgia', value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CampoSimNao
              label="Alterações sanguíneas?"
              value={formData.alteracoes_sanguineas}
              onChange={(value) => onInputChange('alteracoes_sanguineas', value)}
            />
            
            <CampoSimNao
              label="Problemas respiratórios?"
              value={formData.problemas_respiratorios}
              onChange={(value) => onInputChange('problemas_respiratorios', value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CampoSimNao
              label="Problemas hepáticos?"
              value={formData.problemas_hepaticos}
              onChange={(value) => onInputChange('problemas_hepaticos', value)}
            />
            
            <CampoSimNao
              label="Cardiopatias?"
              value={formData.cardiopatias}
              onChange={(value) => onInputChange('cardiopatias', value)}
            />
          </div>
          
          <CampoSimNao
            label="Problemas gástricos?"
            value={formData.problemas_gastricos}
            onChange={(value) => onInputChange('problemas_gastricos', value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-white">Alergias a medicamentos</Label>
              <Input
                value={formData.alergias_medicamento}
                onChange={(e) => onInputChange('alergias_medicamento', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Alergias alimentares</Label>
              <Input
                value={formData.alergias_alimentar}
                onChange={(e) => onInputChange('alergias_alimentar', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Alergias respiratórias</Label>
              <Input
                value={formData.alergias_respiratoria}
                onChange={(e) => onInputChange('alergias_respiratoria', e.target.value)}
                className="glass-input text-white"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-white">Tratamentos atuais</Label>
            <Textarea
              value={formData.tratamentos_atuais}
              onChange={(e) => onInputChange('tratamentos_atuais', e.target.value)}
              className="glass-input text-white h-20 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Acompanhamentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <CampoSimNao
              label="Fonoaudiologia?"
              value={formData.fonoaudiologia}
              onChange={(value) => onInputChange('fonoaudiologia', value)}
            />
            <CampoSimNao
              label="Fisioterapia?"
              value={formData.fisioterapia}
              onChange={(value) => onInputChange('fisioterapia', value)}
            />
            <CampoSimNao
              label="Psicologia?"
              value={formData.psicologia}
              onChange={(value) => onInputChange('psicologia', value)}
            />
            <div className="flex items-center space-x-4">
              <CampoSimNao
                label="Psiquiátrico?"
                value={formData.psiquiatrico}
                onChange={(value) => onInputChange('psiquiatrico', value)}
              />
              <CampoSimNao
                label="TO?"
                value={formData.psiquiatrico_to}
                onChange={(value) => onInputChange('psiquiatrico_to', value)}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-white">Outro tratamento?</Label>
            <Input
              value={formData.outro_tratamento}
              onChange={(e) => onInputChange('outro_tratamento', e.target.value)}
              className="glass-input text-white"
            />
          </div>
          
          <div>
            <Label className="text-white">É portador de alguma IST?</Label>
            <Input
              value={formData.portador_ist}
              onChange={(e) => onInputChange('portador_ist', e.target.value)}
              className="glass-input text-white"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Hábitos
export const Habitos = ({ formData, onInputChange }) => {
  return (
    <Card className="glass-card border-white/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Baby className="w-5 h-5" />
          <span>Hábitos</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <CampoSimNao
            label="Paciente mama no peito?"
            value={formData.mama_peito}
            onChange={(value) => onInputChange('mama_peito', value)}
          />
          <CampoSimNao
            label="Já mamou no peito?"
            value={formData.mamou_peito}
            onChange={(value) => onInputChange('mamou_peito', value)}
            textField="Até quando?"
            textValue={formData.ate_quando_mamou}
            onTextChange={(value) => onInputChange('ate_quando_mamou', value)}
          />
          <CampoSimNao
            label="Paciente toma mamadeira?"
            value={formData.toma_mamadeira}
            onChange={(value) => onInputChange('toma_mamadeira', value)}
          />
          <CampoSimNao
            label="Já tomou mamadeira?"
            value={formData.tomou_mamadeira}
            onChange={(value) => onInputChange('tomou_mamadeira', value)}
            textField="Até quando?"
            textValue={formData.ate_quando_mamadeira}
            onTextChange={(value) => onInputChange('ate_quando_mamadeira', value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-white">Engasga ou vomita com facilidade?</Label>
            <Input
              value={formData.engasga_vomita}
              onChange={(e) => onInputChange('engasga_vomita', e.target.value)}
              className="glass-input text-white"
            />
          </div>
          <div>
            <Label className="text-white">Chupa o dedo?</Label>
            <Input
              value={formData.chupa_dedo}
              onChange={(e) => onInputChange('chupa_dedo', e.target.value)}
              className="glass-input text-white"
            />
          </div>
          <div>
            <Label className="text-white">Chupa chupeta?</Label>
            <Input
              value={formData.chupa_chupeta}
              onChange={(e) => onInputChange('chupa_chupeta', e.target.value)}
              className="glass-input text-white"
            />
          </div>
          <div>
            <Label className="text-white">Possui outros hábitos?</Label>
            <Input
              value={formData.outros_habitos}
              onChange={(e) => onInputChange('outros_habitos', e.target.value)}
              className="glass-input text-white"
            />
          </div>
          <div>
            <Label className="text-white">Range os dentes?</Label>
            <Input
              value={formData.range_dentes}
              onChange={(e) => onInputChange('range_dentes', e.target.value)}
              className="glass-input text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Histórico Odontológico
export const HistoricoOdontologico = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <SmilePlus className="w-5 h-5" />
            <span>Histórico Odontológico</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white">Quantos anos na primeira consulta?</Label>
              <Input
                type="number"
                value={formData.anos_primeira_consulta}
                onChange={(e) => onInputChange('anos_primeira_consulta', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            <div>
              <Label className="text-white">Como foi o tratamento anterior?</Label>
              <Input
                value={formData.tratamento_anterior}
                onChange={(e) => onInputChange('tratamento_anterior', e.target.value)}
                className="glass-input text-white"
              />
            </div>
          </div>
          
          <CampoSimNao
            label="Já foi ao dentista?"
            value={formData.foi_dentista}
            onChange={(value) => onInputChange('foi_dentista', value)}
            textField="Qual?"
            textValue={formData.qual_dentista}
            onTextChange={(value) => onInputChange('qual_dentista', value)}
          />
        </CardContent>
      </Card>

      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Smile className="w-5 h-5" />
            <span>Higiene Bucal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white">Qual escova usa?</Label>
              <Input
                value={formData.escova_usa}
                onChange={(e) => onInputChange('escova_usa', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Qual creme dental usa?</Label>
              <Input
                value={formData.creme_dental}
                onChange={(e) => onInputChange('creme_dental', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Quem faz a higiene bucal?</Label>
              <Input
                value={formData.higiene_bucal}
                onChange={(e) => onInputChange('higiene_bucal', e.target.value)}
                className="glass-input text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Quantas vezes ao dia?</Label>
              <Input
                type="number"
                value={formData.vezes_dia_higiene}
                onChange={(e) => onInputChange('vezes_dia_higiene', e.target.value)}
                className="glass-input text-white"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <CampoSimNao
              label="Já tomou anestesia?"
              value={formData.tomou_anestesia}
              onChange={(value) => onInputChange('tomou_anestesia', value)}
            />
            
            <CampoSimNao
              label="Gengiva sangra com facilidade?"
              value={formData.gengiva_sangra}
              onChange={(value) => onInputChange('gengiva_sangra', value)}
            />
            
            <CampoSimNao
              label="Já realizou extrações dentárias?"
              value={formData.extracoes_dentarias}
              onChange={(value) => onInputChange('extracoes_dentarias', value)}
            />
            
            <CampoSimNao
              label="Escova a língua?"
              value={formData.escova_lingua}
              onChange={(value) => onInputChange('escova_lingua', value)}
            />
            
            <CampoSimNao
              label="Usa fio dental?"
              value={formData.usa_fio_dental}
              onChange={(value) => onInputChange('usa_fio_dental', value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Apple className="w-5 h-5" />
            <span>Alimentação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-white">Vamos falar sobre a alimentação do paciente:</Label>
            <Textarea
              value={formData.alimentacao_notas}
              onChange={(e) => onInputChange('alimentacao_notas', e.target.value)}
              className="glass-input text-white h-24 resize-none"
              placeholder="Descreva os hábitos alimentares..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Mapa Dental e Consultas
export const MapaEConsultas = ({ formData, onInputChange, onAddConsulta }) => {
  const [novaConsulta, setNovaConsulta] = useState({
    data: '',
    peso: '',
    observacoes: '',
    procedimentos: ''
  });

  const handleAddConsulta = () => {
    if (!novaConsulta.data) {
      alert('Data da consulta é obrigatória');
      return;
    }

    onAddConsulta(novaConsulta);
    setNovaConsulta({
      data: '',
      peso: '',
      observacoes: '',
      procedimentos: ''
    });
  };

  const handleRemoveConsulta = (index) => {
    const updatedConsultas = formData.consultas.filter((_, i) => i !== index);
    onInputChange('consultas', updatedConsultas);
  };

  return (
    <div className="space-y-6">
      <MapaDentalInfantil
        selectedTeeth={formData.mapa_dental}
        onTeethChange={(teeth) => onInputChange('mapa_dental', teeth)}
      />

      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Histórico de Consultas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Consultas existentes */}
          {formData.consultas && formData.consultas.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-white font-medium">Consultas Registradas:</h4>
              {formData.consultas.map((consulta, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">
                      Consulta {index + 1} - {new Date(consulta.data).toLocaleDateString('pt-BR')}
                    </span>
                    <Button
                      onClick={() => handleRemoveConsulta(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {consulta.peso && (
                    <p className="text-white/70 text-sm">Peso: {consulta.peso} kg</p>
                  )}
                  {consulta.observacoes && (
                    <p className="text-white/70 text-sm">Observações: {consulta.observacoes}</p>
                  )}
                  {consulta.procedimentos && (
                    <p className="text-white/70 text-sm">Procedimentos: {consulta.procedimentos}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Adicionar nova consulta */}
          <div className="bg-white/5 rounded-lg p-4 space-y-4">
            <h4 className="text-white font-medium">Adicionar Nova Consulta:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Data da Consulta *</Label>
                <Input
                  type="date"
                  value={novaConsulta.data}
                  onChange={(e) => setNovaConsulta(prev => ({ ...prev, data: e.target.value }))}
                  className="glass-input text-white"
                />
              </div>
              
              <div>
                <Label className="text-white">Peso (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={novaConsulta.peso}
                  onChange={(e) => setNovaConsulta(prev => ({ ...prev, peso: e.target.value }))}
                  className="glass-input text-white"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white">Observações</Label>
              <Textarea
                value={novaConsulta.observacoes}
                onChange={(e) => setNovaConsulta(prev => ({ ...prev, observacoes: e.target.value }))}
                className="glass-input text-white h-20 resize-none"
                placeholder="Observações da consulta..."
              />
            </div>
            
            <div>
              <Label className="text-white">Procedimentos Realizados</Label>
              <Textarea
                value={novaConsulta.procedimentos}
                onChange={(e) => setNovaConsulta(prev => ({ ...prev, procedimentos: e.target.value }))}
                className="glass-input text-white h-20 resize-none"
                placeholder="Procedimentos realizados..."
              />
            </div>
            
            <Button
              onClick={handleAddConsulta}
              className="glass-button bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Consulta
            </Button>
          </div>

          {/* Informações Adicionais */}
          <div>
            <Label className="text-white">Alguma informação adicional não relatada?</Label>
            <Textarea
              value={formData.informacoes_adicionais}
              onChange={(e) => onInputChange('informacoes_adicionais', e.target.value)}
              className="glass-input text-white h-24 resize-none"
              placeholder="Informações adicionais..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente para visualizar ficha completa
export const FichaCompleta = ({ patient }) => {
  const formatSimNao = (value) => {
    if (value === true) return 'Sim';
    if (value === false) return 'Não';
    return 'Não informado';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6 pdf-export">
      {/* Dados Pessoais */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Dados Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          <div><strong>Nome da Criança:</strong> {patient.nome_crianca}</div>
          <div><strong>Data de Nascimento:</strong> {formatDate(patient.data_nascimento)}</div>
          <div><strong>Idade:</strong> {patient.idade || 'Não informado'}</div>
          <div><strong>Celular:</strong> {patient.cel || 'Não informado'}</div>
          <div className="md:col-span-2"><strong>Endereço:</strong> {patient.endereco || 'Não informado'}</div>
          <div><strong>Bairro:</strong> {patient.bairro || 'Não informado'}</div>
          <div><strong>CEP:</strong> {patient.cep || 'Não informado'}</div>
          <div><strong>Cidade:</strong> {patient.cidade || 'Não informado'}</div>
        </CardContent>
      </Card>

      {/* Dados dos Pais */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Dados dos Pais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-emerald-300 mb-2">Mãe</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Nome:</strong> {patient.nome_mae || 'Não informado'}</div>
                <div><strong>Idade:</strong> {patient.idade_mae || 'Não informado'}</div>
                <div><strong>Profissão:</strong> {patient.profissao_mae || 'Não informado'}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-300 mb-2">Pai</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Nome:</strong> {patient.nome_pai || 'Não informado'}</div>
                <div><strong>Idade:</strong> {patient.idade_pai || 'Não informado'}</div>
                <div><strong>Profissão:</strong> {patient.profissao_pai || 'Não informado'}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivo da Consulta */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Motivo da Consulta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white">
          <div>
            <strong>Motivo da consulta:</strong>
            <p className="mt-1">{patient.motivo_consulta || 'Não informado'}</p>
          </div>
          <div>
            <strong>Alterações na gestação:</strong>
            <p className="mt-1">{patient.alteracao_gestacao || 'Não informado'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Necessidades Especiais */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Necessidades Especiais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm">
          <div><strong>Necessidade especial:</strong> {formatSimNao(patient.necessidade_especial)}</div>
          {patient.qual_necessidade && <div><strong>Qual:</strong> {patient.qual_necessidade}</div>}
          <div><strong>Comprometimento coordenação:</strong> {formatSimNao(patient.comprometimento_coordenacao)}</div>
          {patient.qual_coordenacao && <div><strong>Qual:</strong> {patient.qual_coordenacao}</div>}
          <div><strong>Comprometimento visual:</strong> {formatSimNao(patient.comprometimento_visual)}</div>
          {patient.qual_visual && <div><strong>Qual:</strong> {patient.qual_visual}</div>}
          <div><strong>Comprometimento comunicação:</strong> {formatSimNao(patient.comprometimento_comunicacao)}</div>
          {patient.qual_comunicacao && <div><strong>Qual:</strong> {patient.qual_comunicacao}</div>}
          {patient.reacao_contrariado && (
            <div className="md:col-span-2">
              <strong>Reação quando contrariado:</strong> {patient.reacao_contrariado}
            </div>
          )}
          {patient.reacao_profissionais && (
            <div className="md:col-span-2">
              <strong>Reação com profissionais:</strong> {patient.reacao_profissionais}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico Médico */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Histórico Médico</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm">
          <div><strong>Sofreu cirurgia:</strong> {formatSimNao(patient.sofreu_cirurgia)}</div>
          {patient.qual_cirurgia && <div><strong>Qual:</strong> {patient.qual_cirurgia}</div>}
          <div><strong>Alterações sanguíneas:</strong> {formatSimNao(patient.alteracoes_sanguineas)}</div>
          <div><strong>Problemas respiratórios:</strong> {formatSimNao(patient.problemas_respiratorios)}</div>
          <div><strong>Problemas hepáticos:</strong> {formatSimNao(patient.problemas_hepaticos)}</div>
          <div><strong>Cardiopatias:</strong> {formatSimNao(patient.cardiopatias)}</div>
          <div><strong>Problemas gástricos:</strong> {formatSimNao(patient.problemas_gastricos)}</div>
          <div><strong>Alergias medicamentos:</strong> {patient.alergias_medicamento || 'Não informado'}</div>
          <div><strong>Alergias alimentares:</strong> {patient.alergias_alimentar || 'Não informado'}</div>
          <div><strong>Alergias respiratórias:</strong> {patient.alergias_respiratoria || 'Não informado'}</div>
          {patient.tratamentos_atuais && (
            <div className="md:col-span-2">
              <strong>Tratamentos atuais:</strong> {patient.tratamentos_atuais}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Acompanhamentos */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Acompanhamentos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-sm">
          <div><strong>Fonoaudiologia:</strong> {formatSimNao(patient.fonoaudiologia)}</div>
          <div><strong>Fisioterapia:</strong> {formatSimNao(patient.fisioterapia)}</div>
          <div><strong>Psicologia:</strong> {formatSimNao(patient.psicologia)}</div>
          <div><strong>Psiquiátrico:</strong> {formatSimNao(patient.psiquiatrico)}</div>
          <div><strong>TO:</strong> {formatSimNao(patient.psiquiatrico_to)}</div>
          {patient.outro_tratamento && <div><strong>Outro:</strong> {patient.outro_tratamento}</div>}
          {patient.portador_ist && <div><strong>IST:</strong> {patient.portador_ist}</div>}
        </CardContent>
      </Card>

      {/* Hábitos */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Hábitos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm">
          <div><strong>Mama no peito:</strong> {formatSimNao(patient.mama_peito)}</div>
          <div><strong>Já mamou no peito:</strong> {formatSimNao(patient.mamou_peito)}</div>
          {patient.ate_quando_mamou && <div><strong>Até quando mamou:</strong> {patient.ate_quando_mamou}</div>}
          <div><strong>Toma mamadeira:</strong> {formatSimNao(patient.toma_mamadeira)}</div>
          <div><strong>Já tomou mamadeira:</strong> {formatSimNao(patient.tomou_mamadeira)}</div>
          {patient.ate_quando_mamadeira && <div><strong>Até quando mamadeira:</strong> {patient.ate_quando_mamadeira}</div>}
          {patient.engasga_vomita && <div><strong>Engasga/vomita:</strong> {patient.engasga_vomita}</div>}
          {patient.chupa_dedo && <div><strong>Chupa dedo:</strong> {patient.chupa_dedo}</div>}
          {patient.chupa_chupeta && <div><strong>Chupa chupeta:</strong> {patient.chupa_chupeta}</div>}
          {patient.outros_habitos && <div><strong>Outros hábitos:</strong> {patient.outros_habitos}</div>}
          {patient.range_dentes && <div><strong>Range dentes:</strong> {patient.range_dentes}</div>}
        </CardContent>
      </Card>

      {/* Histórico Odontológico */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Histórico Odontológico</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm">
          <div><strong>Anos primeira consulta:</strong> {patient.anos_primeira_consulta || 'Não informado'}</div>
          <div><strong>Tratamento anterior:</strong> {patient.tratamento_anterior || 'Não informado'}</div>
          <div><strong>Já foi ao dentista:</strong> {formatSimNao(patient.foi_dentista)}</div>
          {patient.qual_dentista && <div><strong>Qual dentista:</strong> {patient.qual_dentista}</div>}
        </CardContent>
      </Card>

      {/* Higiene Bucal */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Higiene Bucal</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm">
          <div><strong>Escova:</strong> {patient.escova_usa || 'Não informado'}</div>
          <div><strong>Creme dental:</strong> {patient.creme_dental || 'Não informado'}</div>
          <div><strong>Quem faz higiene:</strong> {patient.higiene_bucal || 'Não informado'}</div>
          <div><strong>Vezes ao dia:</strong> {patient.vezes_dia_higiene || 'Não informado'}</div>
          <div><strong>Tomou anestesia:</strong> {formatSimNao(patient.tomou_anestesia)}</div>
          <div><strong>Gengiva sangra:</strong> {formatSimNao(patient.gengiva_sangra)}</div>
          <div><strong>Extrações:</strong> {formatSimNao(patient.extracoes_dentarias)}</div>
          <div><strong>Escova língua:</strong> {formatSimNao(patient.escova_lingua)}</div>
          <div><strong>Usa fio dental:</strong> {formatSimNao(patient.usa_fio_dental)}</div>
        </CardContent>
      </Card>

      {/* Alimentação */}
      {patient.alimentacao_notas && (
        <Card className="glass-card border-white/30">
          <CardHeader>
            <CardTitle className="text-white">Alimentação</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>{patient.alimentacao_notas}</p>
          </CardContent>
        </Card>
      )}

      {/* Mapa Dental */}
      {patient.mapa_dental && patient.mapa_dental.length > 0 && (
        <Card className="glass-card border-white/30">
          <CardHeader>
            <CardTitle className="text-white">Mapa Dental - Alterações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {patient.mapa_dental.map(tooth => (
                <span key={tooth} className="bg-red-500/30 text-red-100 px-2 py-1 rounded text-sm">
                  {tooth}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consultas */}
      {patient.consultas && patient.consultas.length > 0 && (
        <Card className="glass-card border-white/30">
          <CardHeader>
            <CardTitle className="text-white">Histórico de Consultas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patient.consultas.map((consulta, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 text-white">
                <h4 className="font-semibold mb-2">
                  Consulta {index + 1} - {formatDate(consulta.data)}
                </h4>
                {consulta.peso && <p className="text-sm"><strong>Peso:</strong> {consulta.peso} kg</p>}
                {consulta.observacoes && <p className="text-sm"><strong>Observações:</strong> {consulta.observacoes}</p>}
                {consulta.procedimentos && <p className="text-sm"><strong>Procedimentos:</strong> {consulta.procedimentos}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Informações Adicionais */}
      {patient.informacoes_adicionais && (
        <Card className="glass-card border-white/30">
          <CardHeader>
            <CardTitle className="text-white">Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>{patient.informacoes_adicionais}</p>
          </CardContent>
        </Card>
      )}

      {/* Responsável */}
      <Card className="glass-card border-white/30">
        <CardHeader>
          <CardTitle className="text-white">Responsável</CardTitle>
        </CardHeader>
        <CardContent className="text-white">
          <div className="space-y-2">
            <div><strong>Nome:</strong> {patient.responsavel_nome}</div>
            <div><strong>Data de criação:</strong> {formatDate(patient.created_at)}</div>
            <div><strong>Informações verdadeiras:</strong> {patient.informacoes_verdadeiras ? 'Sim' : 'Não'}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};