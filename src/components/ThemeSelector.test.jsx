import { render, screen } from "@testing-library/react";
import ThemeSelector from "./ThemeSelector.jsx";
import { expect, vi } from "vitest";
import ThemeProvider from "../context/ThemeProvider.jsx";
import { act } from "react";

describe('ThemeSelector', () => {

    beforeAll(() => {
        global.window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: false
        }));
    });

    beforeEach(() => {
        render(<ThemeProvider><ThemeSelector /></ThemeProvider>)
    })

    it('Should add dark class to documentElement when dark button is clicked', async () => {
        const darkButton = screen.getAllByLabelText('Dark')[0]
        
        await act(async () => {
            darkButton.click();
        });

        expect(document.documentElement.classList.contains('dark')).toBeTruthy()
    })

    it('Should remove dark class from documentElement when light button is clicked', async () => {
        const lightButton = screen.getAllByLabelText('Light')[0]

        await act(async () => {
            lightButton.click();
        });

        expect(document.documentElement.classList.contains('dark')).toBeFalsy()
    })

})