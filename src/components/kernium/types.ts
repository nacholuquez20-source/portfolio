export type VehicleId = 'TR-01' | 'TR-02' | 'CR-04' | 'VN-03';

export type VehicleStatus = 'Operating' | 'Maintenance' | 'Alert';

export interface Vehicle {
  id: VehicleId;
  name: string;
  type: 'Truck' | 'Crane' | 'Van';
  status: VehicleStatus;
  operator: string;
  location: { x: number; y: number; name: string };
  metrics: {
    battery: number;
    fuelEfficiency: string;
    temperature: string;
    warningMsg?: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'operator' | 'ai_system' | 'dispatcher';
  text: string;
  timestamp: string;
  extractedEntities?: {
    vehicle?: string;
    issue?: string;
    severity?: 'low' | 'medium' | 'high';
  };
  isSimulated?: boolean;
}

export interface Operator {
  id: string;
  name: string;
  role: string;
  avatar: string;
  vehicleId: VehicleId;
  unreadCount: number;
  initialChat: ChatMessage[];
}

export interface MaintenanceTicket {
  id: string;
  vehicleId: VehicleId;
  issue: string;
  reportedBy: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  severity: 'low' | 'medium' | 'high';
}

export interface PipelineStep {
  id: 'receive' | 'ner' | 'validate' | 'db_sync' | 'ui_dispatch';
  label: string;
  description: string;
  status: 'idle' | 'processing' | 'success' | 'error';
  extractedData?: Record<string, string>;
}
