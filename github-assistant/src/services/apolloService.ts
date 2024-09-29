import { gql } from '@apollo/client';
import client from '../config/apolloClient';

// Query to search GitHub users
export const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 10) {
      edges {
        node {
          ... on User {
            login
            avatarUrl
            url
          }
        }
      }
    }
  }
`;

// Query to get repositories of a user
export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!,$first: Int!, $after: String) {
    user(login: $username) {
      repositories(first: $first, after: $after) {
        totalCount
        nodes {
          name
          description
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
          forks {
            totalCount
          }
        }
        pageInfo{
          endCursor
          hasNextPage
        }
        
      }
    }
  }
`;

// Query to get open issues of a repository
export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues($owner: String!, $name: String!, $first: Int!, $after: String) {
    repository(owner: $owner, name: $name) {
      issues(first: $first, after: $after,states: OPEN) {
        totalCount
        nodes {
          id
          title
          body
          url
          number
        }
        pageInfo{
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

// Mutation to create a new issue (optional bonus)
export const CREATE_ISSUE = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String!) {
    createIssue(input: { repositoryId: $repositoryId, title: $title, body: $body }) {
      issue {
        id
        title
        body
        url
      }
    }
  }
`;

export const fetchUsers = async (searchTerm: string) => {
  const { data } = await client.query({
    query: SEARCH_USERS,
    variables: { query: searchTerm },
  });
  return data.search.edges.map((edge: any) => edge.node);
};

// Function to fetch user repositories based on the username
export const fetchUserRepositories = async (username: string) => {
  const { data } = await client.query({
    query: GET_USER_REPOSITORIES,
    variables: { username },
  });
  return data.user.repositories.nodes;
};

// Function to fetch open issues for a repository
export const fetchRepositoryIssues = async (owner: string, repoName: string) => {
  const { data } = await client.query({
    query: GET_REPOSITORY_ISSUES,
    variables: { owner, name: repoName },
  });
  return data.repository.issues.nodes;
};