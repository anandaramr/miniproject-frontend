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

export async function addCollaborator(projectId, username) {
    axiosJwt.post('/projects/collaborator', { projectId, username })
    .then(res => {
        return { message: res.data.message }
    })
    .catch(err => {
        return { error: err.response.data }
    })
}

export async function removeCollaborator(projectId, username) {
    axiosJwt.delete('/projects/collaborator', { projectId, username })
    .then(res => {
        return { message: res.data.message }
    })
    .catch(err => {
        return { error: err.response.data }
    })
}
    
export async function getCollaborators(projectId) {
    axiosJwt.get(`/projects/collaborator/${projectId}`)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err.response.data)
        return []
    })
}

export async function updateProject(projectId, tabs) {
    axiosJwt.patch('/projects/state', { projectId, state: JSON.stringify(tabs) })
    .then(res => {
        return { message: res.data.message }
    })
    .catch(err => {
        return { error: err.response.data }
    })
}