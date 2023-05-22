import { Button, Input, Pagination, Spin, Table } from 'antd';
import { useMemo } from 'react';
import Styles from './index.less';
import useControl from './useControl';

const TestPage = () => {
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
    // onCreateShowOld, // 之前用的是这个现在改成了下边的，但是感觉还是有问题
    // onModifyShowOld, // 之前用的是这个现在改成了下边的，但是感觉还是有问题
    onCreateShow,
    onModifyShow,
    onDelete,
  } = useControl();

  const columns = useMemo(() => {
    return [
      { title: '名称', dataIndex: 'name' },
      { title: '字段1', dataIndex: 'data1' },
      { title: '字段2', dataIndex: 'data2' },
      {
        title: '操作',
        dataIndex: 'action',
        render: (_: unknown, record: API.ITest) => (
          <div className={Styles.action}>
            <Button onClick={() => onModifyShow(record)}>编辑</Button>
            {' | '}
            <Button onClick={() => onDelete(record.uuid)}>删除</Button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <Spin spinning={loading}>
      <div className={Styles.risk}>
        <div className={Styles.content}>
          <div className={Styles.searchHeader}>
            <Input.Search
              placeholder="请输入名称"
              defaultValue={name}
              className={Styles.search}
              onChange={onSearchChange}
              onSearch={onSearch}
            />
            <Button onClick={onCreateShow}>新增</Button>
          </div>
          <div className={Styles.list}>
            <Table rowKey="uuid" columns={columns} dataSource={data} />
          </div>
          <Pagination
            className={Styles.pagination}
            current={pageNum}
            pageSize={pageSize}
            total={total}
            onChange={onPaginationChange}
          />
        </div>
      </div>
    </Spin>
  );
};
export default TestPage;
