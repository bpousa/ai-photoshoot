export interface PackageAssignment {
  id: string;
  clientId: string;
  packageId: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'expired' | 'cancelled';
  creditsUsed: {
    photos: number;
    videos: number;
  };
  creditsRemaining: {
    photos: number;
    videos: number;
  };
  lastUsed?: Date;
}

export interface AssignmentHistory {
  assignmentId: string;
  timestamp: Date;
  action: 'created' | 'cancelled' | 'renewed' | 'credits_added';
  details?: Record<string, any>;
  performedBy: string;
}