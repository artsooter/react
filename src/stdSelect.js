import React from 'react';
import { Select } from 'shineout';
import { Tool } from './tool';

const tool = new Tool();

export class StdSelect extends React.Component {// 可适用于学生或者课程的选择栏
  constructor(props) {
    super(props);
    this.myData = (props.myName === 'studentName') ? 'studentData' : 'classData';
    this.otherData = (props.myName === 'studentName')
      ? 'classData' : 'studentData';
  }

    changHandle = (v, d, c) => {
      let { otherData, myName } = this.props;
      let myData = this.props.config.filter(ele => ele.name === d)[0];
      if (myName === 'studentName') {
        myData.id = tool.studentNameToId(myData.name);
      } else {
        const id = tool.studentNameToId(otherData);
        otherData = tool.getStudentInf_FromId(id);
        otherData.id = id;
        myData = myData.name;
      }

      const toDoData = {
        c,
        [this.myData]: myData,
        [this.otherData]: otherData,
      };
      this.props.toDo(toDoData);// dispatch分发
    }

    render() {
      const { data, config } = this.props;
      const dataName = data.map(ele => ele.name);
      const dataNameConfig = config.map(ele => ele.name);
      return (
        <Select
          data={dataNameConfig}
          keygen={d => d}
          multiple
          value={dataName}
          onChange={this.changHandle}
        />
      );
    }
}
