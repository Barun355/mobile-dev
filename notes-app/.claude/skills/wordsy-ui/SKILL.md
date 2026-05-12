---
name: wordsy-ui
description: Implements UI screens for the Wordsy notes app in Expo / React Native. Use when building or modifying the onboarding, home (notes list), or note editor screens, or any component that should match the Wordsy visual language — purple onboarding, cyan accent cards, pill category tabs, masonry note grid, floating action bar, or the dark text-format toolbar with color picker.
---

# Wordsy UI Skill

Authoritative spec for translating the Wordsy notes app screens into React Native code in this Expo project. Use this skill any time you implement, restyle, or extend a screen so visuals stay consistent across Onboarding, Home, and the Note Editor.

## Tech baseline

- Expo SDK 55, `expo-router` file-based routing, React Native 0.83, React 19.
- Routes live in [src/app/](src/app/). Root stack is [src/app/\_layout.tsx](src/app/_layout.tsx); first screen is [src/app/index.tsx](src/app/index.tsx).
- Use `expo-image` for raster thumbnails, `expo-symbols` for SF Symbols on iOS, `expo-glass-effect` for the bottom action bar's translucent backdrop, `react-native-safe-area-context` for safe areas on every screen.
- Reanimated 4 + gesture-handler are available for the FAB expand, toolbar reveal, and checklist check animations.
- Prefer `Stack.Screen` options over custom headers where possible; the editor screen needs a custom header (cyan band + pill tag + date) so render it inside the screen and hide the native header with `headers: false`.

## Design tokens

Define these once in `src/theme/tokens.ts` (create if missing) and import everywhere — never inline hex.

**Colors**

- `purple.500` `#A855F7` — onboarding background base
- `purple.600` `#9333EA` — onboarding gradient stop / "Get Started" highlight
- `cyan.400` `#22D3EE` — primary accent (To-Do card, editor header band, FAB, highlighted checklist row, "one place" pill)
- `cyan.50` `#ECFEFF` — soft cyan for the locked-note tile background
- `ink.900` `#0F172A` — primary text on light surfaces, "Get Started" button fill
- `ink.700` `#334155` — secondary text
- `ink.500` `#64748B` — tertiary / metadata (counts, dates)
- `surface.0` `#FFFFFF` — cards, sheet
- `surface.50` `#F8FAFC` — Home screen background
- `surface.100` `#F1F5F9` — inactive pill background, locked-note inner
- `toolbar.900` `#1E1E1E` — text-format toolbar background
- Color picker swatches (left → right): white `#FFFFFF`, cyan `#22D3EE`, magenta `#D946EF`, green `#10B981`, plus a conic-gradient "rainbow" puck.

**Radii**

- `radii.sm` 8, `radii.md` 16, `radii.lg` 20, `radii.xl` 28, `radii.pill` 999.
- Note tiles use `radii.lg` (20). Cards (To-Do, editor header pill) use `radii.xl` (28). Pills/buttons use `radii.pill`.

**Spacing**: 4-pt grid — 4, 8, 12, 16, 20, 24, 32. Screen horizontal padding is 20.

**Typography**

- Wordmark "Wordsy" — script display face. Load via `expo-font`; fall back to `'Caveat'` or `'Pacifico'` weight 700 at 36pt on onboarding, 24pt in the home header.
- Headings: system default, weight 700. Editor title is 28/34, home section titles 18/24.
- Body: 16/22 weight 400. Metadata: 13/16 weight 500 in `ink.500`.
- Pill labels: 14/20 weight 600.

**Elevation**: cards use `shadowColor: ink.900`, `shadowOpacity: 0.06`, `shadowRadius: 16`, `shadowOffset: {0, 8}`, `elevation: 4` on Android. The floating action bar gets `shadowOpacity: 0.18`, `shadowRadius: 24`.

## Screens

### 1. Onboarding — `src/app/index.tsx`

Layout (top → bottom inside SafeAreaView with `edges={['top']}`):

