import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, vi } from "vitest";
import Response from "./Response";

describe('Response', () => {

    beforeAll(() => {
        vi.mock('react', async () => ({
            ...await vi.importActual('react'),
            useContext: vi.fn().mockImplementation(() => ({}))
        }))

        vi.mock('../components/Editor', () => ({
            default: () => {}
        }))

    })

    beforeEach(() => {
        const response = {}
        render(<Response response={response} />)
        vi.resetAllMocks()
    })

    it('should copy text when copy button is clicked', () => {
        global.navigator.clipboard = {
            writeText: vi.fn().mockResolvedValue('mock')
        }
        
        Object.defineProperty(HTMLDivElement.prototype, 'animate', {
            value: vi.fn(),
            writable: true
        })

        const copy = screen.getByText('content_copy')
        fireEvent.click(copy)
        
        expect(global.navigator.clipboard.writeText).toHaveBeenCalled()
    })
})