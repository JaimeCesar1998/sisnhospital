import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Disease {
  id: string;
  name: string;
  cases: number;
  trend: string;
  severity: 'high' | 'medium' | 'low';
  department: string;
  lastUpdate: string;
  hospitalId?: string;
  description?: string;
  symptoms?: string[];
  treatment?: string;
  type: 'outbreak' | 'epidemic' | 'pandemic' | 'endemic';
}

export interface Hospital {
  id: string;
  name: string;
  province: string;
  status: 'active' | 'maintenance' | 'inactive';
  patients: number;
  capacity: number;
  contact?: string;
  address?: string;
  director?: string;
  email?: string;
  password?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  disease: string;
  status: 'active' | 'recovered' | 'critical';
  admissionDate: string;
  hospitalId: string;
  department: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'doctor' | 'nurse' | 'technician' | 'administrative';
  department: string;
  shift: 'morning' | 'afternoon' | 'night';
  phone: string;
  email: string;
  status: 'active' | 'busy' | 'off';
  hospitalId: string;
  specialization: string;
  experience: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'medicine' | 'equipment' | 'material';
  quantity: number;
  unit: string;
  location: string;
  status: 'active' | 'low' | 'critical';
  hospitalId: string;
  expiryDate?: string;
  supplier?: string;
  minimumQuantity: number;
}

interface DataContextType {
  // Diseases
  diseases: Disease[];
  addDisease: (disease: Omit<Disease, 'id'>) => void;
  updateDisease: (id: string, disease: Partial<Disease>) => void;
  deleteDisease: (id: string) => void;
  getDiseasesByHospital: (hospitalId: string) => Disease[];
  
  // Hospitals
  hospitals: Hospital[];
  addHospital: (hospital: Omit<Hospital, 'id'>) => void;
  updateHospital: (id: string, hospital: Partial<Hospital>) => void;
  deleteHospital: (id: string) => void;
  
  // Patients
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  getPatientsByHospital: (hospitalId: string) => Patient[];
  
