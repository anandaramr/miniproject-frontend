import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import Request from "../components/Request";
import Response from "../components/Response";
import { parseJson } from "../utils/utils";
import Tab from "../components/Tab";

function Home() {

	const [ response, setResponse ] = useState({})
	const [ tabs, setTabs ] = useState([])
	const [ currentTab, setCurrentTab ] = useState()
	
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
		if(!response.data) return;
		saveResponse()
	}, [response])

	useEffect(() => {
        const { data } = parseJson(localStorage.getItem("state"))
        if(!data) return;

        const tab = data.tabs?.find(item => item.tabId==currentTab)
        setResponse(tab?.response || {})
    }, [currentTab])

	function newTab() {
		const newTabId = tabs[tabs.length-1] + 1 || 1 
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

	function saveResponse() {
		const { data } = parseJson(localStorage.getItem("state"))
		if(!data) return;

		const tabs = data.tabs?.map(item => {
			if (item.tabId==currentTab) {
				item.response = response
			}
			return item
		})

		const newData = { ...data, tabs }
		localStorage.setItem("state", JSON.stringify(newData))
	}

	return (
		<div className="h-svh p-2">
			<NavBar/>

			<div className="px-8">
				<div className="flex my-3 px-5">
					{tabs?.map(tabId => <Tab title={tabId} currentTab={currentTab} key={tabId} onClick={() => selectTab(tabId)} close={() => closeTab(tabId)} />)}
					<Tab key={"+"} title={"+"} onClick={newTab} />
				</div>

				<div className="flex">
					<Request tabId={currentTab} setResponse={setResponse} />
					<Response tabId={currentTab} response={response} />
				</div>
			</div>
		</div>
	)
}

export default Home
