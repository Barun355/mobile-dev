# Login Screen — Mobile Dev Assignment

A React Native (Expo) implementation of a multi-screen authentication flow built from design references. The goal of this assignment was to practice layout, component structuring, and UI implementation by translating designs into pixel-accurate screens.

## Tech Stack

- **Expo** (SDK 55) + **expo-router** for file-based navigation
- **React Native** with `StyleSheet`
- **@expo/vector-icons** (FontAwesome + Feather)
- **TypeScript**

## Screens

|                  Sign In                   |                  Sign Up                   |                  Forgot Password                   |
| :----------------------------------------: | :----------------------------------------: | :------------------------------------------------: |
| ![Sign In](assets/screenshots/signin.jpeg) | ![Sign Up](assets/screenshots/signup.jpeg) | ![Forgot Password](assets/screenshots/forgot.jpeg) |

### Sign In (`src/app/index.tsx`)

Email + password form with leading icons, focused-state border, social sign-in row (Facebook / Google / Instagram), and links to Sign Up and Forgot Password.

### Sign Up (`src/app/signup.tsx`)

Email, Password, and Password Confirmation fields with show/hide toggle, controlled form state, and basic client-side validation (empty fields + password match) before navigating to the dashboard.

### Forgot Password (`src/app/forgotpassword.tsx`)

Three selectable reset methods (Email, 2FA, Google Authenticator) rendered as cards with selected-state highlighting, a back button, and a primary "Reset Password" action.

## Theming

A small color token module (`src/colors.ts`) drives the entire app. The screens were originally built against a lime-green reference and re-themed to orange by changing only two tokens:

```ts
primary: "#F97316",
primaryDark: "#EA580C",
```

## Getting Started

```bash
npm install
npm run start     # Expo dev server
npm run android   # Run on Android
npm run ios       # Run on iOS
npm run web       # Run on web
```
