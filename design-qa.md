# Radio Apuseni — Design QA

## Green daytime identity — v36

- Source visual truth: `site/assets/logo-radio-apuseni-new-dark.png`
- Desktop day: `output/radio-apuseni-green-day-v36.png`
- Mobile day: `output/radio-apuseni-green-day-mobile-v36.png`
- Desktop night regression: `output/radio-apuseni-gold-night-v36.png`
- Desktop viewport: 1280 × 720 CSS px and pixels, density 1
- Mobile viewport: 390 × 844 CSS px and pixels, density 1

During the day, the dark-green logo, headline, status text, and three navigation icons use forest and mountain-green tokens. A bright-sky palette overlay maintains contrast over the photography. At night, the gold logo and controls remain unchanged.

Findings: no actionable P0/P1/P2 differences. Day/night logo switching, icon colors, responsive layout, and browser console were verified.

## New logo favicon set — v34

- Source visual truth: `site/assets/logo-radio-apuseni-new-light.png`
- Cropped symbol source: centered 760 × 760 px region containing the sun arc, mountains, forest, and waveform
- Browser favicons: `site/icons/favicon-radio-apuseni-16.png`, `site/icons/favicon-radio-apuseni-32.png`
- PWA icons: `site/icons/radio-apuseni-192.png`, `site/icons/radio-apuseni-512.png`
- Maskable icon: `site/icons/radio-apuseni-maskable-512.png`
- Apple touch icon: `site/icons/apple-touch-radio-apuseni.png`

All generated icons use the supplied golden logo mark. The maskable and Apple variants place it on the exact forest color `#1E2A1E`. Favicon, manifest, and media-session references use the unique `v=new-logo-20260729` cache key.

Findings: no actionable P0/P1/P2 differences. Icon dimensions, transparency, browser references, and manifest JSON were verified.

## Fluid multigradient player and responsive About image — v33

- Source visual truth: `output/radio-apuseni-palette-only-day.png`
- Implementation state A: `output/radio-apuseni-liquid-button-a.png`
- Implementation state B, five seconds later: `output/radio-apuseni-liquid-button-b.png`
- Night state: `output/radio-apuseni-liquid-button-night.png`
- Mobile state: `output/radio-apuseni-liquid-button-mobile.png`
- About panel, day: `output/radio-apuseni-about-background-day-v33.png`
- About panel, night: `output/radio-apuseni-about-background-night-v33.png`
- Desktop viewport: 1280 × 720 CSS px and pixels, density 1
- Mobile viewport: 390 × 844 CSS px and pixels, density 1
- Full-view comparison: `output/comparison-liquid-button-full.png`
- Focused motion comparison: `output/comparison-liquid-button-motion.png`

The player now blends only supplied palette colors through two radial layers and one linear layer. It morphs its border radius and background positions over 18 seconds; while playing, the same calm motion shortens to 13 seconds. There is no shadow or glow, and `prefers-reduced-motion` keeps a static multigradient state.

Additional requested changes:

- Program, archive, and about icons all use the logo gold `#D49A37`, including hover.
- The central play/pause mark uses mountain green `#4B5E3A`.
- The About panel reuses the actual hero background: `radio-apuseni-day-desktop.webp` during the day and `radio-apuseni-night-desktop.webp` at night, each at 1920 × 1080.

Required fidelity surfaces:

- Fonts and typography: unchanged Montserrat hierarchy.
- Spacing and layout: central player dimensions and position are preserved; no mobile overflow.
- Colors and tokens: all gradient stops, icons, text, and surfaces remain inside the supplied palette.
- Image quality: both supplied hero images load completely at their native 16:9 aspect ratio and switch with the page mode.
- Copy and content: only the figure caption was updated to describe the time-aware background.
- Interaction: play starts successfully, `aria-pressed` changes to true, the animation remains active, and no browser errors were observed.

Findings: no actionable P0/P1/P2 differences. The focused three-state comparison confirms both the requested color transition and the slow organic shape change.

Comparison history: the prior player was a flat gold circle. The new implementation introduces palette-only multigradient motion while preserving contrast, button size, hit target, and the earlier no-white constraint.

## Palette-only interface — v30

- Source visual truth: `second version/fotoradioapuseniportraitlandscapepaletaculori/paleta_culori_radio_apuseni.png`
- Day implementation: `output/radio-apuseni-palette-only-day.png`
- Night implementation: `output/radio-apuseni-palette-only-night.png`
- Viewport: 1280 × 720 CSS px and pixels, density 1
- States: day stage, night stage, and night program sheet open

All visible interface colors were audited from computed styles. No white or white-adjacent RGB value remains. The visible set is restricted to supplied palette colors and palette-derived alpha overlays: bright sky `#E6D9B8`, forest `#1E2A1E`, mountain green `#4B5E3A`, golden light `#D49A37`, warm sunset `#E07A2E`, and aged wood `#8B806E`.

Required fidelity surfaces:

- Fonts and typography: Montserrat is unchanged; headline and UI text now use bright-sky cream instead of white.
- Spacing and layout: unchanged.
- Colors and tokens: all visible UI foregrounds, surfaces, borders, and overlays derive from the supplied palette.
- Image quality: supplied day/night photography and logo remain unchanged.
- Copy and content: unchanged.
- Interaction: program sheet opened successfully during the color audit.

Findings: no actionable P0/P1/P2 differences. A focused comparison was not needed because this iteration is verified through full-stage screenshots plus a computed-style audit of every visible element.

Comparison history: the previous iteration still used white stage text and a few neutral/black overlay values. These were replaced with `#E6D9B8` and palette-derived forest, shadow, wood, and gold values. Post-fix audit returned `whiteish: []`.

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
