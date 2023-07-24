import { TargetConfiguration } from 'nx/src/config/workspace-json-project-json';
import { getProjectRoot } from '../utils/project-utils';
import { memoize } from '../utils/memoize-utils';

export function registerLibraryTargets(
  projectPath: string
): Record<string, TargetConfiguration> {
  return generateTargetsMemoized(projectPath);
}

export const generateLibraryTargets = (
  projectPath: string
): Record<string, TargetConfiguration> => {
  const projectRoot = getProjectRoot(projectPath);
  return {
    build: generateBuildTarget(projectRoot),
    lint: generateLintTarget(projectRoot),
  };
};

const generateTargetsMemoized = memoize(generateLibraryTargets);

const generateBuildTarget = (projectRoot: string): TargetConfiguration => ({
  executor: '@nx/esbuild:esbuild',
  outputs: ['{options.outputPath}'],
  options: {
    outputPath: `dist/${projectRoot}`,
    main: `${projectRoot}/src/index.ts`,
    tsConfig: `${projectRoot}/tsconfig.lib.json`,
    assets: [`${projectRoot}/*.md`],
    generatePackageJson: true,
  },
});

const generateLintTarget = (projectRoot: string): TargetConfiguration => ({
  executor: '@nx/linter:eslint',
  outputs: ['{options.outputFile}'],
  options: {
    lintFilePatterns: [`${projectRoot}/**/*.ts`],
  },
});
