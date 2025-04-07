import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";
import Request from "../components/Request";
import Response from "../components/Response";
import { generateId, parseJson, updateState } from "../utils/utils";
import Tab from "../components/Tab";
import Run from '../components/Run'
import { request } from "../utils/request.js";

function Home() {

	const [ response, setResponse ] = useState({})
	const [ tabs, setTabs ] = useState([{ tabId: 1 }])
	const [ currentTab, setCurrentTab ] = useState()
	const [ dialog, setDialog ] = useState(false)
	const [ proxy, setProxy ] = useState(false)
	const [ dragIdx, setDragIdx ] = useState()
	
	const tabRef = useRef()

	useEffect(() => {
		const { data } = parseJson(localStorage.getItem("state"))
		if(!data || !data.tabs?.length) {
			setTabs([{ tabId: 1 }])
			setCurrentTab(1)
			return;
		};

		setCurrentTab(data.lastActiveTab)
		setProxy(data.proxy)
		setTabs(data.tabs || [{ tabId: 1 }])
	}, [])

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
			tabs = [ ...tabs, { tabId: newTabId }]
			return { lastActiveTab, tabs }
		})
	}

	function closeTab(tabId) {
		updateState(({ tabs: tabList }) => {
			if (tabList?.length==1) return;

			const newTabs = tabList.filter(tab => tab.tabId!=tabId)
			let nextCurrentTab = currentTab

			if (tabId==currentTab) {
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
		console.log('running')
		setDialog(true)
		tabs.map((item) => {
			item.isLoading = true
			return item
		})

		await Promise.all(tabs.map(async (item, idx) => {
			return makeRequest(item)
		}))
		
		console.log('end')
		setTabs(tabs => tabs.map(item => {
			item.isLoading = false
			return item
		}))
	}

	async function makeRequest(item) {
		const res = await request(item.url,item.method,item.body,item.headers,null,proxy)
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

	return (
		<div className="">
			
			{dialog && <div>
				<div className="flex h-svh w-full justify-center items-center absolute z-10 opacity-80 bg-zinc-950"></div>
				<Run setDialog={setDialog} tabs={tabs} run={runAll}/>
			</div>}

			<NavBar/>
			<button onClick={runAll} className="flex justify-center items-center px-7 gap-1 opacity-80 hover:opacity-100 duration-100">
				<span className="material-symbols-outlined text-3xl text-emerald-500">play_arrow</span>
				<p className="text-emerald-50">Run</p>
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
				
				<div className="flex">
					<Request tabId={currentTab} displayResponse={displayResponse} setProxy={setProxy} proxy={proxy} updateTabs={updateTabs} />
					<Response tabId={currentTab} response={response} />
				</div>
			</div>
		</div>
	)
}

export default Home
