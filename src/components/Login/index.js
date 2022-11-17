import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', errorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onClickLogin = () => {
    const {username} = this.state
    const {successLogin} = this.props
    if (username !== '') {
      successLogin(username)
    } else {
      this.setState({errorMsg: true})
    }
  }

  render() {
    const {errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-header">TODO</h1>
          <div className="input-container">
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="login-input"
              type="text"
              placeholder="enter username"
              id="username"
              onChange={this.onChangeUsername}
            />
          </div>
          {errorMsg && <p className="error">Username cannot be empty</p>}
          <button
            className="login-button"
            type="button"
            onClick={this.onClickLogin}
          >
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default Login
