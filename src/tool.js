/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */
import { store } from './myRedux';

const getStudentDataArray = () => [...store.getState().infMap].map(ele => Object.assign({}, ele[1], { id: ele[0] }));

const getIdToStudent = (data) => {
  const idToStudent = new Map();
  data.forEach((ele) => {
    idToStudent.set(ele.id, ele.name);
  });
  return idToStudent;
};

export class Tool {
  constructor() {
    this.studentDataArray = getStudentDataArray();
    this.idToStudent = getIdToStudent(this.studentDataArray);
    this.studentNum = store.getState().studentMap.size;// 学生人数
    this.nextStudentId = { id: this.studentNum };// ,,学生下一个的编号
  }

  addHandle(studentData) {
    store.dispatch({
      type: 'add',
      studentData,
      classData: '数学',
    });
    this.nextStudentId.id++;
    this.studentDataArray = getStudentDataArray();
    return this.studentDataArray;
  }

  delStdHandle(studentData) {
    store.dispatch({
      type: 'delStd',
      studentData,
      classData: '',
    });
    this.studentDataArray = getStudentDataArray();
    return this.studentDataArray;
  }

  selHandle(studentData) {
    const { name, age, sex } = studentData;
    const res = this.studentDataArray.filter(ele => (name ? ele.name.indexOf(name) > -1 : true)
        && (age ? Number(age) === Number(ele.age) : true)
        && (sex ? ele.sex.indexOf(sex) > -1 : true));
    return res;
  }

  getIdToStudent_FromArray = (data) => {
    const res = data.map(ele => store.getState().infMap.get(ele));
    return res;
  };

  getIdToStudent_FromSingal=(data) => {
    this.studentDataArray = getStudentDataArray();
    this.idToStudent = getIdToStudent(this.studentDataArray);
    return this.idToStudent.get(data);
  }

  getStudentALLConfig=() => {
    const res = [...store.getState().infMap]
      .map(ele => ele[1]);
    return res;
  }

  getStudentInf_FromId=id => store.getState().infMap.get(id)

  studentNameToId=(name) => {
    const res = [...store.getState().infMap]
      .filter(ele => ele[1].name === name);
    return res[0][0];
  }
}
