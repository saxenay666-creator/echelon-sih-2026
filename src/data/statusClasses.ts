import { ProblemStatus } from '../types';

export const STATUS_CLASSES: Record<ProblemStatus, string> = {
  New: 'st-new',
  'AI Analyzed': 'st-analyzed',
  'Open for Solutions': 'st-open',
  'Solution Selected': 'st-selected',
  Prototype: 'st-prototype',
  'Government Review': 'st-review',
  Pilot: 'st-pilot',
  Implemented: 'st-implemented',
  Solved: 'st-solved',
};
