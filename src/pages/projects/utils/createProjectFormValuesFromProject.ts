import { Project } from '@/API';
import _ from 'lodash';
import { initialCreateNewProjectValues } from '../components/CreateProjectForm';
import { ProjectRoute } from '../types/projectTypes';

export const createProjectFormValuesFromProject = (
  project: Project
): ProjectRoute => {
  const updatableProjectFields = _.pick(
    project,
    Object.keys(initialCreateNewProjectValues)
  );

  const nullRemovedFields = _.omitBy(
    updatableProjectFields,
    _.isNull
  ) as ProjectRoute;

  return {
    id: project.id,
    name: project.name,
    section: nullRemovedFields?.section,
    color: nullRemovedFields?.color,
    grade: nullRemovedFields?.grade,
    sessionCount: nullRemovedFields?.sessionCount,
    imageUrl: nullRemovedFields?.imageUrl,
    description: nullRemovedFields?.description,
  };
};
