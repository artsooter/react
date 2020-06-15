const { Gitlab } = require('@gitbeaker/node');
const axios = require('axios');

export class Git {
  constructor(config) {
    const { host, token } = config;
    this.token = token;
    this.host = host;
    if (host && token) {
      this.api = new Gitlab(config);
    } else {
      throw new Error('配置项不全， host ， token 必填');
    }
  }

  // 获取项目信息 promise
  project(projectId) {
    return this.api.Projects.show(projectId);
  }

  // 获取群组下所有项目信息 promise
  groups(groupId) {
    return this.api.Groups.projects(groupId);
  }

  // 归档 promise
  archive(projectId) {
    return axios.post(`${this.host}/api/v4/projects/${projectId}/archive`, {}, {
      headers: {
        'PRIVATE-TOKEN': this.host,
      },
    }).then(({ data }) => data);
  }

  // 查看导入状态 promise
  importStatus(projectId) {
    return axios.get(`${this.host}/api/v4/projects/${projectId}/import`, {
      headers: {
        'PRIVATE-TOKEN': this.token, // CONFIG.corp.token
      },
    }).then(({ data }) => data);
  }
}


const importRequest = ({ host, userName, password, projectName, groupId, token }) => {
  const url = new URL(host);

  return axios.post(`${host}/api/v4/projects`, {
    name: projectName,
    namespace_id: groupId,
    // import_url: `${url.protocol}://${userName}:${password}@${url.host}/${path_with_namespace}.git`,
  }, {
    headers: {
      'PRIVATE-TOKEN': token,
    },
  });
};

/**
 *
 * @param sourceConfig {host, token}
 * @param targetConfig {host, token}
 * @param options {project, groupId, userName, password}
 * @return {Promise<any>}
 */
export async function importSingleRepo(sourceConfig, targetConfig, options) {
  const sourceGit = new Git(sourceConfig);

  const {
    project, groupId, userName, password,
  } = options;

  const result = await importRequest({
    host: targetConfig.host,
    token: targetConfig.token,
    userName,
    password,
    groupId,
    projectName: project.name,
  });

  return result.data;
}
