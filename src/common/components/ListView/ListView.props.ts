import {ListRenderItem} from 'react-native';

export interface IRefreshListViewProps {
  refreshState: number;
  onHeaderRefresh?: (state: number) => void;
  onFooterRefresh?: (state: number) => void;
  data: any[];

  listRef?: any;

  footerRefreshingText?: string;
  footerFailureText?: string;
  footerNoMoreDataText?: string;
  footerEmptyDataText?: string;

  footerRefreshingComponent?: any;
  footerFailureComponent?: any;
  footerNoMoreDataComponent?: any;
  footerEmptyDataComponent?: any;

  renderItem: ListRenderItem<any> | null | undefined;
}

export type IListViewProps = {
  /* Is there more */
  hasMore: boolean;
  /* List data */
  dataSource: any[];
  /* Pull-down refresh function */
  refresh: () => void;
  /* Pull up and load product data function */
  loadMore: () => void;
  /* Head assembly */
  ListHeaderComponent?: React.ReactNode;
  /* Empty data display */
  emptyDataComponent?: React.ReactNode;
  /* Render ui */
  renderRow: ListRenderItem<any> | any;
  /* Remaining parameters */
  [key: string]: any;
};
