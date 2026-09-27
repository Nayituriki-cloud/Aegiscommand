import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Exercise Planning Endpoint
app.post('/api/ai/generate-plan', async (req, res) => {
  const { scenarioPrompt, echelon, terrainType, durationDays } = req.body;

  if (!scenarioPrompt) {
    return res.status(400).json({ error: 'scenarioPrompt is required' });
  }

  const prompt = `Generate a comprehensive, realistic defensive military training exercise plan (OPORD standard format) based strictly on this fictional scenario or training objective:
Scenario: "${scenarioPrompt}"
Echelon: ${echelon || 'Battalion'}
Simulated Environment: ${terrainType || 'Multi-domain / Woodland & Urban'}
Duration: ${durationDays || 3} days

IMPORTANT CONSTRAINTS:
- This is strictly for organizational preparedness, emergency logistics, defensive perimeter readiness, search & rescue, and fictional simulation training.
- Do NOT provide real-world offensive attack instructions, weapon fabrication, or lethal targeting.
- Provide tactical, professional military terminology (OPORD, SITREP, Phase lines, MSR - Main Supply Route, CASEVAC simulation, BLOS communications).

Format your response as valid JSON matching this schema:
{
  "codename": "EXERCISE TITAN VANGUARD",
  "scenarioTitle": "Title of the training exercise",
  "echelon": "Battalion / Task Force",
  "operationalEnvironment": "Detailed terrain, simulated adversary capabilities, and environmental constraints",
  "strategicObjective": "Core operational and training goal",
  "commandIntent": "Commander's intent and end-state criteria",
  "phases": [
    {
      "phaseNumber": 1,
      "name": "Phase I: Deployment & Staging",
      "durationHours": 12,
      "keyTasks": ["Establish tactical assembly area", "Verify VHF/SATCOM links", "Stage logistics convoy"],
      "criticalSuccessFactors": "Zero communications dropouts during line check"
    }
  ],
  "personnelRequirements": [
    {
      "role": "Battalion Staff / TOC",
      "count": 18,
      "requiredCertifications": ["Staff Planning Level 2", "Battle Staff Ops"],
      "specialty": "C4ISR Coordination"
    }
  ],
  "timeline": [
    {
      "timeOffset": "D-Day 06:00",
      "milestone": "Exercise Commences - Tactical Assembly Area Occupied",
      "primaryUnit": "1st Mechanized Recon Platoon",
      "safetyCheck": "Live-fire lockouts verified; blank adapters inspected"
    }
  ],
  "logisticsChecklist": [
    {
      "category": "Rations",
      "item": "MRE Field Rations (Individual)",
      "quantity": 2400,
      "unit": "Units",
      "contingencyPlan": "Secondary reserve cache at Logistics Base Echo"
    },
    {
      "category": "Fuel",
      "item": "JP-8 / F-34 Tactical Grade Diesel",
      "quantity": 18000,
      "unit": "Liters",
      "contingencyPlan": "Pre-positioned mobile bladders along MSR Amber"
    },
    {
      "category": "Comms",
      "item": "Secure tactical radios & repeaters",
      "quantity": 64,
      "unit": "Sets",
      "contingencyPlan": "Courier relay protocol if electronic warfare simulation active"
    },
    {
      "category": "Medical",
      "item": "Simulated trauma & field dressing kits",
      "quantity": 150,
      "unit": "Kits",
      "contingencyPlan": "Simulated aeromedical evacuation flight on 15-min standby"
    },
    {
      "category": "Ammunition (Blank/Sim)",
      "item": "5.56mm & 7.62mm Blank Cartridges + MILES Laser Receivers",
      "quantity": 30000,
      "unit": "Rounds",
      "contingencyPlan": "BFI adapters swapped if misfires exceed 2%"
    }
  ],
  "safetyConsiderations": [
    {
      "riskLevel": "HIGH",
      "hazard": "Night vehicle movement in rough terrain",
      "mitigationProtocol": "Ground guides mandatory within 50m of staging area; NVG speed limits 15km/h",
      "emergencyEvacZone": "Grid DZ-ALPHA (LZ Falcon, Elev 420m)"
    },
    {
      "riskLevel": "MED",
      "hazard": "Heat injury & dehydration during continuous operations",
      "mitigationProtocol": "Mandatory 1.0L/hr hydration protocol and wet bulb globe temperature monitoring",
      "emergencyEvacZone": "Forward Aid Station Charlie"
    }
  ],
  "evaluationCriteria": [
    {
      "metric": "Tactical Assembly Deployment Speed",
      "targetStandard": "Full occupation within 3 hours of initial alert",
      "scoringWeight": "25%"
    },
    {
      "metric": "Logistics Convoy Sustainability",
      "targetStandard": "95% resupply delivery on schedule under simulated route denial",
      "scoringWeight": "35%"
    },
    {
      "metric": "C4ISR Network Uptime & Redundancy",
      "targetStandard": "Sub-5-minute failover to secondary HF network during simulated disruption",
      "scoringWeight": "40%"
    }
  ],
  "afterActionReportTemplate": {
    "keyObservationsPrompt": "Evaluate unit discipline, communication hygiene, and situational awareness at phase transitions.",
    "logisticsEfficiencyPrompt": "Assess fuel burn rates versus calculated consumption tables along MSR Amber.",
    "safetyComplianceSummary": "Zero real-world training incidents reported; all simulated casualty drills executed within TACSOP parameters."
  }
}`;

  if (!ai) {
    // Return high-quality structured tactical fallback
    return res.json(generateFallbackPlan(scenarioPrompt, echelon, terrainType, durationDays));
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a veteran military simulation planner and exercise director. You output pure valid JSON without markdown fences.',
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    return res.json(parsed);
  } catch (err) {
    console.error('Gemini generation error, falling back:', err);
    return res.json(generateFallbackPlan(scenarioPrompt, echelon, terrainType, durationDays));
  }
});

