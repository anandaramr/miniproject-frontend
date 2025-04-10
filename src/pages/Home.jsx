import NavBar from "../components/NavBar";
import { useContext, useEffect, useRef, useState } from "react";
import Request from "../components/Request";
import Response from "../components/Response";
import { generateId, getCurrentProject, getLastActiveProject, parseJson, parseKeyValPairs, setLastActiveProject, updateState } from "../utils/utils";
import Tab from "../components/Tab";
import Run from '../components/Run'
import { request } from "../utils/request.js";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import AuthContext from "../context/AuthContext.jsx";
import { createProject, addCollaborator, getCollaborators, getMyProjects, updateProject } from "../api/projects.js";
import NewProject from "../components/NewProject.jsx";
import Collaborators from "../components/Collaborators.jsx";

function Home() {

	const [ response, setResponse ] = useState({})
	const [ tabs, setTabs ] = useState([])
	const [ currentTab, setCurrentTab ] = useState()
	const [ login, setLogin ] = useState(false)
	const [ deleteProject, setDeleteProject ] = useState(false);

	const [ signup, setSignup ] = useState(false)
	const [ dialog, setDialog ] = useState(false)
	const [ proxy, setProxy ] = useState()
	const [ dragIdx, setDragIdx ] = useState()

	const [ collaborators, setCollaborators ] = useState(false)
    const [ renameProject, setRenameProject ] = useState(false)
	const [ projects, setProjects ] = useState([])
	const [ showNewProjectWindow, setShowNewProjectWindow ] = useState(false)
	
	const tabRef = useRef()
	const { user } = useContext(AuthContext)

	useEffect(() => {
		const { data } = parseJson(localStorage.getItem("state"))
		
		setCurrentTab(data?.lastActiveTab)
		setProxy(data?.proxy)
		
        const currentProject = getCurrentProject(projects)
		if (!currentProject) {
			setTabs(data?.tabs || [])
			return;
		}
		
        try {
			const tabs = JSON.parse(currentProject?.state || "[]")
			setTabs(tabs)
        } catch { 
			setTabs([]) 
			return;
		}
	}, [projects])

	useEffect(() => {
		if (!user) return;

		refreshProjects()
	}, [user])

	useEffect(() => {
        const { data } = parseJson(localStorage.getItem("state"))
        if(!data) return;

        const tab = data.tabs?.find(item => item.tabId==currentTab)
        setResponse(tab?.response || {})
    }, [currentTab])

	useEffect(() => {
		updateState(() => {
			return { proxy }
		})
	}, [proxy])

	async function refreshProjects() {
		const projects = await getMyProjects()
		setProjects(projects)
	}

	function newTab() {
		updateState(({ tabs }) => {
			const newTabId = generateId()
			const welcomeUrl = `${import.meta.env.VITE_SERVER}/echo`

			tabs = tabs || []
			tabs = [ ...tabs, { tabId: newTabId, url: welcomeUrl }]
			const lastActiveTab = newTabId

			setCurrentTab(newTabId)
			setTabs(t => [ ...t, { tabId: newTabId, url: welcomeUrl }])
			return { lastActiveTab, tabs }
		})
	}

	function closeTab(tabId) {
		updateState(({ tabs: tabList }) => {
			const newTabs = tabList.filter(tab => tab.tabId!=tabId)
			let nextCurrentTab = currentTab

			if (tabId==currentTab && tabs.length > 1) {
				const iterator = tabs.entries()
				let result
				while ((result = iterator.next().value)) {
					const [ idx ] = result
					if (tabs[idx].tabId==currentTab) {
						nextCurrentTab = idx < tabs.length-1 ? tabs[idx+1].tabId : tabs[idx-1].tabId
						break
					}
				}
			}

			setCurrentTab(nextCurrentTab)
			setTabs(newTabs)

			return { lastActiveTab: nextCurrentTab, tabs: newTabs }
		})
	}

	function selectTab(tabId) {
		setCurrentTab(tabId)
		updateState(() => {
			return { lastActiveTab: tabId }
		})
	}

	function saveResponse(tabId, res) {
		updateState(({ tabs }) => {
			tabs = tabs?.map(item => {
				if(item.tabId==tabId) {
					item.response = res
				}
				return item
			})

			return { tabs }
		})
	}

	function displayResponse(tabId, res) {
		saveResponse(tabId, res)
		if(tabId==currentTab) {
			setResponse(res)
		}
	}

	async function runAll() {
		setDialog(true)
		tabs.map((item) => {
			item.isLoading = true
			return item
		})

		await Promise.all(tabs.map(async (item, idx) => {
			return makeRequest(item)
		}))
		
		setTabs(tabs => tabs.map(item => {
			item.isLoading = false
			return item
		}))
	}

	async function makeRequest(item) {
		const headers = { ...parseKeyValPairs(item.headers), 'content-type': item.content }
		const params = parseKeyValPairs(item.parameters)
		const res = await request(item.url, item.method, item.body, headers, params, null, proxy)
		displayResponse(item.tabId, res)
	}

	function updateTabs() {
		setTabs(JSON.parse(localStorage.getItem("state") || "")?.tabs)
	}

	function onDrop(idx) {
		if (dragIdx == idx) return;

		setTabs(tabs => {
			const updatedTabs = [...tabs]
			const [ movedTab ] = updatedTabs.splice(dragIdx, 1)
			updatedTabs.splice(idx, 0, movedTab)
			return updatedTabs
		})
	}

	function saveProject() {
		const currentProjectId = getLastActiveProject()
		const tabs = JSON.parse(localStorage.getItem("state"))?.tabs
		updateProject(currentProjectId, tabs)
		.then(() => {
			setProjects(projects => projects.map(project => {
				if (project.projectId == currentProjectId) {
					project.state = JSON.stringify(tabs)
				}

				return project
			}))
		})
	}

	function newProject() {
		setShowNewProjectWindow(true)
	}

	function createNewProject(projectName) {
		createProject(projectName).then(res => {
			setProjects(projects => {
				const newProjects = [ ...projects, res ]
				return newProjects
			})

			setLastActiveProject(res.projectId)
			console.log(res)
			setShowNewProjectWindow(false)
		})
	}

	return (
		<div className="">

			{dialog && <div>
				<div className="flex h-svh w-full justify-center items-center absolute z-10 opacity-80 bg-zinc-950"></div>
				<Run setDialog={setDialog} tabs={tabs} run={runAll}/>
			</div>}

			{login && <div>
				<div className="flex h-svh w-full justify-center items-center absolute z-10 opacity-80 bg-zinc-950"></div>
				<Login setLogin={setLogin} setSignup={setSignup}/>
			</div>}

			{signup && <div>
				<div className="flex h-svh w-full justify-center items-center absolute z-10 opacity-80 bg-zinc-950"></div>
				<Signup setLogin={setLogin} setSignup={setSignup}/>
			</div>}

			{showNewProjectWindow && <NewProject create={(projectName) => createNewProject(projectName)} cancel={() => setShowNewProjectWindow(false)} /> }

			{collaborators && <div className="">
				<div className="flex h-svh w-full justify-center items-center bg-black bg-opacity-60 absolute z-20">
					<Collaborators setShowCollaborators={setCollaborators}/>
				</div>
			</div>}

			{renameProject && <div>
				<div className="flex h-svh w-full justify-center items-center absolute z-10 opacity-80 bg-zinc-950"></div>
					<div className="flex h-svh w-full justify-center items-center bg-transparent absolute z-20">
						<div className="border-2 border-zinc-700 w-[20%] bg-white dark:bg-zinc-900 h-[29%] rounded-xl flex flex-col items-center py-5 px-3 overflow-y-scroll gap-3"> 
							<form className="flex flex-col gap-10 items-center my-6">
								<input id="username"type="text" placeholder = "Enter the new name" className="rounded-xl bg-transparent border-zinc-400 dark:border-zinc-600 border-2 text-sm px-4 py-3 outline-none"/>
								<div className="flex gap-5">
                        			<button type="submit" className="duration-200 px-4 border-2 border-gray-900 hover:bg-gray-900 dark:bg-transparent dark:border-zinc-400 py-1 rounded-xl dark:hover:text-black dark:hover:bg-zinc-50 dark:hover:border-zinc-50 hover:text-white">Rename</button>
                        			<button onClick={()=>setRenameProject(false)} className="duration-200 px-4 rounded-xl border-zinc-800 hover:bg-rose-500 hover:border-rose-500 hover:text-white border-2 text-base">Cancel</button>
                    			</div>
							</form>
						</div>
					</div>
			</div>}

			<NavBar setLogin={setLogin} projects={projects} setTabs={setTabs} setProjects={setProjects} setCurrentTab={setCurrentTab} saveProject={saveProject} newProject={newProject} setCollaborators={setCollaborators} setRenameProject={setRenameProject} setDeleteProject={setDeleteProject} />
        
			<button onClick={runAll} className="flex justify-center items-center px-7 gap-1 opacity-80 hover:opacity-100 duration-100">
				<span className="material-symbols-outlined text-3xl text-emerald-500">play_arrow</span>
				<p className="dark:text-emerald-50 text-gray-900">Run</p>
			</button>

			<div className="px-8">
				<div className="flex my-3">
					<div ref={tabRef} onWheel={evt => tabRef.current.scrollLeft +=  evt.deltaY} className="flex overflow-scroll relative">
						{tabs?.map(({ tabId, title }, idx) => <Tab key={tabId} id={tabId} title={title} active={tabId==currentTab} onClick={() => selectTab(tabId)} close={() => closeTab(tabId)} onDragStart={() => setDragIdx(idx)} onDrop={() => onDrop(idx)} />)}
					</div>
					<div>
						<span onClick={newTab} className="border-[1px] dark:border-zinc-800 rounded-sm px-3 py-1 cursor-pointer select-none text-zinc-500 flex items-center"><span>+</span></span>
					</div>
				</div>
				
				{tabs.length > 0 && <div className="flex">
					<Request tabId={currentTab} displayResponse={displayResponse} setProxy={setProxy} proxy={proxy} updateTabs={updateTabs} />
					<Response tabId={currentTab} response={response} />
				</div>}

				{tabs.length==0 && <div className="flex flex-col justify-center items-center h-[50svh]">
					<div className="text-7xl text-zinc-500 font-cabin">Start Your Project</div>
					<button onClick={newTab} className="text-3xl font-mono border-2 dark:border-zinc-400 dark:hover:border-zinc-400 border-zinc-500 hover:border-gray-700 hover:bg-gray-700 dark:hover:bg-zinc-400 hover:dark:text-zinc-800 duration-200 rounded-xl px-8 py-3 m-5 text-zinc-800 hover:text-white dark:text-zinc-400">Start!</button>
				</div> }
			</div>
		</div>
	)
}

export default Home
