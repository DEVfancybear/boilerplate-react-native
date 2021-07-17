import {useMutation, useQuery} from 'react-query';
import {HomeApi} from '../../apis';
import queryClient from '../../helpers/queryClient';
import {IItemHome} from '../../models';

const useHomeFetchQuery = () =>
  useQuery('home', () => HomeApi.fetchData(1, 30));
const useAddQuery = () =>
  useMutation((newTodo: string) => HomeApi.createData(newTodo), {
    // When mutate is called:
    onMutate: async (newTodo: string) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('home');

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<IItemHome[]>('home');

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData<IItemHome[]>(
          'home',
          (old: any): IItemHome[] => [...old, newTodo],
        );
      }

      return {previousTodos};
    },
    ...defaultMutationOptions,
  });

const defaultMutationOptions = {
  onError: (err: unknown, variables: any, context: any) => {
    if (context?.previousTodos) {
      queryClient.setQueryData<IItemHome[]>('home', context.previousTodos);
    }
  },
  // Always refetch after error or success:
  onSettled: () => {
    queryClient.invalidateQueries('home');
  },
};

const useDeleteQuery = () =>
  useMutation((id: number) => HomeApi.deleteItem(id), {
    // When mutate is called:
    onMutate: async (id: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('home');

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<IItemHome[]>('home');

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData<IItemHome[]>('home', (old: any): IItemHome[] =>
          old.filter((item: IItemHome) => item.id !== id),
        );
      }

      return {previousTodos};
    },
    ...defaultMutationOptions,
  });

const useGetDetailQuery = (todoId: number) =>
  useQuery(['home', todoId], () => HomeApi.getDetail(todoId), {
    initialData: () =>
      queryClient
        .getQueryData<IItemHome[]>('home')
        ?.find((d: IItemHome) => d.id === todoId),
  });

const useUpdateListItem = () =>
  useMutation((updates: IItemHome) => HomeApi.updateItem(updates), {
    // When mutate is called:
    onMutate: async (updates: IItemHome) => {
      await queryClient.cancelQueries('home');
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<IItemHome[]>('home');

      // Optimistically update to the new value

      if (previousTodos) {
        queryClient.setQueryData<IItemHome[]>('home', (old: any): IItemHome[] =>
          old.map((item: IItemHome) => {
            return item.id === updates.id ? {...item, ...updates} : item;
          }),
        );
      }

      return () => queryClient.setQueryData('home', previousTodos);
    },
    ...defaultMutationOptions,
  });

export {
  useHomeFetchQuery,
  useAddQuery,
  useDeleteQuery,
  useGetDetailQuery,
  useUpdateListItem,
};
