import {Component} from 'react'
import {BiShuffle} from 'react-icons/bi'

import './index.css'

class FilterButtons extends Component {
  state = {
    updatedData: [],
    userData: [],
    statusButton: false,
    statusButtonInfo: false,
  }

  shuffleTodoList = () => {
    const {initialTodoData} = this.props
    const randomLength = initialTodoData.length
    const randomNumber = Math.floor(Math.random() * randomLength)
    const randomUser = initialTodoData[randomNumber].userName
    const shuffledUserData = initialTodoData.filter(
      user => user.userName.toLowerCase() === randomUser.toLowerCase(),
    )
    this.setState(
      {
        updatedData: shuffledUserData,
        shuffle: true,
        statusButton: false,
        statusButtonInfo: false,
      },
      this.onClickUpdateData,
    )
  }

  onClickUpdateData = () => {
    const {updatedData, shuffle} = this.state
    const {updatedTodoDada} = this.props
    updatedTodoDada(updatedData, shuffle)
  }

  userTodoList = () => {
    const {user, initialTodoData} = this.props

    const userTodo = initialTodoData.filter(
      each => each.userName.toLowerCase() === user.toLowerCase(),
    )
    this.setState(
      {
        updatedData: userTodo,
        userData: userTodo,
        shuffle: false,
        statusButton: false,
        statusButtonInfo: false,
      },
      this.onClickUpdateData,
    )
  }

  completedTasks = () => {
    const {userData} = this.state
    const {initialTodoData, shuffle} = this.props
    if (shuffle === false) {
      const completedTask = userData.filter(user => user.isChecked === true)
      this.setState(
        {
          updatedData: completedTask,
          statusButton: true,
          statusButtonInfo: false,
        },
        this.onClickUpdateData,
      )
    } else {
      const completeTask = initialTodoData.filter(
        user => user.isChecked === true,
      )
      this.setState(
        {
          updatedData: completeTask,
          statusButton: true,
          statusButtonInfo: false,
        },
        this.onClickUpdateData,
      )
    }
  }

  unCompletedTasks = () => {
    const {userData} = this.state
    const {initialTodoData, shuffle} = this.props
    if (shuffle === false) {
      const completedTask = userData.filter(user => user.isChecked === false)
      this.setState(
        {
          updatedData: completedTask,
          statusButton: false,
          statusButtonInfo: true,
        },
        this.onClickUpdateData,
      )
    } else {
      const completeTask = initialTodoData.filter(
        user => user.isChecked === false,
      )
      this.setState(
        {
          updatedData: completeTask,
          statusButton: false,
          statusButtonInfo: true,
        },
        this.onClickUpdateData,
      )
    }
  }

  render() {
    const {shuffle, statusButton, statusButtonInfo} = this.state
    console.log(shuffle)
    const shufflebutton = shuffle ? 'selectedButton' : 'status-button'
    const userSelected = shuffle ? 'status-button' : 'selectedButton'
    const completeButton = statusButton ? 'selectedButton' : 'status-button'
    const unCompleteButton = statusButtonInfo
      ? 'selectedButton'
      : 'status-button'

    return (
      <>
        <div className="filter-button-container">
          <button
            className={shufflebutton}
            type="button"
            onClick={this.shuffleTodoList}
          >
            <BiShuffle />
            shuffle
          </button>
          <button
            className={userSelected}
            type="button"
            onClick={this.userTodoList}
          >
            user tasks
          </button>
          <button
            className={completeButton}
            type="button"
            onClick={this.completedTasks}
          >
            Completed
          </button>
          <button
            className={unCompleteButton}
            type="button"
            onClick={this.unCompletedTasks}
          >
            uncompleted
          </button>
        </div>
      </>
    )
  }
}

export default FilterButtons
