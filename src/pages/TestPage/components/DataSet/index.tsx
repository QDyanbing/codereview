import { Button, Drawer, Form, Input } from 'antd';
import Styles from './index.less';
import useControl from './useControl';

const DataSet = () => {
  const { form, openType, onClose, onSubmit } = useControl();

  return (
    <Drawer
      width={640}
      open={openType !== 'CLOSE'}
      className={Styles.dataSet}
      onClose={onClose}
    >
      <Form autoComplete="off" form={form} layout="vertical">
        <Form.Item noStyle name="uuid" />
        <Form.Item label="名称" name="name">
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item label="字段1" name="data1">
          <Input placeholder="请输入字段1" />
        </Form.Item>
        <Form.Item label="字段2" name="data2">
          <Input placeholder="请输入字段2" />
        </Form.Item>
      </Form>
      <div>
        <Button onClick={onClose}>取消</Button>
        <Button type="primary" onClick={onSubmit}>
          确定
        </Button>
      </div>
    </Drawer>
  );
};

export default DataSet;
