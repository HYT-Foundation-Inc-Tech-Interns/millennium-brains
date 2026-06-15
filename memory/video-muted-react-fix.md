---
name: video-muted-react-fix
description: Why the product showcase video can't stay unmuted, and the fix
metadata:
  type: project
---

The VideoShowcase `<video>` in src/routes/index.tsx must NOT use the `muted` JSX attribute. VideoShowcase is a child of Index, which re-renders on every state change; React reconciles `<video muted>` and re-applies `muted={true}` to the DOM, silently re-muting the video right after the user unmutes it via the native controls.

**Why:** React treats `muted` as a declarative prop and re-asserts it on every re-render — the user perceives this as "I can't unmute the video."

**How to apply:** Remove `muted` from the JSX and set it imperatively once in the IntersectionObserver `useEffect` with `video.muted = true;` (keeps autoplay working without React re-muting). This has been "lost" before because the fix was uncommitted.
