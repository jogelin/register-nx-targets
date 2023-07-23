import {TargetConfiguration} from "nx/src/config/workspace-json-project-json";

export function registerProjectTargets(projectPath: string): Record<string, TargetConfiguration> {
  return {
    build: {

    },
  };
}
