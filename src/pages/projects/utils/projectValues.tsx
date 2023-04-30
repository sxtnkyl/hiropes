import { MenuItem } from '@mui/material';
import { GradeRange, RouteColor, WallSection } from '../types/projectTypes';

export const gradeRanges: GradeRange[] = [
  '0-2',
  '2-4',
  '4-6',
  '6-8',
  '8-10',
  '10+',
];
export const wallSections: WallSection[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'other',
];
export const routeColors: RouteColor[] = [
  'red',
  'blue',
  'green',
  'yellow',
  'pink',
  'black',
  'orange',
  'purple',
  'other',
];

export const routeGradeSelectItems = gradeRanges.map((grade) => (
  <MenuItem key={grade} value={grade}>
    {grade}
  </MenuItem>
));
export const wallSectionSelectItems = wallSections.map((section) => (
  <MenuItem key={section} value={section}>
    {section}
  </MenuItem>
));
export const routeColorSelectItems = routeColors.map((color) => (
  <MenuItem key={color} value={color}>
    {color}
  </MenuItem>
));
