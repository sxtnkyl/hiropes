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