1. Status-bar safe area (transparent).
2. "Wordsy" wordmark, centered horizontally, 24pt from top safe area.
3. Hero illustration (notepad + pencil + scribble) — store at `assets/onboarding/hero.png`, render with `expo-image` `contentFit="contain"`, flex 1.
4. Caption block, centered, 32pt above the CTA: two stacked cyan pills containing **"All your ideas"** and **"in one place"** — each pill is `cyan.400` background, `ink.900` text, `radii.pill`, padding `12×20`, weight 700, 22pt. Pills are inline-block; "one place" sits on its own line with the leading "in" rendered as plain white text on the purple background. Easiest implementation: a flex-wrap row.
5. "Get Started" CTA: full-width minus 20px gutters, `ink.900` background, `surface.0` text 16pt weight 700, height 56, `radii.pill`, 24pt above the bottom safe area.

Background: vertical `LinearGradient` from `purple.500` → `purple.600` covering the entire screen. Apply `<StatusBar style="light" />`.

### 2. Home (notes list) — `src/app/(tabs)/index.tsx` or new `src/app/home.tsx`

Header row (sticky, padding 20, `surface.50` background):

- Left: "Wordsy" wordmark 24pt.
- Right: search icon button — circular 40, transparent background, `ink.900` 22pt SF Symbol `magnifyingglass`.

Category pills row beneath header, horizontal `ScrollView` with `showsHorizontalScrollIndicator={false}`:

- Selected pill: `ink.900` background, `surface.0` text + count badge (`surface.0` text inside a smaller `surface.0/15%` bubble).
- Unselected pills: `surface.100` background, `ink.700` text, count in `ink.500`.
- Padding `10×16`, gap 8 between pills.

Content — single-column `FlatList` of cards, then a 2-col masonry of note tiles. Use `numColumns={2}` `FlatList` with `columnWrapperStyle={{ gap: 12 }}` and `contentContainerStyle={{ gap: 12, padding: 20 }}`.

**To-Do card** (full-width, spans both columns — render as the list header):

- `cyan.400` background, `radii.xl`, padding 20.
- Title "To-Do List" 20pt weight 700, `ink.900`.
- Subtitle "Today is Friday, February 1" 13pt, `ink.700`.
- Top-right: arrow-up-right circular button, 36, `ink.900` bg, white icon.
- Three checklist rows: white pill-shaped row, 56 tall, `radii.pill`, padding-left 16, contains a 24px circular checkbox (filled `cyan.400` with white check when done, white with `ink.500` border when not) and label 16pt weight 500.

**Note tile** (fixed width = `(screenWidth - 20*2 - 12) / 2`):

- `surface.0` background, `radii.lg`, padding 12, gap 8, min-height 200.
- Optional thumbnail at top — `aspectRatio: 1.2`, `radii.md`, `expo-image` with `contentFit="cover"`.
- Title 15pt weight 700, max 2 lines.
- Body preview 13pt weight 400, `ink.700`, max 4 lines.
- **Locked variant**: replace body with a centered lock SF Symbol (`lock.fill`, 24pt, `ink.500`) on `cyan.50` background; show overflow `…` button top-right.

**Floating action bar** (absolute, bottom = safe-area + 16, centered):

- Pill container, height 56, padding-horizontal 20, `surface.0` with `expo-glass-effect` `BlurView` underneath at intensity 60.
- Three icons left-to-right with gap 24: `mic.fill` (`ink.700`), large center button (44 circle, `cyan.400`, `plus` icon white 22pt — slight shadow), `sparkles` (`ink.700`).

### 3. Note editor — `src/app/note/[id].tsx`

Stack screen options: `headerShown: false`, `presentation: 'card'`.

Top band — `cyan.400` background extending behind the status bar; safe-area inset on top:

- Row 1 (icons): chevron-left (back), spacer, pencil (edit), x-mark (close). All `ink.900`, 22pt, padding 16.
- Row 2: category pill ("Inspiration ▾") on the left — `surface.0` background, `ink.900` text, `radii.pill`, padding `8×14`, chevron-down 14pt; date on the right ("Friday, January 25") `ink.900` 14pt weight 500.
- Bottom of band has a subtle 16-radius bottom curve — easiest is just `borderBottomLeftRadius`/`borderBottomRightRadius: 24` on the band view.

