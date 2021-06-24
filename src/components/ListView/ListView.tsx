import React, {memo, useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import equals from 'react-fast-compare';

import {IListViewProps} from './ListView.props';
let callOnScrollEnd: boolean;

const ListViewComponent = (props: IListViewProps) => {
  // state
  const {
    onLoadMore,
    onRefreshing,
    canRefresh = true,
    canLoadMore = false,
    refreshing = false,
  } = props;

  // function
  const loadMore = useCallback(() => {
    if (canLoadMore && onLoadMore && typeof onLoadMore === 'function') {
      onLoadMore();
    }
  }, [canLoadMore, onLoadMore]);

  const refresh = useCallback(() => {
    if (onRefreshing && typeof onRefreshing === 'function') {
      onRefreshing();
    }
  }, [onRefreshing]);

  // render
  return (
    <FlatList
      refreshControl={
        canRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        ) : undefined
      }
      onEndReachedThreshold={0.001}
      onEndReached={() => (callOnScrollEnd = true)}
      onMomentumScrollEnd={() => {
        callOnScrollEnd && loadMore();
        callOnScrollEnd = false;
      }}
      {...props}
    />
  );
};

export const ListView = memo(ListViewComponent, equals);
