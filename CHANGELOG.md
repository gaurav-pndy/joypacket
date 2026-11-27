# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2026-11-27

First public release: **Pixel Pet**.

### Added
- `PixelPet` component: a pixel pet that peeks over the edge of the page,
  sleeps when idle, wakes when clicked, and shows a happy face and a short
  message when clicked while awake. Only the head is clickable.
- Five pets with 18 hand-drawn variants: cat (tabby, siamese, calico, fold),
  dog (shiba, corgi, husky, dalmatian), bunny (lop, dutch, lionhead, wild),
  fox (red, arctic, fennec) and bear (panda, polar, brown, red-panda).
- Named components via `joypacket/pets` (`PixelCat`, `PixelDog`, `PixelBunny`,
  `PixelFox`, `PixelBear`) plus the generic `<PixelPet pet="..." variant="..." />`.
- Placement on any edge (`position`), `size`, `offset`, custom `messages`,
  `messageDuration`, `sleepAfter`, `colors` overrides (hex only) and
  `onInteract`.
- `PixelPetProvider` for a shared, minimal ledge (`ledgeColor`, `ledgeSize`).
- Playful speech bubble that always stays inside the viewport.
- Accessibility: real `<button>`, keyboard support, focus ring, screen-reader
  live region, `prefers-reduced-motion` support.
- Server-side rendering support and `"use client"` for Next.js App Router.
- Styles are injected automatically; `joypacket/style.css` is available for
  strict-CSP setups.
