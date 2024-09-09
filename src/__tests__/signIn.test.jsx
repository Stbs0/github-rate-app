import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import SignIn, { SignInContainer } from "../components/SignIn";

describe("test sign in", () => {
  it("test sign in", async () => {
    const onSubmit = jest.fn();
    render(<SignInContainer onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
    fireEvent.press(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      // expect the onSubmit function to have been called once and with a correct first argument
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
