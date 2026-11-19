import { act, fireEvent, render, screen } from "@testing-library/react";
import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import MacbookOverlay from "@/components/MacbookOverlay";
import { SPANISH_SUITE, WEB_PROJECTS } from "@/lib/projects";

function OpenOnMount() {
  const { setMacbookFocused } = useNavigation();
  return <button onClick={() => setMacbookFocused(true)}>open</button>;
}

function setup() {
  jest.useFakeTimers();
  render(
    <NavigationProvider>
      <OpenOnMount />
      <MacbookOverlay />
    </NavigationProvider>,
  );
  fireEvent.click(screen.getByText("open"));
  act(() => jest.advanceTimersByTime(1000));
}

afterEach(() => jest.useRealTimers());

const suiteNames = WEB_PROJECTS.filter((p) => SPANISH_SUITE.includes(p.id)).map((p) => p.name);

it("every suite id exists in WEB_PROJECTS", () => {
  expect(suiteNames).toHaveLength(SPANISH_SUITE.length);
});

it("collapses the Spanish suite into one card that expands", () => {
  setup();
  const suite = screen.getByRole("button", { name: /Spanish learning suite/ });
  expect(suite).toHaveAttribute("aria-expanded", "false");
  suiteNames.forEach((n) => expect(screen.queryByRole("heading", { name: n })).toBeNull());

  fireEvent.click(suite);
  expect(suite).toHaveAttribute("aria-expanded", "true");
  suiteNames.forEach((n) => expect(screen.getByRole("heading", { name: n })).toBeInTheDocument());
});

it("opens a detail dialog on card click; Esc closes only the dialog", () => {
  setup();
  fireEvent.click(screen.getByRole("heading", { name: "Middah" }).closest("button")!);
  const dialog = screen.getByRole("dialog", { name: "Middah" });
  expect(dialog).toHaveTextContent("Open site");

  const overlayEsc = jest.fn();
  window.addEventListener("keydown", overlayEsc);
  fireEvent.keyDown(window, { key: "Escape" });
  window.removeEventListener("keydown", overlayEsc);

  expect(screen.queryByRole("dialog")).toBeNull();
  expect(overlayEsc).not.toHaveBeenCalled();
  expect(screen.getByText("Projects")).toBeInTheDocument();
});
