/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { Object } from 'core-js';
import { displayPartsToString } from 'typescript';
import createSagaMiddleware from 'redux-saga';
import { act } from '@testing-library/react';
import { saga } from './saga';

const classConfig = ['语文', '数学', '英语', '体育', '音乐'];
const studentConfig = [{
  id: 0,
  studentId: 0,
  name: '张三',
  age: 19,
  sex: '男',
}, {
  id: 1,
  studentId: 1,
  name: '张四',
  age: 29,
  sex: '男',
}, {
  id: 2,
  studentId: 2,
  name: '赵三',
  age: 28,
  sex: '女',
}, {
  id: 3,
  studentId: 3,
  name: '李四',
  age: 19,
  sex: '女',
}, {
  id: 4,
  studentId: 4,
  name: '李五',
  age: 19,
  sex: '男',
}];
const addHandle = (state, key, data) => { // 添加数据进map
  const newState = new Map(state);
  if (key) {
    let newdata = state.get(key) === undefined ? [] : state.get(key);
    if (newdata.indexOf(data) === -1) { newdata = newdata.concat(data); }
    newState.set(key, newdata);
  }
  return newState;
};
const delHandle = (state, key, data) => { // 删除数据出map
  const newState = new Map(state);
  console.log(key, data);
  if (newState.has(key)) {
    const newClassName = newState.get(key);
    if (newClassName.indexOf(data) !== -1) {
      newClassName.splice(newClassName.indexOf(data), 1);
    }
    newState.set(key, newClassName);
  }
  return newState;
};

const fn = (state, action) => {
  if (action.studentData === undefined) return state;
  const { _infMap, _studentMap, _classMap, _saveData } = {
    _infMap: state.infMap,
    _studentMap: state.studentMap,
    _classMap: state.classMap,
    _saveData: state.saveData,
  };
  let { infMap, studentMap, classMap } = { infMap: _infMap, studentMap: new Map(), classMap: new Map() };
  const { studentData, classData } = action;
  const { id, name, age, sex } = studentData;

  switch (action.type) {
    case 'add': {
      infMap.set(id, { name, age, sex });
      studentMap = addHandle(_studentMap, id, classData);
      classMap = addHandle(_classMap, classData, id);
      return { infMap, studentMap, classMap, saveData: _saveData };
    }
    case 'del': { // 只删除个人的选课情况
      console.log('del', _studentMap, id, classData);
      studentMap = delHandle(_studentMap, id, classData);
      classMap = delHandle(_classMap, classData, id);
      return { infMap, studentMap, classMap, saveData: _saveData };
    }
    case 'delStd': { // 删除个人所有信息
      const classDataArray = _studentMap.get(id);
      classDataArray.forEach((className) => {
        classMap = delHandle(_classMap, className, id);
      });
      _studentMap.delete(id);
      studentMap = _studentMap;
      infMap.delete(id);
      return { infMap, studentMap, classMap, saveData: _saveData };
    }
    case 'save': {
      const saveData = {};
      const { managerData, gitData } = action;
      saveData.managerData = managerData;
      saveData.gitData = gitData;
      return {
        infMap: _infMap,
        studentMap: _studentMap,
        classMap: _classMap,
        saveData,
      };
    }
    case 'put': {
      const saveData = {};
      console.log(action);
      const { gitData } = action;
      saveData.gitData = gitData;
      return {
        infMap: _infMap,
        studentMap: _studentMap,
        classMap: _classMap,
        saveData,
      };
    }
    default: {
      return state;
    }
  }
};

export const toDo = (toDoData) => {
  const { c, studentData, classData } = toDoData;
  const type = (c === true) ? 'add' : 'del';
  return {
    type,
    studentData,
    classData,
  };
};
const init = () => { // 生成初始化的redux
  const classMap = new Map();
  const studentMap = new Map();
  const infMap = new Map();
  const saveData = { managerData: {}, gitData: {} };
  studentConfig.forEach(({ id, name, age, sex }, index) => {
    infMap.set(id, { name, age, sex });// 学生id->学生信息
    studentMap.set(id, [classConfig[index]]);// 学生id->[课程name]
    classMap.set(classConfig[index], [id]);// 课程name->[学生id]
  });
  console.log({ classMap, studentMap, infMap });
  return { classMap, studentMap, infMap, saveData };// saveData :{{managerData} , {gitData}}
};

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(fn, init(), applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