  // Staff
  staff: Staff[];
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  updateStaff: (id: string, staff: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  getStaffByHospital: (hospitalId: string) => Staff[];
  
  // Resources
  resources: Resource[];
  addResource: (resource: Omit<Resource, 'id'>) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  getResourcesByHospital: (hospitalId: string) => Resource[];
  
  // Statistics
  getStatistics: (scope: 'hospital' | 'national', hospitalId?: string) => any;
  getChartData: (scope: 'hospital' | 'national', hospitalId?: string) => any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial mock data with more comprehensive data
const initialDiseases: Disease[] = [
  { id: '1', name: 'Malária', cases: 45, trend: '+12%', severity: 'high', department: 'Medicina Interna', lastUpdate: '2h atrás', hospitalId: 'HCL001', type: 'outbreak' },
  { id: '2', name: 'Cólera', cases: 8, trend: '+25%', severity: 'high', department: 'Urgências', lastUpdate: '1h atrás', hospitalId: 'HCL001', type: 'outbreak' },
  { id: '3', name: 'Dengue', cases: 23, trend: '+15%', severity: 'medium', department: 'Pediatria', lastUpdate: '30min atrás', hospitalId: 'HCL001', type: 'outbreak' },
  { id: '4', name: 'Febre Amarela', cases: 3, trend: '+100%', severity: 'high', department: 'Urgências', lastUpdate: '1h atrás', hospitalId: 'HCL001', type: 'outbreak' },
  { id: '5', name: 'Sarampo', cases: 7, trend: '+40%', severity: 'medium', department: 'Pediatria', lastUpdate: '2h atrás', hospitalId: 'HCL001', type: 'outbreak' },
  { id: '6', name: 'COVID-19', cases: 12, trend: '-8%', severity: 'medium', department: 'Isolamento', lastUpdate: '2h atrás', hospitalId: 'HCL001', type: 'outbreak' },
  { id: '7', name: 'Tuberculose', cases: 15, trend: '+10%', severity: 'medium', department: 'Pneumologia', lastUpdate: '3h atrás', hospitalId: 'HCL001', type: 'outbreak' },
  
  // Dados para Hospital de Benguela
  { id: '8', name: 'Malária', cases: 32, trend: '+8%', severity: 'high', department: 'Medicina Interna', lastUpdate: '1h atrás', hospitalId: 'HBG001', type: 'outbreak' },
  { id: '9', name: 'Dengue', cases: 18, trend: '+20%', severity: 'medium', department: 'Pediatria', lastUpdate: '2h atrás', hospitalId: 'HBG001', type: 'outbreak' },
  { id: '10', name: 'Hepatite A', cases: 5, trend: '+50%', severity: 'medium', department: 'Gastrenterologia', lastUpdate: '3h atrás', hospitalId: 'HBG001', type: 'outbreak' },
  { id: '11', name: 'Meningite', cases: 2, trend: '+100%', severity: 'high', department: 'Neurologia', lastUpdate: '1h atrás', hospitalId: 'HBG001', type: 'outbreak' },
  
  // Dados para Hospital do Huambo
  { id: '12', name: 'Malária', cases: 28, trend: '+5%', severity: 'high', department: 'Medicina Interna', lastUpdate: '2h atrás', hospitalId: 'HHB001', type: 'outbreak' },
  { id: '13', name: 'Pneumonia', cases: 14, trend: '+18%', severity: 'medium', department: 'Pneumologia', lastUpdate: '1h atrás', hospitalId: 'HHB001', type: 'outbreak' },
  { id: '14', name: 'Diarreia Aguda', cases: 9, trend: '+35%', severity: 'medium', department: 'Gastrenterologia', lastUpdate: '3h atrás', hospitalId: 'HHB001', type: 'outbreak' },
];

const initialHospitals: Hospital[] = [
  { 
    id: 'HCL001', 
    name: 'Hospital Central de Luanda', 
    province: 'Luanda', 
    status: 'active', 
    patients: 1234, 
    capacity: 85,
    email: 'hospital.luanda@saude.gov.ao',
    password: 'hospital123',
    contact: '+244 222 123 456',
    address: 'Rua Major Kanhangulo, Luanda',
    director: 'Dr. António Sebastião'
  },
  { 
    id: 'HBG001', 
    name: 'Hospital de Benguela', 
    province: 'Benguela', 
    status: 'active', 
    patients: 987, 
    capacity: 92,
    email: 'hospital.benguela@saude.gov.ao',
    password: 'hospital123',
    contact: '+244 272 123 456',
    address: 'Avenida Norton de Matos, Benguela',
    director: 'Dr. Maria Fernandes'
  },
  { 
    id: 'HHB001', 
    name: 'Hospital do Huambo', 
    province: 'Huambo', 
    status: 'active', 
    patients: 456, 
    capacity: 67,
    email: 'hospital.huambo@saude.gov.ao',
    password: 'hospital123',
    contact: '+244 241 123 456',
    address: 'Rua Sá da Bandeira, Huambo',
    director: 'Dr. Carlos Mendes'
  },
  { 
    id: 'HLB001', 
    name: 'Hospital do Lobito', 
    province: 'Benguela', 
    status: 'maintenance', 
    patients: 234, 
    capacity: 45,
    email: 'hospital.lobito@saude.gov.ao',
    password: 'hospital123',
    contact: '+244 272 789 012',
    address: 'Rua Robert Williams, Lobito',
    director: 'Dr. Ana Costa'
  },
  { 
    id: 'HLG001', 
    name: 'Hospital de Lubango', 
    province: 'Huíla', 
    status: 'active', 
    patients: 678, 
    capacity: 78,
    email: 'hospital.lubango@saude.gov.ao',
    password: 'hospital123',
    contact: '+244 261 123 456',
    address: 'Avenida 4 de Fevereiro, Lubango',
    director: 'Dr. João Silva'
  },
];

const initialPatients: Patient[] = [
  { id: '1', name: 'João Silva', age: 35, gender: 'male', disease: 'Malária', status: 'active', admissionDate: '2024-06-10', hospitalId: 'HCL001', department: 'Medicina Interna' },
  { id: '2', name: 'Maria Santos', age: 28, gender: 'female', disease: 'Dengue', status: 'recovered', admissionDate: '2024-06-08', hospitalId: 'HCL001', department: 'Pediatria' },
  { id: '3', name: 'Pedro Costa', age: 42, gender: 'male', disease: 'Cólera', status: 'critical', admissionDate: '2024-06-12', hospitalId: 'HCL001', department: 'Urgências' },
  { id: '4', name: 'Ana Ferreira', age: 19, gender: 'female', disease: 'Sarampo', status: 'active', admissionDate: '2024-06-11', hospitalId: 'HCL001', department: 'Pediatria' },
  { id: '5', name: 'Carlos Mendes', age: 56, gender: 'male', disease: 'Tuberculose', status: 'active', admissionDate: '2024-06-09', hospitalId: 'HCL001', department: 'Pneumologia' },
  
  // Pacientes do Hospital de Benguela
  { id: '6', name: 'Luisa Campos', age: 33, gender: 'female', disease: 'Malária', status: 'active', admissionDate: '2024-06-10', hospitalId: 'HBG001', department: 'Medicina Interna' },
  { id: '7', name: 'António Neto', age: 45, gender: 'male', disease: 'Hepatite A', status: 'active', admissionDate: '2024-06-11', hospitalId: 'HBG001', department: 'Gastrenterologia' },
  { id: '8', name: 'Sofia Rodrigues', age: 12, gender: 'female', disease: 'Dengue', status: 'recovered', admissionDate: '2024-06-07', hospitalId: 'HBG001', department: 'Pediatria' },
  
  // Pacientes do Hospital do Huambo
  { id: '9', name: 'Manuel Pereira', age: 38, gender: 'male', disease: 'Pneumonia', status: 'active', admissionDate: '2024-06-10', hospitalId: 'HHB001', department: 'Pneumologia' },
  { id: '10', name: 'Rosa Cardoso', age: 67, gender: 'female', disease: 'Malária', status: 'critical', admissionDate: '2024-06-12', hospitalId: 'HHB001', department: 'Medicina Interna' },
];

const initialStaff: Staff[] = [
  { id: '1', name: 'Dr. António Neto', role: 'doctor', department: 'Medicina Interna', hospitalId: 'HCL001', shift: 'morning', phone: '+244 923 456 789', email: 'antonio.neto@hospital.ao', status: 'active', specialization: 'Medicina Tropical', experience: 10 },
  { id: '2', name: 'Enf. Luisa Fernandes', role: 'nurse', department: 'Urgências', hospitalId: 'HCL001', shift: 'afternoon', phone: '+244 923 456 790', email: 'luisa.fernandes@hospital.ao', status: 'active', specialization: 'Enfermagem', experience: 5 },
  { id: '3', name: 'Dr. Carlos Mendes', role: 'doctor', department: 'Pediatria', hospitalId: 'HCL001', shift: 'night', phone: '+244 923 456 791', email: 'carlos.mendes@hospital.ao', status: 'active', specialization: 'Pediatria Tropical', experience: 8 },
  { id: '4', name: 'Dr. Maria Silva', role: 'doctor', department: 'Pneumologia', hospitalId: 'HCL001', shift: 'morning', phone: '+244 923 456 792', email: 'maria.silva@hospital.ao', status: 'active', specialization: 'Doenças Respiratórias', experience: 12 },
  
  // Staff do Hospital de Benguela
  { id: '5', name: 'Dr. João Santos', role: 'doctor', department: 'Medicina Interna', hospitalId: 'HBG001', shift: 'afternoon', phone: '+244 923 456 793', email: 'joao.santos@hospital.ao', status: 'active', specialization: 'Medicina Interna', experience: 10 },
  { id: '6', name: 'Enf. Ana Costa', role: 'nurse', department: 'Pediatria', hospitalId: 'HBG001', shift: 'night', phone: '+244 923 456 794', email: 'ana.costa@hospital.ao', status: 'active', specialization: 'Enfermagem', experience: 5 },
  { id: '7', name: 'Dr. Pedro Alves', role: 'doctor', department: 'Gastrenterologia', hospitalId: 'HBG001', shift: 'morning', phone: '+244 923 456 795', email: 'pedro.alves@hospital.ao', status: 'active', specialization: 'Hepatologia', experience: 7 },
  
  // Staff do Hospital do Huambo
  { id: '8', name: 'Dr. Sofia Pereira', role: 'doctor', department: 'Pneumologia', hospitalId: 'HHB001', shift: 'afternoon', phone: '+244 923 456 796', email: 'sofia.pereira@hospital.ao', status: 'active', specialization: 'Pneumologia', experience: 10 },
  { id: '9', name: 'Enf. Manuel Cardoso', role: 'nurse', department: 'Medicina Interna', hospitalId: 'HHB001', shift: 'night', phone: '+244 923 456 797', email: 'manuel.cardoso@hospital.ao', status: 'active', specialization: 'Enfermagem', experience: 5 },
];

const initialResources: Resource[] = [
  { id: '1', name: 'Paracetamol 500mg', type: 'medicine', quantity: 5, unit: 'mg', location: 'Hospital Central de Luanda', status: 'critical', hospitalId: 'HCL001', minimumQuantity: 50, expiryDate: '2024-07-01', supplier: 'Farmácia Central' },
  { id: '2', name: 'Seringas 5ml', type: 'equipment', quantity: 50, unit: 'ml', location: 'Hospital Central de Luanda', status: 'low', hospitalId: 'HCL001', minimumQuantity: 100, expiryDate: '2024-06-30', supplier: 'Equipamentos Hospitalares' },
  { id: '3', name: 'Vacina Febre Amarela', type: 'medicine', quantity: 2, unit: 'ml', location: 'Hospital Central de Luanda', status: 'critical', hospitalId: 'HCL001', minimumQuantity: 20, expiryDate: '2024-06-30', supplier: 'Vacinas Biológicas' },
  { id: '4', name: 'Aspirina 100mg', type: 'medicine', quantity: 120, unit: 'mg', location: 'Hospital Central de Luanda', status: 'active', hospitalId: 'HCL001', minimumQuantity: 50, expiryDate: '2024-07-01', supplier: 'Farmácia Central' },
  { id: '5', name: 'Máscaras Cirúrgicas', type: 'material', quantity: 30, unit: 'unidades', location: 'Hospital Central de Luanda', status: 'low', hospitalId: 'HCL001', minimumQuantity: 100, expiryDate: '2024-06-30', supplier: 'Equipamentos Hospitalares' },
  
  // Recursos do Hospital de Benguela
  { id: '6', name: 'Artemeter', type: 'medicine', quantity: 8, unit: 'mg', location: 'Hospital de Benguela', status: 'critical', hospitalId: 'HBG001', minimumQuantity: 30, expiryDate: '2024-07-01', supplier: 'Laboratório Biológico' },
  { id: '7', name: 'Soro Fisiológico', type: 'material', quantity: 25, unit: 'ml', location: 'Hospital de Benguela', status: 'low', hospitalId: 'HBG001', minimumQuantity: 50, expiryDate: '2024-06-30', supplier: 'Equipamentos Hospitalares' },
  { id: '8', name: 'Antibióticos', type: 'medicine', quantity: 45, unit: 'mg', location: 'Hospital de Benguela', status: 'active', hospitalId: 'HBG001', minimumQuantity: 40, expiryDate: '2024-07-01', supplier: 'Laboratório Biológico' },
  
  // Recursos do Hospital do Huambo
  { id: '9', name: 'Cloroquina', type: 'medicine', quantity: 3, unit: 'mg', location: 'Hospital do Huambo', status: 'critical', hospitalId: 'HHB001', minimumQuantity: 25, expiryDate: '2024-07-01', supplier: 'Laboratório Biológico' },
  { id: '10', name: 'Luvas Descartáveis', type: 'material', quantity: 80, unit: 'unidades', location: 'Hospital do Huambo', status: 'low', hospitalId: 'HHB001', minimumQuantity: 100, expiryDate: '2024-06-30', supplier: 'Equipamentos Hospitalares' },
  { id: '11', name: 'Termômetros', type: 'equipment', quantity: 15, unit: 'unidades', location: 'Hospital do Huambo', status: 'active', hospitalId: 'HHB001', minimumQuantity: 10, expiryDate: '2024-07-01', supplier: 'Equipamentos Hospitalares' },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [diseases, setDiseases] = useState<Disease[]>(() => {
    const stored = localStorage.getItem('angola-health-diseases');
    return stored ? JSON.parse(stored) : initialDiseases;
  });
  
  const [hospitals, setHospitals] = useState<Hospital[]>(() => {
    const stored = localStorage.getItem('angola-health-hospitals');
    return stored ? JSON.parse(stored) : initialHospitals;
  });
  
  const [patients, setPatients] = useState<Patient[]>(() => {
    const stored = localStorage.getItem('angola-health-patients');
    return stored ? JSON.parse(stored) : initialPatients;
  });
  
  const [staff, setStaff] = useState<Staff[]>(() => {
    const stored = localStorage.getItem('angola-health-staff');
    return stored ? JSON.parse(stored) : initialStaff;
  });
  
  const [resources, setResources] = useState<Resource[]>(() => {
    const stored = localStorage.getItem('angola-health-resources');
    return stored ? JSON.parse(stored) : initialResources;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('angola-health-diseases', JSON.stringify(diseases));
  }, [diseases]);
  
  useEffect(() => {
    localStorage.setItem('angola-health-hospitals', JSON.stringify(hospitals));
  }, [hospitals]);
  
  useEffect(() => {
    localStorage.setItem('angola-health-patients', JSON.stringify(patients));
  }, [patients]);
  
  useEffect(() => {
    localStorage.setItem('angola-health-staff', JSON.stringify(staff));
  }, [staff]);
  
  useEffect(() => {
    localStorage.setItem('angola-health-resources', JSON.stringify(resources));
  }, [resources]);

  // Disease methods
  const addDisease = (disease: Omit<Disease, 'id'>) => {
    const newDisease = { ...disease, id: Date.now().toString() };
    setDiseases(prev => [...prev, newDisease]);
  };

  const updateDisease = (id: string, diseaseUpdate: Partial<Disease>) => {
    setDiseases(prev => prev.map(d => d.id === id ? { ...d, ...diseaseUpdate } : d));
  };

  const deleteDisease = (id: string) => {
    setDiseases(prev => prev.filter(d => d.id !== id));
  };

  const getDiseasesByHospital = (hospitalId: string) => {
    return diseases.filter(d => d.hospitalId === hospitalId);
  };

  // Hospital methods
  const addHospital = (hospital: Omit<Hospital, 'id'>) => {
    const newHospital = { 
      ...hospital, 
      id: `H${Date.now()}`,
      email: hospital.email || `${hospital.name.toLowerCase().replace(/\s+/g, '.')}@saude.gov.ao`,
      password: 'hospital123'
    };
    setHospitals(prev => [...prev, newHospital]);
  };

  const updateHospital = (id: string, hospitalUpdate: Partial<Hospital>) => {
    setHospitals(prev => prev.map(h => h.id === id ? { ...h, ...hospitalUpdate } : h));
  };

  const deleteHospital = (id: string) => {
    setHospitals(prev => prev.filter(h => h.id !== id));
  };

  // Patient methods
  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: Date.now().toString() };
    setPatients(prev => [...prev, newPatient]);
  };

