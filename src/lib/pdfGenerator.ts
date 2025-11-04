import { jsPDF } from 'jspdf';

interface PDFReportData {
  maturityResult: any;
  primaryArchetype: any;
  secondaryArchetype?: any;
  dimensionRecommendations: any[];
  globalRecommendations: any;
  timestamp: string;
}

export const generateMaturityPDF = async (data: PDFReportData): Promise<void> => {
  const { maturityResult, primaryArchetype, dimensionRecommendations, globalRecommendations } = data;
  
  // Créer un nouveau document PDF
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Configuration des styles
  const titleSize = 18;
  const subtitleSize = 14;
  const textSize = 10;
  const lineHeight = 5;

  // Fonction pour ajouter du texte avec gestion des pages
  const addText = (text: string, size: number = textSize, isBold: boolean = false) => {
    if (yPosition > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(size);
    if (isBold) {
      doc.setFont(undefined, 'bold');
    } else {
      doc.setFont(undefined, 'normal');
    }
    
    const lines = doc.splitTextToSize(text, pageWidth - 40);
    lines.forEach((line: string) => {
      doc.text(line, 20, yPosition);
      yPosition += lineHeight;
    });
    
    yPosition += 2; // Espacement supplémentaire
  };

  // Fonction pour ajouter une nouvelle section
  const addSection = (title: string) => {
    yPosition += 10;
    addText(title, subtitleSize, true);
    yPosition += 5;
  };

  // En-tête du document
  addText('RAPPORT D\'INDICE DE MATURITÉ INNOVATION', titleSize, true);
  yPosition += 10;
  
  addText(`Généré le ${new Date().toLocaleDateString('fr-FR')} par Mana.fr`, textSize);
  yPosition += 15;

  // Résumé exécutif
  addSection('RÉSUMÉ EXÉCUTIF');
  addText(`Score global de maturité: ${Math.round(maturityResult.percentage)}%`);
  addText(`Niveau de maturité: ${maturityResult.level} - ${maturityResult.levelName}`);
  addText(`Archétype principal: ${primaryArchetype?.name || 'Non défini'}`);
  addText(`Confiance de l'évaluation: ${Math.round(maturityResult.confidence * 100)}%`);

  // Scores par dimension
  addSection('SCORES PAR DIMENSION');
  maturityResult.sectionScores.forEach((section: any) => {
    const sectionTitle = maturityResult.radarData.find((r: any) => r.percentage === section.percentage)?.dimension || section.sectionId;
    addText(`${sectionTitle}: ${Math.round(section.percentage)}% (Niveau ${section.level})`);
  });

  // Archétype principal
  if (primaryArchetype) {
    addSection('VOTRE ARCHÉTYPE PRINCIPAL');
    addText(primaryArchetype.name, subtitleSize, true);
    addText(primaryArchetype.description);
    
    yPosition += 5;
    addText('Caractéristiques principales:', textSize, true);
    primaryArchetype.characteristics.forEach((char: string) => {
      addText(`• ${char}`);
    });

    yPosition += 5;
    addText('Forces:', textSize, true);
    primaryArchetype.strengths.forEach((strength: string) => {
      addText(`• ${strength}`);
    });

    yPosition += 5;
    addText('Défis à relever:', textSize, true);
    primaryArchetype.challenges.forEach((challenge: string) => {
      addText(`• ${challenge}`);
    });
  }

  // Recommandations globales
  if (globalRecommendations) {
    addSection('PLAN D\'ACTION PRIORITAIRE');
    addText(`Priorité stratégique: ${globalRecommendations.priority}`);
    addText(`Horizon temporel: ${globalRecommendations.timeframe}`);
    
    yPosition += 5;
    addText('Domaines de focus:', textSize, true);
    globalRecommendations.focus.forEach((area: string) => {
      addText(`• ${area}`);
    });

    yPosition += 5;
    addText('Actions clés:', textSize, true);
    globalRecommendations.keyActions.forEach((action: string) => {
      addText(`• ${action}`);
    });
  }

  // Recommandations détaillées par dimension
  addSection('RECOMMANDATIONS DÉTAILLÉES PAR DIMENSION');
  
  // Trier par priorité (niveaux les plus bas en premier)
  const sortedRecommendations = [...dimensionRecommendations].sort((a, b) => a.level - b.level);
  
  sortedRecommendations.forEach((dimRec) => {
    if (dimRec.recommendations) {
      yPosition += 5;
      addText(`${dimRec.dimension} (Niveau ${dimRec.level})`, textSize, true);
      addText(dimRec.recommendations.title, textSize, true);
      addText(dimRec.recommendations.description);
      
      yPosition += 3;
      addText('Actions recommandées:', textSize, true);
      dimRec.recommendations.actions.forEach((action: string) => {
        addText(`• ${action}`);
      });
      
      yPosition += 3;
      addText('Indicateurs de suivi:', textSize, true);
      dimRec.recommendations.kpis.forEach((kpi: string) => {
        addText(`• ${kpi}`);
      });
      
      addText(`Horizon de mise en œuvre: ${dimRec.recommendations.timeline}`);
    }
  });

  // Pied de page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} sur ${totalPages}`, pageWidth - 40, pageHeight - 10);
    doc.text('Rapport généré par Mana.fr - Indice de Maturité Innovation', 20, pageHeight - 10);
  }

  // Télécharger le PDF
  const fileName = `Indice-Maturite-Innovation-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

// Version simplifiée pour un résumé rapide
export const generateSummaryPDF = async (data: PDFReportData): Promise<void> => {
  const { maturityResult, primaryArchetype } = data;
  
  const doc = new jsPDF();
  let yPosition = 20;

  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('RÉSUMÉ - INDICE DE MATURITÉ INNOVATION', 20, yPosition);
  
  yPosition += 20;
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  
  const summary = [
    `Score global: ${Math.round(maturityResult.percentage)}%`,
    `Niveau: ${maturityResult.level} - ${maturityResult.levelName}`,
    `Archétype: ${primaryArchetype?.name || 'Non défini'}`,
    `Évaluation du ${new Date().toLocaleDateString('fr-FR')}`
  ];

  summary.forEach(line => {
    doc.text(line, 20, yPosition);
    yPosition += 10;
  });

  doc.save(`Résumé-Maturité-Innovation-${new Date().toISOString().split('T')[0]}.pdf`);
};