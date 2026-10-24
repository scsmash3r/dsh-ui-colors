# Accessibility audit

Audit date: 2026-10-24. Scope: the `dsh-ui-colors` Customize UI in DSH Web. This is a source-level and keyboard/ARIA review, not a formal WCAG certification or a browser axe/Lighthouse run.

## Fixed in this pass

- **Listbox keyboard support.** The Palette, Preset, and Syntax pickers now support Arrow Up/Down, Home/End, Escape, and focus return to the trigger. Options use `tabIndex="-1"` and receive focus through the listbox.
- **Popup semantics.** The trigger exposes `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls`; the menu has a matching id and `aria-label`, and options expose `role="option"` and `aria-selected`.
- **Headings.** Row titles are `h3` elements instead of generic `div`s, so settings headings can be navigated by screen readers. The visual styling is unchanged.
- **Focus visibility.** Buttons, text inputs, and disclosure summaries have an explicit `:focus-visible` outline using the shared focus-ring token. Listbox options use an inset focus outline.
- **Status announcements.** The saved/loading/unavailable status uses `role="status"`.
- **Target size.** Clear buttons were increased from 20×20 to 24×24 CSS pixels. Reset and disclosure controls already meet a 24px target.
- **Labels.** Text inputs keep explicit `aria-label` values that include the item and mode; checkboxes and radios use wrapping labels; reset, clear, and picker buttons have accessible names.

## Test coverage

`test/smoke.mjs` asserts:

- row titles are `h3` elements;
- picker triggers have `aria-controls` and a keyboard handler;
- options have `role="option"`, `aria-selected`, `tabIndex="-1"`, and a keyboard handler;
- the saved-status node uses `role="status"`;
- `:focus-visible` rules are present;
- English and Chinese dictionaries render labels in both languages.

## Remaining gaps

- **No automated browser audit.** Run axe DevTools or Lighthouse against a real DSH Web session before publishing a stable release.
- **No manual screen-reader pass.** Test at least NVDA on Windows and VoiceOver on macOS, covering the pickers, disclosures, color fields, and language switch.
- **User-selected contrast is not enforced.** The sidebar derives a readable text palette, but other surfaces keep the theme's text color. A very light fill in Dark mode, or the reverse, can still reduce contrast.
- **Invalid color input has no live error.** Invalid or partial values revert on blur without an `aria-live` error message. A future pass should add field-level validation feedback.
- **Picker typeahead is not implemented.** Arrow/Home/End and Escape work; typing a label to jump is not supported.
- **Host and third-party UI are out of scope.** DSH’s own dialogs, menus, tooltips, and third-party plugin controls are not audited here.
- **Caption/status contrast follows DSH tokens.** If a user overrides the relevant surfaces or labels, the result may fall below contrast targets.

## Recommended release check

1. Run axe DevTools on the Customize section in Light and Dark.
2. Repeat with the DSH language set to Chinese.
3. Navigate the entire section using only the keyboard.
4. Test the three pickers with NVDA or VoiceOver.
5. Check focus order after opening and closing a picker and after toggling a disclosure.
6. Record any remaining contrast issue as a known limitation rather than hiding it.
