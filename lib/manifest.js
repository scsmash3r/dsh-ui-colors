/**
 * Single source of truth for the color rows.
 *
 * The Host schema and the drift tests consume this file. The browser bundle
 * still carries a copy until the client generation step lands; the manifest
 * test compares both sides until then.
 */

const SURFACES = [
  {
    id: "sidebar",
    label: "Sidebar",
    fields: { light: "sidebarLight", dark: "sidebarDark" },
    placeholders: { light: "#f9fafbff", dark: "#1b1b1cff" },
    apply: { kind: "token", token: "--dsw-specific-sidebar-fill" },
  },
  {
    id: "main",
    label: "Main",
    fields: { light: "mainLight", dark: "mainDark" },
    placeholders: { light: "#ffffffff", dark: "#151517ff" },
    apply: { kind: "scoped", marker: "data-dsh-colors-main", token: "--dsw-alias-bg-base" },
  },
  {
    id: "layer1",
    label: "Raised Surface",
    fields: { light: "layer1Light", dark: "layer1Dark" },
    placeholders: { light: "#ffffffff", dark: "#232324ff" },
    apply: { kind: "token", token: "--dsw-alias-bg-layer-1" },
  },
  {
    id: "secondary",
    label: "Secondary Main",
    fields: { light: "secondaryLight", dark: "secondaryDark" },
    placeholders: { light: "#ffffffff", dark: "#2c2c2eff" },
    apply: { kind: "token", token: "--dsw-alias-bg-layer-2" },
  },
  {
    id: "composer",
    label: "Composer",
    fields: { light: "composerLight", dark: "composerDark" },
    placeholders: { light: "#ffffffff", dark: "#2c2c2eff" },
    apply: { kind: "token", token: "--dsw-specific-input-major" },
  },
  {
    id: "panel",
    label: "Right panel",
    fields: { light: "panelLight", dark: "panelDark" },
    placeholders: { light: "#ffffffff", dark: "#151517ff" },
    apply: { kind: "scoped", marker: "data-dsh-colors-panel", token: "--dsw-alias-bg-base" },
  },
  {
    id: "bubble",
    label: "User bubble",
    fields: { light: "bubbleLight", dark: "bubbleDark" },
    placeholders: { light: "#edf3feff", dark: "#2c2c2eff" },
    apply: { kind: "token", token: "--dsw-specific-bubble" },
  },
  {
    id: "code",
    label: "Code blocks",
    fields: { light: "codeLight", dark: "codeDark" },
    placeholders: { light: "#f9fafbff", dark: "#1b1b1cff" },
    apply: { kind: "token", token: "--dsw-alias-markdown-code-block" },
  },
];

const BORDERS = [
  {
    id: "l1",
    label: "Border 1",
    fields: { light: "borderL1Light", dark: "borderL1Dark" },
    placeholders: { light: "#0000000a", dark: "#ffffff0f" },
    apply: { kind: "token", token: "--dsw-alias-border-l1" },
  },
  {
    id: "l2",
    label: "Border 2",
    fields: { light: "borderL2Light", dark: "borderL2Dark" },
    placeholders: { light: "#0000001a", dark: "#ffffff1f" },
    apply: { kind: "token", token: "--dsw-alias-border-l2" },
  },
  {
    id: "l3",
    label: "Border 3",
    fields: { light: "borderL3Light", dark: "borderL3Dark" },
    placeholders: { light: "#0000001f", dark: "#ffffff29" },
    apply: { kind: "token", token: "--dsw-alias-border-l3" },
  },
  {
    id: "l4",
    label: "Border 4",
    fields: { light: "borderL4Light", dark: "borderL4Dark" },
    placeholders: { light: "#00000029", dark: "#ffffff33" },
    apply: { kind: "token", token: "--dsw-alias-border-l4" },
  },
];

const NEUTRAL_STEPS = [
  ["00", "#ffffff"], ["50", "#fafafa"], ["100", "#f5f5f5"], ["150", "#ededed"],
  ["200", "#e5e5e5"], ["250", "#dcdcdc"], ["300", "#d4d4d4"], ["400", "#a2a4a6"],
  ["500", "#7f8287"], ["550", "#65676b"], ["600", "#545557"], ["700", "#3c3c3d"],
  ["800", "#292929"], ["850", "#212123"], ["900", "#0f0f0f"], ["1000", "#000000"],
];

