import { TargetConfiguration } from 'nx/src/config/workspace-json-project-json';
import { registerLibraryTargets } from '../../generate-library-targets';

export function registerLibUITargets(
  projectPath: string
): Record<string, TargetConfiguration> {
  console.log('Register Targets for LIBRARY_UI');
  return registerLibraryTargets(projectPath);
}
