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
			setTabs([{ tabId: 1 }])
			setCurrentTab(1)
			return;
		};

		setCurrentTab(data.lastActiveTab)
		setTabs(data.tabs || [{ tabId: 1 }])
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
		const newTab = { tabId: tabs[tabs.length-1]?.tabId + 1 || 1 }
		setTabs(t => [ ...t, newTab ])
		setCurrentTab(newTab.tabId)
	}

	function closeTab(evt) {
		if (tabs?.length==1) {
			return;
		}

		const filter = (tabs) => tabs.filter(tab => tab.tabId!=evt.target.id)
		setTabs(filter)

		const newTabs = filter(tabs)
		console.log(tabs)
		console.log(newTabs)
		const nextCurrentTab = newTabs[currentTab-1]?.tabId || newTabs[0].tabId

		const newState = { lastActiveTab: nextCurrentTab, tabs: newTabs }
		localStorage.setItem("state", JSON.stringify(newState))
		setCurrentTab(nextCurrentTab)
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
					{tabs?.map(item => <Tab title={item?.tabId} active={item?.tabId==currentTab} key={item?.tabId} onDoubleClick={closeTab} onClick={() => setCurrentTab(item?.tabId)} />)}
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
