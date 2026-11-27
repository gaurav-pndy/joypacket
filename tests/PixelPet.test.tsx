import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  PIXEL_PET_NAMES,
  PixelPet,
  getPixelPetVariants,
} from "../src/pixel-pet";
import { PixelBear, PixelCat, PixelDog } from "../src/pets";

const head = () => screen.getByRole("button");
const live = () => screen.getByRole("status");
const back = (c: HTMLElement) => c.querySelector<HTMLElement>(".jp-pixel-pet--back")!;

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("PixelPet", () => {
  it("renders a cat tabby by default with an accessible head button", () => {
    const { container } = render(<PixelPet />);
    expect(back(container).dataset.pet).toBe("cat");
    expect(back(container).dataset.variant).toBe("tabby");
    expect(head().getAttribute("aria-label")).toMatch(/say hello to the pixel cat/i);
  });

  it("a click on an awake pet shows a happy face and one of the messages", () => {
    const { container } = render(<PixelPet messages={["Boop!"]} />);
    fireEvent.click(head());
    expect(back(container).dataset.mood).toBe("happy");
    expect(live().textContent).toBe("Boop!");
  });

  it("goes back to normal after the happy face and hides the message", () => {
    const { container } = render(<PixelPet messages={["Boop!"]} messageDuration={2000} />);
    fireEvent.click(head());
    act(() => void vi.advanceTimersByTime(1300));
    expect(back(container).dataset.mood).toBe("idle");
    act(() => void vi.advanceTimersByTime(800));
    expect(live().textContent).toBe("");
  });

  it("falls asleep when idle and a click only wakes it up", () => {
    const { container } = render(<PixelPet messages={["Boop!"]} sleepAfter={1000} />);
    act(() => void vi.advanceTimersByTime(1100));
    expect(back(container).dataset.mood).toBe("sleeping");
    expect(head().getAttribute("aria-label")).toMatch(/wake up/i);

    fireEvent.click(head());
    expect(back(container).dataset.mood).toBe("curious");
    expect(live().textContent).toBe("");

    fireEvent.click(head());
    expect(back(container).dataset.mood).toBe("happy");
    expect(live().textContent).toBe("Boop!");
  });

  it("never sleeps when sleepAfter is null", () => {
    const { container } = render(<PixelPet sleepAfter={null} />);
    act(() => void vi.advanceTimersByTime(10 * 60 * 1000));
    expect(back(container).dataset.mood).toBe("idle");
  });

  it("stays silent with messages={[]} but still reacts", () => {
    const { container } = render(<PixelPet messages={[]} />);
    fireEvent.click(head());
    expect(back(container).dataset.mood).toBe("happy");
    expect(live().textContent).toBe("");
    expect(container.querySelector(".jp-pixel-pet__bubble")).toBeNull();
  });

  it("calls onInteract on every click", () => {
    const onInteract = vi.fn();
    render(<PixelPet onInteract={onInteract} sleepAfter={null} />);
    fireEvent.click(head());
    fireEvent.click(head());
    expect(onInteract).toHaveBeenCalledTimes(2);
  });

  it("falls back to the default variant and pet when given unknown names", () => {
    const { container } = render(
      // @ts-expect-error deliberately invalid at the type level
      <PixelPet pet="dog" variant="not-a-breed" />,
    );
    expect(back(container).dataset.variant).toBe("shiba");
    cleanup();
    const second = render(
      // @ts-expect-error deliberately invalid at the type level
      <PixelPet pet="dragon" />,
    );
    expect(back(second.container).dataset.pet).toBe("dragon");
    expect(second.container.querySelector("svg")).not.toBeNull();
  });

  it("applies valid hex colour overrides and ignores invalid ones", () => {
    const { container } = render(<PixelPet colors={{ fur: "#123456" }} />);
    expect(container.innerHTML.toLowerCase()).toContain("#123456");
    cleanup();
    const bad = render(<PixelPet colors={{ fur: "url(javascript:alert(1))" }} />);
    expect(bad.container.innerHTML).not.toContain("javascript");
  });

  it("the named wrappers pick the right pet", () => {
    const cat = render(<PixelCat variant="siamese" />);
    expect(back(cat.container).dataset).toMatchObject({ pet: "cat", variant: "siamese" });
    cleanup();
    const dog = render(<PixelDog />);
    expect(back(dog.container).dataset.pet).toBe("dog");
    cleanup();
    const bear = render(<PixelBear variant="polar" />);
    expect(back(bear.container).dataset.variant).toBe("polar");
  });

  it("renders every pet and variant in every mood without crashing", () => {
    let count = 0;
    for (const pet of PIXEL_PET_NAMES) {
      for (const variant of getPixelPetVariants(pet)) {
        const { container, unmount } = render(
          <PixelPet pet={pet} variant={variant} sleepAfter={500} messages={["Hi"]} />,
        );
        expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(2);
        fireEvent.click(head()); // happy
        act(() => void vi.advanceTimersByTime(1300));
        act(() => void vi.advanceTimersByTime(600)); // sleeping
        expect(back(container).dataset.mood).toBe("sleeping");
        unmount();
        count++;
      }
    }
    expect(count).toBeGreaterThanOrEqual(18);
  });

  it("can be rendered on the server", () => {
    const html = renderToString(<PixelPet pet="fox" variant="arctic" position="left-center" />);
    expect(html).toContain("jp-pixel-pet");
  });
});
