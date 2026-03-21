export type DimensionOutput = {
  id?: string;
  name: string;
  state: 'active' | 'destroyed' | 'quarantine';
  technologicalLevel: number;
  description: string;
};