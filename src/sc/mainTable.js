/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
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
import 'shineout/dist/theme.default.css';
import { Table, Button, Form, Input } from 'shineout';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { func } from 'shineout/lib/utils';
import { store, toDo } from '../myRedux';
import { Tool } from './tool';
import { StdSelect } from './stdSelect';
import { ClassTable, StudentTable } from './classTable';


function ManagerTable(props) {
  const { modifyManagerHandle, selectHandle, addHandle, managerData } = props;
  return (
    <Form
      inline
      value={managerData}
      onChange={d => modifyManagerHandle(d)}
      onSubmit={d => selectHandle(d)}
    >
      <Form.Item label="编辑栏">
        <Input name="name" placeholder="姓名" autoComplete="off" />
        <Input name="age" placeholder="年龄" autoComplete="off" />
        <Input name="sex" placeholder="性别" autoComplete="off" />
        <Form.Submit type="primary">查询</Form.Submit>
        <Button onClick={() => addHandle({ ...managerData })} type="primary">增加</Button>
      </Form.Item>
    </Form>
  );
}

function ListTable(props) {
  const { deleteHandle, modifyHandle, studentData } = props;
  const columns = [
    { title: 'id', render: 'id' },
    { title: 'name', render: 'name' },
    { title: 'age', render: 'age' },
    { title: 'sex', render: 'sex' },
    { title: 'do something',
      render: (d, index) => (
        <div>
          <Button onClick={() => deleteHandle(d)}>删除</Button>
          <Button onClick={() => modifyHandle(d)}>修改</Button>
        </div>
      ) },
  ];
  return <Table keygen="id" data={studentData} columns={columns} />;
}

export class MainTable extends React.Component {
  constructor(props) {
    super(props);
    this.tool = new Tool();
    this.nullStudentData = {
      id: '',
      name: '',
      age: '',
      sex: '',
    };
    this.state = {
      managerData: this.nullStudentData,
      studentDataArray: this.tool.studentDataArray,
    };
    this.flag = 1;
    this.modifyManagerHandle = this.modifyManagerHandle.bind(this);
    this.selectHandle = this.selectHandle.bind(this);
    this.addHandle = this.addHandle.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
    this.modifyHandle = this.modifyHandle.bind(this);
  }

  UNSAFE_componentWillMount() { // 从redux中读取状态
    const { managerData } = store.getState().saveData;
    this.state.managerData = managerData;
  }

  componentWillUnmount() { // 保存manager状态到redux
    const { managerData } = this.state;
    const { gitData } = store.getState().saveData;
    store.dispatch({
      type: 'save',
      studentData: '',
      classData: '',
      managerData,
      gitData,
    });
  }

  modifyManagerHandle(data) {
    this.setState({ managerData: data });
  }

  selectHandle(data) {
    const studentData = Object.assign({}, this.nullStudentData, data);
    const res = this.tool.selHandle(studentData);
    this.setState({
      studentDataArray: res,
    });
  }

  addHandle(data) {
    console.log(data);
    const studentData = (data.id !== undefined) ? data : Object.assign(data, this.tool.nextStudentId);
    const res = this.tool.addHandle(studentData);
    this.setState({
      studentDataArray: res,
      managerData: this.nullStudentData,
    });
  }

  deleteHandle(data) {
    const res = this.tool.delStdHandle(data);
    this.setState({
      studentDataArray: res,
    });
  }

  modifyHandle(data) {
    this.setState({
      managerData: data,
    });
  }

  render() {
    const { managerData, studentDataArray } = this.state;

    return (
      <div>
        <ManagerTable
          selectHandle={this.selectHandle}
          addHandle={this.addHandle}
          modifyManagerHandle={this.modifyManagerHandle}
          managerData={managerData}
        />
        <ListTable
          deleteHandle={this.deleteHandle}
          modifyHandle={this.modifyHandle}
          studentData={studentDataArray}
        />
      </div>
    );
  }
}
