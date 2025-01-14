import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";
import Request from "../components/Request";
import Response from "../components/Response";
import { generateId, parseJson } from "../utils/utils";
import Tab from "../components/Tab";

function Home() {

	const [ response, setResponse ] = useState({})
	const [ tabs, setTabs ] = useState([])
	const [ currentTab, setCurrentTab ] = useState()
	const tabRef = useRef()
	
	useEffect(() => {
		const { data } = parseJson(localStorage.getItem("state"))
		if(!data || !data.tabs?.length) {
			setTabs([ 1 ])
			setCurrentTab(1)
			return;
		};

		setCurrentTab(data.lastActiveTab)
		setTabs(data.tabs.map(item => item.tabId) || [ 1 ])
	}, [])

	useEffect(() => {
        const { data } = parseJson(localStorage.getItem("state"))
        if(!data) return;

        const tab = data.tabs?.find(item => item.tabId==currentTab)
        setResponse(tab?.response || {})
    }, [currentTab])

	function newTab() {
		const newTabId = generateId()

		setCurrentTab(newTabId)
		setTabs(t => [ ...t, newTabId ])

		let { data } = parseJson(localStorage.getItem("state"))
		if(!data) data = {};

		data.lastActiveTab = newTabId
		data.tabs = [ ...data.tabs, { tabId: newTabId } ]
		localStorage.setItem("state", JSON.stringify(data))
	}

	function closeTab(tabId) {
		const { data } = parseJson(localStorage.getItem("state"))
		if(!data) return;

		const tabList = data.tabs
		if (tabList?.length==1) {
			return;
		}

		const newTabs = tabList.filter(tab => tab.tabId!=tabId)
		const nextCurrentTab = tabId!=currentTab ? currentTab : newTabs[tabs.indexOf(tabId)-1]?.tabId || newTabs[0].tabId
		
		setCurrentTab(nextCurrentTab)
		setTabs(newTabs.map(item => item.tabId))

		const newState = { lastActiveTab: nextCurrentTab, tabs: newTabs }
		localStorage.setItem("state", JSON.stringify(newState))
	}

	function selectTab(tabId) {
		let { data } = parseJson(localStorage.getItem("state"))
		if(!data) data = [];

		setCurrentTab(tabId)
		data.lastActiveTab = tabId
		localStorage.setItem("state", JSON.stringify(data))
	}

	function saveResponse(tabId, res) {
		const { data } = parseJson(localStorage.getItem("state"))
		if(!data) return;

		const tabs = data.tabs?.map(item => {
			if (item.tabId==tabId) {
				item.response = res
			}
			return item
		})

		const newData = { ...data, tabs }
		localStorage.setItem("state", JSON.stringify(newData))
	}

	function displayResponse(tabId, res) {
		saveResponse(tabId, res)
		if(tabId==currentTab) {
			setResponse(res)
		}
	}

	return (
		<div className="p-2">
			<NavBar/>

			<div className="px-8">
				<div className="flex my-3">
					<div ref={tabRef} onWheel={evt => tabRef.current.scrollLeft +=  evt.deltaY} className="flex overflow-scroll relative">
						{tabs?.map(tabId => <Tab active={tabId==currentTab} key={tabId} onClick={() => selectTab(tabId)} close={() => closeTab(tabId)} />)}
					</div>
					<div>
						<Tab key={"+"} title={"+"} onClick={newTab} />
					</div>
				</div>

				<div className="flex">
					<Request tabId={currentTab} displayResponse={displayResponse} />
					<Response tabId={currentTab} response={response} />
				</div>
			</div>
		</div>
	)
}

export default Home
