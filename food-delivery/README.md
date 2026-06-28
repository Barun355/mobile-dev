# 🍔 Tastio — Food Delivery App

A React Native (Expo Router) food-delivery app built to demonstrate **nested navigation**:
Stack + Bottom Tabs + Drawer, with persisted local authentication and deep linking.

> Built with **Expo SDK 56** and **Expo Router** (file-based React Navigation).

---

## 📋 Submission Links

| Item | Link |
| --- | --- |
| GitHub repository | `https://github.com/<your-username>/tastio` _(replace)_ |
| 2-minute demo video | `https://<your-demo-video-link>` _(replace)_ |

---

## 1. Project Overview

Tastio is a food-ordering app where a user:

1. Sees an **onboarding** carousel on first launch.
2. **Signs up** (data stored locally) or **signs in**, then lands on the dashboard.
3. Browses **Home / Search / Categories**, opens a **Restaurant Detail** screen (via route params), and adds meals to a **Cart** (live header badge).
4. Opens a **Drawer** from the Profile tab (avatar + name, My Orders / Settings / Help / Logout).
5. Can open a restaurant directly via a **deep link** (`tastio://restaurant/<id>`).
6. **Stays logged in / out** correctly across app reloads (auth state persisted with AsyncStorage).

State is managed with **Zustand** (cart, favorites, auth). UI is a small hand-rolled design system (theme tokens + reusable `ui/` components) with light/dark support.

---

## 2. Tech Stack

| Area | Library |
| --- | --- |
| Framework | Expo SDK `~56`, React Native `0.85`, React `19` |
| Navigation | **Expo Router** `~56.2` (Stack), `@react-navigation/drawer` `7` (Drawer), Expo Router Tabs |
| State | **Zustand** `5` |
| Persistence | `@react-native-async-storage/async-storage` `2` (via Zustand `persist`) |
| Icons | `@expo/vector-icons` (Ionicons) |
| Images | `expo-image` |
| Gestures / Animation | `react-native-gesture-handler`, `react-native-reanimated` `4` |
| Safe area | `react-native-safe-area-context` |
| Language | TypeScript |

---

## 3. How to Run Locally

```bash
# 1. Install dependencies (project uses Bun; npm/yarn also work)
bun install        # or: npm install

# 2. Start the dev server
bun start          # or: npx expo start

# 3. Open the app
#    - Press "a" for Android emulator / "i" for iOS simulator
#    - or scan the QR code with the Expo Go app (SDK 56)
```

Type-check & lint:

```bash
bunx tsc --noEmit
bun run lint
```

