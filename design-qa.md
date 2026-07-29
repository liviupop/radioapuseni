# Radio Apuseni — Design QA

## Flat player control — v29

- Source visual truth: `output/radio-apuseni-day-desktop-palette-icons.png`
- Implementation: `output/radio-apuseni-flat-play-day.png`
- Desktop viewport: 1280 × 720 CSS px, source and implementation 1280 × 720 px, density 1
- Mobile implementation: `output/radio-apuseni-flat-play-mobile.png`, 390 × 844 CSS px and pixels, density 1
- Night implementation: `output/radio-apuseni-flat-play-night.png`, 1280 × 720 CSS px and pixels, density 1
- State: player stopped; active player state was also tested
- Full-view comparison: `output/comparison-flat-play-full.png`
- Focused control comparison: `output/comparison-flat-play-focused.png`

The previous cream-to-gold gradient and glow made the control visually unrelated to the flatter logo and palette icons. The revised control uses a single `#D49A37` surface, a `#1E2A1E` play mark, no gradient, and no shadow. While playing, it changes to `#E07A2E` without adding elevation.

Required fidelity surfaces:

- Fonts and typography: unchanged Montserrat hierarchy.
- Spacing and layout: control position and responsive 136 px/96 px sizing preserved.
- Colors and tokens: exact supplied palette colors are used.
- Image quality: supplied day/night photography and logo remain unchanged.
- Copy and content: unchanged.
- Interaction: stopped, hover, and playing states remain functional; the playing state keeps the previously requested restrained wave animation.

Findings: no actionable P0/P1/P2 differences. No additional focused regions were needed because this iteration changes only the central player control.

Comparison history: the first comparison identified the gradient and glow as inconsistent with the requested flat treatment. Both were removed; the post-fix focused comparison confirms a uniform fill and no shadow.

## Source of truth

- Day landscape: `second version/fotoradioapuseniportraitlandscapepaletaculori/radio_apuseni_1920_1080.png`
- Day portrait: `second version/fotoradioapuseniportraitlandscapepaletaculori/radio_apuseni_1080_1920.png`
- Night landscape: `second version/fotoradioapuseniportraitlandscapepaletaculori/radio_apuseni_noapte_1920_1080.png`
- Night portrait: `second version/fotoradioapuseniportraitlandscapepaletaculori/radio_apuseni_noapte_1080_1920.png`
- Logo: `second version/refotoradioapuseniportraitlandscapepaletaculori/Logo_Radio_Apuseni_light.png`
- Palette: `second version/fotoradioapuseniportraitlandscapepaletaculori/paleta_culori_radio_apuseni.png`

## Captured implementation states

- Desktop, day, 1280 × 720 @1x: `output/radio-apuseni-day-desktop-palette-icons.png`
- Desktop, night, 1280 × 720 @1x: `output/radio-apuseni-night-desktop-palette-icons.png`
- Mobile portrait, day, 390 × 844 @1x: `output/radio-apuseni-day-mobile-palette-icons.png`

Side-by-side reference/implementation comparisons:

- `output/comparison-day-desktop.png`
- `output/comparison-night-desktop.png`
- `output/comparison-day-mobile.png`

## Visual review

| Area | Result | Notes |
|---|---|---|
| Photography | Pass | Supplied day/night artwork is used without approximation; desktop and portrait sources switch responsively. |
| Day/night state | Pass | Europe/Bucharest time selects day from 08:00–22:00 and night from 22:00–08:00. |
| Logo | Pass | Supplied light logo replaces the previous mark and remains readable over both states. |
| Palette | Pass | UI tokens use the supplied exact values: `#1E2A1E`, `#4B5E3A`, `#7D8F63`, `#A68B3D`, `#D49A37`, `#E07A2E`, `#536273`, `#8B806E`, `#E6D9B8`. |
| Stage controls | Pass | Program uses bright-sky cream, archive uses golden light, and about uses warm sunset; all remain legible over the lower scrim. |
| Typography | Pass | Existing Montserrat hierarchy is preserved; no unexpected wrapping on desktop or portrait mobile. |
| Composition | Pass | Player remains the focal point and avoids important photographic details in all reviewed states. |
| Responsive layout | Pass | No clipping or overlap at 1280 × 720 or 390 × 844. |
| Interaction | Pass | Player, program, archive, and about controls open/close and retain accessible labels. |
| Browser console | Pass | No blocking runtime errors observed in the tested flows. |

## Severity summary

- P0: none
- P1: none
- P2: none
- P3: none

Final result: **passed**