const NEUTRALS = NEUTRAL_STEPS.map(([id, color]) => ({
  id,
  label: `Neutral ${id}`,
  fields: { light: `neutral${id}Light`, dark: `neutral${id}Dark` },
  placeholders: { light: `${color}ff`, dark: `${color}ff` },
  apply: { kind: "token", token: `--dsw-static-neutral-${id}` },
}));

export const SECTIONS = [
  {
    id: "colors",
    label: "Colors",
    description:
      "Set a #RRGGBBAA fill per surface; an empty mode keeps its theme default. Only the sidebar adjusts its text.",
    items: SURFACES,
  },
  {
    id: "neutral",
    label: "Neutral",
    description:
      "Set a #RRGGBBAA value for each pure neutral static step; empty keeps the active theme value.",
    collapsible: true,
    toggleLabel: "neutral inputs",
    items: NEUTRALS,
  },
  {
    id: "borders",
    label: "Borders",
    description:
      "Set a #RRGGBBAA border color per level; empty keeps the theme default. Border 4 also feeds some dividers and strong strokes.",
    collapsible: true,
    toggleLabel: "border inputs",
    items: BORDERS,
  },
];

export const SECTION_BY_ID = Object.fromEntries(SECTIONS.map((section) => [section.id, section]));
export const MANIFEST_ITEMS = SECTIONS.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.id })),
);
export const CONFIG_FIELDS = MANIFEST_ITEMS.flatMap((item) => [
  item.fields.light,
  item.fields.dark,
]);

