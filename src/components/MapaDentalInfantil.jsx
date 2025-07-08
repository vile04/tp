import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MapaDentalInfantil = ({ selectedTeeth = [], onTeethChange }) => {
  // Dentes decíduos (de leite) - numeração internacional
  const dentesSuperioresDeciduos = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
  const dentesInferioresDeciduos = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];
  
  // Dentes permanentes - numeração internacional
  const dentesSuperioresPermanentes = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const dentesInferioresPermanentes = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const handleToothClick = (toothNumber, surface) => {
    const toothKey = `${toothNumber}-${surface}`;
    const newSelectedTeeth = selectedTeeth.includes(toothKey)
      ? selectedTeeth.filter(t => t !== toothKey)
      : [...selectedTeeth, toothKey];
    
    onTeethChange(newSelectedTeeth);
  };

  const renderTooth = (toothNumber, isDeciduous = false) => {
    const surfaces = ['V', 'M', 'D', 'L', 'O']; // Vestibular, Mesial, Distal, Lingual, Oclusal
    
    return (
      <div key={toothNumber} className="flex flex-col items-center space-y-1">
        {/* Número do dente */}
        <div className={`text-xs font-bold ${isDeciduous ? 'text-blue-300' : 'text-white'}`}>
          {toothNumber}
        </div>
        
        {/* Estrutura do dente */}
        <div className="relative">
          {/* Dente em formato anatômico simplificado */}
          <div className={`w-8 h-10 relative border-2 ${isDeciduous ? 'border-blue-300' : 'border-white'} rounded-t-lg bg-white/10`}>
            {/* Superfície Vestibular (frente) */}
            <button
              onClick={() => handleToothClick(toothNumber, 'V')}
              className={`absolute top-0 left-0 w-full h-3 rounded-t-lg transition-all duration-200 ${
                selectedTeeth.includes(`${toothNumber}-V`) 
                  ? 'bg-red-500 border border-red-600' 
                  : 'bg-transparent hover:bg-white/20'
              }`}
              title={`${toothNumber} - Vestibular`}
            />
            
            {/* Superfície Oclusal (mastigatória) - centro */}
            <button
              onClick={() => handleToothClick(toothNumber, 'O')}
              className={`absolute top-3 left-1 w-6 h-4 transition-all duration-200 ${
                selectedTeeth.includes(`${toothNumber}-O`) 
                  ? 'bg-red-500 border border-red-600' 
                  : 'bg-transparent hover:bg-white/20'
              }`}
              title={`${toothNumber} - Oclusal`}
            />
            
            {/* Superfície Mesial (lado direito na visualização) */}
            <button
              onClick={() => handleToothClick(toothNumber, 'M')}
              className={`absolute top-1 left-0 w-2 h-8 transition-all duration-200 ${
                selectedTeeth.includes(`${toothNumber}-M`) 
                  ? 'bg-red-500 border border-red-600' 
                  : 'bg-transparent hover:bg-white/20'
              }`}
              title={`${toothNumber} - Mesial`}
            />
            
            {/* Superfície Distal (lado esquerdo na visualização) */}
            <button
              onClick={() => handleToothClick(toothNumber, 'D')}
              className={`absolute top-1 right-0 w-2 h-8 transition-all duration-200 ${
                selectedTeeth.includes(`${toothNumber}-D`) 
                  ? 'bg-red-500 border border-red-600' 
                  : 'bg-transparent hover:bg-white/20'
              }`}
              title={`${toothNumber} - Distal`}
            />
            
            {/* Superfície Lingual (atrás) */}
            <button
              onClick={() => handleToothClick(toothNumber, 'L')}
              className={`absolute bottom-0 left-0 w-full h-3 transition-all duration-200 ${
                selectedTeeth.includes(`${toothNumber}-L`) 
                  ? 'bg-red-500 border border-red-600' 
                  : 'bg-transparent hover:bg-white/20'
              }`}
              title={`${toothNumber} - Lingual`}
            />
          </div>
        </div>
        
        {/* Indicador de tipo de dente */}
        <div className={`text-xs ${isDeciduous ? 'text-blue-200' : 'text-white/60'}`}>
          {isDeciduous ? 'Decíduo' : 'Permanente'}
        </div>
      </div>
    );
  };

  return (
    <Card className="glass-card border-white/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <span>Mapa Dental Infantil</span>
        </CardTitle>
        <p className="text-emerald-100 text-sm">
          Clique nas superfícies dos dentes para marcar alterações. Vermelho = alteração encontrada.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Dentes Superiores Permanentes */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-center">Dentes Superiores Permanentes</h3>
          <div className="flex justify-center items-center space-x-2 flex-wrap">
            {dentesSuperioresPermanentes.map(tooth => renderTooth(tooth, false))}
          </div>
        </div>

        {/* Dentes Superiores Decíduos */}
        <div className="space-y-4">
          <h3 className="text-blue-300 font-semibold text-center">Dentes Superiores Decíduos (Leite)</h3>
          <div className="flex justify-center items-center space-x-2 flex-wrap">
            {dentesSuperioresDeciduos.map(tooth => renderTooth(tooth, true))}
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/30 my-6"></div>

        {/* Dentes Inferiores Decíduos */}
        <div className="space-y-4">
          <h3 className="text-blue-300 font-semibold text-center">Dentes Inferiores Decíduos (Leite)</h3>
          <div className="flex justify-center items-center space-x-2 flex-wrap">
            {dentesInferioresDeciduos.map(tooth => renderTooth(tooth, true))}
          </div>
        </div>

        {/* Dentes Inferiores Permanentes */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-center">Dentes Inferiores Permanentes</h3>
          <div className="flex justify-center items-center space-x-2 flex-wrap">
            {dentesInferioresPermanentes.map(tooth => renderTooth(tooth, false))}
          </div>
        </div>

        {/* Legenda */}
        <div className="bg-white/10 rounded-lg p-4 space-y-3">
          <h4 className="text-white font-semibold">Legenda:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded border border-red-600"></div>
              <span className="text-white">Alteração</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white/10 border border-white rounded"></div>
              <span className="text-white">Normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-300/20 border border-blue-300 rounded"></div>
              <span className="text-blue-300">Dente de Leite</span>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-white/70">
            <p><strong>Superfícies:</strong> V=Vestibular, M=Mesial, D=Distal, L=Lingual, O=Oclusal</p>
          </div>
        </div>

        {/* Resumo das alterações */}
        {selectedTeeth.length > 0 && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <h4 className="text-red-300 font-semibold mb-2">Alterações Marcadas:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedTeeth.map(tooth => (
                <span key={tooth} className="bg-red-500/30 text-red-100 px-2 py-1 rounded text-xs">
                  {tooth}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};