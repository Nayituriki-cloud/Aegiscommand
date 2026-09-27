import {
  Exercise,
  Personnel,
  LogisticsConvoy,
  EquipmentItem,
  TrainingEvent,
  MapMarker,
  SituationReport,
  AfterActionReport,
  TacticalAlert,
  AuditLogEntry,
  User,
} from '../types/tactical';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-01',
    name: 'Col. Marcus Vance',
    callsign: 'WARHAMMER 6',
    rank: 'Colonel (O-6)',
    role: 'Commander',
    unit: '3rd Combined Arms Battalion',
    avatarBadge: 'COL',
  },
  {
    id: 'usr-02',
    name: 'Maj. Elena Rostova',
    callsign: 'IRON SENTINEL',
    rank: 'Major (O-4)',
    role: 'Officer',
    unit: 'Operations S-3 Section',
    avatarBadge: 'MAJ',
  },
  {
    id: 'usr-03',
    name: 'Capt. David Reyes',
    callsign: 'QUARTERMASTER 1',
    rank: 'Captain (O-3)',
    role: 'Staff',
    unit: 'Logistics S-4 Section',
    avatarBadge: 'CPT',
  },
  {
    id: 'usr-04',
    name: 'SFC Thomas Hayes',
    callsign: 'VIPER LEAD',
    rank: 'SFC (E-7)',
    role: 'Trainer',
    unit: 'Master Training & Evaluation Cell',
    avatarBadge: 'SFC',
  },
  {
    id: 'usr-05',
    name: 'Dr. Sarah Lin',
    callsign: 'HORIZON EYE',
    rank: 'Senior Analyst (GS-13)',
    role: 'Viewer',
    unit: 'Joint Readiness Observer Cell',
    avatarBadge: 'OBS',
  },
];

