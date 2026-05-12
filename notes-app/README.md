# Notes App — Mobile Dev Assignment

A React Native (Expo) notes application with an onboarding splash, a home dashboard featuring category pills and a to-do widget, and a note editor with view/edit toggle — built from design references as part of a mobile development assignment.

## Project Description

This project is a React Native (Expo) implementation of a three-screen notes app — **Onboarding**, **Home**, and **New Note** — built from provided design references.

The focus of the assignment was practicing **layout composition**, **component structuring**, and **theme-driven styling**, so the app uses only React Native's built-in components and `StyleSheet` (with `StyleSheet.compose` for dynamic token merges) rather than a UI library.

### Highlights

- **File-based routing** with `expo-router` (`/`, `/home`, `/new`).
- **Light / dark theme tokens** via `useColorScheme` — a single `useColors()` hook drives every surface, ink, and accent color across the app.
- **Category pills** — horizontally scrollable filter row with active-state badge and count.
- **To-do widget** — cyan accent card with interactive checkboxes (toggle done state).
- **Floating action bar** — dark pill toolbar with mic, sparkles, and a centered "+" FAB to create a new note.
- **Note editor** with view/edit toggle, category dropdown, and today's date display.

### Project Structure

```
src/
├── app/
│   ├── _layout.tsx        # Root Stack navigator
│   ├── index.tsx           # Onboarding screen
│   ├── home.tsx            # Home dashboard
│   └── new.tsx             # New Note editor
├── theme/
│   ├── colors.ts           # Light & dark color tokens
│   └── useColors.ts        # Theme-aware color hook
├── constants.ts            # Categories & seed to-do data
└── util.ts                 # Date formatting helper
```

## Tech Stack

- **Expo** (SDK 55) + **expo-router** for file-based navigation
- **React Native** built-in components with `StyleSheet`
- **Zustand** for state management
- **react-native-reanimated** + **react-native-gesture-handler** for animations & gestures
- **react-native-element-dropdown** for the category picker
- **@expo/vector-icons** (Feather + Ionicons)
- **TypeScript**

## Demo

https://github.com/user-attachments/assets/demo.mp4

![Demo](demo.mp4)

## Screens

### Onboarding (`src/app/index.tsx`)

Full-bleed background image with a cyan caption card ("All your ideas in one place") and a pill-shaped "Get Started" CTA that navigates to the home screen.

### Home (`src/app/home.tsx`)

Top bar with the "Notesy" wordmark and a search icon. Below it, a horizontally scrollable row of category pills (All notes, Inspiration, Work, Personal) with active-state count badge. The main body features a cyan to-do card with interactive checkboxes. A floating dark action bar at the bottom holds mic, plus, and sparkles buttons.

### New Note (`src/app/new.tsx`)

Cyan header with back arrow, edit/save toggle button, and close icon. A category dropdown and today's date sit below. The body area switches between a read-only view and editable `TextInput` fields for the title and content based on the view/edit toggle.

## Theming

A small color-token module (`src/theme/colors.ts`) provides matching `light` and `dark` palettes. The `useColors()` hook in `src/theme/useColors.ts` reads the system color scheme and returns the correct set of tokens:

```ts
export const colors = {
  dark: {
    purple:  { 500: "#C084FC", 600: "#A855F7" },
    cyan:    { 50: "#164E63", 400: "#0E7490" },
    ink:     { 500: "#94A3B8", 700: "#E2E8F0", 900: "#F8FAFC" },
    surface: { 0: "#1E293B", 50: "#0F172A", 100: "#334155" },
    // ...
  },
  light: {
    purple:  { 500: "#A855F7", 600: "#9333EA" },
    cyan:    { 50: "#ECFEFF", 400: "#22D3EE" },
    ink:     { 500: "#64748B", 700: "#334155", 900: "#0F172A" },
    surface: { 0: "#FFFFFF", 50: "#F8FAFC", 100: "#F1F5F9" },
    // ...
  },
} as const;
```

## Getting Started

```bash
npm install
npm run start     # Expo dev server
npm run android   # Run on Android
npm run ios       # Run on iOS
npm run web       # Run on web
```
