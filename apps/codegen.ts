import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: 'frontend/src/api/gql/**/*.{ts,tsx}',
  generates: {
    'frontend/src/api/gql/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        withMutationFn: false,
        withRefetchFn: false,
        withQueryFn: false,
        withSubscriptionFn: false,
        withTypename: false,
        reactApolloVersion: 3,
        ignoreNoDocuments: true,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
