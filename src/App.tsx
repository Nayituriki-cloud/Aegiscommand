/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TacticalProvider } from './context/TacticalContext';
import { Header } from './components/Header';
import { Navigation, TabKey } from './components/Navigation';
import { ActiveExercisesView } from './components/views/ActiveExercisesView';
import { PersonnelView } from './components/views/PersonnelView';
import { LogisticsView } from './components/views/LogisticsView';
import { EquipmentView } from './components/views/EquipmentView';
import { TrainingView } from './components/views/TrainingView';
import { ReportsView } from './components/views/ReportsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AiAssistantView } from './components/views/AiAssistantView';
import { SimulationMapView } from './components/views/SimulationMapView';
import { AuditLogModal } from './components/modals/AuditLogModal';
import { PrintReportModal } from './components/modals/PrintReportModal';
import { SituationReport, AfterActionReport } from './types/tactical';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('EXERCISES');
  const [showAuditLogs, setShowAuditLogs] = useState<boolean>(false);
  const [reportToPrint, setReportToPrint] = useState<{
    type: 'SITREP' | 'AAR';
    data: SituationReport | AfterActionReport;
  } | null>(null);

  return (
    <TacticalProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
        {/* Tactical Header with Zulu clock, alerts, role switcher */}
        <Header onOpenAuditLogs={() => setShowAuditLogs(true)} />

        {/* Tactical Command Bar Navigation matching brief requirements */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main View Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'EXERCISES' && (
            <ActiveExercisesView
              onGoToAiAssistant={() => setActiveTab('AI_ASSISTANT')}
              onGoToSimMap={() => setActiveTab('SIM_MAP')}
            />
          )}

          {activeTab === 'PERSONNEL' && <PersonnelView />}

          {activeTab === 'LOGISTICS' && <LogisticsView />}

          {activeTab === 'EQUIPMENT' && <EquipmentView />}

          {activeTab === 'TRAINING' && <TrainingView />}

          {activeTab === 'REPORTS' && (
            <ReportsView onPrintReport={(report) => setReportToPrint(report)} />
          )}

          {activeTab === 'ANALYTICS' && <AnalyticsView />}

          {activeTab === 'AI_ASSISTANT' && (
            <AiAssistantView onPlanAdopted={() => setActiveTab('EXERCISES')} />
          )}

          {activeTab === 'SIM_MAP' && <SimulationMapView />}
        </main>

        {/* Tactical Footer */}
        <footer className="bg-zinc-950 border-t border-zinc-800/80 py-4 px-4 text-center font-mono text-[11px] text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span>AEGISCOMMAND // MILITARY SYSTEM AI</span>
              <span className="mx-2 text-zinc-700">·</span>
              <span className="text-amber-500/80">TRAINING & PREPAREDNESS PLATFORM</span>
            </div>
            <div className="text-[10px] text-zinc-600">
              STRICTLY NON-OPERATIONAL // FICTIONAL DEFENSIVE SIMULATION USE ONLY
            </div>
          </div>
        </footer>

        {/* Modals */}
        <AuditLogModal isOpen={showAuditLogs} onClose={() => setShowAuditLogs(false)} />
        <PrintReportModal report={reportToPrint} onClose={() => setReportToPrint(null)} />
      </div>
    </TacticalProvider>
  );
}
