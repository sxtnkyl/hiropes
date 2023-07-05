/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onCreateProject(filter: $filter, owner: $owner) {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onUpdateProject(filter: $filter, owner: $owner) {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onDeleteProject(filter: $filter, owner: $owner) {
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
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onCreateWorkout(filter: $filter, owner: $owner) {
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
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onUpdateWorkout(filter: $filter, owner: $owner) {
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
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onDeleteWorkout(filter: $filter, owner: $owner) {
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
