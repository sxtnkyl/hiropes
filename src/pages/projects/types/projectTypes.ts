/**
 * Project Info Types
 *
 */
export type GradeRange = '0-2' | '2-4' | '4-6' | '6-8' | '8-10' | '10+';
export type WallSection = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'other';
export type RouteColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'black'
  | 'orange'
  | 'purple'
  | 'other';

/** different from @/API Project - doesn't have dynamoDB fields like owner */
export type ProjectRoute = {
  id: string;
  name: string;
  section?: WallSection;
  color?: RouteColor;
  grade?: GradeRange;
  sessionCount?: number;
  imageUrl?: string;
  description?: string;
};
