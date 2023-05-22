import { setTestCreate, setTestModify } from '@/services/testPage/testPage';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useCallback, useState } from 'react';

interface IStore {
  loading: boolean;
  openType: 'CREATE' | 'MODIFY' | 'CLOSE';
  detail?: API.ITest;
  onCreateShow: () => void;
  onModifyShow: (params: API.ITest) => void;
  onClose: () => void;
  onCreate: (params: API.ITestCreateParams) => Promise<any>;
  onModify: (params: API.ITestModifyParams) => Promise<any>;
}

export default function usePageStore(): IStore {
  const { onRefresh } = useModel('TestPage.useData', (model) => ({
    onRefresh: model.onRefresh,
  }));

  const [openType, setOpenType] = useState<'CREATE' | 'MODIFY' | 'CLOSE'>(
    'CLOSE',
  );

  const [detail, setDetail] = useState<API.ITest>();

  const { runAsync: runCreate, loading: createLoading } = useRequest(
    setTestCreate,
    {
      manual: true,
    },
  );

  const { runAsync: runModify, loading: modifyLoading } = useRequest(
    setTestModify,
    {
      manual: true,
    },
  );

  const onCreateShow = useCallback(() => {
    setOpenType('CREATE');
    setDetail(undefined);
  }, [setDetail, setOpenType]);

  const onModifyShow = useCallback(
    (params: API.ITest) => {
      setOpenType('CREATE');
      setDetail(params);
    },
    [setOpenType, setDetail],
  );

  const onClose = useCallback(() => {
    setOpenType('CLOSE');
    setDetail(undefined);
  }, [setOpenType, setDetail]);

  const onCreate = useCallback(
    async (params: API.ITestCreateParams) => {
      try {
        const { data, errorMessage } = await runCreate(params);
        if (!data) return message.error(errorMessage || '系统异常');
        message.success('新增成功');
        onClose();
        onRefresh();
      } catch {}
    },
    [runCreate, onClose, onRefresh],
  );

  const onModify = useCallback(
    async (params: API.ITestModifyParams) => {
      try {
        const { data, errorMessage } = await runModify(params);
        if (!data) return message.error(errorMessage || '系统异常');
        message.success('修改成功');
        onClose();
        onRefresh();
      } catch {}
    },
    [runCreate, onClose, onRefresh],
  );

  return {
    loading: createLoading || modifyLoading,
    openType,
    detail,
    onCreateShow,
    onModifyShow,
    onClose,
    onCreate,
    onModify,
  };
}