// AI Tactical Inject Generation Endpoint
app.post('/api/ai/generate-inject', async (req, res) => {
  const { currentMission, phaseName, difficulty } = req.body;

  const prompt = `Generate a realistic tactical training exercise INJECT (unexpected simulated scenario event) for a military exercise.
Current Mission: ${currentMission || 'Exercise Iron Citadel'}
Phase: ${phaseName || 'Movement to Contact / Logistics Resupply'}
Difficulty: ${difficulty || 'Moderate'}

Constraints: Training only. No real operational hazards.
Return valid JSON with:
{
  "injectId": "INJ-904",
  "title": "Title of event",
  "category": "COMMUNICATIONS" | "LOGISTICS" | "ENVIRONMENTAL" | "MEDICAL_SIM",
  "urgency": "CRITICAL" | "HIGH" | "ROUTINE",
  "description": "Clear situation update",
  "impact": "Operational impact on forces",
  "requiredDecision": "Question or immediate action required by the commander/officer",
  "recommendedAction": "Doctrinal response option"
}`;

  if (!ai) {
    return res.json({
      injectId: `INJ-${Math.floor(100 + Math.random() * 900)}`,
      title: 'Simulated MSR Chokepoint Denial',
      category: 'LOGISTICS',
      urgency: 'HIGH',
      description: 'Simulated bridge washout reported by UAV feed along Main Supply Route (MSR) Bronze at Grid 4482-1934. Convoy Alpha (carrying 10,000L fuel) is 8km from point.',
      impact: 'Delay in fuel delivery to Forward Operating Base (FOB) Citadel threatens scheduled Dawn counter-recon patrol.',
      requiredDecision: 'Approve alternate Route Ironwood or dispatch combat engineering bridge simulation unit.',
      recommendedAction: 'Divert Convoy Alpha to Route Ironwood (+45 mins transit) while engaging Engineer Detachment 3 for tactical bridging drill.'
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });
    const text = response.text || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return res.json(JSON.parse(cleanJson));
  } catch (err) {
    console.error('Inject generation error:', err);
    return res.json({
      injectId: `INJ-${Math.floor(100 + Math.random() * 900)}`,
      title: 'VHF Primary Repeater Tower Glitch',
      category: 'COMMUNICATIONS',
      urgency: 'HIGH',
      description: 'Exercise control simulates atmospheric disruption blinding Repeater Ridge 3. TAC-1 frequency experiencing 80% packet loss.',
      impact: 'Direct voice link between TOC and 2nd Armored Platoon severed.',
      requiredDecision: 'Authorize immediate switch to secondary HF Burst protocol and satellite data link.',
      recommendedAction: 'Transition command net to Alternate TAC-3 and deploy mobile repeater rover unit.'
    });
  }
});

