// import { takeLatest } from 'redux-saga';
// import { delay } from 'redux-saga';
import { call, delay, put, takeLatest, takeEvery, take } from 'redux-saga/effects';
import type from 'shineout/lib/Rule/type';
// import { Git, importSingleRepo } from './girDo';

function* todo({ gitData }) {
  yield delay(1000);
  console.log(gitData);
  // const { host, username, password, groupId, token, projectId, newgroupId, newhost, newtoken, newprojectId } = gitData;
  // const git =  new Git({ host, token });
  // const { groups, project, archive } = git;
  // if (projectId !== '') {
  //   importSingleRepo({ host, token },
  //     { host: newhost, token: newtoken },
  //     { project:yield project(projectId), groupId, userName: username, password }).then(() => {
  //     archive(projectId);
  //   });
  // } else if (groupId !== '') {
  //   const groupData =yield groups(groupId);
  //   groupData.foreach((ele) => {
  //     importSingleRepo({ host, token },
  //       { host: newhost, token: newtoken },
  //       { project:yield project(ele.projectId), groupId, userName: username, password }).then(() => {
  //       archive(ele.projectId);
  //     });
  //   });
  // }
}
export function* saga() {
  yield takeLatest('put_saga', todo);
}
