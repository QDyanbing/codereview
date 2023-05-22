import { setTestDelete } from '@/services/testPage/testPage';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useCallback } from 'react';

interface IStore {
  loading: boolean;
  onDelete: (uuid: string) => Promise<any>;
}

export default function usePageStore(): IStore {
  const { onRefresh } = useModel('TestPage.useData', (model) => ({
    onRefresh: model.onRefresh,
  }));

  const { loading, runAsync } = useRequest(setTestDelete, { manual: true });

  const onDelete = useCallback(
    async (uuid: string) => {
      try {
        const { data, errorMessage } = await runAsync(uuid);
        if (!data) return message.error(errorMessage || '系统异常');
        message.success('删除成功');
        onRefresh();
      } catch {}
    },
    [runAsync, onRefresh],
  );

  return {
    loading,
    onDelete,
  };
}
