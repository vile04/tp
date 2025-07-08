import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';

export const PDFExporter = ({ patient, odontogramaRef }) => {
  const generatePDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      let yPosition = 20;

      // Função para adicionar nova página se necessário
      const checkPageBreak = (requiredHeight) => {
        if (yPosition + requiredHeight > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
          addHeader();
        }
      };

      // Adicionar cabeçalho
      const addHeader = () => {
        // Logo (se disponível)
        pdf.setFillColor(5, 150, 105);
        pdf.rect(0, 0, pageWidth, 15, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('TIO PAULO - FICHA DE ANAMNESE ODONTOLÓGICA', pageWidth/2, 10, { align: 'center' });
        
        yPosition = 25;
      };

      // Adicionar rodapé
      const addFooter = () => {
        pdf.setFillColor(5, 150, 105);
        pdf.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 15, pageHeight - 8);
        pdf.text(`Página ${pdf.internal.getNumberOfPages()}`, pageWidth - 15, pageHeight - 8, { align: 'right' });
      };

      // Função para adicionar seção
      const addSection = (title, content) => {
        checkPageBreak(15);
        
        // Título da seção
        pdf.setFillColor(5, 150, 105);
        pdf.rect(15, yPosition, pageWidth - 30, 8, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, 17, yPosition + 5);
        
        yPosition += 12;
        
        // Conteúdo
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        content.forEach(item => {
          checkPageBreak(6);
          if (item.label && item.value) {
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${item.label}:`, 17, yPosition);
            pdf.setFont('helvetica', 'normal');
            
            const labelWidth = pdf.getTextWidth(`${item.label}: `);
            const maxWidth = pageWidth - 35 - labelWidth;
            const lines = pdf.splitTextToSize(item.value || 'Não informado', maxWidth);
            
            pdf.text(lines, 17 + labelWidth, yPosition);
            yPosition += lines.length * 5;
          }
        });
        
        yPosition += 5;
      };

      // Iniciar PDF
      addHeader();

      // Dados Pessoais
      addSection('DADOS PESSOAIS', [
        { label: 'Nome da Criança', value: patient.nome_crianca },
        { label: 'Data de Nascimento', value: patient.data_nascimento ? new Date(patient.data_nascimento).toLocaleDateString('pt-BR') : '' },
        { label: 'Idade', value: patient.idade },
        { label: 'Celular', value: patient.cel },
        { label: 'Endereço', value: patient.endereco },
        { label: 'Bairro', value: patient.bairro },
        { label: 'CEP', value: patient.cep },
        { label: 'Cidade', value: patient.cidade }
      ]);

      // Dados dos Pais
      addSection('DADOS DOS PAIS', [
        { label: 'Nome da Mãe', value: patient.nome_mae },
        { label: 'Idade da Mãe', value: patient.idade_mae },
        { label: 'Profissão da Mãe', value: patient.profissao_mae },
        { label: 'Nome do Pai', value: patient.nome_pai },
        { label: 'Idade do Pai', value: patient.idade_pai },
        { label: 'Profissão do Pai', value: patient.profissao_pai }
      ]);

      // Motivo da Consulta
      addSection('MOTIVO DA CONSULTA', [
        { label: 'Motivo da Consulta', value: patient.motivo_consulta },
        { label: 'Alterações na Gestação', value: patient.alteracao_gestacao }
      ]);

      // Necessidades Especiais
      const formatSimNao = (value) => {
        if (value === true) return 'Sim';
        if (value === false) return 'Não';
        return 'Não informado';
      };

      addSection('NECESSIDADES ESPECIAIS', [
        { label: 'Possui necessidade especial', value: formatSimNao(patient.necessidade_especial) },
        { label: 'Qual necessidade', value: patient.qual_necessidade },
        { label: 'Comprometimento de coordenação motora', value: formatSimNao(patient.comprometimento_coordenacao) },
        { label: 'Qual comprometimento', value: patient.qual_coordenacao },
        { label: 'Comprometimento visual', value: formatSimNao(patient.comprometimento_visual) },
        { label: 'Qual comprometimento visual', value: patient.qual_visual },
        { label: 'Comprometimento de comunicação', value: formatSimNao(patient.comprometimento_comunicacao) },
        { label: 'Qual comprometimento de comunicação', value: patient.qual_comunicacao },
        { label: 'Reação quando contrariado', value: patient.reacao_contrariado },
        { label: 'Reação diante de profissionais', value: patient.reacao_profissionais }
      ]);

      // Histórico Médico
      addSection('HISTÓRICO MÉDICO', [
        { label: 'Sofreu alguma cirurgia', value: formatSimNao(patient.sofreu_cirurgia) },
        { label: 'Qual cirurgia', value: patient.qual_cirurgia },
        { label: 'Alterações sanguíneas', value: formatSimNao(patient.alteracoes_sanguineas) },
        { label: 'Problemas respiratórios', value: formatSimNao(patient.problemas_respiratorios) },
        { label: 'Problemas hepáticos', value: formatSimNao(patient.problemas_hepaticos) },
        { label: 'Cardiopatias', value: formatSimNao(patient.cardiopatias) },
        { label: 'Problemas gástricos', value: formatSimNao(patient.problemas_gastricos) },
        { label: 'Alergias a medicamentos', value: patient.alergias_medicamento },
        { label: 'Alergias alimentares', value: patient.alergias_alimentar },
        { label: 'Alergias respiratórias', value: patient.alergias_respiratoria },
        { label: 'Tratamentos atuais', value: patient.tratamentos_atuais }
      ]);

      // Acompanhamentos
      addSection('ACOMPANHAMENTOS', [
        { label: 'Fonoaudiologia', value: formatSimNao(patient.fonoaudiologia) },
        { label: 'Fisioterapia', value: formatSimNao(patient.fisioterapia) },
        { label: 'Psicologia', value: formatSimNao(patient.psicologia) },
        { label: 'Psiquiátrico', value: formatSimNao(patient.psiquiatrico) },
        { label: 'TO', value: formatSimNao(patient.psiquiatrico_to) },
        { label: 'Outro tratamento', value: patient.outro_tratamento },
        { label: 'Portador de IST', value: patient.portador_ist }
      ]);

      // Hábitos
      addSection('HÁBITOS', [
        { label: 'Mama no peito', value: formatSimNao(patient.mama_peito) },
        { label: 'Já mamou no peito', value: formatSimNao(patient.mamou_peito) },
        { label: 'Até quando mamou', value: patient.ate_quando_mamou },
        { label: 'Toma mamadeira', value: formatSimNao(patient.toma_mamadeira) },
        { label: 'Já tomou mamadeira', value: formatSimNao(patient.tomou_mamadeira) },
        { label: 'Até quando mamadeira', value: patient.ate_quando_mamadeira },
        { label: 'Engasga ou vomita facilmente', value: patient.engasga_vomita },
        { label: 'Chupa o dedo', value: patient.chupa_dedo },
        { label: 'Chupa chupeta', value: patient.chupa_chupeta },
        { label: 'Outros hábitos', value: patient.outros_habitos },
        { label: 'Range os dentes', value: patient.range_dentes }
      ]);

      // Histórico Odontológico
      addSection('HISTÓRICO ODONTOLÓGICO', [
        { label: 'Anos na primeira consulta', value: patient.anos_primeira_consulta },
        { label: 'Como foi o tratamento anterior', value: patient.tratamento_anterior },
        { label: 'Já foi ao dentista', value: formatSimNao(patient.foi_dentista) },
        { label: 'Qual dentista', value: patient.qual_dentista }
      ]);

      // Higiene Bucal
      addSection('HIGIENE BUCAL', [
        { label: 'Qual escova usa', value: patient.escova_usa },
        { label: 'Qual creme dental', value: patient.creme_dental },
        { label: 'Quem faz a higiene bucal', value: patient.higiene_bucal },
        { label: 'Quantas vezes ao dia', value: patient.vezes_dia_higiene },
        { label: 'Já tomou anestesia', value: formatSimNao(patient.tomou_anestesia) },
        { label: 'Gengiva sangra facilmente', value: formatSimNao(patient.gengiva_sangra) },
        { label: 'Realizou extrações dentárias', value: formatSimNao(patient.extracoes_dentarias) },
        { label: 'Escova a língua', value: formatSimNao(patient.escova_lingua) },
        { label: 'Usa fio dental', value: formatSimNao(patient.usa_fio_dental) }
      ]);

      // Alimentação
      if (patient.alimentacao_notas) {
        addSection('ALIMENTAÇÃO', [
          { label: 'Notas sobre alimentação', value: patient.alimentacao_notas }
        ]);
      }

      // Mapa Dental
      if (patient.mapa_dental && patient.mapa_dental.length > 0) {
        checkPageBreak(30);
        
        pdf.setFillColor(5, 150, 105);
        pdf.rect(15, yPosition, pageWidth - 30, 8, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('MAPA DENTAL - ALTERAÇÕES ENCONTRADAS', 17, yPosition + 5);
        
        yPosition += 15;
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        const alteracoes = patient.mapa_dental.join(', ');
        const lines = pdf.splitTextToSize(`Dentes com alterações: ${alteracoes}`, pageWidth - 30);
        pdf.text(lines, 17, yPosition);
        yPosition += lines.length * 5 + 10;
      }

      // Consultas
      if (patient.consultas && patient.consultas.length > 0) {
        addSection('HISTÓRICO DE CONSULTAS', []);
        
        patient.consultas.forEach((consulta, index) => {
          checkPageBreak(20);
          
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Consulta ${index + 1}:`, 17, yPosition);
          yPosition += 5;
          
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Data: ${consulta.data ? new Date(consulta.data).toLocaleDateString('pt-BR') : 'Não informada'}`, 20, yPosition);
          yPosition += 5;
          
          if (consulta.peso) {
            pdf.text(`Peso: ${consulta.peso} kg`, 20, yPosition);
            yPosition += 5;
          }
          
          if (consulta.observacoes) {
            pdf.text('Observações:', 20, yPosition);
            yPosition += 5;
            const obsLines = pdf.splitTextToSize(consulta.observacoes, pageWidth - 45);
            pdf.text(obsLines, 25, yPosition);
            yPosition += obsLines.length * 5;
          }
          
          if (consulta.procedimentos) {
            pdf.text('Procedimentos:', 20, yPosition);
            yPosition += 5;
            const procLines = pdf.splitTextToSize(consulta.procedimentos, pageWidth - 45);
            pdf.text(procLines, 25, yPosition);
            yPosition += procLines.length * 5;
          }
          
          yPosition += 5;
        });
      }

      // Informações Adicionais
      if (patient.informacoes_adicionais) {
        addSection('INFORMAÇÕES ADICIONAIS', [
          { label: 'Observações', value: patient.informacoes_adicionais }
        ]);
      }

      // Responsável
      addSection('RESPONSÁVEL', [
        { label: 'Nome do Responsável', value: patient.responsavel_nome },
        { label: 'Data de Criação', value: patient.created_at ? new Date(patient.created_at).toLocaleDateString('pt-BR') : '' },
        { label: 'Informações Verdadeiras', value: patient.informacoes_verdadeiras ? 'Sim' : 'Não' }
      ]);

      // Adicionar rodapé em todas as páginas
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        addFooter();
      }

      // Salvar PDF
      const fileName = `ficha_anamnese_${patient.nome_crianca.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  return (
    <Button
      onClick={generatePDF}
      className="glass-button bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      <Download className="w-4 h-4 mr-2" />
      Exportar PDF
    </Button>
  );
};