export const INITIAL_EXERCISES: Exercise[] = [
  {
    id: 'ex-01',
    codename: 'EXERCISE IRON SHIELD',
    title: 'Joint Battalion Tactical Maneuver & Logistics Sustainment Exercise',
    echelon: 'Combined Arms Battalion',
    status: 'ACTIVE',
    startDate: '2026-09-24',
    endDate: '2026-09-28',
    location: 'National Training Range Sector 7',
    gridCoordinates: 'MGRS 32UND 8472 9134',
    description: 'Multi-echelon field training exercise to validate defensive perimeter security, decentralized command during simulated communications jamming, and sustainment convoy protection.',
    commandIntent: 'Establish resilient defensive posture across Sector 7, validate sub-10-minute response to simulated breach injects, and guarantee zero supply starvation for forward units over 96 hours of continuous operations.',
    progressPercent: 68,
    currentPhaseIndex: 1,
    threatCondition: 'FPCON BRAVO',
    simulatedTimeRemaining: '38h 14m',
    phases: [
      {
        id: 'ph-01',
        phaseNumber: 1,
        name: 'Phase I: Staging, Pre-Combat Inspections & Secure Assembly',
        durationHours: 18,
        status: 'COMPLETE',
        tasks: [
          'Verify blank-firing adapters and laser sensor harness systems on all personnel',
          'Deploy tactical satellite antenna array at Tactical Operations Center (TOC)',
          'Establish staging perimeter and zero weapons systems on simulated range'
        ],
        criticalSuccessFactors: '100% personnel muster accounted for; zero equipment discrepancies on armory sign-out.'
      },
      {
        id: 'ph-02',
        phaseNumber: 2,
        name: 'Phase II: Main Supply Route Defense & Contested Convoy Movement',
        durationHours: 42,
        status: 'ACTIVE',
        tasks: [
          'Dispatch Convoy Iron-1 with 8,000L fuel and rations to Forward Base Alpha',
          'Simulate electronic warfare jamming: shift command voice nets to alternate HF burst',
          'Repel simulated OPFOR reconnaissance probes along perimeter ridge line'
        ],
        criticalSuccessFactors: 'Convoy transit completed with sub-15% route variance and zero simulated rollover events.'
      },
      {
        id: 'ph-03',
        phaseNumber: 3,
        name: 'Phase III: Simulated Mass Casualty Triage & Consolidation',
        durationHours: 24,
        status: 'PENDING',
        tasks: [
          'Execute urgent 9-line aeromedical CASEVAC simulation to Forward Aid Station',
          'Consolidate defensive perimeter and rotate tired personnel to rest cycles',
          'Begin serialized inventory count for end-of-exercise recovery'
        ],
        criticalSuccessFactors: 'Patient stabilization logged within 12 minutes of simulated casualty report.'
      },
      {
        id: 'ph-04',
        phaseNumber: 4,
        name: 'Phase IV: Recovery, Equipment Turnover & Command After-Action Review',
        durationHours: 12,
        status: 'PENDING',
        tasks: [
          'Conduct comprehensive vehicle PMCS (preventive maintenance checks and services)',
          'Hold battalion debrief with squad leaders and master trainers',
          'Archive exercise performance data and publish finalized AAR'
        ],
        criticalSuccessFactors: '100% equipment reconciliation with no unaccounted gear.'
      }
    ],
    objectives: [
      {
        id: 'obj-101',
        title: 'Secure Main Supply Route (MSR) Bronze',
        description: 'Establish three mobile checkpoints along 24km corridor to guarantee resupply truck passage.',
        status: 'COMPLETED',
        priority: 'HIGH',
        assignedSquad: '1st Platoon / Alpha Company',
        targetTime: 'D+1 14:00'
      },
      {
        id: 'obj-102',
        title: 'Continuous C4ISR Relay Under Simulated Jamming',
        description: 'Maintain persistent telemetry between TOC and Forward Outposts using directional HF links.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        assignedSquad: 'Battalion Signal Platoon',
        targetTime: 'D+2 08:00'
      },
      {
        id: 'obj-103',
        title: 'Resupply Forward Operating Base (FOB) Citadel',
        description: 'Deliver 12,000L fuel, 400 ration units, and battery packs via Convoy Iron-1.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        assignedSquad: 'Support Logistics Company',
        targetTime: 'D+2 18:00'
      },
      {
        id: 'obj-104',
        title: 'Night Night-Vision Navigation & Defensive Rehearsal',
        description: 'Execute stealth coordinate movement without white light discipline breaches.',
        status: 'NOT_STARTED',
        priority: 'LOW',
        assignedSquad: 'Bravo Recon Platoon',
        targetTime: 'D+3 02:00'
      }
    ],
    assignedUnits: ['1st Mechanized Rifle Platoon', '2nd Armored Scout Platoon', 'Forward Logistics Company', 'Signal Section Alpha']
  },
  {
    id: 'ex-02',
    codename: 'EXERCISE CITADEL VANGUARD',
    title: 'Disaster Relief & Tactical Infrastructure Reconstruction Exercise',
    echelon: 'Engineer Brigade Detachment',
    status: 'PLANNING',
    startDate: '2026-10-05',
    endDate: '2026-10-09',
    location: 'Coastal Maneuver Proving Grounds',
    gridCoordinates: 'MGRS 32UND 9120 7481',
    description: 'Simulated post-severe weather humanitarian crisis response requiring emergency bridge installation, clean water purification logistics, and aerial medical triage.',
    commandIntent: 'Establish functional logistics hub within 18 hours of simulated crisis notice and demonstrate civil-military communications interoperability.',
    progressPercent: 15,
    currentPhaseIndex: 0,
    threatCondition: 'FPCON ALPHA',
    simulatedTimeRemaining: 'Planning Stage',
    phases: [
      {
        id: 'ph-201',
        phaseNumber: 1,
        name: 'Phase I: Mobilization & Staging of Mobile Water Purification Units',
        durationHours: 24,
        status: 'PENDING',
        tasks: ['Assemble heavy equipment transports', 'Calibrate reverse-osmosis purification kits'],
        criticalSuccessFactors: 'Safety compliance with heavy machinery.'
      }
    ],
    objectives: [
      {
        id: 'obj-201',
        title: 'Rapid Deployment of Floating Ribbon Bridge',
        description: 'Construct 60m vehicle bridge across simulated river gorge within 3.5 hours.',
        status: 'NOT_STARTED',
        priority: 'HIGH',
        assignedSquad: 'Combat Engineer Detachment 4',
        targetTime: 'D+1 10:00'
      }
    ],
    assignedUnits: ['4th Combat Engineer Platoon', 'Medical Logistics Cell 2']
  },
  {
    id: 'ex-03',
    codename: 'EXERCISE GHOST FALCON',
    title: 'Integrated Air Defense & Radar Calibration Simulation',
    echelon: 'Air Defense Artillery Battery',
    status: 'COMPLETED',
    startDate: '2026-09-12',
    endDate: '2026-09-15',
    location: 'High Altitude Test Range West',
    gridCoordinates: 'MGRS 32UND 6412 5590',
    description: 'Defensive tracking of simulated high-speed target drones and electronic countermeasure drills.',
    commandIntent: 'Verify radar acquisition lock speeds and test automated early warning telemetry.',
    progressPercent: 100,
    currentPhaseIndex: 3,
    threatCondition: 'FPCON NORMAL',
    simulatedTimeRemaining: 'Exercise Concluded',
    phases: [],
    objectives: [
      {
        id: 'obj-301',
        title: 'Target Acquisition within 15 Seconds of Radar Uplink',
        description: 'Track drone targets across 360-degree azimuth without false positive locks.',
        status: 'COMPLETED',
        priority: 'HIGH',
        assignedSquad: 'Fire Control Section Bravo',
        targetTime: 'Completed'
      }
    ],
    assignedUnits: ['Air Defense Battery C', 'Radar Technical Unit']
  }
];