// AI Tactical Advisor / Chat Endpoint
app.post('/api/ai/advisor-chat', async (req, res) => {
  const { messages, context } = req.body;

  const prompt = `You are the Tactical Operations Staff AI Advisor for a defense simulation and training readiness command center.
Current command context: ${context ? JSON.stringify(context) : 'Standard Training Command'}
Provide concise, highly professional military-staff advice regarding training logistics, personnel preparedness ratios, safety protocols, OPORD preparation, and after-action debriefing.
Keep responses crisp, clear, authoritative, and strictly defensive/training oriented.

User message: ${messages && messages.length ? messages[messages.length - 1].content : 'Brief me on readiness metrics.'}`;

  if (!ai) {
    return res.json({
      reply: 'Staff AI Advisor Status: Operational (Offline Baseline Mode). Readiness reports show Unit 3rd Battalion at 91% combat power with fuel reserves sufficient for 72h continuous exercise tempo. Recommend scheduling a communication blackout drill for Phase 2.'
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });
    return res.json({ reply: response.text });
  } catch (err) {
    console.error('Advisor error:', err);
    return res.json({
      reply: 'Tactical Advisor: Systems nominal. All active exercises conform to training safety regulations. Review logistics manifests before starting Phase 2 movement.'
    });
  }
});

