import React, {useState, useEffect} from 'react';
import RefreshListView, {RefreshState} from './RefreshListView';
import {IListViewProps} from './ListView.props';
import {memo} from 'react';
import isEqual from 'react-fast-compare';

const ListView = (props: IListViewProps) => {
  const {
    dataSource,
    refresh,
    loadMore,
    hasMore,
    renderRow,
    emptyDataComponent,
    ...args
  } = props;
  const [refreshState, setRefreshState] = useState<number>(RefreshState.Idle);
  const [listData, setListData] = useState<any[]>([]);
  const [loadType, setLoadType] = useState<string>();

  useEffect(() => {
    if (Array.isArray(dataSource)) {
      if (loadType === 'loadMore') {
        setListData(dataSource);
        if (dataSource.length === 0) {
          setRefreshState(RefreshState.NoMoreData);
        } else {
          setRefreshState(RefreshState.Idle);
        }
      } else {
        setListData(dataSource);
        if (dataSource.length === 0) {
          setRefreshState(RefreshState.EmptyData);
        } else {
          setRefreshState(RefreshState.Idle);
        }
      }
    }
  }, [dataSource]);

  const getData = (type: string) => {
    if (type === 'refresh' && refresh && typeof refresh === 'function') {
      setRefreshState(RefreshState.HeaderRefreshing);
      refresh();
    }
    if (type === 'loadMore' && refresh && typeof refresh === 'function') {
      setRefreshState(RefreshState.FooterRefreshing);
      loadMore();
    }
    setLoadType(type);
  };

  // Pull-down refresh callback method
  const onHeaderRefresh = () => {
    getData('refresh');
  };

  // Pull-up and page-turning callback method
  const onFooterRefresh = () => {
    if (hasMore) {
      getData('loadMore');
    } else {
      setRefreshState(RefreshState.NoMoreData);
    }
  };

  return (
    <RefreshListView
      {...args}
      data={listData}
      renderItem={({item, index}) => renderRow(item, index)}
      refreshState={refreshState}
      onHeaderRefresh={onHeaderRefresh}
      onFooterRefresh={onFooterRefresh}
      footerEmptyDataComponent={emptyDataComponent}
    />
  );
};

export default memo(ListView, isEqual);
