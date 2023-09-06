import { InputNumber, Input, Select, Button, Space, Checkbox, Typography, Switch } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ChangeEvent, FC, useContext, useState } from 'react'
import { TodoContext } from '../../context/context';
import { ITodo } from '../../types/types';

const { Title } = Typography

const InsertRow: FC = () => {
  const data = useContext(TodoContext)

  const [name, setName] = useState<string>('')
  const [employed, setEmploy] = useState<boolean>(true)
  const [subscribed, setSubscribe] = useState<boolean>(true)
  const [age, setAge] = useState<number>(0)

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  };

  const onEmployChange = (e: CheckboxChangeEvent) => {
    setEmploy(e.target.checked)
  };

  const onAgeChange = (e: number) => {
    setAge(e) 
  };

  const onSubscribeChange = (value: boolean) => {
    setSubscribe(value)
  }; 

  const insertHandler = () => {
    if(!name){
      alert('Create name !')
      return
    }

    const todo: ITodo = {
      key: data?.data.length + '',
      name,
      employed,
      subscribed,
      age
    }

    data?.saveTodo(todo)
  }

  const removeHandler = () => {
    data?.removeTodos(data.selectedData)
    data?.saveSelectedTodos([])
  }

  const modeHandler = () => {
    data?.changeMode()    
  }

  return (
     <Space direction="vertical" size="middle" className='insert'>
      <Title type={data?.mode && 'warning'} level={5}>Insert Row</Title>
      <Input value={name} onChange={onNameChange} style={{ width: 150 }} placeholder={'Name'}/>
      <InputNumber onChange={onAgeChange} style={{ width: 150 }} min={1} placeholder={'Age'}/>
      <Select
        style={{ width: 150 }}
        placeholder={'Subscribed'}
        onChange={onSubscribeChange}
        options={[
          { value: true, label: 'Subscribed' },
          { value: false, label: 'Not Subscribed' },
        ]}
      />
      <Checkbox checked={employed} placeholder={'Employed'} onChange={onEmployChange}>
        <span style={{ color: data?.mode ? '#faad14' : '' }}>Employed</span>
      </Checkbox>
      <label className='insert-mode'>
        <Switch onChange={modeHandler}/> <span>Mode</span>
      </label>
      <Space>
        <Button onClick={insertHandler} type="primary">Insert</Button>
        <Button onClick={removeHandler} type="primary" danger>Delete</Button>
      </Space>
     </Space>
  )
}

export { InsertRow } 