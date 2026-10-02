# Synotech profile — diagram-design skin for operations diagrams.
# Resolves the style-guide gate: do not use shipped defaults here.

paper: #0f141a        # dark ops paper
paper-2: #1a2230      # card fill
ink: #e8edf2          # primary text/stroke
ink-strong: #06110c  # text on accent fills
muted: #8b98a9        # secondary text, arrows
accent: #43ffc0       # synoptic green — focal nodes only (1-2 per diagram)
warn: #e8b23e
bad: #e06c6c

typography: Inter / system stack for labels, JetBrains Mono for hosts/ports/ids.
rules:
  - flat fills, 1px rules, 10px radii, no shadows
  - arrows carry no label unless the relationship is non-obvious
  - max ~9 nodes per diagram, then split
  - code: src/diagrams.ts (inline SVG builders, tokens as constants)