export const INITIAL_PERSONNEL: Personnel[] = [
  {
    id: 'per-001',
    serviceNumber: 'USA-9481-22A',
    name: 'Capt. Sarah Jenkins',
    callsign: 'VALKYRIE',
    rank: 'Captain (O-3)',
    unitId: 'unit-alpha',
    unitName: 'Alpha Mechanized Company',
    role: 'Company Commander',
    readinessStatus: 'DEPLOYABLE',
    combatReadinessScore: 98,
    certifications: ['Airborne Qualified', 'TOC Operations Specialist', 'Tactical Maneuver Planner'],
    specializations: ['Combined Arms Tactics', 'Joint Fires Coordination'],
    medicalReadiness: 'CLASS_1',
    location: 'Forward Staging Base Echo',
    contactFreq: '38.450 MHz (TAC-1)'
  },
  {
    id: 'per-002',
    serviceNumber: 'USA-7734-19B',
    name: '1st Lt. Michael Torres',
    callsign: 'GHOST RIDER',
    rank: '1st Lieutenant (O-2)',
    unitId: 'unit-alpha',
    unitName: '1st Platoon / Alpha Company',
    role: 'Platoon Leader',
    readinessStatus: 'DEPLOYABLE',
    combatReadinessScore: 94,
    certifications: ['Ranger Qualified', 'Combatives Level 3', 'Night Navigation Master'],
    specializations: ['Infantry Maneuver', 'Reconnaissance'],
    medicalReadiness: 'CLASS_1',
    location: 'MSR Bronze Checkpoint 2',
    contactFreq: '38.500 MHz (TAC-2)'
  },
  {
    id: 'per-003',
    serviceNumber: 'USA-6192-33C',
    name: 'Sgt. 1st Class Daniel Cruz',
    callsign: 'ANVIL',
    rank: 'SFC (E-7)',
    unitId: 'unit-alpha',
    unitName: 'Alpha Mechanized Company',
    role: 'Platoon Sergeant',
    readinessStatus: 'DEPLOYABLE',
    combatReadinessScore: 96,
    certifications: ['Master Gunner', 'Range Safety Officer', 'Heavy Armor Maintenance'],
    specializations: ['Weapons Employment', 'Personnel Readiness Management'],
    medicalReadiness: 'CLASS_1',
    location: 'Forward Staging Base Echo',
    contactFreq: '38.450 MHz (TAC-1)'
  },
  {
    id: 'per-004',
    serviceNumber: 'USA-8321-44D',
    name: 'Staff Sgt. Emily Zhao',
    callsign: 'PULSE',
    rank: 'Staff Sergeant (E-6)',
    unitId: 'unit-sig',
    unitName: 'Battalion Signal Detachment',
    role: 'Chief Communications Specialist',
    readinessStatus: 'DEPLOYABLE',
    combatReadinessScore: 92,
    certifications: ['CISSP Security Master', 'Tactical SATCOM Ops', 'Cryptographic Custodian'],
    specializations: ['Electronic Counter-Countermeasures', 'Mesh Radios'],
    medicalReadiness: 'CLASS_1',
    location: 'Battalion Tactical Operations Center (TOC)',
    contactFreq: '42.100 MHz (DATA-NET)'
  },
  {
    id: 'per-005',
    serviceNumber: 'USA-5510-18E',
    name: 'Sgt. Liam O\'Connor',
    callsign: 'DOC SHADOW',
    rank: 'Sergeant (E-5)',
    unitId: 'unit-med',
    unitName: 'Combat Medical Section',
    role: 'Lead Combat Medic',
    readinessStatus: 'DEPLOYABLE',
    combatReadinessScore: 95,
    certifications: ['TCCC-Tier 3 Tactical Paramedic', 'Critical Care Flight Medic', 'Trauma Life Support'],
    specializations: ['Remote Trauma Resuscitation', 'Mass Casualty Triage'],
    medicalReadiness: 'CLASS_1',
    location: 'Forward Aid Station Charlie',
    contactFreq: '36.800 MHz (MED-EVAC)'
  },
  {
    id: 'per-006',
    serviceNumber: 'USA-4491-88F',
    name: 'Sgt. Kenneth Brooks',
    callsign: 'IRON WHEEL',
    rank: 'Sergeant (E-5)',
    unitId: 'unit-log',
    unitName: 'Support Logistics Company',
    role: 'Heavy Convoy Master',
    readinessStatus: 'DEPLOYABLE',
    combatReadinessScore: 89,
    certifications: ['HEMTT Master Operator', 'Hazardous Materials Level 4', 'Defensive Convoy Tactics'],
    specializations: ['Bulk Fuel Distribution', 'Tactical Vehicle Recovery'],
    medicalReadiness: 'CLASS_1',
    location: 'Convoy Iron-1 Cab',
    contactFreq: '40.250 MHz (LOG-NET)'
  },
  {
    id: 'per-007',
    serviceNumber: 'USA-3819-72G',
    name: 'Cpl. Maya Patel',
    callsign: 'RAVEN EYE',
    rank: 'Corporal (E-4)',
    unitId: 'unit-recon',
    unitName: '2nd Armored Scout Platoon',
    role: 'UAV Sensor Operator',
    readinessStatus: 'DEPLOYABLE',
    combatReadinessScore: 91,
    certifications: ['Puma UAV Pilot Cert', 'Thermal Imagery Analysis', 'Forward Observer Level 2'],
    specializations: ['Electro-Optical Reconnaissance', 'Target Designation'],
    medicalReadiness: 'CLASS_1',
    location: 'Observation Post Ridge 4',
    contactFreq: '44.300 MHz (RECON-1)'
  },
  {
    id: 'per-008',
    serviceNumber: 'USA-9023-11H',
    name: 'Spc. Jordan Miller',
    callsign: 'TRIGGER',
    rank: 'Specialist (E-4)',
    unitId: 'unit-alpha',
    unitName: '1st Platoon / Alpha Company',
    role: 'Anti-Armor Specialist',
    readinessStatus: 'RESTRICTED',
    combatReadinessScore: 78,
    certifications: ['Javelin Simulator Qualified', 'Night Driver Level 1'],
    specializations: ['Defensive Missile Systems'],
    medicalReadiness: 'CLASS_2',
    location: 'Forward Staging Base Echo',
    contactFreq: '38.500 MHz (TAC-2)'
  },
  {
    id: 'per-009',
    serviceNumber: 'USA-1144-99J',
    name: 'Pfc. Carlos Mendoza',
    callsign: 'SPARK',
    rank: 'Private 1st Class (E-3)',
    unitId: 'unit-alpha',
    unitName: '1st Platoon / Alpha Company',
    role: 'Rifleman / Grenadier',
    readinessStatus: 'IN_TRAINING',
    combatReadinessScore: 84,
    certifications: ['Basic Combat Marksmanship Expert', 'Urban Operations Basic'],
    specializations: ['Maneuver Tactics'],
    medicalReadiness: 'CLASS_1',
    location: 'MSR Bronze Checkpoint 2',
    contactFreq: '38.500 MHz (TAC-2)'
  },
  {
    id: 'per-010',
    serviceNumber: 'USA-7654-32K',
    name: 'Capt. Rachel Sterling',
    callsign: 'PHANTOM',
    rank: 'Captain (O-3)',
    unitId: 'unit-intel',
    unitName: 'Battalion Intelligence S-2',
    role: 'Senior Intel Officer',
    readinessStatus: 'DEPLOYABLE',
    combatReadinessScore: 97,
    certifications: ['Intelligence Collection Manager', 'Electronic Warfare Planner', 'SCIF Custodian'],
    specializations: ['Threat Scenario Simulation', 'Red Team Exercise Injects'],
    medicalReadiness: 'CLASS_1',
    location: 'TOC Intelligence Cell',
    contactFreq: '46.000 MHz (SEC-NET)'
  }
];

