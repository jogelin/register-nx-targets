import { TargetConfiguration } from 'nx/src/config/workspace-json-project-json';
import { getProjectRoot } from '../../utils/project-utils';
import { memoize } from '../../utils/memoize-utils';

export function registerAppTargets(
  projectPath: string
): Record<string, TargetConfiguration> {
  return generateTargetsMemoized(projectPath);
}

export const generateAppTargets = (
  projectPath: string
): Record<string, TargetConfiguration> => {
  const projectRoot = getProjectRoot(projectPath);

  return {
    build: generateBuildTarget(projectRoot),
    serve: generateServeTarget(),
    preview: generatePreviewTarget(),
    test: generateTestTarget(projectRoot),
    lint: generateLintTarget(projectRoot),
  };
};

const generateTargetsMemoized = memoize(generateAppTargets);

const generateBuildTarget = (projectRoot: string): TargetConfiguration => ({
  executor: '@nx/vite:build',
  outputs: ['{options.outputPath}'],
  defaultConfiguration: 'production',
  options: {
    outputPath: `dist/${projectRoot}`,
  },
  configurations: {
    development: {
      mode: 'development',
    },
    production: {
      mode: 'production',
    },
  },
});
const generateServeTarget = (): TargetConfiguration => ({
  executor: '@nx/vite:dev-server',
  defaultConfiguration: 'development',
  options: {
    buildTarget: 'my-app:build',
  },
  configurations: {
    development: {
      buildTarget: 'my-app:build:development',
      hmr: true,
    },
    production: {
      buildTarget: 'my-app:build:production',
      hmr: false,
    },
  },
});
const generatePreviewTarget = (): TargetConfiguration => ({
  executor: '@nx/vite:preview-server',
  defaultConfiguration: 'development',
  options: {
    buildTarget: 'my-app:build',
  },
  configurations: {
    development: {
      buildTarget: 'my-app:build:development',
    },
    production: {
      buildTarget: 'my-app:build:production',
    },
  },
});
const generateTestTarget = (projectRoot: string): TargetConfiguration => ({
  executor: '@nx/vite:test',
  outputs: [`coverage/${projectRoot}`],
  options: {
    passWithNoTests: true,
    reportsDirectory: `../../coverage/${projectRoot}`,
  },
});

const generateLintTarget = (projectRoot: string): TargetConfiguration => ({
  executor: '@nx/linter:eslint',
  outputs: ['{options.outputFile}'],
  options: {
    lintFilePatterns: [`${projectRoot}/**/*.ts`],
  },
});
