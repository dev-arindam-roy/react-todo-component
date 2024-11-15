# A ToDO Application - Component Based - Prop Passing
> A simple ToDo application with components - Parent & Child prop passing
> Along With localStorage implementation 

## Check the Application

```js
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';

const TodoForm = () => {
  const [todo, setTodo] = useState({ name: '' });
  const [todoList, setTodoList] = useState([]);
  const [editTodoIndex, setEditTodoIndex] = useState(null);

  const todoFormSubmitHandler = (e) => {
    e.preventDefault();
    let updatedTodoList;

    if (editTodoIndex !== null) {
      updatedTodoList = todoList.map((item, index) =>
        index === editTodoIndex ? todo : item
      );
      setEditTodoIndex(null);
    } else {
      updatedTodoList = [...todoList, todo];
    }

    setTodoList(updatedTodoList);
    saveInLocalStorage(updatedTodoList);
    resetTodoForm();
  };

  const resetTodoForm = () => {
    setTodo({ name: '' });
    setEditTodoIndex(null);
  };

  const emitOnToDoDelete = (keyIndex) => {
    const updatedTodoList = todoList.filter((_, index) => index !== keyIndex);
    setTodoList(updatedTodoList);
    saveInLocalStorage(updatedTodoList);
    resetTodoForm();
  };

  const emitOnToDoEdit = (keyIndex) => {
    setTodo(todoList[keyIndex]);
    setEditTodoIndex(keyIndex);
  };

  const deleteAllTodos = () => {
    setTodoList([]);
    saveInLocalStorage([]);
    resetTodoForm();
  }

  const saveInLocalStorage = (todoList) => {
    localStorage.setItem('_onex_simple_todos_', JSON.stringify(todoList));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('_onex_simple_todos_');
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <>
      <div style={{ width: '650px', margin: '60px auto', fontFamily: 'monospace' }}>
        <div>
          <form onSubmit={todoFormSubmitHandler}>
            <label style={{fontSize: '16px'}}>
              <strong>ToDo Name:</strong>
            </label>
            <div>
              <input
                type='text'
                style={{
                  width: '600px',
                  padding: '12px',
                  border: '1px solid black',
                  borderRadius: '4px',
                }}
                required
                placeholder='Enter ToDo'
                value={todo.name}
                onChange={(e) => setTodo({ ...todo, name: e.target.value })}
              />
            </div>
            <div style={{marginTop: '10px'}}>
              <button
                type='submit'
                style={{
                  width: '120px',
                  fontSize: '14px',
                  padding: '8px',
                  backgroundColor: 'black',
                  color: 'white',
                  marginLeft: '0px',
                  borderRadius: '4px',
                  border: '1px solid black',
                }}
              >
                {editTodoIndex !== null ? 'Update ToDo' : 'Add ToDo'}
              </button>
              {editTodoIndex !== null && (
                <button
                  type='button'
                  style={{
                    width: '120px',
                    fontSize: '14px',
                    padding: '8px',
                    backgroundColor: 'black',
                    color: 'white',
                    marginLeft: '8px',
                    borderRadius: '4px',
                    border: '1px solid black',
                  }}
                  onClick={resetTodoForm}
                >
                  Cancel
                </button>
              )}
              {
                (todoList.length > 0) && (
                    <button
                  type='button'
                  style={{
                    width: '120px',
                    fontSize: '14px',
                    padding: '8px',
                    backgroundColor: 'red',
                    color: 'white',
                    marginLeft: '8px',
                    borderRadius: '4px',
                    border: '1px solid red',
                  }}
                  onClick={deleteAllTodos}
                >
                  Delete All
                </button>
                )
              }
            </div>
          </form>
        </div>
        <TodoList
          sendToDoList={todoList}
          onToDoDelete={emitOnToDoDelete}
          onToDoEdit={emitOnToDoEdit}
        />
      </div>
    </>
  );
};

export default TodoForm;
```

```js
import React, { useEffect, useState } from 'react';

const TodoList = ({ sendToDoList, onToDoDelete, onToDoEdit }) => {
  const [getTodoList, setTodoList] = useState([]);
  useEffect(() => {
    setTodoList(sendToDoList);
  }, [sendToDoList]);
  return (
    <>
      <div style={{ marginTop: '30px' }}>
        {getTodoList.length > 0 && (
          <ol>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '-38px' }}>
              All ToDos: ({getTodoList.length})
            </h4>
            {getTodoList.map((item, index) => {
              return (
                <li key={'todo-' + index} style={{ paddingBottom: '8px' }}>
                  <span style={{ display: 'inline-block', width: '480px', fontSize: '14px' }}>
                    {item.name}
                  </span>
                  <span>
                    <button
                      style={{
                        fontSize: '14px',
                        padding: '5px',
                        backgroundColor: 'black',
                        color: 'white',
                        marginLeft: '8px',
                        borderRadius: '4px',
                      }}
                      onClick={() => onToDoEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        fontSize: '14px',
                        padding: '5px',
                        backgroundColor: 'black',
                        color: 'white',
                        marginLeft: '8px',
                        borderRadius: '4px',
                      }}
                      onClick={() => onToDoDelete(index)}
                    >
                      Delete
                    </button>
                  </span>
                </li>
              );
            })}
          </ol>
        )}
        {getTodoList.length === 0 && <p style={{marginLeft: '10px'}}>No ToDos!</p>}
      </div>
    </>
  );
};

export default TodoList;
```