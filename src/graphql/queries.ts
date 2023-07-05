/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