/** Preset data stays here until the client generation step consumes it. */
export const PRESETS = [
  {
    "id": "pitch-black",
    "label": "Pitch Black",
    "colors": {
      "sidebar": {
        "dark": "#000000ff"
      },
      "main": {
        "dark": "#000000ff"
      },
      "layer1": {
        "dark": "#000000ff"
      },
      "secondary": {
        "dark": "#000000ff"
      },
      "composer": {
        "dark": "#000000ff"
      },
      "panel": {
        "dark": "#000000ff"
      },
      "bubble": {
        "dark": "#000000ff"
      },
      "code": {
        "dark": "#000000ff"
      }
    },
    "borders": {
      "l1": {
        "dark": "#ffffff05"
      },
      "l2": {
        "dark": "#ffffff15"
      },
      "l3": {
        "dark": "#ffffff07"
      },
      "l4": {
        "dark": "#ffffff12"
      }
    },
    "neutrals": {
      "50": {
        "dark": "#65676bff"
      },
      "100": {
        "dark": "#545557ff"
      },
      "150": {
        "dark": "#3c3c3dff"
      },
      "200": {
        "dark": "#292929ff"
      },
      "250": {
        "dark": "#292929ff"
      },
      "300": {
        "dark": "#212121ff"
      },
      "400": {
        "dark": "#202020ff"
      },
      "500": {
        "dark": "#181818ff"
      },
      "550": {
        "dark": "#141414ff"
      },
      "600": {
        "dark": "#0f0f0fff"
      },
      "700": {
        "dark": "#0e0e0eff"
      },
      "800": {
        "dark": "#0a0a0aff"
      },
      "850": {
        "dark": "#050505ff"
      },
      "900": {
        "dark": "#030303ff"
      },
      "00": {
        "dark": "#7f8287ff"
      }
    }
  },
  {
    "id": "copper-patina",
    "label": "Copper Patina",
    "colors": {
      "sidebar": {
        "light": "#f1e5d5ff",
        "dark": "#0e1a18ff"
      },
      "main": {
        "light": "#fbf4eaff",
        "dark": "#13211eff"
      },
      "layer1": {
        "light": "#fffaf2ff",
        "dark": "#192a26ff"
      },
      "secondary": {
        "light": "#f6ecdfff",
        "dark": "#20332dff"
      },
      "composer": {
        "light": "#fffaf4ff",
        "dark": "#16241fff"
      },
      "panel": {
        "light": "#f7eee2ff",
        "dark": "#101c19ff"
      },
      "bubble": {
        "light": "#eddac4ff",
        "dark": "#293d35ff"
      },
      "code": {
        "light": "#f6ede1ff",
        "dark": "#0a1513ff"
      }
    },
    "borders": {
      "l1": {
        "light": "#9a5b2e14",
        "dark": "#e08a4e1f"
      },
      "l2": {
        "light": "#9a5b2e24",
        "dark": "#e08a4e33"
      },
      "l3": {
        "light": "#9a5b2e33",
        "dark": "#e08a4e47"
      },
      "l4": {
        "light": "#9a5b2e47",
        "dark": "#e08a4e5c"
      }
    },
    "neutrals": {
      "50": {
        "light": "#fbf3e8ff",
        "dark": "#ded5c8ff"
      },
      "100": {
        "light": "#f6ebddff",
        "dark": "#cfc3b1ff"
      },
      "150": {
        "light": "#f0e2d1ff",
        "dark": "#bfae98ff"
      },
      "200": {
        "light": "#e9d8c4ff",
        "dark": "#ad9982ff"
      },
      "250": {
        "light": "#e1ccb5ff",
        "dark": "#9b856dff"
      },
      "300": {
        "light": "#d7bfa5ff",
        "dark": "#88725bff"
      },
      "400": {
        "light": "#c2a78aff",
        "dark": "#6e5b47ff"
      },
      "500": {
        "light": "#a88b6eff",
        "dark": "#564738ff"
      },
      "550": {
        "light": "#95785cff",
        "dark": "#46392dff"
      },
      "600": {
        "light": "#7f654dff",
        "dark": "#382d24ff"
      },
      "700": {
        "light": "#654f3cff",
        "dark": "#2b231cff"
      },
      "800": {
        "light": "#4b3a2dff",
        "dark": "#1f1914ff"
      },
      "850": {
        "light": "#3a2c22ff",
        "dark": "#18130fff"
      },
      "900": {
        "light": "#281e17ff",
        "dark": "#100d0aff"
      },
      "1000": {
        "light": "#18110dff",
        "dark": "#090706ff"
      },
      "00": {
        "light": "#fffaf3ff",
        "dark": "#e9e3d9ff"
      }
    }
  },
  {
    "id": "gruvbox",
    "label": "Gruvbox",
    "colors": {
      "sidebar": {
        "light": "#f2e5bcff",
        "dark": "#1d2021ff"
      },
      "main": {
        "light": "#fbf1c7ff",
        "dark": "#282828ff"
      },
      "layer1": {
        "light": "#fbf1c7ff",
        "dark": "#32302fff"
      },
      "secondary": {
        "light": "#f2e5bcff",
        "dark": "#3c3836ff"
      },
      "composer": {
        "light": "#fbf1c7ff",
        "dark": "#282828ff"
      },
      "panel": {
        "light": "#f2e5bcff",
        "dark": "#1d2021ff"
      },
      "bubble": {
        "light": "#ebdbb2ff",
        "dark": "#3c3836ff"
      },
      "code": {
        "light": "#f2e5bcff",
        "dark": "#1d2021ff"
      }
    },
    "borders": {
      "l1": {
        "light": "#7c6f6414",
        "dark": "#a899841f"
      },
      "l2": {
        "light": "#7c6f6424",
        "dark": "#a8998433"
      },
      "l3": {
        "light": "#7c6f6433",
        "dark": "#a8998447"
      },
      "l4": {
        "light": "#7c6f6447",
        "dark": "#a899845c"
      }
    },
    "neutrals": {
      "50": {
        "light": "#f2e5bcff",
        "dark": "#d5c4a1ff"
      },
      "100": {
        "light": "#ebdbb2ff",
        "dark": "#bdae93ff"
      },
      "150": {
        "light": "#d5c4a1ff",
        "dark": "#a89984ff"
      },
      "200": {
        "light": "#bdae93ff",
        "dark": "#928374ff"
      },
      "250": {
        "light": "#a89984ff",
        "dark": "#7c6f64ff"
      },
      "300": {
        "light": "#928374ff",
        "dark": "#665c54ff"
      },
      "400": {
        "light": "#7c6f64ff",
        "dark": "#504945ff"
      },
      "500": {
        "light": "#665c54ff",
        "dark": "#3c3836ff"
      },
      "550": {
        "light": "#504945ff",
        "dark": "#32302fff"
      },
      "600": {
        "light": "#3c3836ff",
        "dark": "#282828ff"
      },
      "700": {
        "light": "#32302fff",
        "dark": "#1d2021ff"
      },
      "800": {
        "light": "#282828ff",
        "dark": "#141617ff"
      },
      "850": {
        "light": "#1d2021ff",
        "dark": "#0f1112ff"
      },
      "900": {
        "light": "#141617ff",
        "dark": "#0a0c0dff"
      },
      "1000": {
        "light": "#0d0e0fff",
        "dark": "#060708ff"
      },
      "00": {
        "light": "#fbf1c7ff",
        "dark": "#ebdbb2ff"
      }
    }
  },
  {
    "id": "high-contrast",
    "label": "High Contrast",
    "colors": {
      "sidebar": {
        "light": "#f2f2f2ff",
        "dark": "#000000ff"
      },
      "main": {
        "light": "#ffffffff",
        "dark": "#000000ff"
      },
      "layer1": {
        "light": "#ffffffff",
        "dark": "#0a0a0aff"
      },
      "secondary": {
        "light": "#f0f0f0ff",
        "dark": "#141414ff"
      },
      "composer": {
        "light": "#ffffffff",
        "dark": "#000000ff"
      },
      "panel": {
        "light": "#ffffffff",
        "dark": "#000000ff"
      },
      "bubble": {
        "light": "#e6e6e6ff",
        "dark": "#1a1a1aff"
      },
      "code": {
        "light": "#f7f7f7ff",
        "dark": "#050505ff"
      }
    },
    "borders": {
      "l1": {
        "light": "#00000033",
        "dark": "#ffffff40"
      },
      "l2": {
        "light": "#00000066",
        "dark": "#ffffff73"
      },
      "l3": {
        "light": "#00000099",
        "dark": "#ffffffa6"
      },
      "l4": {
        "light": "#000000cc",
        "dark": "#ffffffd9"
      }
    },
    "neutrals": {
      "50": {
        "light": "#f7f7f7ff",
        "dark": "#f5f5f5ff"
      },
      "100": {
        "light": "#edededff",
        "dark": "#ebebebff"
      },
      "150": {
        "light": "#e0e0e0ff",
        "dark": "#e0e0e0ff"
      },
      "200": {
        "light": "#d4d4d4ff",
        "dark": "#d6d6d6ff"
      },
      "250": {
        "light": "#c7c7c7ff",
        "dark": "#ccccccff"
      },
      "300": {
        "light": "#b8b8b8ff",
        "dark": "#bfbfbfff"
      },
      "400": {
        "light": "#999999ff",
        "dark": "#a6a6a6ff"
      },
      "500": {
        "light": "#666666ff",
        "dark": "#999999ff"
      },
      "550": {
        "light": "#4d4d4dff",
        "dark": "#808080ff"
      },
      "600": {
        "light": "#333333ff",
        "dark": "#666666ff"
      },
      "700": {
        "light": "#1f1f1fff",
        "dark": "#4d4d4dff"
      },
      "800": {
        "light": "#0f0f0fff",
        "dark": "#333333ff"
      },
      "850": {
        "light": "#080808ff",
        "dark": "#1f1f1fff"
      },
      "900": {
        "light": "#000000ff",
        "dark": "#0a0a0aff"
      },
      "1000": {
        "light": "#000000ff",
        "dark": "#000000ff"
      },
      "00": {
        "light": "#ffffffff",
        "dark": "#ffffffff"
      }
    }
  },
  {
    "id": "yellow-blood",
    "label": "Yellow Blood",
    "colors": {
      "sidebar": {
        "light": "#f6e27aff",
        "dark": "#0d0505ff"
      },
      "main": {
        "light": "#fffbe0ff",
        "dark": "#120707ff"
      },
      "layer1": {
        "light": "#fff4b8ff",
        "dark": "#1c0a0aff"
      },
      "secondary": {
        "light": "#f8e98aff",
        "dark": "#261010ff"
      },
      "composer": {
        "light": "#fffdf0ff",
        "dark": "#160808ff"
      },
      "panel": {
        "light": "#fdf6c8ff",
        "dark": "#0a0404ff"
      },
      "bubble": {
        "light": "#ffd6ccff",
        "dark": "#4a0b0bff"
      },
      "code": {
        "light": "#fff3b0ff",
        "dark": "#080303ff"
      }
    },
    "borders": {
      "l1": {
        "light": "#b3121714",
        "dark": "#f5d90a33"
      },
      "l2": {
        "light": "#b3121729",
        "dark": "#f5d90a66"
      },
      "l3": {
        "light": "#b3121747",
        "dark": "#ff2e2e99"
      },
      "l4": {
        "light": "#7a0c12cc",
        "dark": "#ff2e2ecc"
      }
    },
    "neutrals": {
      "50": {
        "light": "#fdf7d9ff",
        "dark": "#f7e88aff"
      },
      "100": {
        "light": "#faefb8ff",
        "dark": "#e8d45aff"
      },
      "150": {
        "light": "#f5e596ff",
        "dark": "#d4b83aff"
      },
      "200": {
        "light": "#efd96fff",
        "dark": "#b8962aff"
      },
      "250": {
        "light": "#e6c94aff",
        "dark": "#9a741fff"
      },
      "300": {
        "light": "#d9b52eff",
        "dark": "#7c5517ff"
      },
      "400": {
        "light": "#bf921fff",
        "dark": "#5f3b10ff"
      },
      "500": {
        "light": "#9c6f14ff",
        "dark": "#4a260cff"
      },
      "550": {
        "light": "#80560fff",
        "dark": "#3a1a09ff"
      },
      "600": {
        "light": "#633f0aff",
        "dark": "#2a1007ff"
      },
      "700": {
        "light": "#462b06ff",
        "dark": "#1c0905ff"
      },
      "800": {
        "light": "#2b1903ff",
        "dark": "#100403ff"
      },
      "850": {
        "light": "#1c0f02ff",
        "dark": "#080202ff"
      },
      "900": {
        "light": "#0d0701ff",
        "dark": "#040101ff"
      },
      "1000": {
        "light": "#000000ff",
        "dark": "#000000ff"
      },
      "00": {
        "light": "#fffdf0ff",
        "dark": "#fffbe0ff"
      }
    }
  },
  {
    "id": "nord",
    "label": "Nord",
    "colors": {
      "sidebar": {
        "light": "#e5e9f0ff",
        "dark": "#2e3440ff"
      },
      "main": {
        "light": "#eceff4ff",
        "dark": "#2e3440ff"
      },
      "layer1": {
        "light": "#eceff4ff",
        "dark": "#3b4252ff"
      },
      "secondary": {
        "light": "#d8dee9ff",
        "dark": "#434c5eff"
      },
      "composer": {
        "light": "#eceff4ff",
        "dark": "#3b4252ff"
      },
      "panel": {
        "light": "#e5e9f0ff",
        "dark": "#2e3440ff"
      },
      "bubble": {
        "light": "#d8dee9ff",
        "dark": "#434c5eff"
      },
      "code": {
        "light": "#e5e9f0ff",
        "dark": "#2e3440ff"
      }
    },
    "borders": {
      "l1": {
        "light": "#5e81ac1f",
        "dark": "#88c0d033"
      },
      "l2": {
        "light": "#5e81ac3d",
        "dark": "#88c0d066"
      },
      "l3": {
        "light": "#5e81ac5c",
        "dark": "#81a1c199"
      },
      "l4": {
        "light": "#4c566a80",
        "dark": "#d8dee9cc"
      }
    },
    "neutrals": {
      "50": {
        "light": "#e5e9f0ff",
        "dark": "#e5e9f0ff"
      },
      "100": {
        "light": "#d8dee9ff",
        "dark": "#d8dee9ff"
      },
      "150": {
        "light": "#c8d0ddff",
        "dark": "#c8d0ddff"
      },
      "200": {
        "light": "#b8c2d2ff",
        "dark": "#b8c2d2ff"
      },
      "250": {
        "light": "#a6b2c6ff",
        "dark": "#a6b2c6ff"
      },
      "300": {
        "light": "#94a3baff",
        "dark": "#94a3baff"
      },
      "400": {
        "light": "#7b8ba5ff",
        "dark": "#7b8ba5ff"
      },
      "500": {
        "light": "#5e6f8aff",
        "dark": "#81a1c1ff"
      },
      "550": {
        "light": "#4c566aff",
        "dark": "#6f86a6ff"
      },
      "600": {
        "light": "#434c5eff",
        "dark": "#5e7290ff"
      },
      "700": {
        "light": "#3b4252ff",
        "dark": "#4c566aff"
      },
      "800": {
        "light": "#2e3440ff",
        "dark": "#3b4252ff"
      },
      "850": {
        "light": "#272c36ff",
        "dark": "#2e3440ff"
      },
      "900": {
        "light": "#1f232bff",
        "dark": "#232830ff"
      },
      "1000": {
        "light": "#14171cff",
        "dark": "#14171cff"
      },
      "00": {
        "light": "#eceff4ff",
        "dark": "#eceff4ff"
      }
    }
  }
];

export { SURFACES, BORDERS, NEUTRALS };
