import { normalizePath } from 'nx/src/utils/path';

export type ProjectType =
  | 'APP'
  | 'E2E'
  | 'LIB_DOMAIN'
  | 'LIB_FEATURE'
  | 'LIB_UTILS'
  | 'LIB_UI';
const projectTypeRegExps: Record<ProjectType, RegExp> = {
  APP: /^packages\/(.+)-app\/project.json$/,
  E2E: /^packages\/(.+)-e2e\/project.json$/,
  LIB_DOMAIN: /^packages\/domain-(.*)\/project.json$/,
  LIB_FEATURE: /^packages\/feature-(.*)\/project.json$/,
  LIB_UTILS: /^packages\/utils-(.*)\/project.json$/,
  LIB_UI: /^packages\/ui-(.*)\/project.json$/,
};

export const getProjectType = (projectPath: string): ProjectType | undefined =>
  Object.entries(projectTypeRegExps).find(([, regExp]) =>
    regExp.test(normalizePath(projectPath))
  )?.[0] as ProjectType;

export const getProjectRoot = (projectPath: string): string => {
  const normalizedPath = normalizePath(projectPath);
  return normalizedPath.replace('/project.json', '');
};

export const getProjectName = (projectPath: string): string =>
  getProjectRoot(projectPath).split('/').pop();
