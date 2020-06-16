import { Git, importSingleRepo } from './girDo';

export function gitTodo(state) {
  const { host, username, password, groupId, token, projectId, newgroupId, newhost, newtoken, newprojectId } = state;
  const git = new Git({ host, token });
  const { groups, project, archive } = git;

  if (!groupId) {
    const groupData = groups(groupId);
    groupData.foreach((ele) => {
      importSingleRepo({ host, token },
        { host: newhost, token: newtoken },
        { project: project(ele.projectId), groupId, userName: username, password }).then(() => {
        archive(ele.projectId);
      });
    });
  } else if (!projectId) {
    importSingleRepo({ host, token },
      { host: newhost, token: newtoken },
      { project: project(projectId), groupId, userName: username, password }).then(() => {
      archive(projectId);
    });
  } else {
    alert('未输入projectId或groupId');
  }
}
