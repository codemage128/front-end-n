export type StudyType = {
  id: string;
  assignedTo: string;
  date: string;
  revenue: number;
  modality: string;
  bodyPart: string;
  sla: number;
};

export type RevenueType = {
  name: string;
  revenue: number;
};
export type StudiesDisplayType = {
  name: string;
  count: number;
};
export type SlaDisplayType = {
    date: string;
    value: number;
}