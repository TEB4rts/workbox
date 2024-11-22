import { ContractTemplate } from './types';
import { writingTemplates } from './templates/writingTemplates';
import { designTemplates } from './templates/designTemplates';
import { developmentTemplates } from './templates/developmentTemplates';

export const contractTemplates: ContractTemplate[] = [
  ...writingTemplates,
  ...designTemplates,
  ...developmentTemplates,
  // Additional templates can be imported from other category files
];
