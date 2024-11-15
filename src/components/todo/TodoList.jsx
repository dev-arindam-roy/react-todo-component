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
