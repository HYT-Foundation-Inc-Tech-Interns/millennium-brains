# Millennium Brains — QA Checklist

A walkthrough for testing the website before sign-off. Tick each box as you verify it.

- **Local:** `npm install` then `npm run dev` → http://localhost:8080
- **Live:** https://millennium-brains.hytfoundationinterns-dreamacademy.workers.dev
- Test in **Chrome** and at least one other browser (Edge/Firefox/Safari).
- Open DevTools (F12) and keep the **Console** tab visible — flag any red errors.

---

## 0. Known issues found in code (verify + decide)

These were spotted while reading the source. Confirm whether they're intended before sign-off.

- [ ] **Forms don't actually send anywhere.** The Lease, Book Demo, and Newsletter forms validate input, then _fake_ a submit (`setTimeout`) and show a success message — no email/backend. Any info a user enters is **lost**. Confirm with your mentor whether a real submission target (email, Formspree, API) is needed.
- [/] **SEO description has typos:** "presentatiosn" and "confference room" (in the page `<head>` meta description). This shows in Google results.
- [ ] **Dead footer links:** Privacy Policy, Terms of Service, Cookie Policy all point to `#` (go nowhere).
- [ ] **Dead social links** in the footer point to `#`.
- [ ] **Unresponsive Web Desigh**

---

## 1. First load / intro

- [/] Page loads with no console errors.
- [ ] Intro overlay plays and dismisses correctly (and doesn't trap you).
- [/] Hero video / wave background loads and animates smoothly (no stutter/jank).
- [ ] Logo in the header is sharp (not stretched/pixelated).

## 2. Header & navigation

Test each nav link scrolls to the correct section:

- [/] Solutions → solutions section
- [/] Product → product section
- [/] Use Cases → use-cases section
- [/] Events → events section
- [/] Contact Us → footer contact
- [/] **Lease Now** switches to the lease form view.
- [/] **Book Demo** switches to the demo form view.
- [/] Clicking the logo returns to the home view.
- [/] Header stays fixed and readable while scrolling.

## 3. Page sections (scroll top → bottom)

- [ ] Hero CTAs ("Get in touch" / explore) jump to the right place.
- [ ] Solutions cards render with correct icons, text, images.
- [ ] Product section content + media correct.
- [ ] Use Cases section correct.
- [ ] Events section correct (dates/times/locations accurate).
- [ ] Installations section images load (no broken images).
- [ ] Accordions / FAQ expand and collapse.
- [ ] Any carousel swipes/advances both directions.
- [ ] No placeholder/lorem-ipsum text left anywhere.

## 4. Forms — Lease Now

- [ ] Submitting empty shows validation errors on each required field.
- [ ] Invalid email is rejected.
- [ ] Ingress time must be before egress time (try egress earlier — should error).
- [ ] Valid submit shows a success state.
- [ ] (See §0 — confirm where this data is supposed to go.)

## 5. Forms — Book Demo

- [ ] Empty submit shows required-field errors.
- [ ] Invalid email rejected; phone under 7 digits rejected.
- [ ] Cannot submit without ticking the **terms agreement** checkbox.
- [ ] Valid submit shows a success / loading state.

## 6. Forms — Newsletter (footer)

- [ ] Enter email + Subscribe — note: currently does nothing real (see §0).

## 7. Responsive (DevTools: F12 → Ctrl+Shift+M)

Check phone (~375px), tablet (~768px), desktop (~1440px):

- [ ] No horizontal scroll / content overflow.
- [ ] Text doesn't overlap or get cut off.
- [ ] Mobile hamburger menu opens, links work, closes on tap.
- [ ] Images/video scale correctly.
- [ ] Buttons and tap targets are big enough to tap.

## 8. Content / copy pass

- [ ] No typos or grammar errors (start with the §0 SEO typos).
- [ ] Product names, prices, package details correct.
- [ ] Contact email / phone correct.
- [ ] All images good quality and relevant.

## 9. Technical / build

- [ ] `npm run lint` — no errors.
- [ ] `npm run build` — succeeds (required for Cloudflare deploy).
- [ ] No red errors in the browser Console during a full walkthrough.
- [ ] Lighthouse (F12 → Lighthouse → analyze): note Performance, Accessibility, SEO scores.
- [ ] Page title and favicon are correct in the browser tab.

## 10. Live vs local

- [ ] Live site matches local (latest changes are deployed).
- [ ] Direct-loading the live URL works (no 404 / blank page).

---

### Notes / bugs found

- There is a Learn More thingy on some panels
- Remove arrows on next picture if there is no picture next to it
- video cannot be skipped
- going to lease now or book demo, I cannot go back to solutions, product, use cases, etc
- website is not responsive yet
- Logo in header is a bit small
- Lease now contents to fix pa
