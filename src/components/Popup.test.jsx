import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Popup from "./Popup";
import userEvent from "@testing-library/user-event";

describe('Popup', () => {

    beforeEach(() => {
        render(<Popup title={"button"}><div>hii</div></Popup>)
    })

    it('should render child when button is clicked', async () => {
        const button = screen.getByRole("button", { name: /button/i });
    
        await userEvent.click(button);

        const popupContent = await screen.findByText(/hii/i);
        expect(popupContent).toBeInTheDocument();
    })

})