function generateFallbackPlan(scenarioPrompt: string, echelon: string = 'Battalion', terrainType: string = 'Woodland', durationDays: number = 3) {
  const codename = `EXERCISE ${scenarioPrompt.toUpperCase().slice(0, 14).replace(/[^A-Z]/g, '') || 'SENTINEL'} SHIELD`;
  return {
    codename,
    scenarioTitle: scenarioPrompt || 'Defensive Perimeter and Joint Logistics Sustainment Drill',
    echelon,
    operationalEnvironment: `Simulated ${terrainType} sector with restricted civilian infrastructure, simulated electronic denial environments, and fluctuating weather conditions over a ${durationDays}-day cycle.`,
    strategicObjective: 'Validate multi-echelon readiness, decentralized command authority under electronic warfare simulation, and sustain continuous logistics resupply across dispersed assembly points.',
    commandIntent: 'The command aims to achieve 100% mission task completion while maintaining strict safety standards, with zero live-equipment loss and sub-10-minute reaction times to simulated crisis injects.',
    phases: [
      {
        phaseNumber: 1,
        name: 'Phase I: Mobilization & Staging (D-Day 00:00 - 12:00)',
        durationHours: 12,
        keyTasks: [
          'Marshall all personnel and issue MILES laser gear',
          'Deploy Forward Logistics Element along designated Supply Route',
          'Establish Primary and Alternate TOC (Tactical Operations Center)'
        ],
        criticalSuccessFactors: 'Full comms check completed; all weapons safety locks certified by Range Safety Officer'
      },
      {
        phaseNumber: 2,
        name: 'Phase II: Tactical Maneuver & Sector Defense (D-Day 12:00 - D+2 06:00)',
        durationHours: 36,
        keyTasks: [
          'Infiltrate designated patrol corridors without electronic detection',
          'Simulate contested convoy resupply under smoke and artillery simulation',
          'Coordinate simulated aeromedical evacuation of simulated triage casualties'
        ],
        criticalSuccessFactors: 'Convoy maintains formation integrity; casualty triage completed within 15 minutes'
      },
      {
        phaseNumber: 3,
        name: 'Phase III: Consolidation, Recovery & AAR (D+2 06:00 - D+3 18:00)',
        durationHours: 24,
        keyTasks: [
          '100% equipment reconciliation and armory turn-in',
          'Comprehensive debrief with company commanders and squad leaders',
          'Compilation of lessons learned into Master After-Action Report'
        ],
        criticalSuccessFactors: 'Zero missing serialized items; complete after-action documentation submitted to Division HQ'
      }
    ],
    personnelRequirements: [
      {
        role: 'Battalion Commander & Tactical Ops Staff',
        count: 14,
        requiredCertifications: ['Operational Planning Course', 'C2 System Level 3'],
        specialty: 'Command and Control'
      },
      {
        role: 'Mechanized Infantry Company',
        count: 120,
        requiredCertifications: ['Combat Marksmanship Qualification', 'M2/Bradley Sim Certification'],
        specialty: 'Maneuver Defense'
      },
      {
        role: 'Forward Logistics & Maintenance Detachment',
        count: 36,
        requiredCertifications: ['Heavy Vehicle Operator', 'Field Ammo Handler', 'Hazmat Fuel Cert'],
        specialty: 'Sustainment Operations'
      },
      {
        role: 'Combat Medic Section',
        count: 12,
        requiredCertifications: ['TCCC-Tier 3 Tactical Combat Casualty Care', 'BLS Instructor'],
        specialty: 'Field Medical Support'
      }
    ],
    timeline: [
      {
        timeOffset: 'H-04:00',
        milestone: 'Pre-Combat Inspections (PCI) and Communications Check',
        primaryUnit: 'All Subordinate Units',
        safetyCheck: 'Verify eye protection, hydration bladders, and blank-firing adapters'
      },
      {
        timeOffset: 'H-Hour (06:00)',
        milestone: 'Convoy SP (Start Point) Crossing toward Training Zone Kilo',
        primaryUnit: 'Convoy Alpha (Forward Support Company)',
        safetyCheck: 'Convoy speed restricted to 40 km/h; intervals maintained at 50 meters'
      },
      {
        timeOffset: 'H+08:00',
        milestone: 'TOC Operational at Grid 7824-9103; Live Tracking Online',
        primaryUnit: 'Headquarters and Headquarters Company',
        safetyCheck: 'Secondary power generator auto-failover test verified'
      },
      {
        timeOffset: 'H+24:00',
        milestone: 'Simulated Mass Casualty Drill & Logistics Night Replenishment',
        primaryUnit: 'Battalion Aid Station & Resupply Platoon',
        safetyCheck: 'Simulated medical fluids temperature control monitored'
      }
    ],
    logisticsChecklist: [
      {
        category: 'Rations',
        item: 'Field Meals (MREs / Ration Packs)',
        quantity: 1800,
        unit: 'Meals',
        contingencyPlan: 'Emergency shelf-stable reserve stored at Logistics Node Delta'
      },
      {
        category: 'Fuel',
        item: 'Diesel Fuel (F-54 / JP-8 equivalent)',
        quantity: 12500,
        unit: 'Liters',
        contingencyPlan: 'Heavy expanded mobility tactical truck (HEMTT) tanker on standby'
      },
      {
        category: 'Ammunition (Blank/Sim)',
        item: 'Blank Training Munitions & Pyrotechnic Simulators',
        quantity: 25000,
        unit: 'Rounds',
        contingencyPlan: 'Safety bunker depot at Range 14 ready for resupply'
      },
      {
        category: 'Comms',
        item: 'Encrypted Tactical Handhelds & Repeater Stations',
        quantity: 48,
        unit: 'Sets',
        contingencyPlan: 'Backup satellite messengers and field wire landlines'
      },
      {
        category: 'Medical',
        item: 'Trauma Simulators, Litters, and Emergency Bandages',
        quantity: 80,
        unit: 'Kits',
        contingencyPlan: 'Civilian hospital liaison established for real-world emergency protocol'
      }
    ],
    safetyConsiderations: [
      {
        riskLevel: 'HIGH',
        hazard: 'Vehicle rollover risk on unpaved logging trails during night transit',
        mitigationProtocol: 'Night vision driver certification mandatory; lead scout vehicle with thermal spotting',
        emergencyEvacZone: 'Helicopter Landing Zone Falcon (Grid 772-891)'
      },
      {
        riskLevel: 'MED',
        hazard: 'Simulated smoke and pyrotechnics fire hazard in dry brush',
        mitigationProtocol: 'Designated fire watch team with backpack water pumps following all breach drills',
        emergencyEvacZone: 'Aid Station Bravo (Grid 789-914)'
      },
      {
        riskLevel: 'LOW',
        hazard: 'Hearing fatigue from prolonged blank-fire engagements',
        mitigationProtocol: 'High-fidelity tactical hearing protection mandatory for all participants',
        emergencyEvacZone: 'On-site medical triage tent'
      }
    ],
    evaluationCriteria: [
      {
        metric: 'Perimeter Defense Establishment Time',
        targetStandard: 'Complete fighting positions and wire barrier deployment under 4 hours',
        scoringWeight: '30%'
      },
      {
        metric: 'Resupply Convoy Turnaround Efficiency',
        targetStandard: 'Transfer of fuel and ammunition completed in under 25 minutes per vehicle',
        scoringWeight: '40%'
      },
      {
        metric: 'Simulated Casualty Evacuation Speed',
        targetStandard: 'Injured personnel evacuated to Forward Aid Station within Golden Hour (under 45 min)',
        scoringWeight: '30%'
      }
    ],
    afterActionReportTemplate: {
      keyObservationsPrompt: 'Describe how the decentralized command structure functioned when communications were artificially jammed in Phase II.',
      logisticsEfficiencyPrompt: 'Did fuel expenditure deviate from the planned 12,500L? Note exact variance and causes.',
      safetyComplianceSummary: 'No actual injuries occurred; all pyrotechnic safety buffers were respected throughout the 72-hour exercise.'
    }
  };
}

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Military System AI server running on port ${port}`);
  });
}

startServer();
