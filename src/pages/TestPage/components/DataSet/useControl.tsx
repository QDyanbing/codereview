import { useModel } from '@umijs/max';
import { Form } from 'antd';
import { useCallback, useEffect } from 'react';

function useControl() {
  const [form] = Form.useForm<API.ITestModifyParams>();

  const { loading, openType, detail, onClose, onCreate, onModify } = useModel(
    'TestPage.useDataSet',
  );

  useEffect(() => {
    if (!openType) return;
    form.setFieldsValue({
      uuid: detail?.uuid,
      name: detail?.name,
      data1: detail?.data1,
      data2: detail?.data2,
    });
  }, [openType, form, detail]);

  const onSubmit = useCallback(async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();

      if (formData.uuid) {
        onModify(formData);
      } else {
        onCreate(formData);
      }
    } catch {}
  }, [form, onCreate, onModify]);

  return {
    loading,
    form,
    openType,
    detail,
    onClose,
    onSubmit,
  };
}

export default useControl;
