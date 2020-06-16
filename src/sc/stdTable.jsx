import React from 'react';
import { Table, Button } from 'shineout';
import { connect } from 'redux';
import { StdSelect } from './stdSelect';
import { toDo, store } from '../myRedux';

export function StdTable(props) {
  const columns = [
    { title: 'id',
      render: (snapdata, index) => {
        snapdata.id = index;
        return index;
      } },
    { title: 'name', render: 'name' },
    { title: 'age', render: 'age' },
    { title: 'sex', render: 'sex' },
    { title: 'do something',
      render: (nouse, index) => (
        <div>
          <Button onClick={() => deleteHandle(index)}>删除</Button>
          <Button onClick={() => modifyHandle(index)}>修改</Button>
        </div>
      ) },
    { title: 'class',
      render: ({ name, className }) => (
        <StdSelect myName="className" otherData={name} data={className} toDo={props.toDo} />
      ) },
  ];
  return (
    <Table keygen={d => d.name} data={data} columns={columns} />
  );
}

const mapStateToProps = (state) => { // 选择出课程->学生的数组
  let studentToClass = [...state];
  studentToClass = studentToClass.map(ele => ({ studentName: ele[0], className: ele[1] }));
  studentToClass = studentToClass.filter(ele => studentNameConfig.indexOf(ele.studentName) !== -1);
  return { studentToClassData: studentToClass };
};
export const NewStdTable = connect(
  mapStateToProps,
  { toDo },
)(StdTable);
