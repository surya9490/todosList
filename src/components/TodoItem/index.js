import {RiFileEditFill} from 'react-icons/ri'
import {AiFillDelete} from 'react-icons/ai'

import './index.css'

const TodoItem = props => {
  const {
    eachTodo,
    shuffle,
    todoData,
    initialTodoData,
    updateTodoItemData,
    editId,
    editTodoTask,
    changeEditInput,
    editInput,
    updateEditedTodoData,
    deleteTodoItem,
    deleteId,
  } = props
  const {id, userName, task, isChecked} = eachTodo

  const updateTodoData = async (taskInfo, checked) => {
    const url = `https://todos-app-web.herokuapp.com/todos/${id}`
    const data = {
      userName: eachTodo.userName,
      task: taskInfo,
      isChecked: checked,
    }
    console.log(data)
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    console.log(response)
  }

  const onChangeCheckBoxValue = () => {
    if (isChecked) {
      const data = todoData.map(boolValue => {
        if (boolValue.id === id) {
          return {...boolValue, isChecked: false}
        }
        return boolValue
      })

      const initialData = initialTodoData.map(boolValue => {
        if (boolValue.id === id) {
          return {...boolValue, isChecked: false}
        }
        return boolValue
      })
      updateTodoData(task, 'false')
      updateTodoItemData(data, initialData)
    } else {
      const data = todoData.map(boolValue => {
        if (boolValue.id === id) {
          return {...boolValue, isChecked: true}
        }
        return boolValue
      })
      const initialData = initialTodoData.map(boolValue => {
        if (boolValue.id === id) {
          return {...boolValue, isChecked: true}
        }
        return boolValue
      })
      updateTodoData(task, 'true')
      updateTodoItemData(data, initialData)
    }
  }

  const onClickDeleteTodo = () => {
    deleteTodoItem(id)
  }

  const onCancelDeleteTodo = () => {
    deleteTodoItem('')
  }

  const onConfirmDeleteTodo = async () => {
    const initialData = initialTodoData.filter(each => each.id !== id)

    const updatedData = todoData.filter(each => each.id !== id)
    updateTodoItemData(updatedData, initialData)
    if (typeof id !== 'string') {
      const url = `https://todos-app-web.herokuapp.com/todos/${id}/`
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
      await fetch(url, options)
    }
  }

  const OnClickEditTodo = () => {
    editTodoTask(id)
  }

  const onChangeEditInput = event => {
    changeEditInput(event)
  }

  const onClickSaveButton = () => {
    console.log(editInput)

    if (editInput !== '') {
      const data = todoData.map(each => {
        if (each.id === editId) {
          return {...each, task: editInput}
        }
        return each
      })

      const initialData = initialTodoData.map(each => {
        if (each.id === editId) {
          return {...each, task: editInput}
        }
        return each
      })
      updateTodoData(editInput, isChecked)
      updateEditedTodoData(data, initialData)
    } else {
      updateEditedTodoData(todoData, initialTodoData)
    }
  }

  const result = editId === id ? 'hide' : 'show'
  const shuffleHideButtons = shuffle ? 'hideButton' : 'showButton'
  console.log(shuffleHideButtons)

  return (
    <>
      {shuffle && (
        <p className="shuffle-username">
          username:{' '}
          <span className="shuffle-username-subpart">{userName} </span>
        </p>
      )}
      <li className="item-container">
        <div className={`task-sm-container ${result}`}>
          {isChecked ? null : <p className="task-sm">{task}</p>}
        </div>
        <div className="all-items-container">
          <input
            className={`checkbox-input ${result}`}
            checked={isChecked}
            type="checkbox"
            onChange={onChangeCheckBoxValue}
          />
          {editId === id ? (
            <div className="edit-container">
              <textarea
                type="text"
                className="edit"
                onChange={onChangeEditInput}
              />
              <button
                className="save-button"
                type="button"
                onClick={onClickSaveButton}
              >
                save
              </button>
            </div>
          ) : (
            <div className="task-button-container">
              {isChecked ? null : <p className="task">{task}</p>}
              {isChecked ? <p className="done">Completed</p> : null}
              {id === deleteId ? (
                <>
                  <button
                    className="confirm-delete "
                    type="button"
                    onClick={onConfirmDeleteTodo}
                  >
                    confirm
                  </button>
                  <button
                    className="confirm-delete "
                    type="button"
                    onClick={onCancelDeleteTodo}
                  >
                    cancel
                  </button>
                </>
              ) : (
                <div className={`edit-delete-container ${shuffleHideButtons}`}>
                  <button
                    className="task-button"
                    type="button"
                    onClick={OnClickEditTodo}
                  >
                    <RiFileEditFill className="edit-icon" />
                  </button>
                  <button
                    className="task-button"
                    type="button"
                    onClick={onClickDeleteTodo}
                  >
                    <AiFillDelete className="delete-icon" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </li>
    </>
  )
}

export default TodoItem
