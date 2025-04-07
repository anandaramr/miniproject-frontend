import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import Request from "./Request";
import ThemeProvider from "../context/ThemeProvider";

describe('Request', () => {

    let storage = {}
    let rerender

    beforeEach(() => {
        global.localStorage = {
            getItem: vi.fn(key => storage[key] || undefined),
            setItem: vi.fn((key, value) => storage[key] = value),
            clear: vi.fn(() => storage = {})
        }
    
        global.window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: false
        }));

        global.console.error = vi.fn()
        global.console.warn = vi.fn()

        vi.mock('./Body', () => {
            return {
              default: () => <div></div>
            };
        });  
    });

    beforeEach(() => {
        ({ rerender } = render(<ThemeProvider><Request tabId={1} updateTabs={() => {}} /></ThemeProvider>))
    })

    afterEach(() => {
        vi.restoreAllMocks()
        localStorage.clear()
    })

    it('should call localStorage.getItem during every render', () => {
        expect(localStorage.getItem).toHaveBeenCalledWith("state")
    })

    it('should store input text in localStorage', () => {
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'text' } });

        const data = localStorage.getItem("state")
        expect(data).not.toBeUndefined()

        const parsedData = JSON.parse(data)
        expect(parsedData?.tabs.find(item => item.url=="text")).not.toBeUndefined()
    })

    it('should store method in localStorage', async () => {
        const popup = screen.getByText('GET').parentElement
        fireEvent.click(popup);

        const post = await screen.findByText('POST')
        fireEvent.click(post)

        const data = localStorage.getItem("state")
        expect(data).not.toBeUndefined()

        const parsedData = JSON.parse(data)
        expect(parsedData?.tabs.find(item => item.method=='POST')).not.toBeUndefined()
    })

    it('should retrieve state when re-rendered', async () => {
        const popup = screen.getByText('GET').parentElement
        fireEvent.click(popup);

        const post = await screen.findByText('POST')
        fireEvent.click(post)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'text' } });

        rerender(<ThemeProvider><Request tabId={1} /></ThemeProvider>)

        const data = localStorage.getItem("state")
        expect(data).not.toBeUndefined()

        const parsedData = JSON.parse(data)
        expect(parsedData?.tabs.find(item => item.url=="text")).not.toBeUndefined()
        expect(parsedData?.tabs.find(item => item.method=='POST')).not.toBeUndefined()
    })
})