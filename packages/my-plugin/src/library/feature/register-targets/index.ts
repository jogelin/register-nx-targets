import { TargetConfiguration } from 'nx/src/config/workspace-json-project-json';
import { registerLibraryTargets } from '../../generate-library-targets';

export function registerLibFeatureTargets(
  projectPath: string
): Record<string, TargetConfiguration> {
  console.log('Register Targets for LIBRARY_FEATURE');
  return registerLibraryTargets(projectPath);
}