export const INITIAL_CONVOYS: LogisticsConvoy[] = [
  {
    id: 'cnv-01',
    convoyCallsign: 'CONVOY IRON-1',
    routeName: 'MSR Bronze Corridor (Grid 32UND 8472 to 8820)',
    status: 'EN_ROUTE',
    cargoType: 'FUEL',
    originGrid: '32UND 8472 9134 (Logistics Node Depot)',
    destinationGrid: '32UND 8820 9410 (Forward Base Alpha)',
    eta: '14:45 Today (42 mins)',
    progressPercent: 62,
    manifestItems: [
      { name: 'F-34 Tactical Diesel Fuel', quantity: 10000, unit: 'Liters' },
      { name: 'MRE Field Rations (Halal/Kosher/Standard)', quantity: 600, unit: 'Meals' },
      { name: 'Potable Water Bladders', quantity: 2400, unit: 'Liters' },
      { name: '5.56mm Blank Training Cartridges', quantity: 8000, unit: 'Rounds' }
    ],
    fuelRemainingPercent: 88,
    escortVehicleCount: 3,
    driverCallsign: 'IRON WHEEL'
  },
  {
    id: 'cnv-02',
    convoyCallsign: 'CONVOY SENTINEL-2',
    routeName: 'Route Ironwood Bypass',
    status: 'STAGED',
    cargoType: 'MEDICAL',
    originGrid: '32UND 8472 9134 (Depot Delta)',
    destinationGrid: '32UND 8610 9290 (Aid Station Charlie)',
    eta: '17:30 Today',
    progressPercent: 0,
    manifestItems: [
      { name: 'Tactical Combat Trauma Kits', quantity: 45, unit: 'Kits' },
      { name: 'Simulated Saline Solution Bags', quantity: 120, unit: 'Units' },
      { name: 'Rigid Folding Field Litters', quantity: 16, unit: 'Units' },
      { name: 'Oxygen Concentrators (Field Ruggedized)', quantity: 4, unit: 'Units' }
    ],
    fuelRemainingPercent: 100,
    escortVehicleCount: 2,
    driverCallsign: 'MEDIC TRANSPORT 4'
  },
  {
    id: 'cnv-03',
    convoyCallsign: 'CONVOY ATLAS-3',
    routeName: 'MSR Silver North Passage',
    status: 'DELIVERED',
    cargoType: 'COMMS_SPARES',
    originGrid: '32UND 8100 8900 (Main Depot)',
    destinationGrid: '32UND 8472 9134 (TOC Signal Staging)',
    eta: 'Completed 09:15',
    progressPercent: 100,
    manifestItems: [
      { name: 'VHF Handheld Battery Modules', quantity: 180, unit: 'Packs' },
      { name: 'Directional Yagi Antenna Assemblies', quantity: 8, unit: 'Kits' },
      { name: 'Field Generator Spark Plugs & Filters', quantity: 24, unit: 'Sets' }
    ],
    fuelRemainingPercent: 74,
    escortVehicleCount: 2,
    driverCallsign: 'ATLAS LEAD'
  }
];

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-101',
    serialNumber: 'JLTV-A1-4921',
    name: 'Joint Light Tactical Vehicle (Command Variant)',
    category: 'TACTICAL_VEHICLE',
    operationalStatus: 'FULLY_MISSION_CAPABLE',
    assignedUnitId: 'unit-alpha',
    assignedUnitName: 'Alpha Mechanized Platoon 1',
    maintenanceDue: '2026-10-14 (18 days)',
    fuelBatteryLevel: 94,
    conditionScore: 98,
    locationGrid: '32UND 8472 9134'
  },
  {
    id: 'eq-102',
    serialNumber: 'HEMTT-M978-831',
    name: 'HEMTT M978A4 Fuel Servicing Tanker (9,500L)',
    category: 'TACTICAL_VEHICLE',
    operationalStatus: 'FULLY_MISSION_CAPABLE',
    assignedUnitId: 'unit-log',
    assignedUnitName: 'Forward Support Company',
    maintenanceDue: '2026-10-02 (6 days)',
    fuelBatteryLevel: 88,
    conditionScore: 92,
    locationGrid: 'En route MSR Bronze'
  },
  {
    id: 'eq-103',
    serialNumber: 'RADIO-PRC-160-55',
    name: 'AN/PRC-160 Wideband HF/VHF Tactical Transceiver',
    category: 'COMMUNICATIONS',
    operationalStatus: 'FULLY_MISSION_CAPABLE',
    assignedUnitId: 'unit-sig',
    assignedUnitName: 'Signal Detachment',
    maintenanceDue: '2026-11-20',
    fuelBatteryLevel: 85,
    conditionScore: 96,
    locationGrid: 'TOC Radio Bank'
  },
  {
    id: 'eq-104',
    serialNumber: 'UAV-PUMA3-019',
    name: 'RQ-20 Puma 3 AE Small Unmanned Aircraft System',
    category: 'SURVEILLANCE_UAV',
    operationalStatus: 'FULLY_MISSION_CAPABLE',
    assignedUnitId: 'unit-recon',
    assignedUnitName: 'Scout Platoon OP-4',
    maintenanceDue: '2026-09-30 (Flight Inspection Due)',
    fuelBatteryLevel: 100,
    conditionScore: 94,
    locationGrid: 'OP Ridge 4 Pad'
  },
  {
    id: 'eq-105',
    serialNumber: 'AMB-M997A3-204',
    name: 'Tactical Armored 4-Litter Field Ambulance',
    category: 'TACTICAL_VEHICLE',
    operationalStatus: 'PARTIALLY_MISSION_CAPABLE',
    assignedUnitId: 'unit-med',
    assignedUnitName: 'Combat Medical Section',
    maintenanceDue: '2026-09-27 (Oxygen regulator calibration pending)',
    fuelBatteryLevel: 78,
    conditionScore: 76,
    locationGrid: 'Aid Station Charlie'
  },
  {
    id: 'eq-106',
    serialNumber: 'GEN-MEP-803A-11',
    name: 'MEP-803A 10kW Tactical Quiet Diesel Generator',
    category: 'COMMUNICATIONS',
    operationalStatus: 'MAINTENANCE_REQUIRED',
    assignedUnitId: 'unit-sig',
    assignedUnitName: 'TOC Auxiliary Power',
    maintenanceDue: 'IMMEDIATE (Alternator belt slippage noted)',
    fuelBatteryLevel: 42,
    conditionScore: 61,
    locationGrid: 'TOC Aux Yard'
  },
  {
    id: 'eq-107',
    serialNumber: 'MILES-SYS-B2-88',
    name: 'Multiple Integrated Laser Engagement System (MILES) Racks (60 Sets)',
    category: 'ARMORY_SIM',
    operationalStatus: 'FULLY_MISSION_CAPABLE',
    assignedUnitId: 'unit-armory',
    assignedUnitName: 'Exercise Control Armory',
    maintenanceDue: '2026-10-30',
    fuelBatteryLevel: 96,
    conditionScore: 95,
    locationGrid: 'Depot Vault 3'
  }
];

