import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AnswerFrequencyDto = {
  count: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
  text: Scalars['String']['output'];
};

export type AnswerInput = {
  answer: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
};

export type AnswerOptionDto = {
  id: Scalars['String']['output'];
  questionId: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type AnswerOptionInput = {
  text: Scalars['String']['input'];
};

export type AuthResponse = {
  accessToken: Scalars['String']['output'];
};

export type CreateQuestionInput = {
  answerOptions?: InputMaybe<Array<AnswerOptionInput>>;
  surveyId: Scalars['String']['input'];
  text: Scalars['String']['input'];
  type: QuestionType;
};

export type CreateSurveyDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  tokenCount: Scalars['Float']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  createQuestion: Scalars['Boolean']['output'];
  createSurvey: SurveyDto;
  deleteQuestion: Scalars['Boolean']['output'];
  deleteSurvey: Scalars['Boolean']['output'];
  login: AuthResponse;
  register: AuthResponse;
  submitResponse: Scalars['Boolean']['output'];
  updateQuestion: Scalars['Boolean']['output'];
  updateSurvey: SurveyDto;
};


export type MutationCreateQuestionArgs = {
  data: CreateQuestionInput;
};


export type MutationCreateSurveyArgs = {
  data: CreateSurveyDto;
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
};


export type MutationDeleteSurveyArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSubmitResponseArgs = {
  data: SubmitSurveyResponseInput;
};


export type MutationUpdateQuestionArgs = {
  data: UpdateQuestionInput;
  questionId: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
};


export type MutationUpdateSurveyArgs = {
  data: UpdateSurveyDto;
  id: Scalars['String']['input'];
};

export type Query = {
  getQuestion: QuestionDto;
  getQuestions: Array<QuestionDto>;
  getSurvey: SurveyDto;
  getSurveyAnalyticsDetails: SurveyAnalyticsDetailsDto;
  getSurveyByToken: SurveyDto;
  getSurveyTokens: Array<TokenDto>;
  getSurveysAnalytics: Array<SurveyAnalyticsDto>;
  getSurveysByUser: Array<SurveyDto>;
  hello: Scalars['String']['output'];
};


export type QueryGetQuestionArgs = {
  questionId: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
};


export type QueryGetQuestionsArgs = {
  surveyId: Scalars['String']['input'];
};


export type QueryGetSurveyArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSurveyAnalyticsDetailsArgs = {
  surveyId: Scalars['String']['input'];
};


export type QueryGetSurveyByTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetSurveyTokensArgs = {
  surveyId: Scalars['String']['input'];
};

