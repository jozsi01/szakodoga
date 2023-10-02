import { rawErrorMessageToNormal } from "./ErrorMessageParser";

test('Testing ErrorMessageParser gives back the right converted error message',()=>{
    const parsedErrorMessage = rawErrorMessageToNormal('error_board_not_found');
    expect(parsedErrorMessage).toBe("Board not found");
})