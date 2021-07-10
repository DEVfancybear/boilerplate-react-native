import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {optimizeHeavyScreen} from 'react-navigation-heavy-screen';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {HomeApi} from '../../common/apis';
import {ColorDefault} from '../../common/themes/colors';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {scale, verticalScale} from '../../common/helpers';
import {FontSizeDefault} from '../../common/themes/fontSize';
const HomeScreen = () => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();
  const fetchDataList = () => HomeApi.fetchData(1, 30);
  const {isLoading, isError, data, error} = useQuery(
    'homeLists',
    fetchDataList,
  );
  const addTodoMutation = useMutation(newTodo => HomeApi.createData(newTodo), {
    // When mutate is called:
    onMutate: async (newTodo: string) => {
      setText('');
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('homeLists');

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<any>('homeLists');

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData<any>('homeLists', {
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
        queryClient.setQueryData<any>('homeLists', context.previousTodos);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('homeLists');
    },
  });

  const ListItem = ({todo}: any) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: ColorDefault.primary,
              // textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.full_name}
          </Text>
        </View>
        {/* {!todo?.completed && ( */}
        <TouchableOpacity
        //  onPress={() => markTodoComplete(todo.id)}
        >
          <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
            <MaterialIcons name="done" size={20} color="white" />
          </View>
        </TouchableOpacity>
        {/* )} */}
        <TouchableOpacity
        //  onPress={() => deleteTodo(todo.id)}
        >
          <View style={styles.actionIcon}>
            <MaterialCommunityIcons name="delete" size={25} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  if (isLoading) return <Text>'Loading...'</Text>;

  if (error)
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Text style={styles.txtCommon}>An error has occurred</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: ColorDefault.primary,
          }}>
          TODO APP
        </Text>
        <MaterialCommunityIcons
          onPress={() => console.log('delete')}
          name="delete"
          size={25}
          color="red"
        />
      </View>
      <View>
        <FlatList
          data={data.data}
          renderItem={({item}) => <ListItem todo={item} />}
          keyExtractor={(item, index) => String(item.id)}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            placeholder="Add Todo"
            onChangeText={text => setText(text)}
          />
        </View>
        <TouchableOpacity onPress={() => addTodoMutation.mutate(text)}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="add" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: verticalScale(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: ColorDefault.navigationBar,
  },
  inputContainer: {
    height: verticalScale(50),
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: ColorDefault.navigationBar,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: ColorDefault.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: ColorDefault.navigationBar,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: verticalScale(25),
    width: scale(25),
    backgroundColor: ColorDefault.navigationBar,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtCommon: {
    justifyContent: 'center',
    alignItems: 'center',
    color: ColorDefault.error,
    fontWeight: 'bold',
    fontSize: FontSizeDefault.FONT_20,
  },
});

export default optimizeHeavyScreen(HomeScreen);