export const INITIAL_TRAINING_EVENTS: TrainingEvent[] = [
  {
    id: 'tr-01',
    title: 'Multi-Echelon Blank-Fire Perimeter Defense Drill',
    category: 'LIVE_FIRE_SIM',
    unitName: '1st & 2nd Mechanized Platoons',
    instructor: 'SFC Thomas Hayes',
    scheduledDate: '2026-09-27 06:30',
    durationHours: 6,
    status: 'SCHEDULED',
    location: 'Training Range Sierra 4',
    qualificationRate: 94,
    attendeeCount: 68
  },
  {
    id: 'tr-02',
    title: 'Tactical Combat Casualty Care (TCCC) Under Fire Simulation',
    category: 'CASUALTY_EVAC',
    unitName: 'All Company First Responders',
    instructor: 'Sgt. Liam O\'Connor',
    scheduledDate: '2026-09-27 14:00',
    durationHours: 4,
    status: 'SCHEDULED',
    location: 'Medical Simulation Bunker B',
    qualificationRate: 98,
    attendeeCount: 24
  },
  {
    id: 'tr-03',
    title: 'Electronic Warfare Resilience & HF Jamming Countermeasures',
    category: 'C4ISR_DRILL',
    unitName: 'Battalion Communications Specialists',
    instructor: 'Staff Sgt. Emily Zhao',
    scheduledDate: '2026-09-28 09:00',
    durationHours: 3.5,
    status: 'SCHEDULED',
    location: 'TOC Signal Bay',
    qualificationRate: 91,
    attendeeCount: 16
  },
  {
    id: 'tr-04',
    title: 'Contested Logistics Convoy Security & Anti-Ambush Rehearsal',
    category: 'CONVOY_ESCORT',
    unitName: 'Support Logistics Company',
    instructor: 'Capt. David Reyes',
    scheduledDate: '2026-09-25 10:00',
    durationHours: 5,
    status: 'COMPLETED',
    location: 'Route Silver Training Loop',
    qualificationRate: 96,
    attendeeCount: 38
  },
  {
    id: 'tr-05',
    title: 'Night Thermal Vision Navigation & Target Spotting Exercise',
    category: 'NIGHT_NAVIGATION',
    unitName: 'Scout Recon Section',
    instructor: '1st Lt. Michael Torres',
    scheduledDate: '2026-09-24 21:00',
    durationHours: 4,
    status: 'COMPLETED',
    location: 'North Ridge Sector',
    qualificationRate: 92,
    attendeeCount: 18
  }
];

