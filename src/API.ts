/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null;
  name: string;
  section?: string | null;
  color?: string | null;
  grade?: string | null;
  sessionCount?: number | null;
  imageUrl?: string | null;
  description?: string | null;
};

export type ModelProjectConditionInput = {
  name?: ModelStringInput | null;
  section?: ModelStringInput | null;
  color?: ModelStringInput | null;
  grade?: ModelStringInput | null;
  sessionCount?: ModelIntInput | null;
  imageUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelProjectConditionInput | null> | null;
  or?: Array<ModelProjectConditionInput | null> | null;
  not?: ModelProjectConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Project = {
  __typename: 'Project';
  id: string;
  name: string;
  section?: string | null;
  color?: string | null;
  grade?: string | null;
  sessionCount?: number | null;
  imageUrl?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateProjectInput = {
  id: string;
  name?: string | null;
  section?: string | null;
  color?: string | null;
  grade?: string | null;
  sessionCount?: number | null;
  imageUrl?: string | null;
  description?: string | null;
};

export type DeleteProjectInput = {
  id: string;
};

export type CreateWorkoutInput = {
  id?: string | null;
  routineFocus?: string | null;
  routineFocusWorkout?: string | null;
  routineWorkoutData?: string | null;
  strengthWorkout?: string | null;
  strengthWorkoutData?: string | null;
  workoutProjectId?: string | null;
};

export type ModelWorkoutConditionInput = {
  routineFocus?: ModelStringInput | null;
  routineFocusWorkout?: ModelStringInput | null;
  routineWorkoutData?: ModelStringInput | null;
  strengthWorkout?: ModelStringInput | null;
  strengthWorkoutData?: ModelStringInput | null;
  and?: Array<ModelWorkoutConditionInput | null> | null;
  or?: Array<ModelWorkoutConditionInput | null> | null;
  not?: ModelWorkoutConditionInput | null;
  workoutProjectId?: ModelIDInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type Workout = {
  __typename: 'Workout';
  id: string;
  routineFocus?: string | null;
  routineFocusWorkout?: string | null;
  routineWorkoutData?: string | null;
  strengthWorkout?: string | null;
  strengthWorkoutData?: string | null;
  project?: Project | null;
  createdAt: string;
  updatedAt: string;
  workoutProjectId?: string | null;
  owner?: string | null;
};

export type UpdateWorkoutInput = {
  id: string;
  routineFocus?: string | null;
  routineFocusWorkout?: string | null;
  routineWorkoutData?: string | null;
  strengthWorkout?: string | null;
  strengthWorkoutData?: string | null;
  workoutProjectId?: string | null;
};

export type DeleteWorkoutInput = {
  id: string;
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  section?: ModelStringInput | null;
  color?: ModelStringInput | null;
  grade?: ModelStringInput | null;
  sessionCount?: ModelIntInput | null;
  imageUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelProjectFilterInput | null> | null;
  or?: Array<ModelProjectFilterInput | null> | null;
  not?: ModelProjectFilterInput | null;
};

export type ModelProjectConnection = {
  __typename: 'ModelProjectConnection';
  items: Array<Project | null>;
  nextToken?: string | null;
};

export type ModelWorkoutFilterInput = {
  id?: ModelIDInput | null;
  routineFocus?: ModelStringInput | null;
  routineFocusWorkout?: ModelStringInput | null;
  routineWorkoutData?: ModelStringInput | null;
  strengthWorkout?: ModelStringInput | null;
  strengthWorkoutData?: ModelStringInput | null;
  and?: Array<ModelWorkoutFilterInput | null> | null;
  or?: Array<ModelWorkoutFilterInput | null> | null;
  not?: ModelWorkoutFilterInput | null;
  workoutProjectId?: ModelIDInput | null;
};

export type ModelWorkoutConnection = {
  __typename: 'ModelWorkoutConnection';
  items: Array<Workout | null>;
  nextToken?: string | null;
};

export type ModelSubscriptionProjectFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  section?: ModelSubscriptionStringInput | null;
  color?: ModelSubscriptionStringInput | null;
  grade?: ModelSubscriptionStringInput | null;
  sessionCount?: ModelSubscriptionIntInput | null;
  imageUrl?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionProjectFilterInput | null> | null;
  or?: Array<ModelSubscriptionProjectFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  in?: Array<number | null> | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionWorkoutFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  routineFocus?: ModelSubscriptionStringInput | null;
  routineFocusWorkout?: ModelSubscriptionStringInput | null;
  routineWorkoutData?: ModelSubscriptionStringInput | null;
  strengthWorkout?: ModelSubscriptionStringInput | null;
  strengthWorkoutData?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionWorkoutFilterInput | null> | null;
  or?: Array<ModelSubscriptionWorkoutFilterInput | null> | null;
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput;
  condition?: ModelProjectConditionInput | null;
};

export type CreateProjectMutation = {
  createProject?: {
    __typename: 'Project';
    id: string;
    name: string;
    section?: string | null;
    color?: string | null;
    grade?: string | null;
    sessionCount?: number | null;
    imageUrl?: string | null;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput;
  condition?: ModelProjectConditionInput | null;
};

export type UpdateProjectMutation = {
  updateProject?: {
    __typename: 'Project';
    id: string;
    name: string;
    section?: string | null;
    color?: string | null;
    grade?: string | null;
    sessionCount?: number | null;
    imageUrl?: string | null;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput;
  condition?: ModelProjectConditionInput | null;
};

export type DeleteProjectMutation = {
  deleteProject?: {
    __typename: 'Project';
    id: string;
    name: string;
    section?: string | null;
    color?: string | null;
    grade?: string | null;
    sessionCount?: number | null;
    imageUrl?: string | null;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateWorkoutMutationVariables = {
  input: CreateWorkoutInput;
  condition?: ModelWorkoutConditionInput | null;
};

export type CreateWorkoutMutation = {
  createWorkout?: {
    __typename: 'Workout';
    id: string;
    routineFocus?: string | null;
    routineFocusWorkout?: string | null;
    routineWorkoutData?: string | null;
    strengthWorkout?: string | null;
    strengthWorkoutData?: string | null;
    project?: {
      __typename: 'Project';
      id: string;
      name: string;
      section?: string | null;
      color?: string | null;
      grade?: string | null;
      sessionCount?: number | null;
      imageUrl?: string | null;
      description?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    workoutProjectId?: string | null;
    owner?: string | null;
  } | null;
};

export type UpdateWorkoutMutationVariables = {
  input: UpdateWorkoutInput;
  condition?: ModelWorkoutConditionInput | null;
};

export type UpdateWorkoutMutation = {
  updateWorkout?: {
    __typename: 'Workout';
    id: string;
    routineFocus?: string | null;
    routineFocusWorkout?: string | null;
    routineWorkoutData?: string | null;
    strengthWorkout?: string | null;
    strengthWorkoutData?: string | null;
    project?: {
      __typename: 'Project';
      id: string;
      name: string;
      section?: string | null;
      color?: string | null;
      grade?: string | null;
      sessionCount?: number | null;
      imageUrl?: string | null;
      description?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    workoutProjectId?: string | null;
    owner?: string | null;
  } | null;
};

export type DeleteWorkoutMutationVariables = {
  input: DeleteWorkoutInput;
  condition?: ModelWorkoutConditionInput | null;
};

export type DeleteWorkoutMutation = {
  deleteWorkout?: {
    __typename: 'Workout';
    id: string;
    routineFocus?: string | null;
    routineFocusWorkout?: string | null;
    routineWorkoutData?: string | null;
    strengthWorkout?: string | null;
    strengthWorkoutData?: string | null;
    project?: {
      __typename: 'Project';
      id: string;
      name: string;
      section?: string | null;
      color?: string | null;
      grade?: string | null;
      sessionCount?: number | null;
      imageUrl?: string | null;
      description?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    workoutProjectId?: string | null;
    owner?: string | null;
  } | null;
};

export type GetProjectQueryVariables = {
  id: string;
};

export type GetProjectQuery = {
  getProject?: {
    __typename: 'Project';
    id: string;
    name: string;
    section?: string | null;
    color?: string | null;
    grade?: string | null;
    sessionCount?: number | null;
    imageUrl?: string | null;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListProjectsQuery = {
  listProjects?: {
    __typename: 'ModelProjectConnection';
    items: Array<{
      __typename: 'Project';
      id: string;
      name: string;
      section?: string | null;
      color?: string | null;
      grade?: string | null;
      sessionCount?: number | null;
      imageUrl?: string | null;
      description?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetWorkoutQueryVariables = {
  id: string;
};

export type GetWorkoutQuery = {
  getWorkout?: {
    __typename: 'Workout';
    id: string;
    routineFocus?: string | null;
    routineFocusWorkout?: string | null;
    routineWorkoutData?: string | null;
    strengthWorkout?: string | null;
    strengthWorkoutData?: string | null;
    project?: {
      __typename: 'Project';
      id: string;
      name: string;
      section?: string | null;
      color?: string | null;
      grade?: string | null;
      sessionCount?: number | null;
      imageUrl?: string | null;
      description?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    workoutProjectId?: string | null;
    owner?: string | null;
  } | null;
};

export type ListWorkoutsQueryVariables = {
  filter?: ModelWorkoutFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListWorkoutsQuery = {
  listWorkouts?: {
    __typename: 'ModelWorkoutConnection';
    items: Array<{
      __typename: 'Workout';
      id: string;
      routineFocus?: string | null;
      routineFocusWorkout?: string | null;
      routineWorkoutData?: string | null;
      strengthWorkout?: string | null;
      strengthWorkoutData?: string | null;
      project?: {
        __typename: 'Project';
        id: string;
        name: string;
        section?: string | null;
        color?: string | null;
        grade?: string | null;
        sessionCount?: number | null;
        imageUrl?: string | null;
        description?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      workoutProjectId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null;
  owner?: string | null;
};

export type OnCreateProjectSubscription = {
  onCreateProject?: {
    __typename: 'Project';
    id: string;
    name: string;
    section?: string | null;
    color?: string | null;
    grade?: string | null;
    sessionCount?: number | null;
    imageUrl?: string | null;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null;
  owner?: string | null;
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?: {
    __typename: 'Project';
    id: string;
    name: string;
    section?: string | null;
    color?: string | null;
    grade?: string | null;
    sessionCount?: number | null;
    imageUrl?: string | null;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null;
  owner?: string | null;
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?: {
    __typename: 'Project';
    id: string;
    name: string;
    section?: string | null;
    color?: string | null;
    grade?: string | null;
    sessionCount?: number | null;
    imageUrl?: string | null;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateWorkoutSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutFilterInput | null;
  owner?: string | null;
};

export type OnCreateWorkoutSubscription = {
  onCreateWorkout?: {
    __typename: 'Workout';
    id: string;
    routineFocus?: string | null;
    routineFocusWorkout?: string | null;
    routineWorkoutData?: string | null;
    strengthWorkout?: string | null;
    strengthWorkoutData?: string | null;
    project?: {
      __typename: 'Project';
      id: string;
      name: string;
      section?: string | null;
      color?: string | null;
      grade?: string | null;
      sessionCount?: number | null;
      imageUrl?: string | null;
      description?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    workoutProjectId?: string | null;
    owner?: string | null;
  } | null;
};

export type OnUpdateWorkoutSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutFilterInput | null;
  owner?: string | null;
};

export type OnUpdateWorkoutSubscription = {
  onUpdateWorkout?: {
    __typename: 'Workout';
    id: string;
    routineFocus?: string | null;
    routineFocusWorkout?: string | null;
    routineWorkoutData?: string | null;
    strengthWorkout?: string | null;
    strengthWorkoutData?: string | null;
    project?: {
      __typename: 'Project';
      id: string;
      name: string;
      section?: string | null;
      color?: string | null;
      grade?: string | null;
      sessionCount?: number | null;
      imageUrl?: string | null;
      description?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    workoutProjectId?: string | null;
    owner?: string | null;
  } | null;
};

export type OnDeleteWorkoutSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutFilterInput | null;
  owner?: string | null;
};

export type OnDeleteWorkoutSubscription = {
  onDeleteWorkout?: {
    __typename: 'Workout';
    id: string;
    routineFocus?: string | null;
    routineFocusWorkout?: string | null;
    routineWorkoutData?: string | null;
    strengthWorkout?: string | null;
    strengthWorkoutData?: string | null;
    project?: {
      __typename: 'Project';
      id: string;
      name: string;
      section?: string | null;
      color?: string | null;
      grade?: string | null;
      sessionCount?: number | null;
      imageUrl?: string | null;
      description?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    workoutProjectId?: string | null;
    owner?: string | null;
  } | null;
};
