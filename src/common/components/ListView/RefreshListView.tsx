import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IRefreshListViewProps} from './ListView.props';
export enum RefreshState {
  Idle = 0,
  HeaderRefreshing = 1,
  FooterRefreshing = 2,
  NoMoreData = 3,
  Failure = 4,
  EmptyData = 5,
}
let callOnScrollEnd: boolean;

const RefreshListView = <ItemT extends {}>(props: IRefreshListViewProps<ItemT>) => {
  function onHeaderRefresh() {
    if (shouldStartHeaderRefreshing()) {
      props.onHeaderRefresh &&
        props.onHeaderRefresh(RefreshState.HeaderRefreshing);
    }
  }
  function onEndReached() {
    if (shouldStartFooterRefreshing()) {
      props.onFooterRefresh &&
        props.onFooterRefresh(RefreshState.FooterRefreshing);
    }
  }
  function shouldStartHeaderRefreshing() {
    if (
      props.refreshState == RefreshState.HeaderRefreshing ||
      props.refreshState == RefreshState.FooterRefreshing
    ) {
      return false;
    }

    return true;
  }

  function shouldStartFooterRefreshing() {
    let {refreshState, data} = props;
    if (data.length == 0) {
      return false;
    }

    return refreshState == RefreshState.Idle;
  }
  const renderFooter = () => {
    let footer = null;

    let {
      footerRefreshingComponent,
      footerFailureComponent,
      footerEmptyDataComponent,
      data,
    } = props;

    switch (props.refreshState) {
      case RefreshState.Idle:
        footer = <View style={styles.footerContainer} />;
        break;
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity
            onPress={() => {
              if (props.data.length == 0) {
                props.onHeaderRefresh &&
                  props.onHeaderRefresh(RefreshState.HeaderRefreshing);
              } else {
                props.onFooterRefresh &&
                  props.onFooterRefresh(RefreshState.FooterRefreshing);
              }
            }}>
            {footerFailureComponent ? (
              footerFailureComponent
            ) : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>No data found!</Text>
              </View>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity
            onPress={() => {
              props.onHeaderRefresh &&
                props.onHeaderRefresh(RefreshState.HeaderRefreshing);
            }}>
            {footerEmptyDataComponent ? (
              footerEmptyDataComponent
            ) : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                  Not connect to server, please click to reload!
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.FooterRefreshing: {
        footer = footerRefreshingComponent ? (
          footerRefreshingComponent
        ) : (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[styles.footerText, {marginLeft: 7}]}>Loading..</Text>
          </View>
        );
        break;
      }
      case RefreshState.NoMoreData: {
        footer =
          data.length === 0 ? (
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>All data loaded!</Text>
            </View>
          ) : (
            <View style={styles.footerContainer} />
          );
        break;
      }
    }

    return footer;
  };
  const {...args} = props;
  return (
    <FlatList
      onRefresh={props.onHeaderRefresh ? onHeaderRefresh : null}
      refreshing={props.refreshState == RefreshState.HeaderRefreshing}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.1}
      renderItem={props.renderItem}
      keyExtractor={(item: any, index: number) => String(index)}
      {...args}
      removeClippedSubviews={true}
      onEndReached={() => (callOnScrollEnd = true)}
      onMomentumScrollEnd={() => {
        callOnScrollEnd && onEndReached();
        callOnScrollEnd = false;
      }}
      viewabilityConfig={{minimumViewTime: 50, itemVisiblePercentThreshold: 66}}
    />
  );
};
const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555',
  },
});

export default memo(RefreshListView, isEqual);
