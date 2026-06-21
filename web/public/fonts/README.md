# Dropping in real font files

For each font, once you have the licensed webfont file:

1. Convert/export a **woff2** (preferred — smallest, all modern browsers support it).
2. Put the file in this folder, e.g. `public/fonts/alexandra-signature-font.woff2`.
3. In `src/lib/fonts.ts`, set `webFontFile` on that font's entry:

   ```ts
   {
     slug: "alexandra-signature-font",
     name: "Alexandra Signature",
     ...
     webFontFile: "alexandra-signature-font.woff2",
   }
   ```

That's it — no other code changes needed. `getFontFaceCss()` (used in `src/app/layout.tsx`)
generates the `@font-face` rule automatically, and every preview across the site
(`getFontFamilyCss()`) already lists the real font name first with the current system-font
fallback as a safety net, so previews upgrade from fallback to the real typeface the moment
the file lands.

## Before going live with real files

- **Subset for previews.** Don't put the full retail font here if it covers extended
  glyphs/ligatures you sell — ship a preview-only subset (Latin letters, numbers, basic
  punctuation) so visitors can't lift the full commercial file from the page source. Keep the
  full file behind the paid download instead.
- **font-display: swap** is already set in the generated `@font-face` rules, so text renders
  in the fallback font immediately and swaps in once the webfont loads (avoids invisible text).
- **Watch CLS** once real fonts are live on the catalog grid (20 fonts on one page) — if a
  fallback and the real font have very different metrics, the swap can shift layout. Test with
  Lighthouse after dropping files in.
