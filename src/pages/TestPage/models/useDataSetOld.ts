import { setTestCreate, setTestModify } from '@/services/testPage/testPage';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Form, FormInstance, message } from 'antd';
import { useCallback, useState } from 'react';

interface IStore {
  form: FormInstance<API.ITestModifyParams>;
  loading: boolean;
  openType: 'CREATE' | 'MODIFY' | 'CLOSE';
  detail?: API.ITest;
  onCreateShow: () => void;
  onModifyShow: (params: API.ITest) => void;
  onClose: () => void;
  onSubmit: () => Promise<any>;
}

export default function usePageStore(): IStore {
  const [form] = Form.useForm<API.ITestModifyParams>();

  const { onRefresh } = useModel('TestPage.useData', (model) => ({
    onRefresh: model.onRefresh,
  }));

  const [openType, setOpenType] = useState<'CREATE' | 'MODIFY' | 'CLOSE'>(
    'CLOSE',
  );

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
    form.resetFields();
  }, [form, setOpenType]);

  const onModifyShow = useCallback(
    (params: API.ITest) => {
      setOpenType('MODIFY');
      form.setFieldsValue({
        uuid: params.uuid,
        name: params.name,
        data1: params.data1,
        data2: params.data2,
      });
    },
    [form, setOpenType],
  );

  const onClose = useCallback(() => {
    setOpenType('CLOSE');
    form.resetFields();
  }, [form, setOpenType]);

  const onSubmit = useCallback(async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      if (formData.uuid) {
        const { data, errorMessage } = await runModify(formData);
        if (!data) return message.error(errorMessage || '系统异常');
        onClose();
        onRefresh();
        message.success('操作成功');
      } else {
        const { data, errorMessage } = await runCreate(formData);
        if (!data) return message.error(errorMessage || '系统异常');
        onClose();
        onRefresh();
        message.success('操作成功');
      }
    } catch {}
  }, [form, onRefresh, runCreate, runModify, onClose, onRefresh]);

  return {
    form,
    loading: createLoading || modifyLoading,
    openType,
    onCreateShow,
    onModifyShow,
    onClose,
    onSubmit,
  };
}
