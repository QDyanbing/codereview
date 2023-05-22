import { useModel } from '@umijs/max';

function useControl() {
  const { form, loading, openType, onClose, onSubmit } = useModel(
    'TestPage.useDataSetOld',
  );

  return {
    form,
    loading,
    openType,
    onClose,
    onSubmit,
  };
}

export default useControl;
