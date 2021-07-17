import {ListRenderItem} from 'react-native';

export interface IRefreshListViewProps<ItemT> {
  refreshState: number;
  onHeaderRefresh?: (state: number) => void;
  onFooterRefresh?: (state: number) => void;
  data: ReadonlyArray<ItemT>;

  listRef?: any;

  footerRefreshingText?: string;
  footerFailureText?: string;
  footerNoMoreDataText?: string;
  footerEmptyDataText?: string;

  footerRefreshingComponent?: any;
  footerFailureComponent?: any;
  footerNoMoreDataComponent?: any;
  footerEmptyDataComponent?: any;

  renderItem: ListRenderItem<ItemT> | null | undefined;
}

export type IListViewProps<ItemT> = {
  /* Is there more */
  hasMore: boolean;
  /* List data */
  dataSource: ReadonlyArray<ItemT>;
  /* Pull-down refresh function */
  refresh: () => void;
  /* Pull up and load product data function */
  loadMore: () => void;
  /* Head assembly */
  ListHeaderComponent?: React.ReactNode;
  /* Empty data display */
  emptyDataComponent?: React.ReactNode;
  /* Render ui */
  renderItem: ListRenderItem<ItemT> | null | undefined;
  /* Remaining parameters */
  [key: string]: any;
};
