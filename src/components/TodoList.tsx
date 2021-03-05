import React, { useState } from 'react';
import InputButton from './InputButton'

const list = JSON.parse(localStorage.getItem('todoList') || '') || [];
const defaultEditIndex = -1;

interface Todo {
    checked: boolean
    value: string
    key: string
}

function getKey(): string {
    return Math.random() + '';
}

function setToStorage(data: Todo[]) {
    // 缓存
    localStorage.setItem('todoList', JSON.stringify(data));
}

export default function TodoList() {
    const [todoList, setTodoList] = useState<Todo[]>(list);
    const [addStatus, setAddStatus] = useState(true);
    const [editIndex, setEditIndex] = useState(defaultEditIndex);
    const [editValue, setEditValue] = useState('');

    function setData(data: Todo[]) {
        setTodoList(data);
        setToStorage(data);
    }

    function saveValue(value: string) {
        let $todoList: Todo[] = [];
        if (editIndex > -1) {
            todoList[editIndex].value = value;
            $todoList = [...todoList];
        } else {
            $todoList = todoList.concat({
                checked: false,
                value,
                key: getKey(),
            });
        }
        setAddStatus(true);
        setData($todoList);
        setEditIndex(defaultEditIndex);
    }

    function checkboxChange(event: any, index: number) {
        todoList[index].checked = event.target.checked;
        setData([...todoList]);
    }

    function deleteItem(index: number) {
        const $todoList = [...todoList];
        $todoList.splice(index, 1);
        setData($todoList);
    }

    function editItem(index: number) {
        setEditValue(todoList[index].value);
        setEditIndex(index);
    }

    return (
        <>
            <ul className="todo-list">
                {
                    todoList.length ? todoList.map(({ key, value, checked }, index) => {
                        return (
                            <li key={key}>
                                <input checked={checked} type="checkbox" onChange={event => checkboxChange(event, index)} />
                                { value}
                                <span className="todo-list-edit">
                                    <button title="删除" onClick={() => deleteItem(index)}>❌</button>
                                    <button title="编辑" onClick={() => editItem(index)}>⚙</button>
                                </span>
                            </li>
                        )
                    }) : '暂无数据'
                }
            </ul>
            {
                (!addStatus || editIndex > defaultEditIndex)
                    ? <InputButton editValue={editValue} save={saveValue} cleanInput={true} />
                    : <button onClick={() => setAddStatus(false)}>➕ 添加任务</button>
            }
        </>
    );
}