export const INITIAL_MAP_MARKERS: MapMarker[] = [
  {
    id: 'mk-01',
    name: 'Battalion Tactical Ops Center (TOC)',
    type: 'FORWARD_BASE',
    x: 28,
    y: 42,
    status: 'OPERATIONAL - C4ISR 100%',
    details: 'Primary Command Hub; 38 personnel on duty; fiber & satcom uplinks active.',
    gridMGRS: '32UND 8472 9134',
    unitStrength: 38
  },
  {
    id: 'mk-02',
    name: '1st Platoon / Alpha (Defensive Screen)',
    type: 'BLUE_FORCE',
    x: 48,
    y: 35,
    status: 'STATIONARY - PERIMETER DEFENSE',
    speedKmh: 0,
    headingDeg: 85,
    details: 'Holding Forward Fighting Positions along Ridge Echo; 34 personnel; 4x JLTV.',
    gridMGRS: '32UND 8640 9210',
    unitStrength: 34
  },
  {
    id: 'mk-03',
    name: 'Convoy Iron-1 (Fuel & Rations)',
    type: 'NEUTRAL_LOGISTICS',
    x: 39,
    y: 54,
    status: 'TRANSITING MSR BRONZE - 38 KM/H',
    speedKmh: 38,
    headingDeg: 62,
    details: '4 heavy vehicles + 2 escort JLTVs; 10,000L fuel cargo; ETA 42 min.',
    gridMGRS: '32UND 8560 9180',
    unitStrength: 14
  },
  {
    id: 'mk-04',
    name: 'Scout Recon Team Falcon (Observation Post)',
    type: 'BLUE_FORCE',
    x: 68,
    y: 22,
    status: 'CONCEALED - UAV PATROL ACTIVE',
    speedKmh: 0,
    headingDeg: 140,
    details: 'Puma UAV scanning Eastern pass; zero uncoordinated movement detected.',
    gridMGRS: '32UND 8890 9340',
    unitStrength: 8
  },
  {
    id: 'mk-05',
    name: 'Simulated OPFOR Element Red (Exercise Roleplayers)',
    type: 'RED_SIM',
    x: 74,
    y: 38,
    status: 'SIMULATED ADVERSARY RECON',
    speedKmh: 20,
    headingDeg: 260,
    details: 'Training cadre simulating light motorized scouting probe against Checkpoint 3.',
    gridMGRS: '32UND 8990 9250',
    unitStrength: 12
  },
  {
    id: 'mk-06',
    name: 'Objective TITAN (Forward Assembly Zone)',
    type: 'OBJECTIVE_FLAG',
    x: 62,
    y: 65,
    status: 'PHASE 3 DESIGNATED LZ / MEDEVAC SITE',
    details: 'Elevation 340m; clear landing zone for simulated helicopter casualty hoist.',
    gridMGRS: '32UND 8780 9050'
  },
  {
    id: 'mk-07',
    name: 'Forward Aid Station Charlie',
    type: 'FORWARD_BASE',
    x: 32,
    y: 68,
    status: 'MEDICAL TRIAGE READY - 4 AMBULANCES',
    details: '12 medical personnel; blood refrigerator operational; triage beds ready.',
    gridMGRS: '32UND 8510 9040',
    unitStrength: 12
  }
];