Body (white background, padding 20):

- Title — 28pt weight 700, line-height 34, `ink.900`. Editable `TextInput` `multiline`.
- Checklist items: each row = checkbox (24 circle, `cyan.400` filled when done) + text. Text supports inline highlight (e.g. "information architecture" with cyan underline + cyan tint background). Implement highlights with a custom `TextInput` rendering or a styled `Text` for read-mode.

**Selection action bubble** (appears on long-press text selection): floating dark pill above the selection, `toolbar.900`, three icons — scissors (cut), copy, translate (`character.book.closed`). Use `Animated.View` with spring scale-in.

**Text format toolbar** (bottom sheet pinned above keyboard):

- Container `toolbar.900`, `radii.lg` top corners only, padding 16, gap 16.
- Header row: "Text format" label `surface.0` 13pt weight 600.
- **Color row**: filled white check on the active swatch, then 5 swatch circles (28 dia) — white, cyan, magenta, green, conic-rainbow. Tappable; selecting updates a `selectedColor` state.
- **Style row**: 5 evenly-spaced glyph buttons — `I` italic, `U` underline, `B` bold, `Tt` size, `99` quote — each 44 sq, `surface.0` glyph, no background until pressed (`white/10` background on press).
- **Alignment row**: 4 buttons — left, center, right, justify — same sizing.
- Use `KeyboardAvoidingView` with `behavior="padding"` so the toolbar lifts with the keyboard.

## Implementation rules

- **Always pull from tokens**, never hard-code colors, radii, or font sizes inline. If a value isn't in tokens, add it there first.
- **SafeAreaView per screen.** Onboarding: `edges={['top']}` (CTA hugs bottom). Home and Editor: `edges={['top']}`; bottom is left to the floating bar / keyboard.
- **Use `expo-image`**, never `Image` from `react-native`, for thumbnails and the onboarding hero — caching + transitions matter on the masonry grid.
- **Hit targets ≥ 44×44.** Pills, checkboxes, and toolbar buttons must meet this even when the visual is smaller (use `hitSlop`).
- **No inline anonymous styles** in render — use `StyleSheet.create` per component. Group components by screen under `src/components/<screen>/` (e.g. `src/components/home/NoteTile.tsx`).
- **Dynamic Type / scaling**: don't disable font scaling globally, but cap the wordmark and editor title at `maxFontSizeMultiplier={1.3}` so the layout doesn't break.
- **Dark mode**: out of scope for v1 — comment any token reference that would need a dark counterpart so future-you can find them with `grep "// dark:"`.
- **Animations**: use `react-native-reanimated` v4 worklets. Keep durations 180–240 ms with `Easing.out(Easing.quad)` so the app feels snappy.

## Asset checklist

Place under [assets/](assets/):

- `onboarding/hero.png` — 1024×1024 PNG of the notepad-and-pencil illustration with transparent background.
- `notes/geometric.png`, `notes/lemon-pie.png` — 600×600 sample thumbnails for design QA.
- `fonts/Caveat-Bold.ttf` (or chosen script font) — register in [src/app/\_layout.tsx](src/app/_layout.tsx) via `useFonts` and gate `<Stack />` behind the loaded state with `expo-splash-screen.preventAutoHideAsync()`.

## Definition of done for each screen

A screen is "done" when:

1. It renders pixel-close to the reference (spot-check spacing with the 4-pt grid).
2. All colors / sizes route through `src/theme/tokens.ts`.
3. It works on iPhone SE (smallest) through Pro Max — wrap text, no clipped pills.
4. Tab order / `accessibilityLabel`s are set on every interactive element (back, edit, close, checkbox, FAB items, toolbar buttons).
5. You have manually loaded the route in `expo start` and exercised the golden path: tap Get Started → see Home → tap a note → see editor → long-press text → see toolbar.
