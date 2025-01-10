import { render, screen } from "@testing-library/react";
import ThemeSelector from "./ThemeSelector";

describe('ThemeSelector', () => {

    beforeEach(() => {
        render(<ThemeSelector />)
    })

    it('Should add dark class to documentElement when dark button is clicked', async () => {
        const darkButton = screen.getAllByLabelText('Dark')[0]
        darkButton.click()

        expect(document.documentElement.classList.contains('dark')).toBeTruthy()
    })

    it('Should remove dark class from documentElement when light button is clicked', async () => {
        const lightButton = screen.getAllByLabelText('Light')[0]
        lightButton.click()

        expect(document.documentElement.classList.contains('dark')).toBeFalsy()
    })

})