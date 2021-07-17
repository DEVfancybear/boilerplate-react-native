import React, {useEffect, useState} from 'react';
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
import {ColorDefault} from '../../common/themes/colors';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {scale, verticalScale} from '../../common/helpers';
import {FontSizeDefault} from '../../common/themes/fontSize';
import {
  useHomeFetchQuery,
  useAddQuery,
  useDeleteQuery,
  useGetDetailQuery,
  useUpdateListItem,
} from '../../common/queryHooks';
import {IItemHome} from '../../common/models';
const HomeScreen = () => {
  const fetchQuery = useHomeFetchQuery();
  const [idItem, setIdItem] = useState<number | null>(null);
  const useAddTodoMutation = useAddQuery();
  const useDeleteMutation = useDeleteQuery();
  const useGetDetailMutation = useGetDetailQuery(Number(idItem));
  const useUpdateItemMutation = useUpdateListItem();
  const [text, setText] = useState('');
  useEffect(() => {
    if (useGetDetailMutation.data) {
      setText(useGetDetailMutation.data.full_name);
    }
  }, [useGetDetailMutation.data]);

  const renderItem = ({item, index}: {item: IItemHome; index: number}) => {
    return (
      <View key={index} style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: ColorDefault.primary,
              // textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {item.full_name}
          </Text>
        </View>
        {/* {!todo?.completed && ( */}
        <TouchableOpacity
          onPress={() => {
            setIdItem(item.id);
          }}>
          <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
            <MaterialIcons name="done" size={20} color="white" />
          </View>
        </TouchableOpacity>
        {/* )} */}
        <TouchableOpacity onPress={() => useDeleteMutation.mutate(item.id)}>
          <View style={styles.actionIcon}>
            <MaterialCommunityIcons name="delete" size={25} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (fetchQuery.isLoading) return <Text>'Loading...'</Text>;

  if (fetchQuery.error)
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
          data={fetchQuery.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={idItem ? 'Edit Todo' : 'Add todo'}
            onChangeText={text => setText(text)}
            value={text}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            idItem
              ? useUpdateItemMutation.mutate({
                  id: idItem,
                  full_name: text,
                })
              : useAddTodoMutation.mutate(text);
            setText('');
            idItem ? setIdItem(null) : undefined;
          }}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={idItem ? 'edit' : 'add'}
              size={30}
              color="white"
            />
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
