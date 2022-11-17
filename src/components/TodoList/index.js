import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {Loader} from 'react-loader-spinner'
import Login from '../Login'
import TodoItem from '../TodoItem'
import './index.css'

import FilterButtons from '../FilterButtons'

class TodoList extends Component {
  state = {
    login: false,
    initialTodoData: [],
    todoData: [],
    shuffle: false,
    user: '',
    userInput: '',
    editId: '',
    editInput: '',
    deleteId: '',
    isLoader: false,
  }

  getTodoItems = async () => {
    this.setState({isLoader: true})
    const url = 'https://todos-app-web.herokuapp.com/todos'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const fetchedData = data.map(eachTodo => ({
      id: eachTodo.id,
      isChecked: eachTodo.is_checked,
      task: eachTodo.task,
      userName: eachTodo.user_name,
    }))

    const formatedData = fetchedData.map(each => {
      if (each.isChecked === 'true') {
        return {...each, isChecked: true}
      }
      return {...each, isChecked: false}
    })

    const {user} = this.state

    const userData = formatedData.filter(
      eachUser => eachUser.userName.toLowerCase() === user.toLowerCase(),
    )

    this.setState({initialTodoData: formatedData, todoData: userData})
  }

  successLogin = username => {
    this.getTodoItems()
    this.setState({
      user: username,
      login: true,
      isLoader: false,
    })
  }

  onClickLogout = () => {
    this.setState({
      login: false,
    })
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onClickAddButton = async () => {
    const {userInput, user} = this.state
    if (userInput !== '') {
      const url = 'https://todos-app-web.herokuapp.com/todos/create'
      const data = {
        userName: user,
        task: userInput,
        isChecked: 'false',
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      }

      await fetch(url, options)
      const updateData = {
        id: uuidv4(),
        userName: user,
        task: userInput,
        isChecked: false,
      }
      this.setState(prevState => ({
        todoData: [...prevState.todoData, updateData],
        userInput: '',
        initialTodoData: [...prevState.initialTodoData, updateData],
      }))
    }
  }

  updatedTodoDada = (data, shuffle) => {
    this.setState({todoData: data, shuffle})
  }

  updateTodoItemData = (data, initialData) => {
    this.setState({todoData: data, initialTodoData: initialData})
  }

  editTodoTask = id => {
    this.setState({editId: id})
  }

  changeEditInput = event => {
    this.setState({editInput: event.target.value})
  }

  updateEditedTodoData = (data, initialData) => {
    this.setState({editId: '', todoData: data, initialTodoData: initialData})
  }

  deleteTodoItem = id => {
    this.setState({deleteId: id})
  }

  toggleLoaderAndUser = () => {
    const {isLoader} = this.state

    return (
      <>
        {isLoader ? (
          <div className="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        ) : (
          this.renderTodoList()
        )}
      </>
    )
  }

  renderTodoList = () => {
    const {
      user,
      userInput,
      initialTodoData,
      todoData,
      shuffle,
      editId,
      editInput,
      deleteId,
    } = this.state
    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="user">Welcome: {user}</h1>
          <h1 className="heading">Todo</h1>
          <button
            className="logout-button"
            type="button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="input-container">
          <h1 className="create-task-heading">
            Create <span className="create-task-heading-subpart">Task</span>
          </h1>
          <input
            className="todo-user-input"
            type="text"
            value={userInput}
            placeholder="What needs to be done?"
            onChange={this.onChangeUserInput}
          />
          <button
            className="add-button"
            type="button"
            onClick={this.onClickAddButton}
          >
            add
          </button>
          <FilterButtons
            initialTodoData={initialTodoData}
            todoData={todoData}
            user={user}
            shuffle={shuffle}
            updatedTodoDada={this.updatedTodoDada}
          />
          <ul className="todos-items-container">
            {todoData.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                eachTodo={eachTodo}
                shuffle={shuffle}
                todoData={todoData}
                initialTodoData={initialTodoData}
                updateTodoItemData={this.updateTodoItemData}
                editId={editId}
                editTodoTask={this.editTodoTask}
                editInput={editInput}
                changeEditInput={this.changeEditInput}
                updateEditedTodoData={this.updateEditedTodoData}
                deleteId={deleteId}
                deleteTodoItem={this.deleteTodoItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {login} = this.state
    return (
      <>
        {login ? (
          this.toggleLoaderAndUser()
        ) : (
          <Login successLogin={this.successLogin} />
        )}
      </>
    )
  }
}

export default TodoList
