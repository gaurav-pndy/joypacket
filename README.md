# joypacket

## Pixel Pet

[Live demo](https://gaurav-pndy.github.io/joypacket/) · [Changelog](CHANGELOG.md)

A small pixel pet that peeks over the edge of your page. It sleeps when idle,
wakes up when clicked, and says something when clicked while awake.

```tsx
import { PixelDog } from "joypacket/pets";

<PixelDog variant="corgi" position="bottom-right" messages={["Hi!"]} />
```

Install with `npm i joypacket` (React 18+). Nothing else is needed: the
styles are injected automatically the first time a pet is imported.

**Next.js / SSR:** the components are marked `"use client"` and are safe to
render on the server, so you can use them straight from a Server Component or
a layout. **Strict CSP?** Import `joypacket/style.css` yourself instead of
relying on the injected `<style>` tag.

Every pet has its own component in `joypacket/pets` (`PixelCat`, `PixelDog`,
`PixelBunny`, `PixelFox`, `PixelBear`). They
are thin wrappers around the generic `<PixelPet pet="cat" />`, which is the
one to use when the pet is chosen at runtime (e.g. a settings screen).

```tsx
<PixelPetProvider ledgeColor="#687386" ledgeSize={5}>
  <PixelPet pet="cat" position="bottom-right" />
</PixelPetProvider>
```

| Prop | Default | Notes |
| --- | --- | --- |
| `pet` | `"cat"` | Which character to show (see `PIXEL_PET_NAMES`). Not needed on `PixelCat`. |
| `variant` | pet's first | A different look with its own drawing (see the table below). |
| `colors` | – | Tweak the variant's colours (`#rgb`/`#rrggbb`); shades are derived. Slots: `fur`, `belly`, `markings`, `eyes`, `accent` (what each means depends on the variant). |
| `position` | `"bottom-right"` | Edge + spot along it, e.g. `top-left`, `left-center`. |
| `size` | `100` | px. |
| `offset` | `24` | px along the edge. |
| `messages` | pet's built-in lines | Replace what it says. `[]` = silent. |
| `messageDuration` | `3500` | ms. |
| `sleepAfter` | `30000` | ms of idle time; `null` = never sleeps. |
| `onInteract` | – | Called on every click. |

### Pets and variants

| Pet | Variants |
| --- | --- |
| `cat` | `tabby` (default), `siamese`, `calico`, `fold` |
| `dog` | `shiba` (default), `corgi`, `husky`, `dalmatian` |
| `bunny` | `lop` (default), `dutch`, `lionhead`, `wild` |
| `fox` | `red` (default), `arctic`, `fennec` |
| `bear` | `panda` (default), `polar`, `brown`, `red-panda` |

`PixelPetProvider` draws one shared ledge per active edge (`ledgeColor`,
`ledgeSize`, default 5px). Without a provider, `PixelPet` draws its own.

## Adding a pet

1. Create `src/components/PixelPet/pets/<name>.tsx` exporting a
   `PixelPetDefinition`: built-in messages, `variants` and `resolvePalette`.
   Each variant has its own `Art` (a separate drawing) plus default colours.
   Follow the canvas rules in `pets/contract.ts`; `pets/cat/` is the template
   (one file per breed; `pets/shared.tsx` and `pets/palette.ts` hold the shared pieces).
2. Register it in `pets/index.ts`.
3. Add a wrapper component (e.g. `PixelOtter`) to `src/pets.tsx`.

A variant is a different drawing (breed, species form, pattern), not a
recolour. Colours are only its defaults; users can tweak them with `colors`.

Mood animations (blink, tail sway, bounce, breathing) come from CSS classes
(`jp-pet-head`, `jp-pet-eyes`, `jp-pet-paws`, `jp-pet-tail`, ...) so a new
pet only tags the parts it has.

## Accessibility

- The pet's head is a real `<button>` (keyboard focusable, Enter/Space work,
  visible focus ring) labelled "Say hello to the pixel cat" / "Wake up the
  pixel cat".
- Messages are announced to screen readers through a polite live region; the
  visual bubble itself is hidden from assistive tech so nothing is read twice.
- `prefers-reduced-motion` turns the animations off.

## Development

```bash
npm run dev        # demo page
npm test           # vitest + Testing Library (every pet and variant is rendered)
npm run typecheck
npm run build
```
