/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'shineout/dist/theme.default.css';
import { Button, Form, Input, Card } from 'shineout';
import { color } from 'shineout/lib/utils';
import { connect } from 'react-redux';
import { store } from './myRedux';
// import { gitTodo } from './gitTodo';

function NewDiv(props) {
  const { data, handleChange } = props;

  return (
    <Form value={data} onChange={handleChange}>
      <Form.Item required label="Host:">
        <Input name="newhost" />
      </Form.Item>
      <Form.Item required label="Token:">
        <Input name="newtoken" className="help-tip" onClick={() => { window.open('https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html', '_blank'); }} />
      </Form.Item>
      <Form.Item label="ProjectId:">
        <Input name="newprojectId" />
      </Form.Item>
      <Form.Item label="GroupId:">
        <Input name="newgroupId" />
      </Form.Item>
    </Form>
  );
}

function OldDiv(props) {
  const { data, handleChange } = props;
  return (
    <Form value={data} onChange={handleChange}>
      <Form.Item required label="Host:">
        <Input name="host" />
      </Form.Item>
      <Form.Item required label="Token:">
        <Input name="token" className="help-tip" onClick={() => { window.open('https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html', '_blank'); }} />
      </Form.Item>
      <Form.Item required label="Username:">
        <Input name="username" />
      </Form.Item>
      <Form.Item required label="Password:">
        <Input.Password name="password" />
      </Form.Item>
      <Form.Item label="ProjectId:">
        <Input name="projectId" />
      </Form.Item>
      <Form.Item label="GroupId:">
        <Input name="groupId" />
      </Form.Item>
    </Form>
  );
}

class _MainDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: '',
      token: '',
      username: '',
      password: '',
      projectId: '',
      groupId: '',
      newhost: '',
      newtoken: '',
      newprojectId: '',
      newgroupId: '',
    };
    this.cardStyle = {
      width: 500,
      height: 450,
      display: 'inline-flex',
      marginRight: 20,
    };
    this.gray = { background: '#e6eff9' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (value) => {
    this.props.toDo(value);
  }

  clickHandle=() => {
    const { gitData } = store.getState().saveData;
    store.dispatch({
      type: 'put_saga', // 走saga
      studentData: '',
      classData: '',
      managerData: '',
      gitData,
    });
    // gitTodo(this.state);
  }

  render() {
    const { gitData } = this.props;
    return (
      <div>
        <Card style={this.cardStyle}>
          <Card.Header style={this.gray}>旧项目</Card.Header>
          <Card.Body>
            <OldDiv data={gitData} handleChange={this.handleChange} />
          </Card.Body>
        </Card>
        <Button onClick={this.clickHandle} className="importBtn">导入</Button>
        <Card style={this.cardStyle}>
          <Card.Header style={this.gray}>新项目</Card.Header>
          <Card.Body>
            <NewDiv data={gitData} handleChange={this.handleChange} />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { gitData } = state.saveData;
  return gitData;
};

const toDo = (value) => {
  const gitData = Object.assign({}, value, store.getState().saveData.gitData);
  return {
    type: 'save',
    studentData: '',
    classData: '',
    managerData: '',
    gitData,
  };
};

export const MainDiv = connect(
  mapStateToProps,
  { toDo },
)(_MainDiv);
