import { useState } from "react";
import { PixelPet } from "../src/components/PixelPet/PixelPet";
import { PixelPetProvider } from "../src/components/PixelPet/PixelPetEdge";
import {
  PETS,
  PIXEL_PET_NAMES,
  getPixelPetVariants,
} from "../src/components/PixelPet/pets";
import type {
  PixelPetName,
  PixelPetVariant,
} from "../src/components/PixelPet/pets";
import type { PixelPetPosition } from "../src/components/PixelPet/types";

const DEFAULT_DEMO_MESSAGES = [
  "Hello there! 👋",
  "Need a little break?",
  "Nice website!",
  "Psst... you're awesome!",
];

const positions: PixelPetPosition[] = [
  "bottom-left",
  "bottom-center",
  "bottom-right",
  "top-left",
  "top-center",
  "top-right",
  "left-top",
  "left-center",
  "left-bottom",
  "right-top",
  "right-center",
  "right-bottom",
];

export default function Demo() {
  const [pet, setPet] = useState<PixelPetName>("cat");
  const [variant, setVariant] = useState<string>(PETS.cat.defaultVariant);
  const [furOverride, setFurOverride] = useState<string | null>(null);
  const [position, setPosition] = useState<PixelPetPosition>("bottom-right");

  const [size, setSize] = useState(100);
  const [ledgeSize, setLedgeSize] = useState(5);
  const [draft, setDraft] = useState("");
  const [ledgeColor, setLedgeColor] = useState("#687386");
  const [interactions, setInteractions] = useState(0);

  const [messages, setMessages] = useState(DEFAULT_DEMO_MESSAGES);

  const addMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, text]);
    setDraft("");
  };

  return (
    <main className="demo">
      <header className="demo-header">
        <a className="brand" href="#">
          joypacket<span>.</span>
        </a>
        <span className="version">PLAYGROUND / 0.1.0</span>
      </header>

      <section className="hero">
        <div className="eyebrow">
          <span className="status-dot" />
          INTERACTIVE COMPONENTS
        </div>

        <h1>
          Little packets
          <br />
          of <span>joy.</span>
        </h1>

        <p>
          Small, delightful interactions that make websites feel a little more
          alive.
        </p>

        <div className="hero-tags">
          <span>React</span>
          <span>TypeScript</span>
          <span>Open source</span>
        </div>
      </section>

      <section className="playground">
        <div className="section-heading">
          <div>
            <span className="section-label">COMPONENT 01</span>
            <h2>Pixel Pet</h2>
          </div>

          <span className="live-indicator">
            <span className="status-dot" />
            LIVE PREVIEW
          </span>
        </div>

        <div className="preview">
          <div className="preview-grid" />

          <div className="preview-content">
            <span className="preview-caption">YOUR LITTLE COMPANION</span>
            <h3>Go ahead, say hello.</h3>
            <p>
              The pet lives on the edge of this page. Hover its head, click it,
              or leave it alone and it will fall asleep.
            </p>
          </div>

        </div>

        <PixelPetProvider ledgeColor={ledgeColor} ledgeSize={ledgeSize}>
          <PixelPet
            pet={pet}
            variant={variant as PixelPetVariant}
            colors={furOverride ? { fur: furOverride } : undefined}
            position={position}
            size={size}
            messages={messages}
            onInteract={() => setInteractions((count) => count + 1)}
          />
        </PixelPetProvider>

        <div className="controls">
          <div className="control-group">
            <label>PET</label>

            <div className="position-options">
              {PIXEL_PET_NAMES.map((name) => (
                <button
                  key={name}
                  className={pet === name ? "active" : ""}
                  onClick={() => {
                    setPet(name);
                    setVariant(PETS[name].defaultVariant);
                    setFurOverride(null);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
            
          </div>

          <div className="control-group">
            <label>VARIANT</label>

            <div className="position-options">
              {getPixelPetVariants(pet).map((name) => (
                <button
                  key={name}
                  className={variant === name ? "active" : ""}
                  onClick={() => {
                    setVariant(name);
                    setFurOverride(null);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="message-add">
              <input
                type="color"
                className="ledge-color-input"
                aria-label="Custom fur colour"
                value={furOverride ?? "#4b5775"}
                onChange={(event) => setFurOverride(event.target.value)}
              />
              <button type="button" onClick={() => setFurOverride(null)}>
                Reset fur
              </button>
            </div>
            <p className="hint">
              Variants are curated looks. <code>colors</code> tweaks a few
              base colours on top.
            </p>
          </div>

          <div className="control-group">
            <label>POSITION</label>

            <div className="position-options">
              {positions.map((item) => (
                <button
                  key={item}
                  className={position === item ? "active" : ""}
                  onClick={() => setPosition(item)}
                >
                  {item.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">
              <label>SIZE</label>
              <span>{size}px</span>
            </div>

            <input
              type="range"
              min="64"
              max="160"
              step="4"
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
            />
          </div>


          <div className="control-group">
            <div className="control-label">
              <label>LEDGE SIZE</label>
              <span>{ledgeSize}px</span>
            </div>

            <input
              type="range"
              min="2"
              max="16"
              step="1"
              value={ledgeSize}
              onChange={(event) => setLedgeSize(Number(event.target.value))}
            />
          </div>

          <div className="control-group">
            <div className="control-label">
              <label htmlFor="ledge-color">LEDGE COLOR</label>
              <span>{ledgeColor.toUpperCase()}</span>
            </div>
            <input
              id="ledge-color"
              className="ledge-color-input"
              type="color"
              value={ledgeColor}
              onChange={(event) => setLedgeColor(event.target.value)}
              aria-label="Choose ledge color"
            />
          </div>

          <div className="control-group">
            <div className="control-label">
              <label>INTERACTIONS</label>
              <span>{interactions}</span>
            </div>
            <p className="hint">Click the pet to increase this counter.</p>
          </div>

          <div className="control-group">
            <label>MESSAGES</label>

            <div className="message-list">
              {messages.map((message, index) => (
                <div className="message-item" key={`${message}-${index}`}>
                  <span>{message}</span>
                  <button
                    aria-label={`Remove message ${message}`}
                    onClick={() =>
                      setMessages((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <form
              className="message-add"
              onSubmit={(event) => {
                event.preventDefault();
                addMessage();
              }}
            >
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Add your own message…"
                aria-label="New message"
                maxLength={80}
              />
              <button type="submit">Add</button>
            </form>

            <button
              className="reset-button"
              onClick={() => setMessages(DEFAULT_DEMO_MESSAGES)}
            >
              Reset messages
            </button>
          </div>
        </div>
      </section>

      <footer className="demo-footer">
        <span>JOY PACKET · MADE WITH A LITTLE LOVE</span>
        <span>MORE DELIGHT COMING SOON.</span>
      </footer>
    </main>
  );
}
