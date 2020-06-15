/* eslint-disable prefer-destructuring */
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
import 'shineout/dist/theme.default.css';
import { Table, Button, Form, Input, Select } from 'shineout';
import React from 'react';
import { connect } from 'react-redux';
import { element } from 'shineout/lib/utils';
import { store, toDo } from './myRedux';
import { StdSelect } from './stdSelect';
import { Tool } from './tool';

const tool = new Tool();
class ClassTableUI extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.myname = props.type === 'class' ? 'className' : 'studentName';
    console.log('data', props.data);
    this.columns = [
      { title: 'key', render: 'key' },
      { title: 'data',
        render: (d) => {
          const { key, data } = d;
          return (
            <StdSelect myName={this.myname} otherData={key} data={data} toDo={props.toDo} config={this.props.ALLConfig} />
          );
        } },
    ];
  }

  render() {
    const data = this.props.data;
    return (
      <Table columns={this.columns} data={data} keygen={d => d.key} />
    );
  }
}


const CSmapStateToProps = (state) => { // 绑定出 c->s 容器组件
  const StudentALLConfig = tool.getStudentALLConfig();
  let classToStudent = [...state.classMap];
  classToStudent = classToStudent
    .map(ele => ({ key: ele[0], data: tool.getIdToStudent_FromArray(ele[1]) }));

  return {
    data: classToStudent,
    type: 'student',
    ALLConfig: StudentALLConfig,
  };
};
export const ClassTable = connect(
  CSmapStateToProps,
  { toDo },
)(ClassTableUI);


const SCmapStateToProps = (state) => { // 绑定出 s->c 容器组件
  let studentToClass = [...state.studentMap];
  studentToClass = studentToClass
    .map(ele => ({ data: ele[1].map(snap => ({ name: snap })), key: tool.getIdToStudent_FromSingal(ele[0]) }));

  return {
    data: studentToClass,
    type: 'class',
    ALLConfig: ['语文', '数学', '英语', '体育', '音乐'].map(ele => ({ name: ele })),
  };
};
export const StudentTable = connect(
  SCmapStateToProps,
  { toDo },
)(ClassTableUI);
