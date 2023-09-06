import { TodoContext } from "../../context/context";
import Table, { ColumnsType } from "antd/es/table";
import { ITodo } from "../../types/types";
import { FC, useContext } from "react";

const columns: ColumnsType<ITodo> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Subscription',
    dataIndex: 'subscribed',
    render: (subscribed: boolean): string => subscribed ? 'Subscribed' : 'Not Subscribed',
  },
  {
    title: 'Employmnet',
    dataIndex: 'employed',
    render: (employed: boolean): string => employed ? 'Employed' : 'Unemployed',
  },
];

const TodoList: FC = () => {
  const data = useContext(TodoContext)
  
  const rowSelection = {
    onChange: (selectedRows: ITodo[]) => {
      data?.saveSelectedTodos(selectedRows)
    },
  };

  return (
    <div className={`todo-list ${data?.data.length! >= 6 ? 'scroll' : ''}`}>
      <Table
        pagination={false}
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data?.data}
      />
    </div>
  )
}

export { TodoList }