# Implementation Plan: Refine Image Sliding Experience

## Goal
Improve the image sliding experience in `ImageSlider.tsx` and `Lightbox.tsx` by adding touch/swipe gestures, transforming transitions into smooth horizontal slides, and aligning all animations with the project's signature easing: `cubic-bezier(0.23, 1, 0.32, 1)`.

## Current State Analysis

### `components/ui/ImageSlider.tsx`
- **Implementation**: CSS-based ribbon using `translateX(-${currentIndex * 100}%)`.
- **Animation**: `transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`.
- **Gap**: No touch/swipe support.

### `components/ui/Lightbox.tsx`
- **Implementation**: `framer-motion` with `AnimatePresence`.
- **Animation**: Cross-fade with small offset (`x: slideDirection * 28`). Easing is slightly off (`[0.22, 1, 0.36, 1]`).
- **Gap**: Not a true slide; no touch/swipe support for image navigation (only for panning when zoomed).

---

## Proposed Changes

### 1. `components/ui/ImageSlider.tsx`
**Objective**: Migrate to `framer-motion` to support fluid drag gestures while maintaining the existing ribbon look.

- **Migration to Motion**:
  - Replace the ribbon `div` with `motion.div`.
  - Replace CSS `transition-transform` with `framer-motion`'s `animate` prop.
  - `animate={{ x: \`-\${currentIndex * 100}%\` }}`.
  - `transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}`.

- **Gesture Implementation**:
  - Add `drag="x"`.
  - Set `dragConstraints={{ left: 0, right: 0 }}` to ensure the slider snaps back or moves to the next slide.
  - Implement `onDragEnd` handler:
    - Calculate swipe threshold (e.g., 50px).
    - If `info.offset.x < -threshold` $\rightarrow$ `nextImg()`.
    - If `info.offset.x > threshold` $\rightarrow$ `prevImg()`.
    - If neither, snap back to current index.

### 2. `components/ui/Lightbox.tsx`
**Objective**: Transform the transition into a full-screen slide and add swipe navigation.

- **True Sliding Motion**:
  - Adjust `motion.div` animation properties:
    - `initial={{ opacity: 0, x: slideDirection * 100 }}` (or percentage).
    - `animate={{ opacity: 1, x: 0 }}`.
    - `exit={{ opacity: 0, x: slideDirection * -100 }}`.
  - Update easing to `[0.23, 1, 0.32, 1]`.
  - Ensure the container allows absolute positioning for the images during transition to avoid layout jumps.

- **Gesture Implementation**:
  - Update `drag` logic:
    - Current: `drag={scale > 1}`.
    - New: `drag={true}`.
  - Implement `onDragEnd` logic:
    - **Case 1: `scale === 1`**: 
      - Handle horizontal swipe to trigger `nextImg()` or `prevImg()`.
    - **Case 2: `scale > 1`**: 
      - Keep current pan behavior. Use `dragConstraints` to keep the image within view.
      - Optionally: Only trigger image change if the user is at the edge of the zoomed image.

---

## Implementation Steps

### Step 1: `ImageSlider.tsx` Refactor
1. Import `motion` from `framer-motion`.
2. Replace the ribbon `div` with `motion.div`.
3. Implement `animate`, `transition`, and `drag` properties.
4. Add the `onDragEnd` logic to trigger `nextImg` and `prevImg`.
5. Verify that the ribbon still behaves correctly with the `currentIndex` update.

### Step 2: `Lightbox.tsx` Animation Update
1. Update the `initial`, `animate`, and `exit` props of the image `motion.div` to use full-width offsets (`x: slideDirection * 100` or `"%"`).
2. Update the `transition` easing to `[0.23, 1, 0.32, 1]`.
3. Verify that `AnimatePresence` handles the slide transition smoothly.

### Step 3: `Lightbox.tsx` Gesture Integration
1. Enable `drag` regardless of scale.
2. Implement a conditional `onDragEnd` handler:
   - If `scale === 1`, evaluate swipe distance $\rightarrow$ change image.
   - If `scale > 1`, allow panning (existing behavior).
3. Refine `dragConstraints` for zoomed state to prevent the image from being dragged off-screen.

---

## Verification Plan

### 1. Visual Smoothness
- **Easing Check**: Ensure the movement starts quickly and decelerates smoothly (the "signature" feel).
- **No Jumps**: Ensure that switching images doesn't cause flickering or layout shifts.

### 2. Gesture Testing
- **ImageSlider**: Swipe left/right on mobile/touchpad. Verify snapping and correct image navigation.
- **Lightbox**: 
  - Zoomed out: Swipe left/right to change images.
  - Zoomed in: Pan image without accidentally changing the image.
  - Boundary Check: Ensure image doesn't slide too far off-screen.

### 3. Regression Testing
- **Buttons**: Verify `ChevronLeft`/`ChevronRight` and dots still work.
- **Keyboard**: Verify Arrow keys still trigger the same animations.
- **Zoom**: Ensure zoom in/out functions as expected in Lightbox.
EOF`