export const INITIAL_SITREPS: SituationReport[] = [
  {
    id: 'sitrep-001',
    reportNumber: 'SITREP-08 (EXERCISE IRON SHIELD)',
    timestamp: '2026-09-26 09:30 Local',
    authorRank: 'Major (O-4)',
    authorName: 'Elena Rostova',
    unit: '3rd Combined Arms Battalion TOC',
    gridLocation: '32UND 8472 9134',
    currentSituation: 'Exercise Phase II entering hour 28. All outer checkpoints established along MSR Bronze. Simulated electronic jamming test conducted between 07:00 and 08:30; successfully transitioned to secondary HF burst channel with zero critical telemetry loss.',
    friendlyForcesStatus: '1st Platoon fortified at Ridge Echo. Recon Team Falcon maintaining continuous drone overwatch over Eastern Defile. Personnel readiness index at 94.2%. Zero real-world heat injuries or mechanical rollovers.',
    logisticsStatus: 'Convoy Iron-1 has cleared Checkpoint 1 on schedule. Bulk fuel levels at forward staging node sufficient for 48 hours of uninterrupted maneuver tempo. Water supply refilled at 06:00.',
    obstaclesChallenges: 'Simulated bridge demolition inject received at Grid 8620-9140. Engineer bypass reconnaissance active. Minor thermal camera sensor drift on JLTV-4921 repaired by unit mechanics.',
    commanderAssessment: 'Battalion is operating well within training standards. Decentralized platoon command exercised effectively during comms blackout drill. Recommend authorization to commence Phase 3 simulated casualty drill at 15:00.',
    status: 'TRANSMITTED'
  }
];

