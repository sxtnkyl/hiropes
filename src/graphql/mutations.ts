/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      name
      section
      color
      grade
      sessionCount
      imageUrl
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      name
      section
      color
      grade
      sessionCount
      imageUrl
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      name
      section
      color
      grade
      sessionCount
      imageUrl
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      routineFocus
      routineFocusWorkout
      routineWorkoutData
      strengthWorkout
      strengthWorkoutData
      project {
        id
        name
        section
        color
        grade
        sessionCount
        imageUrl
        description
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      workoutProjectId
      owner
    }
  }
`;
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
      id
      routineFocus
      routineFocusWorkout
      routineWorkoutData
      strengthWorkout
      strengthWorkoutData
      project {
        id
        name
        section
        color
        grade
        sessionCount
        imageUrl
        description
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      workoutProjectId
      owner
    }
  }
`;
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
      id
      routineFocus
      routineFocusWorkout
      routineWorkoutData
      strengthWorkout
      strengthWorkoutData
      project {
        id
        name
        section
        color
        grade
        sessionCount
        imageUrl
        description
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      workoutProjectId
      owner
    }
  }
`;
