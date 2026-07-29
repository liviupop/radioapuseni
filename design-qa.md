# Radio Apuseni — Design QA

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
