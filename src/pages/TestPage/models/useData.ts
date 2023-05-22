import { getTest } from '@/services/testPage/testPage';
import { useRequest } from 'ahooks';
import { useCallback, useRef, useState } from 'react';

interface IStore {
  loading: boolean;
  name?: string;
  pageNum: number;
  pageSize: number;
  total: number;
  data: API.ITest[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value?: string) => void;
  onPaginationChange: (page: number, size: number) => void;
  onRefresh: () => void;
  onMount: () => void;
  onUnMount: () => void;
}

export default function usePageStore(): IStore {
  const [ready, setReady] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [name, setName] = useState<string>();
  const nameSearch = useRef(name);
  nameSearch.current = name;

  const { loading, data, refresh } = useRequest(
    () =>
      getTest({
        pageNum,
        pageSize,
        name: nameSearch.current,
      }),
    {
      refreshDeps: [pageNum, pageSize, nameSearch],
      ready,
    },
  );

  const onPaginationChange = useCallback(
    (page: number, size: number) => {
      setPageNum(page);
      setPageSize(size);
    },
    [setPageNum, setPageSize],
  );

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName],
  );

  const onSearch = useCallback(
    (value?: string) => {
      nameSearch.current = value;
      setPageNum(1);
      refresh();
    },
    [nameSearch, setPageNum, refresh],
  );

  const onMount = useCallback(() => {
    setReady(true);
  }, [setReady]);

  const onUnMount = useCallback(() => {
    setReady(false);
    setPageNum(1);
    setPageSize(10);
    setName(undefined);
  }, [setReady, setPageNum, setPageSize, setName]);

  return {
    loading,
    name,
    pageNum,
    pageSize,
    total: data?.data?.total || 0,
    data: data?.data?.data || [],
    onPaginationChange,
    onSearchChange,
    onSearch,
    onRefresh: refresh,
    onMount,
    onUnMount,
  };
}
