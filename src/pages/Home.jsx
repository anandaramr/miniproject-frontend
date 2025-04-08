import NavBar from "../components/NavBar";
import { useContext, useEffect, useRef, useState } from "react";
import Request from "../components/Request";
import Response from "../components/Response";
import { generateId, getLastActiveProject, parseJson, parseKeyValPairs, setLastActiveProject, updateState } from "../utils/utils";
import Tab from "../components/Tab";
import Run from '../components/Run'
import { request } from "../utils/request.js";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import AuthContext from "../context/AuthContext.jsx";
import { createProject, getCollaborators, getMyProjects, updateProject } from "../api/projects.js";
import NewProject from "../components/NewProject.jsx";

function Home() {

	const [ response, setResponse ] = useState({})
	const [ tabs, setTabs ] = useState([])
	const [ currentTab, setCurrentTab ] = useState()
	const [ login, setLogin ] = useState(false)

	const [signup, setSignup] = useState(false)
	const [ dialog, setDialog ] = useState(false)
	const [ proxy, setProxy ] = useState()
	const [ dragIdx, setDragIdx ] = useState()

	const [ projects, setProjects ] = useState([])
	const [ showNewProjectWindow, setShowNewProjectWindow ] = useState(false)
	
	const tabRef = useRef()
	const { user } = useContext(AuthContext)

	useEffect(() => {
		const { data } = parseJson(localStorage.getItem("state"))

		setCurrentTab(data?.lastActiveTab)
		setProxy(data?.proxy)
		setTabs(data?.tabs || [])
	}, [])

	useEffect(() => {
		if (!user) return;

		getMyProjects().then(projects => {
			setProjects(projects)
		})
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

	function newTab() {
		updateState(({ tabs }) => {
			const newTabId = generateId()

			setCurrentTab(newTabId)
			setTabs(t => [ ...t, { tabId: newTabId }])
			const lastActiveTab = newTabId
			
			tabs = tabs || []

			const welcomeUrl = `${import.meta.env.VITE_SERVER}/echo`
			tabs = [ ...tabs, { tabId: newTabId, url: welcomeUrl }]
			
			return { lastActiveTab, tabs }
		})
	}

	function closeTab(tabId) {
		updateState(({ tabs: tabList }) => {
			const newTabs = tabList.filter(tab => tab.tabId!=tabId)
			let nextCurrentTab = currentTab

			if (tabId==currentTab) {
				const iterator = tabs.entries()
				let result
				while ((result = iterator.next().value)) {
					const [ idx ] = result
					if (!idx) break;
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

			<NavBar setLogin={setLogin} projects={projects} setTabs={setTabs} setProjects={setProjects} setCurrentTab={setCurrentTab} saveProject={saveProject} newProject={newProject} />
        
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
			</div>
		</div>
	)
}

export default Home
