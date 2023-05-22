import { useModel } from '@umijs/max';
import { useEffect } from 'react';

function useControl() {
  const {
    loading,
    name,
    pageNum,
    pageSize,
    total,
    data,
    onPaginationChange,
    onSearchChange,
    onSearch,
    onMount,
    onUnMount,
  } = useModel('TestPage.useData');

  const { onCreateShow: onCreateShowOld, onModifyShow: onModifyShowOld } =
    useModel('TestPage.useDataSetOld');

  const { onCreateShow, onModifyShow } = useModel('TestPage.useDataSet');

  const { loading: deleteLoading, onDelete } = useModel('TestPage.useDelete');

  useEffect(() => {
    onMount();

    return () => {
      onUnMount();
    };
  }, [onMount, onUnMount]);

  return {
    loading: loading || deleteLoading,
    name,
    pageNum,
    pageSize,
    total,
    data,
    onPaginationChange,
    onSearchChange,
    onSearch,
    onCreateShowOld,
    onModifyShowOld,
    onCreateShow,
    onModifyShow,
    onDelete,
  };
}

export default useControl;
