import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../apps/src/schema.gql',
  documents: 'frontend/src/**/*.{ts,tsx}',
  generates: {
    'frontend/src/api/gql/__generated__/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        dedupeOperationSuffix: true,
        dedupeFragments: true,
        skipTypename: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
