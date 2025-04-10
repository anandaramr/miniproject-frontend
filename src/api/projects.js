import { axiosJwt } from "./axios";

export async function getMyProjects() {
    return axiosJwt.get('/projects')
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err.response.data)
        return []
    })
}

export async function createProject(projectName) {
    return axiosJwt.post('/projects/new', { projectName })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err.response.data)
        return []
    })
}

export async function deleteProject(projectId) {
    return axiosJwt.delete(`/projects/remove/${projectId}`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err.response.data)
        return;
    })
}

export async function addCollaborator(projectId, username) {
    return axiosJwt.post('/projects/collaborator', { projectId, username })
    .then(res => {
        return { message: res.data.message }
    })
    .catch(err => {
        return { error: err.response.data }
    })
}

export async function removeCollaborator(projectId, username) {
    return axiosJwt.post('/projects/collaborator/remove', { projectId, username })
    .then(res => {
        return { message: res.data.message }
    })
    .catch(err => {
        return { error: err.response.data }
    })
}
    
export async function getCollaborators(projectId) {
    return axiosJwt.get(`/projects/collaborator/${projectId}`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err.response.data)
        return []
    })
}

export async function updateProject(projectId, tabs) {
    return axiosJwt.patch('/projects/state', { projectId, state: JSON.stringify(tabs) })
    .then(res => {
        return { message: res.data.message }
    })
    .catch(err => {
        return { error: err.response.data }
    })
}

export async function renameProject(projectId, projectName) {
    return axiosJwt.patch('/projects/rename', { projectId, projectName })
    .then(res => {
        return { message: res.data.message }
    })
    .catch(err => {
        return { error: err.response.data }
    })
}