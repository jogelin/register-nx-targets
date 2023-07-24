import { TargetConfiguration } from 'nx/src/config/workspace-json-project-json';
import { getProjectType, ProjectType } from './utils/project-utils';
import { registerAppTargets } from './application/register-targets';
import { registerE2ETargets } from './e2e/register-targets';
import { registerLibDomainTargets } from './library/domain/register-targets';
import { registerLibFeatureTargets } from './library/feature/register-targets';
import { registerLibUITargets } from './library/ui/register-targets';
import { registerLibUtilsTargets } from './library/utils/register-targets';

export const projectFilePatterns = ['project.json'];

const projectTypeToRegisterRouting: Record<
  ProjectType,
  (projectPath: string) => Record<string, TargetConfiguration>
> = {
  APP: registerAppTargets,
  E2E: registerE2ETargets,
  LIB_DOMAIN: registerLibDomainTargets,
  LIB_FEATURE: registerLibFeatureTargets,
  LIB_UI: registerLibUITargets,
  LIB_UTILS: registerLibUtilsTargets,
};

export function registerProjectTargets(
  projectPath: string
): Record<string, TargetConfiguration> {
  const projectType = getProjectType(projectPath);
  const registerProjectTargetFn = projectTypeToRegisterRouting[projectType];

  return registerProjectTargetFn ? registerProjectTargetFn(projectPath) : {};
}