> **Custom-scheme deep links (`tastio://…`) require a development build**, not Expo Go.
> See [§6 Deep Linking](#6-deep-linking-setup) for how to test in each environment.
>
> ```bash
> npx expo run:android   # or run:ios — builds a native dev client
> ```

---

## 4. Navigation Structure

The app uses **three nested navigators**: a root **Stack** → a **Drawer** → a **Bottom Tabs** navigator, with the Restaurant Detail screen nested in the tabs.

```
Root Stack  (app/_layout.tsx)  — auth gate + splash
│
├── index                      "/"            → Onboarding screen 1
├── (onboarding)/              Stack group    → onboarding-2, onboarding-3
├── (auth)/                    Stack group    → sign-in, sign-up
│
└── (dashboard)/  ─────────────  Drawer  (app/(dashboard)/_layout.tsx)
        │                        custom content: avatar + name,
        │                        My Orders · Settings · Help · Logout
        │
        ├── (tabs)/  ──────────  Bottom Tabs  (app/(dashboard)/(tabs)/_layout.tsx)
        │     ├── home          Home tab
        │     ├── search        Search tab
        │     ├── categories    Categories tab
        │     ├── profile       Profile tab  → opens the Drawer (not a screen)
        │     ├── cart          href:null     → reachable via header cart badge
        │     └── restaurant/[id]   href:null → Restaurant Detail (route param)
        │
        ├── orders              Drawer screen (My Orders)
        ├── settings            Drawer screen
        └── help                Drawer screen
```

### Navigation diagram

```mermaid
graph TD
    A[Root Stack] --> B["/ index — Onboarding"]
    A --> C["(onboarding) — onboarding 2/3"]
    A --> D["(auth) — Sign In / Sign Up"]
    A --> E["(dashboard) — Drawer"]

    E -->|drawerContent| E1[Avatar + Name · My Orders · Settings · Help · Logout]
    E --> F["(tabs) — Bottom Tabs"]
    E --> G[orders]
    E --> H[settings]
    E --> I[help]

    F --> F1[Home]
    F --> F2[Search]
    F --> F3[Categories]
    F --> F4[Profile → opens Drawer]
    F --> F5["restaurant/[id] — Detail (param)"]
    F --> F6["cart — hidden tab, header badge"]

    F1 -->|router.push restaurant/[id]| F5
    F1 -->|cart badge| F6
```

**Why this shape?** Tabs are nested **inside** the Drawer so the drawer can slide over the whole tabbed experience, and the Restaurant Detail / Cart screens live **inside the Tabs group** (`href: null`) so they push on top of the Home flow while keeping the tab context — exactly the "Restaurant Stack nested inside the Home tab" requirement.

### Header customization & back navigation
- Tabs and groups run with `headerShown: false`; screens render their own headers (`ScreenHeader`, the restaurant hero with an overlaid back button).
- Restaurant Detail sets its title via the route and shows a **custom back button** that uses `router.canGoBack()` and falls back to `/home` for cold deep-link opens.
- The tab bar is hidden on Restaurant Detail (`tabBarStyle: { display: "none" }`).

### Programmatic navigation used
| API | Where |
| --- | --- |
| `router.push({ pathname: "/restaurant/[id]", params: { id } })` | Home / Search / Categories → Restaurant Detail (**params**) |
| `router.replace("/home")` | After login / sign-up (replace so you can't go "back" into auth) |
| `router.replace("/(auth)/sign-in")` | Logout |
| `router.back()` / `router.canGoBack()` | Detail & drawer screen back buttons |
| `navigation.openDrawer()` | Profile tab `tabPress` listener (expo-router drawer API) |

---

## 5. Auth Flow & Persistence

- **Sign up** validates the form (all fields, valid email, password ≥ 6, passwords match), stores the account locally, and redirects to the dashboard.
- The **account** is the only persisted field (AsyncStorage key `tastio-auth`). The **session** (`isAuthenticated`) is in-memory, so:
  - **Already signed up + app reopened** → routed to **Sign In** ("ask for the details").
  - **Authenticated** → routed to the **dashboard** (onboarding/auth skipped).
  - **Unauthenticated + protected route** → routed to **Sign In**.
- **Logout** flushes the persisted auth data and returns to Sign In.
- Routing lives in a single **auth gate** (`app/_layout.tsx`) using `useSegments()` + the persisted store; the native splash is held until storage hydrates to avoid a wrong-screen flash.

---

## 6. Deep Linking Setup

- **Scheme:** `tastio` (declared in `app.json` → `expo.scheme`).
- Expo Router auto-generates the linking config from the file routes, so the Restaurant Detail route maps to:

  ```
  tastio://restaurant/<id>      e.g.  tastio://restaurant/r1
  ```

- The auth gate explicitly **allows the restaurant route without a session**, so a deep link opens Restaurant Detail directly (even on a cold start).

**Testing**

```bash
# Development / production build (custom scheme works):
npx uri-scheme open "tastio://restaurant/r1" --android   # or --ios

# Inside Expo Go (custom scheme is NOT registered — use the exp:// form):
npx uri-scheme open "exp://<LAN-IP>:8081/--/restaurant/r1" --android
```

> Dummy restaurant IDs are `r1`, `r2`, `r3`. An unknown id (e.g. `123`) still **opens** the Restaurant Detail screen and shows a friendly "Restaurant not found" state.
> `https://` universal links would additionally require hosted `apple-app-site-association` / `assetlinks.json` files and a verified domain (out of scope for this assignment).

---

## 7. Project Structure

```
src/
├── app/                      # Expo Router routes (navigators + screens)
│   ├── _layout.tsx           # Root Stack + auth gate
│   ├── index.tsx             # Onboarding 1 (entry)
│   ├── (onboarding)/         # onboarding-2/3
│   ├── (auth)/               # sign-in, sign-up
│   └── (dashboard)/          # Drawer → (tabs) → screens + restaurant/[id]
├── components/
│   ├── ui/                   # design system (Text, Button, Card, Input, Badge, …)
│   ├── auth/                 # auth forms (SignInForm, SignUpForm, GoogleAuthButton)
│   ├── food/                 # MealCard, CategoryCard, PromoBanner, SearchBar, …
│   └── dashboard/            # DrawerContent, ScreenHeader
├── store/                    # zustand: auth-store, cart-store, favorites-store
├── constants/                # theme tokens + dummy data
└── hooks/                    # useTheme (theme provider)
```

---

## 8. Screenshots

> _Add screenshots/GIFs to a `screenshots/` folder and reference them here._

| Onboarding | Home | Restaurant Detail |
| --- | --- | --- |
| _add_ | _add_ | _add_ |

| Cart | Drawer | Sign In |
| --- | --- | --- |
| _add_ | _add_ | _add_ |

---

## 9. Demo Video Checklist

The 2-minute demo should show, in order:

- [ ] Login / auth flow
- [ ] Onboarding → Home flow
- [ ] Bottom tabs (Home, Search, Categories, Profile)
- [ ] Restaurant Detail navigation **with params**
- [ ] Cart navigation (add item → cart badge → cart screen)
- [ ] Drawer opened from the Profile tab
- [ ] Cart/Orders badge updating when the cart is non-empty
- [ ] Deep link `tastio://restaurant/r1` opening Restaurant Detail
- [ ] App reload with **persisted auth state** (registered user → Sign In; then logged in → dashboard)

---

## 10. Assumptions Made

- **No backend.** Auth is local-only: sign-up "trusts" the entered details and stores them with AsyncStorage. Sign-in validates against that stored account. Google buttons are stubbed (create a local session).
- **Session is not persisted on purpose** — per the brief, a returning (already-signed-up) user is sent to **Sign In** on every cold start; only the account registration persists.
- **Deep-link scheme is `tastio`** (matches the app name). The assignment's example used `foodapp://restaurant/123`; the equivalent here is `tastio://restaurant/r1`.
- **Restaurant Detail is deep-link-public** so the link opens the screen even without a session; all other dashboard routes are auth-protected.
- The **cart badge** lives on the Home header (the My Cart tab was intentionally removed from the tab bar); the cart screen is still reachable from that badge.
- **Dummy data** (restaurants, meals, categories) lives in `src/constants/data.ts`; food images are remote (Unsplash CDN) and need a network connection.
- **Currency** is Indian Rupee (`₹`).
- Custom-scheme deep links require a **dev/standalone build**; in **Expo Go** use the `exp://…/--/…` form.

---

## 11. Available Scripts

```bash
bun start        # expo start
bun run android  # expo start --android
bun run ios      # expo start --ios
bun run web      # expo start --web
bun run lint     # expo lint
```
