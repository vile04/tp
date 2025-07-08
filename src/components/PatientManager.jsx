import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Search, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';

export const PatientManager = ({ 
  patients, 
  searchTerm, 
  onSearchChange, 
  onNewPatient, 
  onEditPatient, 
  onViewPatient, 
  onDeletePatient 
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Gerenciar Pacientes</h1>
          <p className="text-emerald-100">
            {patients.length} {patients.length === 1 ? 'paciente cadastrado' : 'pacientes cadastrados'}
          </p>
        </div>
        
        <Button
          onClick={onNewPatient}
          className="glass-button bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Ficha
        </Button>
      </div>

      {/* Busca */}
      <Card className="glass-card border-white/30 mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input
              placeholder="Buscar por nome da criança ou responsável..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="glass-input text-white pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes */}
      {patients.length === 0 ? (
        <Card className="glass-card border-white/30">
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
            </h3>
            <p className="text-white/60 mb-6">
              {searchTerm 
                ? 'Tente ajustar os termos de busca' 
                : 'Comece criando sua primeira ficha de anamnese'
              }
            </p>
            {!searchTerm && (
              <Button
                onClick={onNewPatient}
                className="glass-button bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Ficha
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {patients.map((patient) => (
            <Card key={patient.id} className="glass-card border-white/30 hover:bg-white/15 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {patient.nome_crianca}
                      </h3>
                      {patient.idade && (
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-sm">
                          {patient.idade} anos
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-white/70">
                      <p>
                        <strong>Responsável:</strong> {patient.responsavel_nome}
                      </p>
                      {patient.data_nascimento && (
                        <p>
                          <strong>Data de Nascimento:</strong> {' '}
                          {new Date(patient.data_nascimento).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      {patient.cel && (
                        <p>
                          <strong>Celular:</strong> {patient.cel}
                        </p>
                      )}
                      <p>
                        <strong>Criado em:</strong> {' '}
                        {new Date(patient.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>

                    {/* Indicadores */}
                    <div className="flex items-center space-x-4 mt-3">
                      {patient.mapa_dental && patient.mapa_dental.length > 0 && (
                        <span className="flex items-center space-x-1 text-xs text-red-300">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>{patient.mapa_dental.length} alterações dentais</span>
                        </span>
                      )}
                      
                      {patient.consultas && patient.consultas.length > 0 && (
                        <span className="flex items-center space-x-1 text-xs text-blue-300">
                          <Calendar className="w-3 h-3" />
                          <span>{patient.consultas.length} consultas</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => onViewPatient(patient)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      title="Visualizar ficha"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => onEditPatient(patient)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      title="Editar ficha"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => onDeletePatient(patient.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-300 hover:bg-red-500/20"
                      title="Excluir ficha"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};