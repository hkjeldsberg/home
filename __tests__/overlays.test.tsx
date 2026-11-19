import { act, render } from "@testing-library/react";
import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import CvOverlay from "@/components/CvOverlay";
import ContactOverlay from "@/components/ContactOverlay";
import MacbookOverlay from "@/components/MacbookOverlay";
import ResearchOverlay from "@/components/ResearchOverlay";

type Nav = ReturnType<typeof useNavigation>;

function Capture({ onNav }: { onNav: (n: Nav) => void }) {
  onNav(useNavigation());
  return null;
}

function setup(Overlay: React.ComponentType) {
  let nav!: Nav;
  const utils = render(
    <NavigationProvider>
      <Capture onNav={(n) => (nav = n)} />
      <Overlay />
    </NavigationProvider>,
  );
  return { ...utils, nav: () => nav };
}

const cases: [string, React.ComponentType, keyof Nav][] = [
  ["CvOverlay", CvOverlay, "setMugFocused"],
  ["ContactOverlay", ContactOverlay, "setIphoneFocused"],
  ["MacbookOverlay", MacbookOverlay, "setMacbookFocused"],
  ["ResearchOverlay", ResearchOverlay, "setHeartFocused"],
];

describe.each(cases)("%s", (_, Overlay, setter) => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const focus = (nav: Nav, on: boolean) => act(() => (nav[setter] as (b: boolean) => void)(on));

  it("renders nothing until its object is focused", () => {
    const { container } = setup(Overlay);
    expect(container).toBeEmptyDOMElement();
  });

  it("mounts on focus and unmounts on blur", () => {
    const { container, nav } = setup(Overlay);
    focus(nav(), true);
    expect(container).not.toBeEmptyDOMElement();
    focus(nav(), false);
    expect(container).toBeEmptyDOMElement();
  });

  it("re-opens cleanly after being closed", () => {
    const { container, nav } = setup(Overlay);
    focus(nav(), true);
    act(() => jest.advanceTimersByTime(1000));
    focus(nav(), false);
    focus(nav(), true);
    expect(container).not.toBeEmptyDOMElement();
  });
});
