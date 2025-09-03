export interface Location {
  id: string;
  name: string;
  travel: number; // time cost
  description: string;
  x: number;
  y: number;
  connections: string[];
}