export type QuestionAnalyticsDto = {
  answerFrequency: Array<AnswerFrequencyDto>;
  id: Scalars['String']['output'];
  text: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type QuestionDto = {
  answerOptions?: Maybe<Array<AnswerOptionDto>>;
  id: Scalars['String']['output'];
  surveyId: Scalars['String']['output'];
  text: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

/** The type of question */
export enum QuestionType {
  MultipleChoice = 'MULTIPLE_CHOICE',
  SingleChoice = 'SINGLE_CHOICE',
  Text = 'TEXT'
}

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SubmitSurveyResponseInput = {
  answers: Array<AnswerInput>;
  token: Scalars['String']['input'];
};

export type SurveyAnalyticsDetailsDto = {
  completionRate: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  questions: Array<QuestionAnalyticsDto>;
  responses: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type SurveyAnalyticsDto = {
  completionRate: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  responses: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type SurveyDto = {
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  questions?: Maybe<Array<QuestionDto>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TokenDto = {
  id: Scalars['String']['output'];
  surveyId: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type UpdateQuestionInput = {
  answerOptions?: InputMaybe<Array<AnswerOptionInput>>;
  text?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<QuestionType>;
};

export type UpdateSurveyDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateQuestionMutationVariables = Exact<{
  data: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { createQuestion: boolean };

export type CreateSurveyMutationVariables = Exact<{
  data: CreateSurveyDto;
}>;


export type CreateSurveyMutation = { createSurvey: { title: string, creatorId: string, description?: string | null, id: string } };

export type DeleteQuestionMutationVariables = Exact<{
  questionId: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
}>;


export type DeleteQuestionMutation = { deleteQuestion: boolean };

export type DeleteSurveyMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSurveyMutation = { deleteSurvey: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { accessToken: string } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { register: { accessToken: string } };

export type SubmitSurveyResponseMutationVariables = Exact<{
  data: SubmitSurveyResponseInput;
}>;


export type SubmitSurveyResponseMutation = { submitResponse: boolean };

export type UpdateQuestionMutationVariables = Exact<{
  questionId: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
  data: UpdateQuestionInput;
}>;


export type UpdateQuestionMutation = { updateQuestion: boolean };

export type UpdateSurveyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateSurveyDto;
}>;


export type UpdateSurveyMutation = { updateSurvey: { id: string, title: string, description?: string | null } };

export type GetQuestionQueryVariables = Exact<{
  questionId: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
}>;


export type GetQuestionQuery = { getQuestion: { id: string, text: string, type: string, answerOptions?: Array<{ id: string, text: string }> | null } };

export type GetQuestionsQueryVariables = Exact<{
  surveyId: Scalars['String']['input'];
}>;


export type GetQuestionsQuery = { getQuestions: Array<{ id: string, text: string, type: string, answerOptions?: Array<{ id: string, text: string }> | null }> };

export type GetSurveyQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetSurveyQuery = { getSurvey: { id: string, title: string, description?: string | null } };

export type GetSurveyAnalyticsDetailsQueryVariables = Exact<{
  surveyId: Scalars['String']['input'];
}>;


export type GetSurveyAnalyticsDetailsQuery = { getSurveyAnalyticsDetails: { id: string, title: string, responses: number, completionRate: number, questions: Array<{ id: string, text: string, type: string, answerFrequency: Array<{ text: string, count: number, percentage: number }> }> } };

export type GetSurveyByTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetSurveyByTokenQuery = { getSurveyByToken: { id: string, title: string, questions?: Array<{ id: string, text: string, type: string, answerOptions?: Array<{ id: string, text: string }> | null }> | null } };

export type GetSurveyTokensQueryVariables = Exact<{
  surveyId: Scalars['String']['input'];
}>;


export type GetSurveyTokensQuery = { getSurveyTokens: Array<{ id: string, token: string }> };

export type GetSurveysAnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSurveysAnalyticsQuery = { getSurveysAnalytics: Array<{ id: string, title: string, responses: number, completionRate: number }> };

export type GetSurveysByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSurveysByUserQuery = { getSurveysByUser: Array<{ title: string, id: string, createdAt: any }> };


export const CreateQuestionDocument = gql`
    mutation CreateQuestion($data: CreateQuestionInput!) {
  createQuestion(data: $data)
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const CreateSurveyDocument = gql`
    mutation createSurvey($data: CreateSurveyDto!) {
  createSurvey(data: $data) {
    title
    creatorId
    description
    id
  }
}
    `;
export type CreateSurveyMutationFn = Apollo.MutationFunction<CreateSurveyMutation, CreateSurveyMutationVariables>;

/**
 * __useCreateSurveyMutation__
 *
 * To run a mutation, you first call `useCreateSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSurveyMutation, { data, loading, error }] = useCreateSurveyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSurveyMutation(baseOptions?: Apollo.MutationHookOptions<CreateSurveyMutation, CreateSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSurveyMutation, CreateSurveyMutationVariables>(CreateSurveyDocument, options);
      }
export type CreateSurveyMutationHookResult = ReturnType<typeof useCreateSurveyMutation>;
export type CreateSurveyMutationResult = Apollo.MutationResult<CreateSurveyMutation>;
export type CreateSurveyMutationOptions = Apollo.BaseMutationOptions<CreateSurveyMutation, CreateSurveyMutationVariables>;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($questionId: String!, $surveyId: String!) {
  deleteQuestion(questionId: $questionId, surveyId: $surveyId)
}
    `;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<DeleteQuestionMutation, DeleteQuestionMutationVariables>;

/**
 * __useDeleteQuestionMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionMutation, { data, loading, error }] = useDeleteQuestionMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useDeleteQuestionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument, options);
      }
export type DeleteQuestionMutationHookResult = ReturnType<typeof useDeleteQuestionMutation>;
export type DeleteQuestionMutationResult = Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const DeleteSurveyDocument = gql`
    mutation DeleteSurvey($id: String!) {
  deleteSurvey(id: $id)
}
    `;
export type DeleteSurveyMutationFn = Apollo.MutationFunction<DeleteSurveyMutation, DeleteSurveyMutationVariables>;

/**
 * __useDeleteSurveyMutation__
 *
 * To run a mutation, you first call `useDeleteSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSurveyMutation, { data, loading, error }] = useDeleteSurveyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSurveyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSurveyMutation, DeleteSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSurveyMutation, DeleteSurveyMutationVariables>(DeleteSurveyDocument, options);
      }
export type DeleteSurveyMutationHookResult = ReturnType<typeof useDeleteSurveyMutation>;
export type DeleteSurveyMutationResult = Apollo.MutationResult<DeleteSurveyMutation>;
export type DeleteSurveyMutationOptions = Apollo.BaseMutationOptions<DeleteSurveyMutation, DeleteSurveyMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SubmitSurveyResponseDocument = gql`
    mutation SubmitSurveyResponse($data: SubmitSurveyResponseInput!) {
  submitResponse(data: $data)
}
    `;
export type SubmitSurveyResponseMutationFn = Apollo.MutationFunction<SubmitSurveyResponseMutation, SubmitSurveyResponseMutationVariables>;

/**
 * __useSubmitSurveyResponseMutation__
 *
 * To run a mutation, you first call `useSubmitSurveyResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitSurveyResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitSurveyResponseMutation, { data, loading, error }] = useSubmitSurveyResponseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSubmitSurveyResponseMutation(baseOptions?: Apollo.MutationHookOptions<SubmitSurveyResponseMutation, SubmitSurveyResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitSurveyResponseMutation, SubmitSurveyResponseMutationVariables>(SubmitSurveyResponseDocument, options);
      }
export type SubmitSurveyResponseMutationHookResult = ReturnType<typeof useSubmitSurveyResponseMutation>;
export type SubmitSurveyResponseMutationResult = Apollo.MutationResult<SubmitSurveyResponseMutation>;
export type SubmitSurveyResponseMutationOptions = Apollo.BaseMutationOptions<SubmitSurveyResponseMutation, SubmitSurveyResponseMutationVariables>;
export const UpdateQuestionDocument = gql`
    mutation UpdateQuestion($questionId: String!, $surveyId: String!, $data: UpdateQuestionInput!) {
  updateQuestion(questionId: $questionId, surveyId: $surveyId, data: $data)
}
    `;
export type UpdateQuestionMutationFn = Apollo.MutationFunction<UpdateQuestionMutation, UpdateQuestionMutationVariables>;

/**
 * __useUpdateQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionMutation, { data, loading, error }] = useUpdateQuestionMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      surveyId: // value for 'surveyId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument, options);
      }
export type UpdateQuestionMutationHookResult = ReturnType<typeof useUpdateQuestionMutation>;
export type UpdateQuestionMutationResult = Apollo.MutationResult<UpdateQuestionMutation>;
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const UpdateSurveyDocument = gql`
    mutation UpdateSurvey($id: String!, $data: UpdateSurveyDto!) {
  updateSurvey(id: $id, data: $data) {
    id
    title
    description
  }
}
    `;
export type UpdateSurveyMutationFn = Apollo.MutationFunction<UpdateSurveyMutation, UpdateSurveyMutationVariables>;

/**
 * __useUpdateSurveyMutation__
 *
 * To run a mutation, you first call `useUpdateSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSurveyMutation, { data, loading, error }] = useUpdateSurveyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSurveyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSurveyMutation, UpdateSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSurveyMutation, UpdateSurveyMutationVariables>(UpdateSurveyDocument, options);
      }
export type UpdateSurveyMutationHookResult = ReturnType<typeof useUpdateSurveyMutation>;
export type UpdateSurveyMutationResult = Apollo.MutationResult<UpdateSurveyMutation>;
export type UpdateSurveyMutationOptions = Apollo.BaseMutationOptions<UpdateSurveyMutation, UpdateSurveyMutationVariables>;
export const GetQuestionDocument = gql`
    query GetQuestion($questionId: String!, $surveyId: String!) {
  getQuestion(questionId: $questionId, surveyId: $surveyId) {
    id
    text
    type
    answerOptions {
      id
      text
    }
  }
}
    `;

/**
 * __useGetQuestionQuery__
 *
 * To run a query within a React component, call `useGetQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionQuery({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useGetQuestionQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables> & ({ variables: GetQuestionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, options);
      }
export function useGetQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, options);
        }
export function useGetQuestionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, options);
        }
export type GetQuestionQueryHookResult = ReturnType<typeof useGetQuestionQuery>;
export type GetQuestionLazyQueryHookResult = ReturnType<typeof useGetQuestionLazyQuery>;
export type GetQuestionSuspenseQueryHookResult = ReturnType<typeof useGetQuestionSuspenseQuery>;
export type GetQuestionQueryResult = Apollo.QueryResult<GetQuestionQuery, GetQuestionQueryVariables>;
export const GetQuestionsDocument = gql`
    query GetQuestions($surveyId: String!) {
  getQuestions(surveyId: $surveyId) {
    id
    text
    type
    answerOptions {
      id
      text
    }
  }
}
    `;

/**
 * __useGetQuestionsQuery__
 *
 * To run a query within a React component, call `useGetQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsQuery({
 *   variables: {
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useGetQuestionsQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables> & ({ variables: GetQuestionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
      }
export function useGetQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
        }
export function useGetQuestionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
        }
export type GetQuestionsQueryHookResult = ReturnType<typeof useGetQuestionsQuery>;
export type GetQuestionsLazyQueryHookResult = ReturnType<typeof useGetQuestionsLazyQuery>;
export type GetQuestionsSuspenseQueryHookResult = ReturnType<typeof useGetQuestionsSuspenseQuery>;
export type GetQuestionsQueryResult = Apollo.QueryResult<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const GetSurveyDocument = gql`
    query GetSurvey($id: String!) {
  getSurvey(id: $id) {
    id
    title
    description
  }
}
    `;

/**
 * __useGetSurveyQuery__
 *
 * To run a query within a React component, call `useGetSurveyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSurveyQuery(baseOptions: Apollo.QueryHookOptions<GetSurveyQuery, GetSurveyQueryVariables> & ({ variables: GetSurveyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveyQuery, GetSurveyQueryVariables>(GetSurveyDocument, options);
      }
export function useGetSurveyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveyQuery, GetSurveyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveyQuery, GetSurveyQueryVariables>(GetSurveyDocument, options);
        }
export function useGetSurveySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSurveyQuery, GetSurveyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSurveyQuery, GetSurveyQueryVariables>(GetSurveyDocument, options);
        }
export type GetSurveyQueryHookResult = ReturnType<typeof useGetSurveyQuery>;
export type GetSurveyLazyQueryHookResult = ReturnType<typeof useGetSurveyLazyQuery>;
export type GetSurveySuspenseQueryHookResult = ReturnType<typeof useGetSurveySuspenseQuery>;
export type GetSurveyQueryResult = Apollo.QueryResult<GetSurveyQuery, GetSurveyQueryVariables>;
export const GetSurveyAnalyticsDetailsDocument = gql`
    query GetSurveyAnalyticsDetails($surveyId: String!) {
  getSurveyAnalyticsDetails(surveyId: $surveyId) {
    id
    title
    responses
    completionRate
    questions {
      id
      text
      type
      answerFrequency {
        text
        count
        percentage
      }
    }
  }
}
    `;

/**
 * __useGetSurveyAnalyticsDetailsQuery__
 *
 * To run a query within a React component, call `useGetSurveyAnalyticsDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveyAnalyticsDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveyAnalyticsDetailsQuery({
 *   variables: {
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useGetSurveyAnalyticsDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetSurveyAnalyticsDetailsQuery, GetSurveyAnalyticsDetailsQueryVariables> & ({ variables: GetSurveyAnalyticsDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveyAnalyticsDetailsQuery, GetSurveyAnalyticsDetailsQueryVariables>(GetSurveyAnalyticsDetailsDocument, options);
      }
export function useGetSurveyAnalyticsDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveyAnalyticsDetailsQuery, GetSurveyAnalyticsDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveyAnalyticsDetailsQuery, GetSurveyAnalyticsDetailsQueryVariables>(GetSurveyAnalyticsDetailsDocument, options);
        }
export function useGetSurveyAnalyticsDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSurveyAnalyticsDetailsQuery, GetSurveyAnalyticsDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSurveyAnalyticsDetailsQuery, GetSurveyAnalyticsDetailsQueryVariables>(GetSurveyAnalyticsDetailsDocument, options);
        }
export type GetSurveyAnalyticsDetailsQueryHookResult = ReturnType<typeof useGetSurveyAnalyticsDetailsQuery>;
export type GetSurveyAnalyticsDetailsLazyQueryHookResult = ReturnType<typeof useGetSurveyAnalyticsDetailsLazyQuery>;
export type GetSurveyAnalyticsDetailsSuspenseQueryHookResult = ReturnType<typeof useGetSurveyAnalyticsDetailsSuspenseQuery>;
export type GetSurveyAnalyticsDetailsQueryResult = Apollo.QueryResult<GetSurveyAnalyticsDetailsQuery, GetSurveyAnalyticsDetailsQueryVariables>;
export const GetSurveyByTokenDocument = gql`
    query GetSurveyByToken($token: String!) {
  getSurveyByToken(token: $token) {
    id
    title
    questions {
      id
      text
      type
      answerOptions {
        id
        text
      }
    }
  }
}
    `;

/**
 * __useGetSurveyByTokenQuery__
 *
 * To run a query within a React component, call `useGetSurveyByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveyByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveyByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetSurveyByTokenQuery(baseOptions: Apollo.QueryHookOptions<GetSurveyByTokenQuery, GetSurveyByTokenQueryVariables> & ({ variables: GetSurveyByTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveyByTokenQuery, GetSurveyByTokenQueryVariables>(GetSurveyByTokenDocument, options);
      }
export function useGetSurveyByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveyByTokenQuery, GetSurveyByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveyByTokenQuery, GetSurveyByTokenQueryVariables>(GetSurveyByTokenDocument, options);
        }
export function useGetSurveyByTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSurveyByTokenQuery, GetSurveyByTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSurveyByTokenQuery, GetSurveyByTokenQueryVariables>(GetSurveyByTokenDocument, options);
        }
export type GetSurveyByTokenQueryHookResult = ReturnType<typeof useGetSurveyByTokenQuery>;
export type GetSurveyByTokenLazyQueryHookResult = ReturnType<typeof useGetSurveyByTokenLazyQuery>;
export type GetSurveyByTokenSuspenseQueryHookResult = ReturnType<typeof useGetSurveyByTokenSuspenseQuery>;
export type GetSurveyByTokenQueryResult = Apollo.QueryResult<GetSurveyByTokenQuery, GetSurveyByTokenQueryVariables>;
export const GetSurveyTokensDocument = gql`
    query GetSurveyTokens($surveyId: String!) {
  getSurveyTokens(surveyId: $surveyId) {
    id
    token
  }
}
    `;

/**
 * __useGetSurveyTokensQuery__
 *
 * To run a query within a React component, call `useGetSurveyTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveyTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveyTokensQuery({
 *   variables: {
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useGetSurveyTokensQuery(baseOptions: Apollo.QueryHookOptions<GetSurveyTokensQuery, GetSurveyTokensQueryVariables> & ({ variables: GetSurveyTokensQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveyTokensQuery, GetSurveyTokensQueryVariables>(GetSurveyTokensDocument, options);
      }
export function useGetSurveyTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveyTokensQuery, GetSurveyTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveyTokensQuery, GetSurveyTokensQueryVariables>(GetSurveyTokensDocument, options);
        }
export function useGetSurveyTokensSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSurveyTokensQuery, GetSurveyTokensQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSurveyTokensQuery, GetSurveyTokensQueryVariables>(GetSurveyTokensDocument, options);
        }
export type GetSurveyTokensQueryHookResult = ReturnType<typeof useGetSurveyTokensQuery>;
export type GetSurveyTokensLazyQueryHookResult = ReturnType<typeof useGetSurveyTokensLazyQuery>;
export type GetSurveyTokensSuspenseQueryHookResult = ReturnType<typeof useGetSurveyTokensSuspenseQuery>;
export type GetSurveyTokensQueryResult = Apollo.QueryResult<GetSurveyTokensQuery, GetSurveyTokensQueryVariables>;
export const GetSurveysAnalyticsDocument = gql`
    query GetSurveysAnalytics {
  getSurveysAnalytics {
    id
    title
    responses
    completionRate
  }
}
    `;

/**
 * __useGetSurveysAnalyticsQuery__
 *
 * To run a query within a React component, call `useGetSurveysAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveysAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveysAnalyticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSurveysAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<GetSurveysAnalyticsQuery, GetSurveysAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveysAnalyticsQuery, GetSurveysAnalyticsQueryVariables>(GetSurveysAnalyticsDocument, options);
      }
export function useGetSurveysAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveysAnalyticsQuery, GetSurveysAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveysAnalyticsQuery, GetSurveysAnalyticsQueryVariables>(GetSurveysAnalyticsDocument, options);
        }
export function useGetSurveysAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSurveysAnalyticsQuery, GetSurveysAnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSurveysAnalyticsQuery, GetSurveysAnalyticsQueryVariables>(GetSurveysAnalyticsDocument, options);
        }
export type GetSurveysAnalyticsQueryHookResult = ReturnType<typeof useGetSurveysAnalyticsQuery>;
export type GetSurveysAnalyticsLazyQueryHookResult = ReturnType<typeof useGetSurveysAnalyticsLazyQuery>;
export type GetSurveysAnalyticsSuspenseQueryHookResult = ReturnType<typeof useGetSurveysAnalyticsSuspenseQuery>;
export type GetSurveysAnalyticsQueryResult = Apollo.QueryResult<GetSurveysAnalyticsQuery, GetSurveysAnalyticsQueryVariables>;
export const GetSurveysByUserDocument = gql`
    query GetSurveysByUser {
  getSurveysByUser {
    title
    id
    createdAt
  }
}
    `;

/**
 * __useGetSurveysByUserQuery__
 *
 * To run a query within a React component, call `useGetSurveysByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveysByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveysByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSurveysByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetSurveysByUserQuery, GetSurveysByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveysByUserQuery, GetSurveysByUserQueryVariables>(GetSurveysByUserDocument, options);
      }
export function useGetSurveysByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveysByUserQuery, GetSurveysByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveysByUserQuery, GetSurveysByUserQueryVariables>(GetSurveysByUserDocument, options);
        }
export function useGetSurveysByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSurveysByUserQuery, GetSurveysByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSurveysByUserQuery, GetSurveysByUserQueryVariables>(GetSurveysByUserDocument, options);
        }
export type GetSurveysByUserQueryHookResult = ReturnType<typeof useGetSurveysByUserQuery>;
export type GetSurveysByUserLazyQueryHookResult = ReturnType<typeof useGetSurveysByUserLazyQuery>;
export type GetSurveysByUserSuspenseQueryHookResult = ReturnType<typeof useGetSurveysByUserSuspenseQuery>;
export type GetSurveysByUserQueryResult = Apollo.QueryResult<GetSurveysByUserQuery, GetSurveysByUserQueryVariables>;