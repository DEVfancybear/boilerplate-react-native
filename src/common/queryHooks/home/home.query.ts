import {useMutation, useQuery} from 'react-query';
import {HomeApi} from '../../apis';
import queryClient from '../../helpers/queryClient';
const fetchDataList = () => HomeApi.fetchData(1, 30);

const useHomeFetchQuery = () => useQuery('home', fetchDataList);
const useAddQuery = () =>
  useMutation((newTodo: string) => HomeApi.createData(newTodo), {
    // When mutate is called:
    onMutate: async (newTodo: string) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('home');

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<any>('home');

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData<any>('home', {
          ...previousTodos,
          data: [
            ...previousTodos.data,
            {id: Math.random().toString(), text: newTodo},
          ],
        });
      }

      return {previousTodos};
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<any>('home', context.previousTodos);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('home');
    },
  });
export {useHomeFetchQuery, useAddQuery};
