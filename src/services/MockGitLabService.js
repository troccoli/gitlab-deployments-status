import projects from '@/assets/data/projects.json'
import starredProjects from '@/assets/data/user-starred-projects.json'
import environments from '@/assets/data/environments.json'
import deployments from '@/assets/data/deployments.json'
import MockAdapter from "axios-mock-adapter";

function mockStarredProjects(mock) {
    mock.onGet("/projects", {
        params: {
            archived: false,
            membership: true,
            starred: true
        }
    }).reply(200, starredProjects)
}

function mockAllProjects(mock) {
    mock.onGet("/projects", {
        params: {
            archived: false,
            membership: true,
            page: 1
        }
    }).reply(200, projects)
}

function mockEnvironments(mock) {
    const url = /\/projects\/(\d+)\/environments/;
    mock.onGet(url, {
        params: {
            page: 1
        }
    }).reply(config => {
        let projectId = config.url.match(url)[1]

        if (projectId === '6') {
            return [200, environments]
        }

        return [200, []]
    })
}

function mockDeployments(mock) {
    const url = /\/projects\/(\d+)\/deployments/;
    let today = new Date()

    today.setHours(0, 0, 0, 0)
    mock.onGet(url, {
        params: {
            status: "success",
            order_by: "created_at",
            sort: "desc",
            environment: 'review/fix-foo',
            updated_before: today.toISOString()
        }
    }).reply(config => {
        let projectId = config.url.match(url)[1];

        if (projectId === '6') {
            return [200, deployments]
        }

        return [200, []]
    })
}

export default {
    mock(client) {
        console.info('Mocking')
        let mock = new MockAdapter(client)

        mockStarredProjects(mock)
        mockAllProjects(mock)
        mockEnvironments(mock)
        mockDeployments(mock)

        mock.onAny().reply(500, {})
    }
};
