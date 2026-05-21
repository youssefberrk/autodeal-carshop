# Design System: e-car-shop

## Color Strategy: Committed
The design uses a deep, immersive dark base with high-vibrancy accents to simulate a premium showroom environment.

### Core Palette (OKLCH)
- **Base**: `oklch(0.145 0 0)` (Deep Obsidian)
- **Accent**: `oklch(0.79 0.25 150)` (Emerald Performance - #00ff87)
- **Surface**: `oklch(0.20 0.01 150)` (Dark Sage Surface)
- **Text Primary**: `oklch(0.95 0.01 150)` (Off-White Pearl)
- **Text Secondary**: `oklch(0.70 0.02 150)` (Muted Sage)

## Typography
- **Headings**: `Orbitron` (Futuristic, technical, high-performance feel)
- **Elegance/Accent**: `Newsreader` (Serif, italicized, heritage feel)
- **Interface/Body**: `Inter` (Clean, highly legible, modern)

## Elevation & Layers
- **Cards**: Subtle borders (`rgba(218, 230, 216, 0.05)`), deep shadows, and backdrop blurs.
- **Overlays**: Glassmorphism used sparingly for navigation and floating UI.

## Spacing & Rhythm
- Base Unit: 4px
- Generous section padding (py-20+) to create a luxury feel.
- 65-75ch max width for readability.

## Motion & Interactivity
- **Easing**: `cubic-bezier(0.23, 1, 0.32, 1)` (Strong ease-out)
- **Tactile Feedback**: Subtle scales (`0.97`) on press.
- **Transitions**: Faster durations (150-300ms) for UI, slower for immersive reveals (800ms).