  const updatePatient = (id: string, patientUpdate: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...patientUpdate } : p));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const getPatientsByHospital = (hospitalId: string) => {
    return patients.filter(p => p.hospitalId === hospitalId);
  };

  // Staff methods
  const addStaff = (staffMember: Omit<Staff, 'id'>) => {
    const newStaff = { ...staffMember, id: Date.now().toString() };
    setStaff(prev => [...prev, newStaff]);
  };

  const updateStaff = (id: string, staffUpdate: Partial<Staff>) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...staffUpdate } : s));
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
  };

  const getStaffByHospital = (hospitalId: string) => {
    return staff.filter(s => s.hospitalId === hospitalId);
  };

  // Resource methods
  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource = { ...resource, id: Date.now().toString() };
    setResources(prev => [...prev, newResource]);
  };

  const updateResource = (id: string, resourceUpdate: Partial<Resource>) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, ...resourceUpdate } : r));
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const getResourcesByHospital = (hospitalId: string) => {
    return resources.filter(r => r.hospitalId === hospitalId);
  };

  // Statistics and chart data
  const getStatistics = (scope: 'hospital' | 'national', hospitalId?: string) => {
    const scopeDiseases = scope === 'hospital' && hospitalId 
      ? getDiseasesByHospital(hospitalId)
      : diseases;
    
    const scopePatients = scope === 'hospital' && hospitalId
      ? getPatientsByHospital(hospitalId)
      : patients;

    const totalCases = scopeDiseases.reduce((sum, d) => sum + d.cases, 0);
    const criticalCases = scopeDiseases.filter(d => d.severity === 'high').reduce((sum, d) => sum + d.cases, 0);
    
    return {
      totalCases,
      criticalCases,
      totalPatients: scopePatients.length,
      activeCases: scopePatients.filter(p => p.status === 'active').length,
      hospitals: scope === 'national' ? hospitals.length : 1,
      resources: scope === 'hospital' && hospitalId 
        ? getResourcesByHospital(hospitalId).filter(r => r.status === 'critical').length
        : resources.filter(r => r.status === 'critical').length
    };
  };

  const getChartData = (scope: 'hospital' | 'national', hospitalId?: string) => {
    const scopeDiseases = scope === 'hospital' && hospitalId 
      ? getDiseasesByHospital(hospitalId)
      : diseases;

    // Group diseases by name and sum cases
    const diseaseMap = scopeDiseases.reduce((acc, disease) => {
      if (acc[disease.name]) {
        acc[disease.name].value += disease.cases;
      } else {
        acc[disease.name] = {
          name: disease.name,
          value: disease.cases,
          trend: disease.trend,
          severity: disease.severity,
          type: disease.type
        };
      }
      return acc;
    }, {} as any);

    return Object.values(diseaseMap);
  };

  return (
    <DataContext.Provider value={{
      diseases,
      addDisease,
      updateDisease,
      deleteDisease,
      getDiseasesByHospital,
      hospitals,
      addHospital,
      updateHospital,
      deleteHospital,
      patients,
      addPatient,
      updatePatient,
      deletePatient,
      getPatientsByHospital,
      staff,
      addStaff,
      updateStaff,
      deleteStaff,
      getStaffByHospital,
      resources,
      addResource,
      updateResource,
      deleteResource,
      getResourcesByHospital,
      getStatistics,
      getChartData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