export const INITIAL_AARS: AfterActionReport[] = [
  {
    id: 'aar-001',
    exerciseId: 'ex-03',
    codename: 'EXERCISE GHOST FALCON',
    completionDate: '2026-09-15',
    leadEvaluator: 'SFC Thomas Hayes',
    overallRating: 'EXCEEDED_STANDARD',
    readinessGainScore: 14.8,
    keySuccesses: [
      'Radar lock acquired on simulated high-speed target drones in average of 11.2 seconds (standard was 15.0s).',
      'Flawless automated data handoff between primary radar and auxiliary mobile battery.',
      '100% equipment recovery with zero safety lock infractions.'
    ],
    lessonsLearned: [
      'Field generator fuel filters clogged prematurely under fine volcanic sand conditions; frequency of filter inspection increased to every 12 operating hours.',
      'Secondary HF voice nets required higher antenna elevation for deep gully communication.'
    ],
    logisticsVarianceNotes: 'Fuel burn matched planning model within 2.3% variance. Spare battery packs utilized at 80% expected consumption rate.',
    safetyRecord: 'Zero injuries. 100% compliance with hearing and optical safety lockouts.',
    recommendations: [
      'Incorporate dust-filtration hoods on all auxiliary power generators in high-arid zones.',
      'Standardize 5-minute pre-drill signal check on all remote repeater pods.'
    ]
  }
];

export const INITIAL_ALERTS: TacticalAlert[] = [
  {
    id: 'alt-01',
    timestamp: '10 mins ago',
    severity: 'WARNING',
    category: 'LOGISTICS',
    title: 'Convoy Iron-1 Approaching Chokepoint Grid 8590',
    message: 'Convoy speed restricted to 30 km/h due to simulated gravel wash. Driver confirms escort spacing intact.',
    acknowledged: false
  },
  {
    id: 'alt-02',
    timestamp: '35 mins ago',
    severity: 'INFO',
    category: 'EXERCISE_INJECT',
    title: 'Simulated Weather Inject: Dust Advisory (Visibility 1.5km)',
    message: 'Exercise Control issues simulated thermal-only driving conditions for next 90 minutes across Sector 7.',
    acknowledged: true
  },
  {
    id: 'alt-03',
    timestamp: '1 hour ago',
    severity: 'CRITICAL',
    category: 'READINESS',
    title: 'Generator MEP-803A Alternator Warning',
    message: 'Auxiliary TOC generator telemetry indicates belt tension degradation. Maintenance work order generated.',
    acknowledged: false
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-09-26 09:30:15',
    userId: 'usr-02',
    userName: 'Maj. Elena Rostova',
    userRole: 'Officer',
    actionType: 'REPORT_SUBMIT',
    details: 'Submitted Situation Report SITREP-08 (Transmitted to Higher HQ).'
  },
  {
    id: 'aud-002',
    timestamp: '2026-09-26 08:45:10',
    userId: 'usr-03',
    userName: 'Capt. David Reyes',
    userRole: 'Staff',
    actionType: 'LOGISTICS_DISPATCH',
    details: 'Cleared Convoy Iron-1 Departure Manifest (10,000L Fuel, 600 Rations).'
  },
  {
    id: 'aud-003',
    timestamp: '2026-09-26 07:15:02',
    userId: 'usr-01',
    userName: 'Col. Marcus Vance',
    userRole: 'Commander',
    actionType: 'MISSION_MODIFY',
    details: 'Approved Phase II Comms Jamming Drill & Authorized HF Transition.'
  },
  {
    id: 'aud-004',
    timestamp: '2026-09-25 18:00:22',
    userId: 'usr-04',
    userName: 'SFC Thomas Hayes',
    userRole: 'Trainer',
    actionType: 'EXPORT',
    details: 'Exported Training Qualification Manifest CSV for Support Logistics Company.'
  }
];
