import {TargetConfiguration} from "nx/src/config/workspace-json-project-json";
import {normalizePath} from 'nx/src/utils/path';

export const projectFilePatterns = ['project.json'];

export function registerProjectTargets(projectPath: string): Record<string, TargetConfiguration> {
  const normalizedPath = normalizePath(projectPath);
  const projectName = normalizedPath.substring(0, normalizedPath.lastIndexOf('/'));

  return {
    build: {
      "executor": "@nx/vite:build",
      "outputs": ["{options.outputPath}"],
      "defaultConfiguration": "production",
      "options": {
        "outputPath": `dist/packages/${projectName}`
      },
      "configurations": {
        "development": {
          "mode": "development"
        },
        "production": {
          "mode": "production"
        }
      }
    },
  };
}
