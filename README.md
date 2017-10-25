# Personal Website

Static website generated with react and python and whatnot.

In order to use for yourself, here are some things you should know

## File Names

- All content files are placed in the `Content` directory
- All files are to be in markdown with the extension tag `md`.
- The home file should be specially listed with `_` (underscore) character before it.
  - example: `_home.md`
- all files and directories should be listed with spaces being replaced by `_`.
  - example: `website_construction.md`

Files are currently being sorted alphabetically during auto-generation

## Generation

In order to put everything together, given that you have npm installed...

```bash
python3 compileContent.py
npm run build
```