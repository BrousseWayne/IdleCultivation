export interface Quest {
  id: string;
  title: string;
  description: string;
  progress?: number;
  maxProgress?: number;
  reward: string;
  completedDate?: string;
}
