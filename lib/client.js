window.__ModuleLoader__.load({
  id: "dsh-ui-colors",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    const React = require("react");
    const { defineStore } = require("@deepseek-ai/dsh-client-store");

    /** Entry id: also the settings namespace the Host persists. */
    const NAMESPACE = "ui-colors";
    const STYLE_ID = "dsh-ui-colors-style";
    const SIDEBAR_ATTR = "data-dsh-colors-sidebar";
    const MAIN_ATTR = "data-dsh-colors-main";
    const PANEL_ATTR = "data-dsh-colors-panel";
    const BODY_SIDEBAR_ATTR = "data-dsh-ui-colors-sidebar";
    const BODY_MAIN_ATTR = "data-dsh-ui-colors-main";
    const BODY_PANEL_ATTR = "data-dsh-ui-colors-panel";
    const SECTION_ATTR = "data-dsh-ui-colors-section";
    const FULL_THEME_ATTR = "data-dsh-ui-colors-full-theme";
    const SELECTION_ATTR = "data-dsh-ui-colors-selection";
    const SELECTION_LIGHT_VAR = "--dsh-ui-colors-selection-light";
    const SELECTION_DARK_VAR = "--dsh-ui-colors-selection-dark";

    const LOCALE_NS = "dsh-ui-colors";

    /** English strings; the key set is mirrored in `zh`. */
    const en = {
      nav: "Customize",
      "palette.title": "Palette",
      "palette.description":
        "Recolors the shared neutral-bluish and blue/deepseek scales, applies the full semantic theme, or loads a named preset.",
      "palette.spectrum": "Spectrum",
      "palette.preset": "Preset",
      "palette.fullTheme": "Full semantic theme",
      "palette.selection": "Apply spectrum to ::selection",
      "palette.spectrum.aria": "Palette spectrum",
      "palette.spectrum.options": "Palette spectrum options",
      "palette.preset.aria": "Color preset",
      "palette.preset.options": "Color preset options",
      "palette.preset.title": "Apply a named set of surface, neutral, and border colors.",
      "syntax.heading": "Syntax highlighter",
      "syntax.description":
        "Shiki CSS-variable token colors for fenced code blocks. Default keeps the host theme; code block background and foreground stay with Code blocks.",
      "syntax.theme": "Theme",
      "syntax.aria": "Syntax theme",
      "syntax.options": "Syntax theme options",
      "syntax.buttonTitle": "Choose a Shiki token palette for fenced code blocks.",
      "colors.title": "Colors",
      "colors.description":
        "Set a #RRGGBBAA fill per surface; an empty mode keeps its theme default. Only the sidebar adjusts its text.",
      "colors.resetAria": "Reset surface colors",
      "neutral.title": "Neutral",
      "neutral.description":
        "Set a #RRGGBBAA value for each pure neutral static step; empty keeps the active theme value.",
      "neutral.label": "Neutral {id}",
      "neutral.resetAria": "Reset neutral colors",
      "borders.title": "Borders",
      "borders.description":
        "Set a #RRGGBBAA border color per level; empty keeps the theme default. Border 4 also feeds some dividers and strong strokes.",
      "borders.resetAria": "Reset border colors",
      "radius.title": "Border radius",
      "surface.sidebar": "Sidebar",
      "surface.main": "Main",
      "surface.layer1": "Raised Surface",
      "surface.secondary": "Secondary Main",
      "surface.composer": "Composer",
      "surface.panel": "Right panel",
      "surface.bubble": "User bubble",
      "surface.code": "Code blocks",
      "border.l1": "Border 1",
      "border.l2": "Border 2",
      "border.l3": "Border 3",
      "border.l4": "Border 4",
      "spectrum.bluish": "Bluish (default)",
      "spectrum.olive": "Olive",
      "spectrum.ember": "Ember",
      "spectrum.plum": "Midnight Plum",
      "spectrum.charcoal": "Deep Charcoal",
      "spectrum.solarized": "Solarized",
      "spectrum.cyan-oled": "Cyan OLED",
      "spectrum.neon-yellow": "Neon Yellow",
      "spectrum.acid": "Acid Hacker Green",
      "preset.custom": "Custom",
      "preset.clean": "Clean",
      "preset.pitch-black": "Pitch Black",
      "preset.copper-patina": "Copper Patina",
      "preset.gruvbox": "Gruvbox",
      "preset.high-contrast": "High Contrast",
      "preset.yellow-blood": "Yellow Blood",
      "preset.nord": "Nord",
      "syntax.default": "Default",
      "syntax.github": "GitHub",
      "syntax.nord": "Nord",
      "syntax.dracula": "Dracula",
      "syntax.solarized": "Solarized",
      "syntax.monokai": "Monokai",
      "radius.default": "Default",
      "radius.default.desc": "4/8/12/16/20/28px",
      "radius.half": "Half",
      "radius.half.desc": "Half, floored",
      "radius.none": "None",
      "radius.none.desc": "Square corners",
      "field.light": "Light",
      "field.dark": "Dark",
      "status.stored": "Stored in your DSH settings and applied immediately.",
      "status.loading": "Loading saved colors…",
      "status.unavailable": "Settings are unavailable; changes will not persist.",
      "toggle.show": "Show {label}",
      "toggle.hide": "Hide {label}",
      "toggle.inputs": "inputs",
      "toggle.neutral": "neutral inputs",
      "toggle.border": "border inputs",
      "reset": "Reset",
      "clear": "Clear {label} {mode} color",
      "aria.color": "{label} {mode} RGBA hex color",
    };

    /** Simplified Chinese strings; keep the same keys as `en`. */
    const zh = {
      nav: "自定义",
      "palette.title": "调色板",
      "palette.description":
        "重新映射共享的中性蓝与蓝/DeepSeek 色阶，应用完整语义主题，或载入命名预设。",
      "palette.spectrum": "光谱",
      "palette.preset": "预设",
      "palette.fullTheme": "完整语义主题",
      "palette.selection": "将光谱应用于 ::selection",
      "palette.spectrum.aria": "调色板光谱",
      "palette.spectrum.options": "调色板光谱选项",
      "palette.preset.aria": "颜色预设",
      "palette.preset.options": "颜色预设选项",
      "palette.preset.title": "应用一组命名的表面、中性色和边框颜色。",
      "syntax.heading": "语法高亮",
      "syntax.description":
        "用于围栏代码块的 Shiki CSS 变量 token 颜色。默认保留宿主主题；代码块背景和前景仍跟随“代码块”表面。",
      "syntax.theme": "主题",
      "syntax.aria": "语法主题",
      "syntax.options": "语法主题选项",
      "syntax.buttonTitle": "选择用于围栏代码块的 Shiki token 调色板。",
      "colors.title": "颜色",
      "colors.description":
        "为每个表面设置 #RRGGBBAA 填充；空模式保留主题默认值。仅侧边栏会自动调整文字。",
      "colors.resetAria": "重置表面颜色",
      "neutral.title": "中性色",
      "neutral.description":
        "为每个纯中性静态色阶设置 #RRGGBBAA 值；空值保留当前主题值。",
      "neutral.label": "中性色 {id}",
      "neutral.resetAria": "重置中性色",
      "borders.title": "边框",
      "borders.description":
        "为每个层级设置 #RRGGBBAA 边框颜色；空值保留主题默认值。边框 4 还会影响部分分隔线和强调描边。",
      "borders.resetAria": "重置边框颜色",
      "radius.title": "边框圆角",
      "surface.sidebar": "侧边栏",
      "surface.main": "主区域",
      "surface.layer1": "抬升表面",
      "surface.secondary": "次级主区域",
      "surface.composer": "输入区",
      "surface.panel": "右侧面板",
      "surface.bubble": "用户气泡",
      "surface.code": "代码块",
      "border.l1": "边框 1",
      "border.l2": "边框 2",
      "border.l3": "边框 3",
      "border.l4": "边框 4",
      "spectrum.bluish": "蓝调（默认）",
      "spectrum.olive": "橄榄",
      "spectrum.ember": "余烬",
      "spectrum.plum": "午夜梅",
      "spectrum.charcoal": "深炭",
      "spectrum.solarized": "Solarized",
      "spectrum.cyan-oled": "青色 OLED",
      "spectrum.neon-yellow": "霓虹黄",
      "spectrum.acid": "酸性黑客绿",
      "preset.custom": "自定义",
      "preset.clean": "清除",
      "preset.pitch-black": "纯黑",
      "preset.copper-patina": "铜绿",
      "preset.gruvbox": "Gruvbox",
      "preset.high-contrast": "高对比度",
      "preset.yellow-blood": "黄血",
      "preset.nord": "北欧",
      "syntax.default": "默认",
      "syntax.github": "GitHub",
      "syntax.nord": "北欧",
      "syntax.dracula": "德古拉",
      "syntax.solarized": "Solarized",
      "syntax.monokai": "Monokai",
      "radius.default": "默认",
      "radius.default.desc": "4/8/12/16/20/28px",
      "radius.half": "一半",
      "radius.half.desc": "减半，向下取整",
      "radius.none": "无",
      "radius.none.desc": "直角",
      "field.light": "浅色",
      "field.dark": "深色",
      "status.stored": "已存储到 DSH 设置并立即应用。",
      "status.loading": "正在加载已保存的颜色…",
      "status.unavailable": "设置不可用，更改不会保存。",
      "toggle.show": "显示{label}",
      "toggle.hide": "隐藏{label}",
      "toggle.inputs": "输入",
      "toggle.neutral": "中性色输入",
      "toggle.border": "边框输入",
      "reset": "重置",
      "clear": "清除{label}{mode}颜色",
      "aria.color": "{label} {mode} RGBA 十六进制颜色",
    };

    function formatText(template, params) {
      if (params === undefined) return template;
      return template.replace(/\{(\w+)\}/g, (match, key) =>
        params[key] === undefined ? match : String(params[key]),
      );
    }

    const fallbackT = (key, params) => formatText(en[key] ?? key, params);

    const SECTION_LABELS = new Set(["Customize", "自定义"]);

    /** Theme defaults used as placeholders and as fallbacks for paired modes. */
    const SURFACES = [
      {
        id: "sidebar",
        label: "Sidebar",
        light: "sidebarLight",
        dark: "sidebarDark",
        placeholder: { light: "#f9fafbff", dark: "#1b1b1cff" },
      },
      {
        id: "main",
        label: "Main",
        light: "mainLight",
        dark: "mainDark",
        placeholder: { light: "#ffffffff", dark: "#151517ff" },
      },
      {
        id: "layer1",
        label: "Raised Surface",
        light: "layer1Light",
        dark: "layer1Dark",
        placeholder: { light: "#ffffffff", dark: "#232324ff" },
      },
      {
        id: "secondary",
        label: "Secondary Main",
        light: "secondaryLight",
        dark: "secondaryDark",
        placeholder: { light: "#ffffffff", dark: "#2c2c2eff" },
      },
      {
        id: "composer",
        label: "Composer",
        light: "composerLight",
        dark: "composerDark",
        placeholder: { light: "#ffffffff", dark: "#2c2c2eff" },
      },
      {
        id: "panel",
        label: "Right panel",
        light: "panelLight",
        dark: "panelDark",
        placeholder: { light: "#ffffffff", dark: "#151517ff" },
      },
      {
        id: "bubble",
        label: "User bubble",
        light: "bubbleLight",
        dark: "bubbleDark",
        placeholder: { light: "#edf3feff", dark: "#2c2c2eff" },
      },
      {
        id: "code",
        label: "Code blocks",
        light: "codeLight",
        dark: "codeDark",
        placeholder: { light: "#f9fafbff", dark: "#1b1b1cff" },
      },
    ];
    const SURFACE_BY_ID = Object.fromEntries(SURFACES.map((surface) => [surface.id, surface]));

    /** Border-level defaults; values are #rrggbbaa so alpha survives. */
    const BORDERS = [
      {
        id: "l1",
        label: "Border 1",
        token: "--dsw-alias-border-l1",
        light: "borderL1Light",
        dark: "borderL1Dark",
        placeholder: { light: "#0000000a", dark: "#ffffff0f" },
      },
      {
        id: "l2",
        label: "Border 2",
        token: "--dsw-alias-border-l2",
        light: "borderL2Light",
        dark: "borderL2Dark",
        placeholder: { light: "#0000001a", dark: "#ffffff1f" },
      },
      {
        id: "l3",
        label: "Border 3",
        token: "--dsw-alias-border-l3",
        light: "borderL3Light",
        dark: "borderL3Dark",
        placeholder: { light: "#0000001f", dark: "#ffffff29" },
      },
      {
        id: "l4",
        label: "Border 4",
        token: "--dsw-alias-border-l4",
        light: "borderL4Light",
        dark: "borderL4Dark",
        placeholder: { light: "#00000029", dark: "#ffffff33" },
      },
    ];
    const BORDER_BY_ID = Object.fromEntries(BORDERS.map((border) => [border.id, border]));

    /** Pure neutral static scale; placeholders show the host defaults. */
    const NEUTRAL_STEPS = [
      ["00", "#ffffff"], ["50", "#fafafa"], ["100", "#f5f5f5"], ["150", "#ededed"],
      ["200", "#e5e5e5"], ["250", "#dcdcdc"], ["300", "#d4d4d4"], ["400", "#a2a4a6"],
      ["500", "#7f8287"], ["550", "#65676b"], ["600", "#545557"], ["700", "#3c3c3d"],
      ["800", "#292929"], ["850", "#212123"], ["900", "#0f0f0f"], ["1000", "#000000"],
    ];
    const NEUTRALS = NEUTRAL_STEPS.map(([id, color]) => ({
      id,
      label: `Neutral ${id}`,
      token: `--dsw-static-neutral-${id}`,
      light: `neutral${id}Light`,
      dark: `neutral${id}Dark`,
      placeholder: { light: `${color}ff`, dark: `${color}ff` },
    }));
    const NEUTRAL_BY_ID = Object.fromEntries(NEUTRALS.map((neutral) => [neutral.id, neutral]));

    /** Named presets only set the modes they list; unlisted fields stay untouched. */
    const PRESETS = [
      {
        id: "pitch-black",
        label: "Pitch Black",
        colors: {
          sidebar: { dark: "#000000ff" },
          main: { dark: "#000000ff" },
          layer1: { dark: "#000000ff" },
          secondary: { dark: "#000000ff" },
          composer: { dark: "#000000ff" },
          panel: { dark: "#000000ff" },
          bubble: { dark: "#000000ff" },
          code: { dark: "#000000ff" },
        },
        borders: {
          l1: { dark: "#ffffff05" },
          l2: { dark: "#ffffff15" },
          l3: { dark: "#ffffff07" },
          l4: { dark: "#ffffff12" },
        },
        neutrals: {
          "00": { dark: "#7f8287ff" },
          "50": { dark: "#65676bff" },
          "100": { dark: "#545557ff" },
          "150": { dark: "#3c3c3dff" },
          "200": { dark: "#292929ff" },
          "250": { dark: "#292929ff" },
          "300": { dark: "#212121ff" },
          "400": { dark: "#202020ff" },
          "500": { dark: "#181818ff" },
          "550": { dark: "#141414ff" },
          "600": { dark: "#0f0f0fff" },
          "700": { dark: "#0e0e0eff" },
          "800": { dark: "#0a0a0aff" },
          "850": { dark: "#050505ff" },
          "900": { dark: "#030303ff" },
        },
      },
      {
        id: "copper-patina",
        label: "Copper Patina",
        colors: {
          sidebar: { light: "#f1e5d5ff", dark: "#0e1a18ff" },
          main: { light: "#fbf4eaff", dark: "#13211eff" },
          layer1: { light: "#fffaf2ff", dark: "#192a26ff" },
          secondary: { light: "#f6ecdfff", dark: "#20332dff" },
          composer: { light: "#fffaf4ff", dark: "#16241fff" },
          panel: { light: "#f7eee2ff", dark: "#101c19ff" },
          bubble: { light: "#eddac4ff", dark: "#293d35ff" },
          code: { light: "#f6ede1ff", dark: "#0a1513ff" },
        },
        borders: {
          l1: { light: "#9a5b2e14", dark: "#e08a4e1f" },
          l2: { light: "#9a5b2e24", dark: "#e08a4e33" },
          l3: { light: "#9a5b2e33", dark: "#e08a4e47" },
          l4: { light: "#9a5b2e47", dark: "#e08a4e5c" },
        },
        neutrals: {
          "00": { light: "#fffaf3ff", dark: "#e9e3d9ff" },
          "50": { light: "#fbf3e8ff", dark: "#ded5c8ff" },
          "100": { light: "#f6ebddff", dark: "#cfc3b1ff" },
          "150": { light: "#f0e2d1ff", dark: "#bfae98ff" },
          "200": { light: "#e9d8c4ff", dark: "#ad9982ff" },
          "250": { light: "#e1ccb5ff", dark: "#9b856dff" },
          "300": { light: "#d7bfa5ff", dark: "#88725bff" },
          "400": { light: "#c2a78aff", dark: "#6e5b47ff" },
          "500": { light: "#a88b6eff", dark: "#564738ff" },
          "550": { light: "#95785cff", dark: "#46392dff" },
          "600": { light: "#7f654dff", dark: "#382d24ff" },
          "700": { light: "#654f3cff", dark: "#2b231cff" },
          "800": { light: "#4b3a2dff", dark: "#1f1914ff" },
          "850": { light: "#3a2c22ff", dark: "#18130fff" },
          "900": { light: "#281e17ff", dark: "#100d0aff" },
          "1000": { light: "#18110dff", dark: "#090706ff" },
        },
      },
      {
        id: "gruvbox",
        label: "Gruvbox",
        colors: {
          sidebar: { light: "#f2e5bcff", dark: "#1d2021ff" },
          main: { light: "#fbf1c7ff", dark: "#282828ff" },
          layer1: { light: "#fbf1c7ff", dark: "#32302fff" },
          secondary: { light: "#f2e5bcff", dark: "#3c3836ff" },
          composer: { light: "#fbf1c7ff", dark: "#282828ff" },
          panel: { light: "#f2e5bcff", dark: "#1d2021ff" },
          bubble: { light: "#ebdbb2ff", dark: "#3c3836ff" },
          code: { light: "#f2e5bcff", dark: "#1d2021ff" },
        },
        borders: {
          l1: { light: "#7c6f6414", dark: "#a899841f" },
          l2: { light: "#7c6f6424", dark: "#a8998433" },
          l3: { light: "#7c6f6433", dark: "#a8998447" },
          l4: { light: "#7c6f6447", dark: "#a899845c" },
        },
        neutrals: {
          "00": { light: "#fbf1c7ff", dark: "#ebdbb2ff" },
          "50": { light: "#f2e5bcff", dark: "#d5c4a1ff" },
          "100": { light: "#ebdbb2ff", dark: "#bdae93ff" },
          "150": { light: "#d5c4a1ff", dark: "#a89984ff" },
          "200": { light: "#bdae93ff", dark: "#928374ff" },
          "250": { light: "#a89984ff", dark: "#7c6f64ff" },
          "300": { light: "#928374ff", dark: "#665c54ff" },
          "400": { light: "#7c6f64ff", dark: "#504945ff" },
          "500": { light: "#665c54ff", dark: "#3c3836ff" },
          "550": { light: "#504945ff", dark: "#32302fff" },
          "600": { light: "#3c3836ff", dark: "#282828ff" },
          "700": { light: "#32302fff", dark: "#1d2021ff" },
          "800": { light: "#282828ff", dark: "#141617ff" },
          "850": { light: "#1d2021ff", dark: "#0f1112ff" },
          "900": { light: "#141617ff", dark: "#0a0c0dff" },
          "1000": { light: "#0d0e0fff", dark: "#060708ff" },
        },
      },
      {
        id: "high-contrast",
        label: "High Contrast",
        colors: {
          sidebar: { light: "#f2f2f2ff", dark: "#000000ff" },
          main: { light: "#ffffffff", dark: "#000000ff" },
          layer1: { light: "#ffffffff", dark: "#0a0a0aff" },
          secondary: { light: "#f0f0f0ff", dark: "#141414ff" },
          composer: { light: "#ffffffff", dark: "#000000ff" },
          panel: { light: "#ffffffff", dark: "#000000ff" },
          bubble: { light: "#e6e6e6ff", dark: "#1a1a1aff" },
          code: { light: "#f7f7f7ff", dark: "#050505ff" },
        },
        borders: {
          l1: { light: "#00000033", dark: "#ffffff40" },
          l2: { light: "#00000066", dark: "#ffffff73" },
          l3: { light: "#00000099", dark: "#ffffffa6" },
          l4: { light: "#000000cc", dark: "#ffffffd9" },
        },
        neutrals: {
          "00": { light: "#ffffffff", dark: "#ffffffff" },
          "50": { light: "#f7f7f7ff", dark: "#f5f5f5ff" },
          "100": { light: "#edededff", dark: "#ebebebff" },
          "150": { light: "#e0e0e0ff", dark: "#e0e0e0ff" },
          "200": { light: "#d4d4d4ff", dark: "#d6d6d6ff" },
          "250": { light: "#c7c7c7ff", dark: "#ccccccff" },
          "300": { light: "#b8b8b8ff", dark: "#bfbfbfff" },
          "400": { light: "#999999ff", dark: "#a6a6a6ff" },
          "500": { light: "#666666ff", dark: "#999999ff" },
          "550": { light: "#4d4d4dff", dark: "#808080ff" },
          "600": { light: "#333333ff", dark: "#666666ff" },
          "700": { light: "#1f1f1fff", dark: "#4d4d4dff" },
          "800": { light: "#0f0f0fff", dark: "#333333ff" },
          "850": { light: "#080808ff", dark: "#1f1f1fff" },
          "900": { light: "#000000ff", dark: "#0a0a0aff" },
          "1000": { light: "#000000ff", dark: "#000000ff" },
        },
      },
      {
        id: "yellow-blood",
        label: "Yellow Blood",
        colors: {
          sidebar: { light: "#f6e27aff", dark: "#0d0505ff" },
          main: { light: "#fffbe0ff", dark: "#120707ff" },
          layer1: { light: "#fff4b8ff", dark: "#1c0a0aff" },
          secondary: { light: "#f8e98aff", dark: "#261010ff" },
          composer: { light: "#fffdf0ff", dark: "#160808ff" },
          panel: { light: "#fdf6c8ff", dark: "#0a0404ff" },
          bubble: { light: "#ffd6ccff", dark: "#4a0b0bff" },
          code: { light: "#fff3b0ff", dark: "#080303ff" },
        },
        borders: {
          l1: { light: "#b3121714", dark: "#f5d90a33" },
          l2: { light: "#b3121729", dark: "#f5d90a66" },
          l3: { light: "#b3121747", dark: "#ff2e2e99" },
          l4: { light: "#7a0c12cc", dark: "#ff2e2ecc" },
        },
        neutrals: {
          "00": { light: "#fffdf0ff", dark: "#fffbe0ff" },
          "50": { light: "#fdf7d9ff", dark: "#f7e88aff" },
          "100": { light: "#faefb8ff", dark: "#e8d45aff" },
          "150": { light: "#f5e596ff", dark: "#d4b83aff" },
          "200": { light: "#efd96fff", dark: "#b8962aff" },
          "250": { light: "#e6c94aff", dark: "#9a741fff" },
          "300": { light: "#d9b52eff", dark: "#7c5517ff" },
          "400": { light: "#bf921fff", dark: "#5f3b10ff" },
          "500": { light: "#9c6f14ff", dark: "#4a260cff" },
          "550": { light: "#80560fff", dark: "#3a1a09ff" },
          "600": { light: "#633f0aff", dark: "#2a1007ff" },
          "700": { light: "#462b06ff", dark: "#1c0905ff" },
          "800": { light: "#2b1903ff", dark: "#100403ff" },
          "850": { light: "#1c0f02ff", dark: "#080202ff" },
          "900": { light: "#0d0701ff", dark: "#040101ff" },
          "1000": { light: "#000000ff", dark: "#000000ff" },
        },
      },
      {
        id: "nord",
        label: "Nord",
        colors: {
          sidebar: { light: "#e5e9f0ff", dark: "#2e3440ff" },
          main: { light: "#eceff4ff", dark: "#2e3440ff" },
          layer1: { light: "#eceff4ff", dark: "#3b4252ff" },
          secondary: { light: "#d8dee9ff", dark: "#434c5eff" },
          composer: { light: "#eceff4ff", dark: "#3b4252ff" },
          panel: { light: "#e5e9f0ff", dark: "#2e3440ff" },
          bubble: { light: "#d8dee9ff", dark: "#434c5eff" },
          code: { light: "#e5e9f0ff", dark: "#2e3440ff" },
        },
        borders: {
          l1: { light: "#5e81ac1f", dark: "#88c0d033" },
          l2: { light: "#5e81ac3d", dark: "#88c0d066" },
          l3: { light: "#5e81ac5c", dark: "#81a1c199" },
          l4: { light: "#4c566a80", dark: "#d8dee9cc" },
        },
        neutrals: {
          "00": { light: "#eceff4ff", dark: "#eceff4ff" },
          "50": { light: "#e5e9f0ff", dark: "#e5e9f0ff" },
          "100": { light: "#d8dee9ff", dark: "#d8dee9ff" },
          "150": { light: "#c8d0ddff", dark: "#c8d0ddff" },
          "200": { light: "#b8c2d2ff", dark: "#b8c2d2ff" },
          "250": { light: "#a6b2c6ff", dark: "#a6b2c6ff" },
          "300": { light: "#94a3baff", dark: "#94a3baff" },
          "400": { light: "#7b8ba5ff", dark: "#7b8ba5ff" },
          "500": { light: "#5e6f8aff", dark: "#81a1c1ff" },
          "550": { light: "#4c566aff", dark: "#6f86a6ff" },
          "600": { light: "#434c5eff", dark: "#5e7290ff" },
          "700": { light: "#3b4252ff", dark: "#4c566aff" },
          "800": { light: "#2e3440ff", dark: "#3b4252ff" },
          "850": { light: "#272c36ff", dark: "#2e3440ff" },
          "900": { light: "#1f232bff", dark: "#232830ff" },
          "1000": { light: "#14171cff", dark: "#14171cff" },
        },
      },
    ];
    const PRESET_BY_ID = Object.fromEntries(PRESETS.map((preset) => [preset.id, preset]));
    const PRESET_IDS = ["custom", "clean", ...PRESETS.map((preset) => preset.id)];
    const PRESET_OPTIONS = [
      { id: "custom", label: "Custom" },
      ...PRESETS.map((preset) => ({ id: preset.id, label: preset.label })),
      { id: "clean", label: "Clean" },
    ];

    /** Shiki CSS-variable token names controlled by the Syntax row. */
    const SHIKI_TOKENS = {
      comment: "--shiki-token-comment",
      constant: "--shiki-token-constant",
      function: "--shiki-token-function",
      keyword: "--shiki-token-keyword",
      link: "--shiki-token-link",
      parameter: "--shiki-token-parameter",
      punctuation: "--shiki-token-punctuation",
      string: "--shiki-token-string",
      "string-expression": "--shiki-token-string-expression",
    };

    const SHIKI_SOURCE = "ui-colors-shiki";

    /**
     * Named syntax palettes. `default` keeps the host tokens; every other
     * entry supplies all nine `--shiki-token-*` colors for both appearances.
     * Code block background/foreground stay tied to the Code blocks surface.
     */
    const SHIKI_PRESETS = [
      {
        id: "default",
        label: "Default",
        values: null,
        light: {
          comment: "#868e96", constant: "#1c7ed6", function: "#6741d9",
          keyword: "#d6336c", link: "#1971c2", parameter: "#e8590c",
          punctuation: "#495057", string: "#2f9e44", "string-expression": "#2b8a3e",
        },
        dark: {
          comment: "#adb5bd", constant: "#4dabf7", function: "#b197fc",
          keyword: "#faa2c1", link: "#74c0fc", parameter: "#ffa94d",
          punctuation: "#ced4da", string: "#69db7c", "string-expression": "#8ce99a",
        },
      },
      {
        id: "github",
        label: "GitHub",
        light: {
          comment: "#6e7781", constant: "#0550ae", function: "#8250df",
          keyword: "#cf222e", link: "#0969da", parameter: "#953800",
          punctuation: "#24292f", string: "#0a3069", "string-expression": "#116329",
        },
        dark: {
          comment: "#8b949e", constant: "#79c0ff", function: "#d2a8ff",
          keyword: "#ff7b72", link: "#58a6ff", parameter: "#ffa657",
          punctuation: "#c9d1d9", string: "#a5d6ff", "string-expression": "#7ee787",
        },
      },
      {
        id: "nord",
        label: "Nord",
        light: {
          comment: "#5e6a75", constant: "#2e5f8a", function: "#006d8f",
          keyword: "#5e81ac", link: "#006d8f", parameter: "#b45f06",
          punctuation: "#2e3440", string: "#4f7a3a", "string-expression": "#4f7a3a",
        },
        dark: {
          comment: "#616e88", constant: "#81a1c1", function: "#88c0d0",
          keyword: "#81a1c1", link: "#88c0d0", parameter: "#d08770",
          punctuation: "#eceff4", string: "#a3be8c", "string-expression": "#a3be8c",
        },
      },
      {
        id: "dracula",
        label: "Dracula",
        light: {
          comment: "#7a7f9a", constant: "#7c4dff", function: "#1f8f4e",
          keyword: "#c2185b", link: "#007a8a", parameter: "#b26a00",
          punctuation: "#282a36", string: "#8a6d00", "string-expression": "#1f8f4e",
        },
        dark: {
          comment: "#6272a4", constant: "#bd93f9", function: "#50fa7b",
          keyword: "#ff79c6", link: "#8be9fd", parameter: "#ffb86c",
          punctuation: "#f8f8f2", string: "#f1fa8c", "string-expression": "#50fa7b",
        },
      },
      {
        id: "solarized",
        label: "Solarized",
        light: {
          comment: "#93a1a1", constant: "#268bd2", function: "#268bd2",
          keyword: "#859900", link: "#268bd2", parameter: "#b58900",
          punctuation: "#657b83", string: "#2aa198", "string-expression": "#2aa198",
        },
        dark: {
          comment: "#586e75", constant: "#268bd2", function: "#268bd2",
          keyword: "#859900", link: "#268bd2", parameter: "#b58900",
          punctuation: "#93a1a1", string: "#2aa198", "string-expression": "#2aa198",
        },
      },
      {
        id: "monokai",
        label: "Monokai",
        light: {
          comment: "#7a7568", constant: "#7c4dff", function: "#4f8f00",
          keyword: "#c2185b", link: "#0087a8", parameter: "#c46a00",
          punctuation: "#272822", string: "#8a7600", "string-expression": "#8a7600",
        },
        dark: {
          comment: "#75715e", constant: "#ae81ff", function: "#a6e22e",
          keyword: "#f92672", link: "#66d9ef", parameter: "#fd971f",
          punctuation: "#f8f8f2", string: "#e6db74", "string-expression": "#e6db74",
        },
      },
    ];
    const SHIKI_PRESET_BY_ID = Object.fromEntries(SHIKI_PRESETS.map((preset) => [preset.id, preset]));
    const SHIKI_PRESET_IDS = SHIKI_PRESETS.map((preset) => preset.id);

    /** Base radius scale from base.css; the shape presets derive from these. */
    const RADIUS_DEFAULTS = Object.freeze({ xs: 4, sm: 8, md: 12, lg: 16, xl: 20, panel: 28 });
    const RADIUS_SOURCE = "ui-colors-radius";
    const RADIUS_OPTIONS = [
      { id: "default", label: "Default", desc: "4/8/12/16/20/28px" },
      { id: "half", label: "Half", desc: "Half, floored" },
      { id: "none", label: "None", desc: "Square corners" },
    ];
    const RADIUS_MODES = RADIUS_OPTIONS.map((option) => option.id);

    const SPECTRA = {
      olive: {
        // neutral-bluish
        "--dsw-static-neutral-bluish-00": "#fffffb",
        "--dsw-static-neutral-bluish-50": "#fafaf5",
        "--dsw-static-neutral-bluish-60": "#f6f6f1",
        "--dsw-static-neutral-bluish-75": "#f3f3ec",
        "--dsw-static-neutral-bluish-100": "#eeefe5",
        "--dsw-static-neutral-bluish-150": "#ecede2",
        "--dsw-static-neutral-bluish-200": "#e5e6d8",
        "--dsw-static-neutral-bluish-300": "#d3d3ca",
        "--dsw-static-neutral-bluish-400": "#b2b3a7",
        "--dsw-static-neutral-bluish-500": "#9d9e8f",
        "--dsw-static-neutral-bluish-600": "#85867a",
        "--dsw-static-neutral-bluish-700": "#66665c",
        "--dsw-static-neutral-bluish-750": "#45463d",
        "--dsw-static-neutral-bluish-800": "#363731",
        "--dsw-static-neutral-bluish-850": "#2c2d27",
        "--dsw-static-neutral-bluish-875": "#23241f",
        "--dsw-static-neutral-bluish-900": "#1b1c17",
        "--dsw-static-neutral-bluish-950": "#151611",
        "--dsw-static-neutral-bluish-1000": "#11120a",
        // blue
        "--dsw-static-blue-50": "#f6f6ec",
        "--dsw-static-blue-75": "#eff1df",
        "--dsw-static-blue-100": "#e9ebd3",
        "--dsw-static-blue-300": "#c4c67d",
        "--dsw-static-blue-400": "#a9aa28",
        "--dsw-static-blue-450": "#9c9b00",
        "--dsw-static-blue-500": "#908e00",
        "--dsw-static-blue-50p": "#f2f3e5",
        "--dsw-static-blue-600": "#7c7600",
        "--dsw-static-blue-800": "#575200",
        "--dsw-static-blue-900": "#3b3900",
        "--dsw-static-blue-950": "#2d2c00",
        // deepseek
        "--dsw-static-deepseek-50": "#f3f4e8",
        "--dsw-static-deepseek-100": "#edeedc",
        "--dsw-static-deepseek-200": "#e3e5c4",
        "--dsw-static-deepseek-300": "#cdcf94",
        "--dsw-static-deepseek-400": "#b0b240",
        "--dsw-static-deepseek-450": "#979500",
        "--dsw-static-deepseek-500": "#868300",
        "--dsw-static-deepseek-600": "#717100",
        "--dsw-static-deepseek-800": "#434425",
        "--dsw-static-deepseek-900": "#32331f",
        "--dsw-static-deepseek-700-delete": "#555400",
      },
      ember: {
        // neutral-bluish
        "--dsw-static-neutral-bluish-00": "#fffefd",
        "--dsw-static-neutral-bluish-50": "#fff8f7",
        "--dsw-static-neutral-bluish-60": "#fbf4f3",
        "--dsw-static-neutral-bluish-75": "#f9f1ef",
        "--dsw-static-neutral-bluish-100": "#f6ebe9",
        "--dsw-static-neutral-bluish-150": "#f6e9e6",
        "--dsw-static-neutral-bluish-200": "#f1e1de",
        "--dsw-static-neutral-bluish-300": "#dad0ce",
        "--dsw-static-neutral-bluish-400": "#bcaeab",
        "--dsw-static-neutral-bluish-500": "#a99895",
        "--dsw-static-neutral-bluish-600": "#8f817f",
        "--dsw-static-neutral-bluish-700": "#6e6260",
        "--dsw-static-neutral-bluish-750": "#4d4240",
        "--dsw-static-neutral-bluish-800": "#3b3433",
        "--dsw-static-neutral-bluish-850": "#312b29",
        "--dsw-static-neutral-bluish-875": "#272221",
        "--dsw-static-neutral-bluish-900": "#1f1a19",
        "--dsw-static-neutral-bluish-950": "#1a1413",
        "--dsw-static-neutral-bluish-1000": "#170f0d",
        // blue
        "--dsw-static-blue-50": "#fff2f0",
        "--dsw-static-blue-75": "#feeae6",
        "--dsw-static-blue-100": "#fde1dc",
        "--dsw-static-blue-300": "#f8a99c",
        "--dsw-static-blue-400": "#ef7d6b",
        "--dsw-static-blue-450": "#e86553",
        "--dsw-static-blue-500": "#e24d3b",
        "--dsw-static-blue-50p": "#ffeeeb",
        "--dsw-static-blue-600": "#d11606",
        "--dsw-static-blue-800": "#990000",
        "--dsw-static-blue-900": "#670d06",
        "--dsw-static-blue-950": "#4c130c",
        // deepseek
        "--dsw-static-deepseek-50": "#fdefec",
        "--dsw-static-deepseek-100": "#fce7e3",
        "--dsw-static-deepseek-200": "#fdd8d1",
        "--dsw-static-deepseek-300": "#f9b8ac",
        "--dsw-static-deepseek-400": "#f38877",
        "--dsw-static-deepseek-450": "#ea5644",
        "--dsw-static-deepseek-500": "#d24636",
        "--dsw-static-deepseek-600": "#a74c3f",
        "--dsw-static-deepseek-800": "#583732",
        "--dsw-static-deepseek-900": "#402b27",
        "--dsw-static-deepseek-700-delete": "#843127",
      },
      plum: {
        // neutral-bluish
        "--dsw-static-neutral-bluish-00": "#fffdff",
        "--dsw-static-neutral-bluish-50": "#fdf8fe",
        "--dsw-static-neutral-bluish-60": "#f9f4fa",
        "--dsw-static-neutral-bluish-75": "#f6f0f8",
        "--dsw-static-neutral-bluish-100": "#f2ebf4",
        "--dsw-static-neutral-bluish-150": "#f1e9f3",
        "--dsw-static-neutral-bluish-200": "#ece1ee",
        "--dsw-static-neutral-bluish-300": "#d7d0d8",
        "--dsw-static-neutral-bluish-400": "#b7aeb9",
        "--dsw-static-neutral-bluish-500": "#a398a6",
        "--dsw-static-neutral-bluish-600": "#8a818c",
        "--dsw-static-neutral-bluish-700": "#6a626c",
        "--dsw-static-neutral-bluish-750": "#49424b",
        "--dsw-static-neutral-bluish-800": "#39343a",
        "--dsw-static-neutral-bluish-850": "#2f2a30",
        "--dsw-static-neutral-bluish-875": "#252226",
        "--dsw-static-neutral-bluish-900": "#1d1a1e",
        "--dsw-static-neutral-bluish-950": "#181419",
        "--dsw-static-neutral-bluish-1000": "#140f16",
        // blue
        "--dsw-static-blue-50": "#f8f3f9",
        "--dsw-static-blue-75": "#f4ecf6",
        "--dsw-static-blue-100": "#efe4f2",
        "--dsw-static-blue-300": "#d4b3dc",
        "--dsw-static-blue-400": "#bf8eca",
        "--dsw-static-blue-450": "#b47cc0",
        "--dsw-static-blue-500": "#aa6bb8",
        "--dsw-static-blue-50p": "#f6eff8",
        "--dsw-static-blue-600": "#964ea6",
        "--dsw-static-blue-800": "#6c3278",
        "--dsw-static-blue-900": "#492551",
        "--dsw-static-blue-950": "#371f3c",
        // deepseek
        "--dsw-static-deepseek-50": "#f6f0f8",
        "--dsw-static-deepseek-100": "#f2e9f4",
        "--dsw-static-deepseek-200": "#ebdbee",
        "--dsw-static-deepseek-300": "#dabfe1",
        "--dsw-static-deepseek-400": "#c597d0",
        "--dsw-static-deepseek-450": "#b172bf",
        "--dsw-static-deepseek-500": "#9e62ab",
        "--dsw-static-deepseek-600": "#825b8a",
        "--dsw-static-deepseek-800": "#493c4c",
        "--dsw-static-deepseek-900": "#362d38",
        "--dsw-static-deepseek-700-delete": "#64406c",
      },
      charcoal: {
        // neutral-bluish
        "--dsw-static-neutral-bluish-00": "#feffff",
        "--dsw-static-neutral-bluish-50": "#f8fafc",
        "--dsw-static-neutral-bluish-60": "#f4f6f8",
        "--dsw-static-neutral-bluish-75": "#f0f3f6",
        "--dsw-static-neutral-bluish-100": "#eaeef3",
        "--dsw-static-neutral-bluish-150": "#e7edf3",
        "--dsw-static-neutral-bluish-200": "#dee6ef",
        "--dsw-static-neutral-bluish-300": "#cfd3d7",
        "--dsw-static-neutral-bluish-400": "#acb2b9",
        "--dsw-static-neutral-bluish-500": "#959ea7",
        "--dsw-static-neutral-bluish-600": "#7f868d",
        "--dsw-static-neutral-bluish-700": "#61666c",
        "--dsw-static-neutral-bluish-750": "#41464b",
        "--dsw-static-neutral-bluish-800": "#343639",
        "--dsw-static-neutral-bluish-850": "#2a2c2f",
        "--dsw-static-neutral-bluish-875": "#222325",
        "--dsw-static-neutral-bluish-900": "#1a1b1d",
        "--dsw-static-neutral-bluish-950": "#131518",
        "--dsw-static-neutral-bluish-1000": "#0e1115",
        // blue
        "--dsw-static-blue-50": "#f3f6f9",
        "--dsw-static-blue-75": "#ebeff4",
        "--dsw-static-blue-100": "#e3e9f0",
        "--dsw-static-blue-300": "#b1c3d6",
        "--dsw-static-blue-400": "#8ba6c1",
        "--dsw-static-blue-450": "#7997b7",
        "--dsw-static-blue-500": "#698aae",
        "--dsw-static-blue-50p": "#eff2f6",
        "--dsw-static-blue-600": "#4e749b",
        "--dsw-static-blue-800": "#325170",
        "--dsw-static-blue-900": "#24384b",
        "--dsw-static-blue-950": "#1e2b38",
        // deepseek
        "--dsw-static-deepseek-50": "#f0f3f6",
        "--dsw-static-deepseek-100": "#e8edf2",
        "--dsw-static-deepseek-200": "#dae2eb",
        "--dsw-static-deepseek-300": "#bdccdc",
        "--dsw-static-deepseek-400": "#95aec8",
        "--dsw-static-deepseek-450": "#7092b5",
        "--dsw-static-deepseek-500": "#6080a1",
        "--dsw-static-deepseek-600": "#596e84",
        "--dsw-static-deepseek-800": "#3b424a",
        "--dsw-static-deepseek-900": "#2d3137",
        "--dsw-static-deepseek-700-delete": "#3f5266",
      },
      solarized: {
        // neutral-bluish
        "--dsw-static-neutral-bluish-00": "#fdf6e3",
        "--dsw-static-neutral-bluish-50": "#f9f2df",
        "--dsw-static-neutral-bluish-60": "#f5eedb",
        "--dsw-static-neutral-bluish-75": "#eee8d5",
        "--dsw-static-neutral-bluish-100": "#e6dfc9",
        "--dsw-static-neutral-bluish-150": "#ddd6bf",
        "--dsw-static-neutral-bluish-200": "#d4cdb5",
        "--dsw-static-neutral-bluish-300": "#b9b6a6",
        "--dsw-static-neutral-bluish-400": "#9aa5a3",
        "--dsw-static-neutral-bluish-500": "#839496",
        "--dsw-static-neutral-bluish-600": "#6f858b",
        "--dsw-static-neutral-bluish-700": "#657b83",
        "--dsw-static-neutral-bluish-750": "#586e75",
        "--dsw-static-neutral-bluish-800": "#3f5a60",
        "--dsw-static-neutral-bluish-850": "#1f4a4f",
        "--dsw-static-neutral-bluish-875": "#0f3f45",
        "--dsw-static-neutral-bluish-900": "#073642",
        "--dsw-static-neutral-bluish-950": "#002b36",
        "--dsw-static-neutral-bluish-1000": "#001f27",
        // blue
        "--dsw-static-blue-50": "#e6f4f3",
        "--dsw-static-blue-75": "#d6efee",
        "--dsw-static-blue-100": "#c1e8e6",
        "--dsw-static-blue-300": "#8ad3ce",
        "--dsw-static-blue-400": "#5cc5bf",
        "--dsw-static-blue-450": "#42b5af",
        "--dsw-static-blue-500": "#2aa198",
        "--dsw-static-blue-50p": "#def2f1",
        "--dsw-static-blue-600": "#218b83",
        "--dsw-static-blue-800": "#17625d",
        "--dsw-static-blue-900": "#0f4541",
        "--dsw-static-blue-950": "#082e2b",
        // deepseek
        "--dsw-static-deepseek-50": "#e8f2fa",
        "--dsw-static-deepseek-100": "#d1e6f5",
        "--dsw-static-deepseek-200": "#a8cfe9",
        "--dsw-static-deepseek-300": "#6fb3dc",
        "--dsw-static-deepseek-400": "#459bd5",
        "--dsw-static-deepseek-450": "#2f8fcb",
        "--dsw-static-deepseek-500": "#268bd2",
        "--dsw-static-deepseek-600": "#1f74b0",
        "--dsw-static-deepseek-800": "#175780",
        "--dsw-static-deepseek-900": "#103e5c",
        "--dsw-static-deepseek-700-delete": "#1a4a6b",
      },
      "cyan-oled": {
        // neutral-bluish
        "--dsw-static-neutral-bluish-00": "#f8fdfe",
        "--dsw-static-neutral-bluish-50": "#f1fafc",
        "--dsw-static-neutral-bluish-60": "#eaf7f9",
        "--dsw-static-neutral-bluish-75": "#e3f3f6",
        "--dsw-static-neutral-bluish-100": "#dbf0f3",
        "--dsw-static-neutral-bluish-150": "#d4ecef",
        "--dsw-static-neutral-bluish-200": "#c6e4e8",
        "--dsw-static-neutral-bluish-300": "#a9d2d8",
        "--dsw-static-neutral-bluish-400": "#82b7bf",
        "--dsw-static-neutral-bluish-500": "#629ca5",
        "--dsw-static-neutral-bluish-600": "#43737b",
        "--dsw-static-neutral-bluish-700": "#345d64",
        "--dsw-static-neutral-bluish-750": "#294e54",
        "--dsw-static-neutral-bluish-800": "#203f44",
        "--dsw-static-neutral-bluish-850": "#193439",
        "--dsw-static-neutral-bluish-875": "#152e32",
        "--dsw-static-neutral-bluish-900": "#081b1e",
        "--dsw-static-neutral-bluish-950": "#040d0f",
        "--dsw-static-neutral-bluish-1000": "#000000",
        // blue
        "--dsw-static-blue-50": "#ecfeff",
        "--dsw-static-blue-75": "#dffbfe",
        "--dsw-static-blue-100": "#cffafe",
        "--dsw-static-blue-300": "#67e8f9",
        "--dsw-static-blue-400": "#22d3ee",
        "--dsw-static-blue-450": "#0bc5e0",
        "--dsw-static-blue-500": "#00b8d4",
        "--dsw-static-blue-50p": "#e2fcff",
        "--dsw-static-blue-600": "#0891b2",
        "--dsw-static-blue-800": "#155e75",
        "--dsw-static-blue-900": "#164e63",
        "--dsw-static-blue-950": "#083344",
        // deepseek
        "--dsw-static-deepseek-50": "#ecfeff",
        "--dsw-static-deepseek-100": "#cffafe",
        "--dsw-static-deepseek-200": "#a5f3fc",
        "--dsw-static-deepseek-300": "#67e8f9",
        "--dsw-static-deepseek-400": "#22d3ee",
        "--dsw-static-deepseek-450": "#0bc5e0",
        "--dsw-static-deepseek-500": "#00b8d4",
        "--dsw-static-deepseek-600": "#0891b2",
        "--dsw-static-deepseek-800": "#155e75",
        "--dsw-static-deepseek-900": "#164e63",
        "--dsw-static-deepseek-700-delete": "#0e7490",
      },
    };
    const PALETTE_SOURCE = "ui-colors-palette";
    const PALETTE_OPTIONS = [
      { id: "bluish", label: "Bluish (default)", swatch: "#7aaaff" },
      { id: "olive", label: "Olive", swatch: "#b0b240" },
      { id: "ember", label: "Ember", swatch: "#f38877" },
      { id: "plum", label: "Midnight Plum", swatch: "#c597d0" },
      { id: "charcoal", label: "Deep Charcoal", swatch: "#95aec8" },
      { id: "solarized", label: "Solarized", swatch: "#459bd5" },
      { id: "cyan-oled", label: "Cyan OLED", swatch: "#22d3ee" },
      { id: "neon-yellow", label: "Neon Yellow", swatch: "#f5e900" },
      { id: "acid", label: "Acid Hacker Green", swatch: "#00ff41" },
    ];
    const PALETTE_IDS = PALETTE_OPTIONS.map((option) => option.id);
    /** These spectra always run as complete semantic themes. */
    const ALWAYS_FULL_PALETTES = new Set(["acid", "cyan-oled", "neon-yellow"]);

    /**
     * Full semantic theme: pitch-black surfaces, phosphor green, and green
     * primitive borders. Acid Hacker Green applies it as its preset; the
     * `semanticTheme` switch applies it on top of any other palette.
     */
    const FULL_SEMANTIC_THEME_TOKENS = {
      "--dsw-alias-link": "#00ff41",
      "--dsw-alias-bg-base": "#000000",
      "--dsw-alias-bg-overlay": "#0a120a",
      "--dsw-alias-bg-skeleton": "#0f2f0f",
      "--dsw-alias-bg-document-preview": "#020402",
      "--dsw-alias-bg-document-selection": "#00ff4140",
      "--dsw-alias-bg-layer-1": "#050805",
      "--dsw-alias-bg-layer-2": "#081008",
      "--dsw-alias-bg-layer-3": "#0d1a0d",
      "--dsw-alias-bg-mask-1": "#000000b3",
      "--dsw-alias-bg-mask-2": "#00000066",
      "--dsw-alias-bg-mask-3": "#000000cc",
      "--dsw-alias-bg-mask-drop": "#000000e6",
      "--dsw-alias-bg-mask-photo": "#000000e0",
      "--dsw-alias-bg-module-platform": "#081008",
      "--dsw-alias-bg-multi-select": "#0a120a",
      "--dsw-alias-border-inverted": "#00000033",
      "--dsw-alias-border-inverted2": "#00000055",
      "--dsw-alias-border-l1": "#00000033",
      "--dsw-alias-border-l2": "#00000055",
      "--dsw-alias-border-l3": "#00000088",
      "--dsw-alias-border-l4": "#000000",
      "--dsw-alias-border-l2-darkmode-thin": "#00000055",
      "--dsw-alias-brand-primary": "#00ff41",
      "--dsw-alias-brand-text": "#00ff41",
      "--dsw-alias-brand-primary-invert": "#000000",
      "--dsw-alias-brand-primary-new-colorprimary-new-color": "#00ff41",
      "--dsw-alias-button-contrast-fill": "#00ff41",
      "--dsw-alias-button-elevated-fill": "#081008",
      "--dsw-alias-button-floating-fill": "#0a120a",
      "--dsw-alias-button-floating-hover": "#0f2f0f",
      "--dsw-alias-button-ghost-active-border": "#00ff41",
      "--dsw-alias-button-ghost-active-fill": "#0f2f0f",
      "--dsw-alias-button-ghost-active-hover": "#123012",
      "--dsw-alias-button-info-fill": "#00ff41",
      "--dsw-alias-button-info-hover": "#33ff66",
      "--dsw-alias-button-primary-dimmed": "#0f2f0f",
      "--dsw-alias-button-primary-fill": "#00ff41",
      "--dsw-alias-button-primary-hover": "#33ff66",
      "--dsw-alias-button-tool-bar-fill": "#00000088",
      "--dsw-alias-button-tool-bar-hover": "#00ff4133",
      "--dsw-alias-button-tool-bar-fill-invisible": "#00000000",
      "--dsw-alias-code-diff-added": "#00ff411f",
      "--dsw-alias-code-diff-deleted": "#ff33551f",
      "--dsw-alias-file-diff-added-bg": "#061a0a",
      "--dsw-alias-file-diff-added-gutter": "#0a2410",
      "--dsw-alias-file-diff-added-marker": "#00ff41",
      "--dsw-alias-file-diff-deleted-bg": "#1a0608",
      "--dsw-alias-file-diff-deleted-gutter": "#240a0f",
      "--dsw-alias-file-diff-deleted-marker": "#ff3355",
      "--dsw-alias-interactive-bg-active": "#00ff4133",
      "--dsw-alias-interactive-bg-hover": "#00ff411f",
      "--dsw-alias-interactive-bg-hover-accent": "#00ff4140",
      "--dsw-alias-interactive-bg-hover-danger": "#ff33551f",
      "--dsw-alias-interactive-bg-hover-solid": "#0f2f0f",
      "--dsw-alias-label-caption": "#3a8f45",
      "--dsw-alias-label-dimmed": "#2f5a35",
      "--dsw-alias-label-primary": "#ccffcc",
      "--dsw-alias-label-secondary": "#7fdf7f",
      "--dsw-alias-label-shimmer": "#00ff4166",
      "--dsw-alias-label-tertiary": "#4faf5a",
      "--dsw-alias-label-deep-diving": "#00ff41",
      "--dsw-alias-label-deep-diving-shimmer": "#66ff88",
      "--dsw-alias-label-document-preview": "#7fdf7f",
      "--dsw-alias-label-primary-bluish": "#b6ffb0",
      "--dsw-alias-label-primary-dimmed": "#7fdf7f",
      "--dsw-alias-label-primary-foreground": "#000000",
      "--dsw-alias-label-primary-inverted": "#000000",
      "--dsw-alias-markdown-citation": "#0d1a0d",
      "--dsw-alias-markdown-placeholder": "#081008",
      "--dsw-alias-markdown-tag": "#0d1a0d",
      "--dsw-alias-markdown-code-block": "#020402",
      "--dsw-alias-markdown-code-block-banner": "#0a120a",
      "--dsw-alias-markdown-code-segment-selected": "#0f2f0f",
      "--dsw-alias-markdown-code-segment-unselected": "#081008",
      "--dsw-alias-markdown-inline-code": "#0a120a",
      "--dsw-alias-menu-icon": "#00ff41",
      "--dsw-alias-menu-group-header-fill": "#0a120af2",
      "--dsw-alias-onboarding-accent": "#00ff41",
      "--dsw-alias-onboarding-card-fill": "#0a120a",
      "--dsw-alias-onboarding-checkbox-border": "#00ff41",
      "--dsw-alias-onboarding-secondary-fill": "#081008",
      "--dsw-alias-scrollbar-bg-l1": "#0f2f0f",
      "--dsw-alias-scrollbar-bg-l2": "#123012",
      "--dsw-alias-scrollbar-hover-l1": "#00ff41",
      "--dsw-alias-scrollbar-hover-l2": "#33ff66",
      "--dsw-alias-settings-card-fill": "#081008",
      "--dsw-alias-settings-card-stroke": "#00000088",
      "--dsw-alias-state-business-primary": "#00ff41",
      "--dsw-alias-state-business-tertiary": "#0f2f0f",
      "--dsw-alias-state-error-primary": "#ff3355",
      "--dsw-alias-state-error-secondary": "#ff6688",
      "--dsw-alias-state-idle-primary": "#2f5a35",
      "--dsw-alias-state-success-primary": "#00ff41",
      "--dsw-alias-state-success-secondary": "#33ff66",
      "--dsw-alias-state-success-tertiary": "#0f2f0f",
      "--dsw-alias-state-warn-label": "#ffcc00",
      "--dsw-alias-state-warn-primary": "#ffcc00",
      "--dsw-alias-state-warn-secondary": "#ffdd44",
      "--dsw-alias-state-warn-tertiary": "#2a2200",
      "--dsw-alias-switch-thumb": "#00ff41",
      "--dsw-alias-toast-bg": "#0a120a",
      "--dsw-alias-toast-label": "#ccffcc",
      "--dsw-alias-tooltip-bg": "#0a120a",
      "--dsw-alias-tooltip-key-bg": "#123012",
      "--dsw-alias-turn-trigger-bg": "#081008",
      "--dsw-alias-turn-trigger-bg-hover": "#0f2f0f",
      "--dsw-focus-ring-color": "#00ff41",
      "--dsw-menu-surface-fill": "#050805f2",
      "--dsw-specific-bubble": "#0a1a0a",
      "--dsw-specific-menu": "#050805f2",
      "--dsw-specific-selector": "#0f2f0f",
      "--dsw-specific-tip": "#0a120a",
      "--dsw-specific-bubble-highlight": "#123012",
      "--dsw-specific-input-major": "#050805",
      "--dsw-specific-login-input": "#020402",
      "--dsw-specific-sidebar-fill": "#000000",
      "--dsw-specific-sidebar-nav-item-active": "#0f2f0f",
      "--dsw-specific-sidebar-nav-item-hover": "#081008",
      "--dsw-specific-sidebar-nav-item-active-accent": "#00ff41",
      "--dsw-static-blue-100": "#003300",
      "--dsw-static-blue-300": "#006600",
      "--dsw-static-blue-400": "#009933",
      "--dsw-static-blue-450": "#00b33c",
      "--dsw-static-blue-50": "#001a00",
      "--dsw-static-blue-500": "#00cc33",
      "--dsw-static-blue-50p": "#001f00",
      "--dsw-static-blue-600": "#00e63a",
      "--dsw-static-blue-75": "#002600",
      "--dsw-static-blue-800": "#33ff66",
      "--dsw-static-blue-900": "#66ff88",
      "--dsw-static-blue-950": "#99ffaa",
      "--dsw-static-deepseek-100": "#003300",
      "--dsw-static-deepseek-200": "#004d00",
      "--dsw-static-deepseek-300": "#006600",
      "--dsw-static-deepseek-400": "#009933",
      "--dsw-static-deepseek-450": "#00b33c",
      "--dsw-static-deepseek-50": "#001a00",
      "--dsw-static-deepseek-500": "#00ff41",
      "--dsw-static-deepseek-600": "#00e63a",
      "--dsw-static-deepseek-800": "#009933",
      "--dsw-static-deepseek-900": "#006622",
      "--dsw-static-deepseek-700-delete": "#00cc33",
      "--dsw-static-neutral-00": "#ffffff",
      "--dsw-static-neutral-100": "#050505",
      "--dsw-static-neutral-1000": "#707070",
      "--dsw-static-neutral-150": "#080808",
      "--dsw-static-neutral-200": "#0b0b0b",
      "--dsw-static-neutral-250": "#0e0e0e",
      "--dsw-static-neutral-300": "#121212",
      "--dsw-static-neutral-400": "#181818",
      "--dsw-static-neutral-50": "#020202",
      "--dsw-static-neutral-500": "#202020",
      "--dsw-static-neutral-550": "#282828",
      "--dsw-static-neutral-600": "#303030",
      "--dsw-static-neutral-700": "#404040",
      "--dsw-static-neutral-800": "#505050",
      "--dsw-static-neutral-850": "#585858",
      "--dsw-static-neutral-900": "#606060",
      "--dsw-static-neutral-bluish-00": "#ffffff",
      "--dsw-static-neutral-bluish-100": "#050805",
      "--dsw-static-neutral-bluish-1000": "#346834",
      "--dsw-static-neutral-bluish-150": "#060a06",
      "--dsw-static-neutral-bluish-200": "#080d08",
      "--dsw-static-neutral-bluish-300": "#0a120a",
      "--dsw-static-neutral-bluish-400": "#0d180d",
      "--dsw-static-neutral-bluish-50": "#010201",
      "--dsw-static-neutral-bluish-500": "#102010",
      "--dsw-static-neutral-bluish-60": "#020302",
      "--dsw-static-neutral-bluish-600": "#142814",
      "--dsw-static-neutral-bluish-700": "#183018",
      "--dsw-static-neutral-bluish-75": "#030503",
      "--dsw-static-neutral-bluish-750": "#1c381c",
      "--dsw-static-neutral-bluish-800": "#204020",
      "--dsw-static-neutral-bluish-850": "#244824",
      "--dsw-static-neutral-bluish-875": "#285028",
      "--dsw-static-neutral-bluish-900": "#2c582c",
      "--dsw-static-neutral-bluish-950": "#306030",
    };

    const STYLE_TEXT = `
.dsh-ui-colors-row{display:flex;flex-direction:column;gap:14px;padding:14px 0;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.dsh-ui-colors-row:last-child{border-bottom:0}
.dsh-ui-colors-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
.dsh-ui-colors-title{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:22px;margin:0}
.dsh-ui-colors-desc{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px;margin-top:2px;max-width:52ch}
.dsh-ui-colors-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px 24px}
.dsh-ui-colors-disclosure{margin-top:2px}
.dsh-ui-colors-summary{display:inline-flex;align-items:center;gap:6px;width:max-content;padding:2px 0;color:var(--dsw-alias-link);font-size:12px;line-height:20px;list-style:none;cursor:pointer}
.dsh-ui-colors-summary::-webkit-details-marker{display:none}
.dsh-ui-colors-summary-caret{display:inline-block;font-size:9px;line-height:1;transition:transform .12s ease}
.dsh-ui-colors-disclosure[open] .dsh-ui-colors-summary-caret{transform:rotate(90deg)}
.dsh-ui-colors-summary-open{display:none}
.dsh-ui-colors-disclosure[open] .dsh-ui-colors-summary-open{display:inline}
.dsh-ui-colors-disclosure[open] .dsh-ui-colors-summary-closed{display:none}
.dsh-ui-colors-disclosure > .dsh-ui-colors-grid{margin-top:10px}
.dsh-ui-colors-cell{display:flex;flex-direction:column;gap:6px;min-width:0}
.dsh-ui-colors-cell-title{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:500;line-height:18px}
.dsh-ui-colors-fields{display:flex;flex-direction:column;gap:6px}
.dsh-ui-colors-field{display:flex;align-items:center;gap:8px}
.dsh-ui-colors-fields-row{display:flex;align-items:center;flex-wrap:wrap;gap:10px 20px}
.dsh-ui-colors-label{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:20px;min-width:32px}
.dsh-ui-colors-hex{width:104px;padding:5px 8px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-family:var(--ds-font-family-code);font-size:12px;line-height:18px}
.dsh-ui-colors-hex::placeholder{color:var(--dsw-alias-label-caption)}
.dsh-ui-colors-select{min-width:180px;padding:6px 10px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;cursor:pointer}
.dsh-ui-colors-picker{position:relative;min-width:180px}
.dsh-ui-colors-picker-button{display:flex;align-items:center;gap:8px;width:100%;text-align:left;-webkit-appearance:none;appearance:none}
.dsh-ui-colors-picker-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsh-ui-colors-swatches{display:inline-flex;flex:none;align-items:center;gap:1px}
.dsh-ui-colors-swatch{flex:none;font:inherit;font-size:14px;line-height:1}
.dsh-ui-colors-caret{flex:none;margin-left:auto;color:var(--dsw-alias-label-tertiary);font-size:9px;line-height:1}
.dsh-ui-colors-menu{position:absolute;top:calc(100% + 4px);left:0;z-index:60;min-width:100%;max-height:280px;overflow-y:auto;padding:4px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-elevation-panel)}
.dsh-ui-colors-menu[hidden]{display:none}
.dsh-ui-colors-option{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;padding:6px 8px;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;text-align:left;cursor:pointer}
.dsh-ui-colors-option:hover,.dsh-ui-colors-option-active{background:var(--dsw-alias-interactive-bg-hover)}
.dsh-ui-colors-row :is(button,input,summary):focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
.dsh-ui-colors-option:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}
.dsh-ui-colors-option-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsh-ui-colors-check{display:flex;align-items:center;gap:8px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:20px;cursor:pointer}
.dsh-ui-colors-check input{margin:0;accent-color:var(--dsw-alias-state-business-primary)}
.dsh-ui-colors-check-disabled{opacity:.55;cursor:default}
.dsh-ui-colors-checks{display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px}
body[${SELECTION_ATTR}] ::selection,body[${SELECTION_ATTR}]::selection{background-color:var(${SELECTION_LIGHT_VAR})}
body[${SELECTION_ATTR}][data-ds-dark-theme] ::selection,body[${SELECTION_ATTR}][data-ds-dark-theme]::selection{background-color:var(${SELECTION_DARK_VAR})}
.dsh-ui-colors-clear{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;padding:0;border:0;border-radius:var(--dsw-radius-xs);background:transparent;color:var(--dsw-alias-label-caption);font:inherit;font-size:14px;line-height:1;cursor:pointer}
.dsh-ui-colors-clear:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dsh-ui-colors-clear:disabled{opacity:.35;cursor:default}
.dsh-ui-colors-reset{padding:2px 0;border:0;background:transparent;color:var(--dsw-alias-link);font:inherit;font-size:12px;line-height:20px;cursor:pointer}
.dsh-ui-colors-reset:disabled{color:var(--dsw-alias-label-caption);cursor:default}
.dsh-ui-colors-status{color:var(--dsw-alias-label-caption);font-size:11px;line-height:16px}
body[${BODY_SIDEBAR_ATTR}] [${SIDEBAR_ATTR}]{
  --dsw-alias-label-primary:var(--dsh-ui-colors-text-light);
  --dsw-alias-label-secondary:var(--dsh-ui-colors-secondary-light);
  --dsw-alias-label-tertiary:var(--dsh-ui-colors-tertiary-light);
  --dsw-alias-label-caption:var(--dsh-ui-colors-caption-light);
  --dsw-alias-label-primary-inverted:var(--dsh-ui-colors-inverted-light);
  --dsw-alias-interactive-bg-hover:var(--dsh-ui-colors-hover-light);
  --dsw-alias-interactive-bg-active:var(--dsh-ui-colors-active-light);
  --dsw-alias-button-elevated-fill:var(--dsh-ui-colors-button-light);
  --dsw-alias-button-floating-hover:var(--dsh-ui-colors-button-hover-light);
  --dsw-alias-border-l3:var(--dsh-ui-colors-border-light);
  --dsw-alias-scrollbar-bg-l2:var(--dsh-ui-colors-border-light);
  --dsw-alias-scrollbar-hover-l2:var(--dsh-ui-colors-text-light);
}
body[${BODY_SIDEBAR_ATTR}][data-ds-dark-theme] [${SIDEBAR_ATTR}]{
  --dsw-alias-label-primary:var(--dsh-ui-colors-text-dark);
  --dsw-alias-label-secondary:var(--dsh-ui-colors-secondary-dark);
  --dsw-alias-label-tertiary:var(--dsh-ui-colors-tertiary-dark);
  --dsw-alias-label-caption:var(--dsh-ui-colors-caption-dark);
  --dsw-alias-label-primary-inverted:var(--dsh-ui-colors-inverted-dark);
  --dsw-alias-interactive-bg-hover:var(--dsh-ui-colors-hover-dark);
  --dsw-alias-interactive-bg-active:var(--dsh-ui-colors-active-dark);
  --dsw-alias-button-elevated-fill:var(--dsh-ui-colors-button-dark);
  --dsw-alias-button-floating-hover:var(--dsh-ui-colors-button-hover-dark);
  --dsw-alias-border-l3:var(--dsh-ui-colors-border-dark);
  --dsw-alias-scrollbar-bg-l2:var(--dsh-ui-colors-border-dark);
  --dsw-alias-scrollbar-hover-l2:var(--dsh-ui-colors-text-dark);
}
body[${BODY_MAIN_ATTR}] [${MAIN_ATTR}]{
  background:var(--dsh-ui-colors-main-light);
  --dsw-alias-bg-base:var(--dsh-ui-colors-main-light);
}
body[${BODY_MAIN_ATTR}][data-ds-dark-theme] [${MAIN_ATTR}]{
  background:var(--dsh-ui-colors-main-dark);
  --dsw-alias-bg-base:var(--dsh-ui-colors-main-dark);
}
body[${BODY_PANEL_ATTR}] [${PANEL_ATTR}]{
  background:var(--dsh-ui-colors-panel-light);
  --dsw-alias-bg-base:var(--dsh-ui-colors-panel-light);
  --dsw-alias-bg-layer-1:var(--dsh-ui-colors-panel-light);
  --dsw-alias-bg-layer-2:var(--dsh-ui-colors-panel-light);
  --dsw-alias-bg-layer-3:var(--dsh-ui-colors-panel-light);
  --dsw-specific-sidebar-fill:var(--dsh-ui-colors-panel-light);
}
body[${BODY_PANEL_ATTR}][data-ds-dark-theme] [${PANEL_ATTR}]{
  background:var(--dsh-ui-colors-panel-dark);
  --dsw-alias-bg-base:var(--dsh-ui-colors-panel-dark);
  --dsw-alias-bg-layer-1:var(--dsh-ui-colors-panel-dark);
  --dsw-alias-bg-layer-2:var(--dsh-ui-colors-panel-dark);
  --dsw-alias-bg-layer-3:var(--dsh-ui-colors-panel-dark);
  --dsw-specific-sidebar-fill:var(--dsh-ui-colors-panel-dark);
}
.dsh-ui-shapes-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.dsh-ui-shapes-cell{display:flex;align-items:flex-start;gap:8px;padding:10px 12px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2);cursor:pointer}
.dsh-ui-shapes-cell-active{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-state-business-tertiary)}
.dsh-ui-shapes-radio{margin:2px 0 0;accent-color:var(--dsw-alias-state-business-primary)}
.dsh-ui-shapes-copy{display:flex;flex-direction:column;gap:2px;min-width:0}
.dsh-ui-shapes-title{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:500;line-height:18px}
.dsh-ui-shapes-desc{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}
/* Automation tasks hardcodes its own radii instead of consuming the shared scale. */
:is([data-testid="task-manager-page"], [class*="_tabBody"]) :is([class*="_newButton"], [class*="_ruleRows"], [class*="_instruction"], [class*="_panel"]){border-radius:var(--dsw-radius-lg) !important}
:is([data-testid="task-manager-page"], [class*="_tabBody"]) :is([class*="_filterTab"], [class*="_linkedSession"]){border-radius:calc(var(--dsw-radius-md) + var(--dsw-radius-xs) / 2) !important}
:is([data-testid="task-manager-page"], [class*="_tabBody"]) :is([class*="_searchField"], [class*="_row"]){border-radius:var(--dsw-radius-md) !important}
:is([data-testid="task-manager-page"], [class*="_tabBody"]) :is([class*="_leading"], [class*="_notice"], [class*="_option"]){border-radius:calc(var(--dsw-radius-sm) + var(--dsw-radius-xs) / 2) !important}
:is([data-testid="task-manager-page"], [class*="_tabBody"]) :is([class*="_retentionRule"], [class*="_delivery"], [class*="_nav"], [class*="_cell"]){border-radius:var(--dsw-radius-sm) !important}
:is([data-testid="task-manager-page"], [class*="_tabBody"]) [class*="_retentionInfo"]{border-radius:var(--dsw-radius-xs) !important}
:is([data-testid="task-manager-page"], [class*="_tabBody"]) :is([class*="_ruleValueFace"], [class*="_ruleInput"], [class*="_ruleIntervalStepper"]){border-radius:calc(var(--dsw-radius-lg) + var(--dsw-radius-xs) / 2) !important}
:is([data-testid="task-manager-page"], [class*="_tabBody"]) [class*="_zoneSearch"]{border-radius:calc(var(--dsw-radius-sm) - var(--dsw-radius-xs) / 4) !important}
:is([data-testid="task-manager-page"], [class*="_tabBody"]) [class*="_ruleIntervalArrow"]{border-radius:calc(var(--dsw-radius-xs) * 3 / 4) !important}
.dsh-ui-colors-section{display:flex;flex-direction:column;width:100%}
@supports (mask-image: none){
[${SECTION_ATTR}] svg{display:none}
[${SECTION_ATTR}]::before{content:"";flex:none;width:16px;height:16px;background-color:currentColor;-webkit-mask-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Im0xMiA5LTguNDE0IDguNDE0QTIgMiAwIDAgMCAzIDE4LjgyOHYxLjM0NGEyIDIgMCAwIDEtLjU4NiAxLjQxNEEyIDIgMCAwIDEgMy44MjggMjFoMS4zNDRhMiAyIDAgMCAwIDEuNDE0LS41ODZMMTUgMTIiLz48cGF0aCBkPSJtMTggOSAuNC40YTEgMSAwIDEgMS0zIDNsLTMuOC0zLjhhMSAxIDAgMSAxIDMtM2wuNC40IDMuNC0zLjRhMSAxIDAgMSAxIDMgM3oiLz48cGF0aCBkPSJtMiAyMiAuNDE0LS40MTQiLz48L3N2Zz4=");-webkit-mask-position:center;-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;mask-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Im0xMiA5LTguNDE0IDguNDE0QTIgMiAwIDAgMCAzIDE4LjgyOHYxLjM0NGEyIDIgMCAwIDEtLjU4NiAxLjQxNEEyIDIgMCAwIDEgMy44MjggMjFoMS4zNDRhMiAyIDAgMCAwIDEuNDE0LS41ODZMMTUgMTIiLz48cGF0aCBkPSJtMTggOSAuNC40YTEgMSAwIDEgMS0zIDNsLTMuOC0zLjhhMSAxIDAgMSAxIDMtM2wuNC40IDMuNC0zLjRhMSAxIDAgMSAxIDMgM3oiLz48cGF0aCBkPSJtMiAyMiAuNDE0LS40MTQiLz48L3N2Zz4=");mask-position:center;mask-size:contain;mask-repeat:no-repeat}
}
`;

    /**
     * Expand `#rgb`/`#rgba`/`#rrggbb`/`#rrggbbaa` to `#rrggbbaa`; '' when invalid.
     * A six-digit value becomes opaque (`ff` alpha).
     */
    function normalizeColor(input) {
      if (typeof input !== "string") return "";
      let value = input.trim().toLowerCase();
      if (value === "") return "";
      if (value[0] !== "#") value = `#${value}`;
      const match = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(value);
      if (match === null) return "";
      let hex = match[1];
      if (hex.length === 3) hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}ff`;
      else if (hex.length === 4) hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
      else if (hex.length === 6) hex = `${hex}ff`;
      return `#${hex}`;
    }

    /** RGB portion of a color input; '' when invalid. */
    function normalizeHex(input) {
      const color = normalizeColor(input);
      return color === "" ? "" : color.slice(0, 7);
    }

    /** WCAG relative luminance of a color's RGB channels; alpha is ignored. */
    function luminance(hex) {
      const rgb = normalizeHex(hex);
      if (rgb === "") return 0;
      const value = Number.parseInt(rgb.slice(1), 16);
      const channels = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((channel) => {
        const unit = channel / 255;
        return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    }

    /** Text and interaction colors that stay legible on top of `fill`. */
    function contrastPalette(fill) {
      const level = luminance(fill);
      const whiteContrast = 1.05 / (level + 0.05);
      const blackContrast = (level + 0.05) / 0.05;
      const useWhite = whiteContrast >= blackContrast;
      const rgb = useWhite ? "247,248,250" : "15,17,21";
      const alpha = (value) => `rgba(${rgb},${value})`;
      return {
        text: useWhite ? "#f7f8fa" : "#0f1115",
        secondary: alpha(0.76),
        tertiary: alpha(0.6),
        caption: alpha(0.5),
        inverted: fill,
        hover: useWhite ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
        active: useWhite ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.09)",
        button: useWhite ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)",
        buttonHover: useWhite ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.08)",
        border: useWhite ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.12)",
      };
    }

    /** Blend two CSS colors, keeping `percent` of `target`. */
    function mix(color, target, percent) {
      return `color-mix(in srgb, ${color} ${100 - percent}%, ${target} ${percent}%)`;
    }

    /** Blend two `#rrggbb` colors; `weight` is the share of `to`. */
    function mixHex(from, to, weight) {
      const a = normalizeHex(from);
      const b = normalizeHex(to);
      if (a === "" || b === "") return from;
      const t = Math.max(0, Math.min(1, weight));
      const channel = (offset) => {
        const av = Number.parseInt(a.slice(offset, offset + 2), 16);
        const bv = Number.parseInt(b.slice(offset, offset + 2), 16);
        return Math.round(av + (bv - av) * t)
          .toString(16)
          .padStart(2, "0");
      };
      return `#${channel(1)}${channel(3)}${channel(5)}`;
    }

    /** Append an alpha channel to a `#rrggbb` color. */
    function alphaHex(hex, alpha) {
      return `${normalizeHex(hex)}${alpha}`;
    }

    /** Accent and neutral used to derive a full semantic theme for one spectrum and mode. */
    function paletteSeed(palette, mode) {
      const dark = mode === "dark";
      if (palette === "acid") {
        return dark
          ? { accent: "#00ff41", neutral: "#7fdf7f" }
          : { accent: "#008f25", neutral: "#7fdf7f" };
      }
      if (palette === "cyan-oled") {
        return {
          accent: dark ? "#22d3ee" : "#0891b2",
          neutral: "#67e8f9",
        };
      }
      if (palette === "neon-yellow") {
        return {
          accent: dark ? "#f5e900" : "#a67c00",
          neutral: "#d8c65a",
        };
      }
      if (palette === "bluish" || SPECTRA[palette] === undefined) {
        return { accent: dark ? "#7aaaff" : "#4868b2", neutral: "#979da6" };
      }
      const spectrum = SPECTRA[palette];
      return {
        accent: spectrum[dark ? "--dsw-static-deepseek-400" : "--dsw-static-deepseek-600"],
        neutral: spectrum["--dsw-static-neutral-bluish-500"],
      };
    }

    /** Mode-specific static scales so raw static-token consumers follow the appearance. */
    function buildStaticScales(seed, mode) {
      const dark = mode === "dark";
      const scales = {};
      const neutralSteps = [
        ["00", 0], ["50", 0.02], ["100", 0.04], ["150", 0.06], ["200", 0.08],
        ["250", 0.10], ["300", 0.12], ["400", 0.18], ["500", 0.26], ["550", 0.32],
        ["600", 0.38], ["700", 0.50], ["800", 0.64], ["850", 0.72], ["900", 0.80],
        ["1000", 1],
      ];
      const tintSteps = [
        ["00", 0], ["50", 0.04], ["60", 0.06], ["75", 0.08], ["100", 0.11],
        ["150", 0.15], ["200", 0.19], ["300", 0.27], ["400", 0.37], ["500", 0.47],
        ["600", 0.57], ["700", 0.67], ["750", 0.73], ["800", 0.79], ["850", 0.85],
        ["875", 0.88], ["900", 0.91], ["950", 0.95], ["1000", 1],
      ];
      const neutralTint = mixHex(seed.neutral, seed.accent, 0.15);
      const neutralEnd = dark
        ? mixHex(neutralTint, "#000000", 0.45)
        : mixHex(neutralTint, "#000000", 0.65);
      const tintEnd = dark
        ? mixHex(mixHex(seed.neutral, seed.accent, 0.35), "#000000", 0.55)
        : mixHex(seed.neutral, "#000000", 0.45);
      const base = dark ? "#000000" : "#ffffff";
      for (const [step, weight] of neutralSteps) {
        scales[`--dsw-static-neutral-${step}`] = mixHex(base, neutralEnd, weight);
      }
      for (const [step, weight] of tintSteps) {
        scales[`--dsw-static-neutral-bluish-${step}`] = mixHex(base, tintEnd, weight);
      }

      // 00 and 1000 are absolute contrast anchors, not mode-flipped ramp
      // ends. Tooltip and toast text read neutral-bluish-00 directly and
      // expect white in both appearances.
      scales["--dsw-static-neutral-00"] = "#ffffff";
      scales["--dsw-static-neutral-1000"] = "#000000";
      scales["--dsw-static-neutral-bluish-00"] = "#ffffff";
      scales["--dsw-static-neutral-bluish-1000"] = "#0f1115";

      const accent = seed.accent;
      if (dark) {
        const blue = {
          "50": 0.10, "75": 0.14, "100": 0.18, "300": 0.35, "400": 0.50,
          "450": 0.62, "50p": 0.12, "950": -0.35,
        };
        for (const [step, weight] of Object.entries(blue)) {
          const value = weight < 0 ? mixHex(accent, "#ffffff", -weight) : mixHex("#000000", accent, weight);
          scales[`--dsw-static-blue-${step}`] = value;
        }
        scales["--dsw-static-blue-500"] = accent;
        scales["--dsw-static-blue-600"] = mixHex(accent, "#000000", 0.10);
        scales["--dsw-static-blue-800"] = mixHex(accent, "#000000", 0.55);
        scales["--dsw-static-blue-900"] = mixHex(accent, "#000000", 0.72);

        const deepseek = {
          "50": 0.10, "100": 0.18, "200": 0.28, "300": 0.38, "400": 0.52,
          "450": 0.64, "700-delete": 0.22,
        };
        for (const [step, weight] of Object.entries(deepseek)) {
          scales[`--dsw-static-deepseek-${step}`] = mixHex("#000000", accent, weight);
        }
        scales["--dsw-static-deepseek-500"] = accent;
        scales["--dsw-static-deepseek-600"] = mixHex(accent, "#000000", 0.10);
        scales["--dsw-static-deepseek-800"] = mixHex(accent, "#000000", 0.55);
        scales["--dsw-static-deepseek-900"] = mixHex(accent, "#000000", 0.72);
      } else {
        const blue = {
          "50": 0.08, "75": 0.12, "100": 0.16, "300": 0.30, "400": 0.45,
          "450": 0.55, "50p": 0.10,
        };
        for (const [step, weight] of Object.entries(blue)) {
          scales[`--dsw-static-blue-${step}`] = mixHex("#ffffff", accent, weight);
        }
        scales["--dsw-static-blue-500"] = accent;
        scales["--dsw-static-blue-600"] = mixHex(accent, "#000000", 0.15);
        scales["--dsw-static-blue-800"] = mixHex(accent, "#000000", 0.40);
        scales["--dsw-static-blue-900"] = mixHex(accent, "#000000", 0.55);
        scales["--dsw-static-blue-950"] = mixHex(accent, "#000000", 0.65);

        const deepseek = {
          "50": 0.08, "100": 0.16, "200": 0.25, "300": 0.36, "400": 0.48,
          "450": 0.58, "700-delete": 0.20,
        };
        for (const [step, weight] of Object.entries(deepseek)) {
          scales[`--dsw-static-deepseek-${step}`] = mixHex("#ffffff", accent, weight);
        }
        scales["--dsw-static-deepseek-500"] = accent;
        scales["--dsw-static-deepseek-600"] = mixHex(accent, "#000000", 0.15);
        scales["--dsw-static-deepseek-800"] = mixHex(accent, "#000000", 0.40);
        scales["--dsw-static-deepseek-900"] = mixHex(accent, "#000000", 0.55);
      }
      return scales;
    }

    /** Semantic aliases for one mode of the generic full theme. */
    function buildSemanticAliases(seed, mode) {
      const dark = mode === "dark";
      const accent = seed.accent;
      const accentHover = dark ? mixHex(accent, "#ffffff", 0.20) : mixHex(accent, "#000000", 0.15);
      const surfaceTint = mixHex(seed.neutral, accent, 0.35);
      const ink = (weight) => (dark ? mixHex("#ffffff", seed.neutral, weight) : mixHex("#000000", seed.neutral, weight));
      const surface = (weight) => (dark ? mixHex("#000000", surfaceTint, weight) : mixHex("#ffffff", surfaceTint, weight));
      const accentSurface = (weight) => (dark ? mixHex("#000000", accent, weight) : mixHex("#ffffff", accent, weight));
      const tooltipBg = dark ? surface(0.22) : mixHex("#000000", surfaceTint, 0.18);
      const contrast = luminance(accent) > 0.30 ? "#000000" : "#ffffff";
      const border1 = dark ? "#ffffff0f" : "#0000000a";
      const border2 = dark ? "#ffffff1f" : "#0000001a";
      const border3 = dark ? "#ffffff29" : "#0000001f";
      const border4 = dark ? "#ffffff33" : "#00000029";
      const error = dark ? "#ff3355" : "#c92a3a";
      const error2 = dark ? "#ff6688" : "#a61b2b";
      const success = dark ? "#00ff41" : "#0f7a2e";
      const success2 = dark ? "#33ff66" : "#12a33a";
      const successBg = dark ? "#0f2f0f" : "#e6f4e7";
      const warn = dark ? "#ffcc00" : "#9a6700";
      const warn2 = dark ? "#ffdd44" : "#b7791f";
      const warnBg = dark ? "#2a2200" : "#fff4d6";
      return {
        "--dsw-alias-link": accent,
        "--dsw-alias-bg-base": dark ? "#000000" : surface(0.03),
        "--dsw-alias-bg-overlay": dark ? surface(0.08) : surface(0.06),
        "--dsw-alias-bg-skeleton": dark ? surface(0.18) : surface(0.10),
        "--dsw-alias-bg-document-preview": surface(0.03),
        "--dsw-alias-bg-document-selection": alphaHex(accent, "40"),
        "--dsw-alias-bg-layer-1": dark ? surface(0.05) : "#ffffff",
        "--dsw-alias-bg-layer-2": dark ? surface(0.10) : surface(0.02),
        "--dsw-alias-bg-layer-3": dark ? surface(0.16) : surface(0.05),
        "--dsw-alias-bg-mask-1": "#000000b3",
        "--dsw-alias-bg-mask-2": "#00000066",
        "--dsw-alias-bg-mask-3": "#000000cc",
        "--dsw-alias-bg-mask-drop": "#000000e6",
        "--dsw-alias-bg-mask-photo": "#000000e0",
        "--dsw-alias-bg-module-platform": dark ? surface(0.10) : surface(0.04),
        "--dsw-alias-bg-multi-select": dark ? surface(0.08) : surface(0.04),
        "--dsw-alias-border-inverted": dark ? "#ffffff0f" : "#00000000",
        "--dsw-alias-border-inverted2": dark ? "#ffffff14" : "#0000001a",
        "--dsw-alias-border-l1": border1,
        "--dsw-alias-border-l2": border2,
        "--dsw-alias-border-l3": border3,
        "--dsw-alias-border-l4": border4,
        "--dsw-alias-border-l2-darkmode-thin": dark ? "#ffffff0f" : "#0000001a",
        "--dsw-alias-brand-primary": accent,
        "--dsw-alias-brand-text": accent,
        "--dsw-alias-brand-primary-invert": contrast,
        "--dsw-alias-brand-primary-new-colorprimary-new-color": accent,
        "--dsw-alias-button-contrast-fill": accent,
        "--dsw-alias-button-elevated-fill": dark ? surface(0.10) : "#ffffff",
        "--dsw-alias-button-floating-fill": dark ? surface(0.08) : "#ffffff",
        "--dsw-alias-button-floating-hover": dark ? surface(0.14) : surface(0.03),
        "--dsw-alias-button-ghost-active-border": accent,
        "--dsw-alias-button-ghost-active-fill": dark ? surface(0.14) : surface(0.05),
        "--dsw-alias-button-ghost-active-hover": dark ? surface(0.18) : surface(0.09),
        "--dsw-alias-button-info-fill": accent,
        "--dsw-alias-button-info-hover": accentHover,
        "--dsw-alias-button-primary-dimmed": accentSurface(0.18),
        "--dsw-alias-button-primary-fill": accent,
        "--dsw-alias-button-primary-hover": accentHover,
        "--dsw-alias-button-tool-bar-fill": dark ? "#00000088" : "#ffffffcc",
        "--dsw-alias-button-tool-bar-hover": alphaHex(accent, "33"),
        "--dsw-alias-button-tool-bar-fill-invisible": "#00000000",
        "--dsw-alias-code-diff-added": alphaHex(success, "1f"),
        "--dsw-alias-code-diff-deleted": alphaHex(error, "1f"),
        "--dsw-alias-file-diff-added-bg": dark ? "#061a0a" : "#e6f4e7",
        "--dsw-alias-file-diff-added-gutter": dark ? "#0a2410" : "#edf7ed",
        "--dsw-alias-file-diff-added-marker": success,
        "--dsw-alias-file-diff-deleted-bg": dark ? "#1a0608" : "#fce6e2",
        "--dsw-alias-file-diff-deleted-gutter": dark ? "#240a0f" : "#fdece9",
        "--dsw-alias-file-diff-deleted-marker": error,
        "--dsw-alias-interactive-bg-active": alphaHex(accent, "33"),
        "--dsw-alias-interactive-bg-hover": alphaHex(accent, "1f"),
        "--dsw-alias-interactive-bg-hover-accent": alphaHex(accent, "40"),
        "--dsw-alias-interactive-bg-hover-danger": alphaHex(error, "1f"),
        "--dsw-alias-interactive-bg-hover-solid": dark ? surface(0.18) : surface(0.10),
        "--dsw-alias-label-caption": ink(0.55),
        "--dsw-alias-label-dimmed": ink(0.65),
        "--dsw-alias-label-primary": ink(0.08),
        "--dsw-alias-label-secondary": ink(0.28),
        "--dsw-alias-label-shimmer": alphaHex(accent, "66"),
        "--dsw-alias-label-tertiary": ink(0.45),
        "--dsw-alias-label-deep-diving": accent,
        "--dsw-alias-label-deep-diving-shimmer": mixHex(accent, "#ffffff", 0.25),
        "--dsw-alias-label-document-preview": ink(0.30),
        "--dsw-alias-label-primary-bluish": ink(0.12),
        "--dsw-alias-label-primary-dimmed": ink(0.35),
        "--dsw-alias-label-primary-foreground": contrast,
        "--dsw-alias-label-primary-inverted": contrast,
        "--dsw-alias-markdown-citation": dark ? surface(0.14) : surface(0.06),
        "--dsw-alias-markdown-placeholder": dark ? surface(0.10) : surface(0.04),
        "--dsw-alias-markdown-tag": dark ? surface(0.14) : surface(0.06),
        "--dsw-alias-markdown-code-block": dark ? surface(0.03) : "#ffffff",
        "--dsw-alias-markdown-code-block-banner": dark ? surface(0.08) : surface(0.03),
        "--dsw-alias-markdown-code-segment-selected": dark ? surface(0.14) : surface(0.06),
        "--dsw-alias-markdown-code-segment-unselected": dark ? surface(0.10) : surface(0.04),
        "--dsw-alias-markdown-inline-code": dark ? surface(0.08) : surface(0.05),
        "--dsw-alias-menu-icon": accent,
        "--dsw-alias-menu-group-header-fill": dark ? alphaHex(surface(0.08), "f2") : "#fffffff2",
        "--dsw-alias-onboarding-accent": accent,
        "--dsw-alias-onboarding-card-fill": dark ? surface(0.08) : "#ffffff",
        "--dsw-alias-onboarding-checkbox-border": accent,
        "--dsw-alias-onboarding-secondary-fill": dark ? surface(0.04) : surface(0.03),
        "--dsw-alias-scrollbar-bg-l1": dark ? surface(0.14) : surface(0.10),
        "--dsw-alias-scrollbar-bg-l2": dark ? surface(0.18) : surface(0.14),
        "--dsw-alias-scrollbar-hover-l1": accent,
        "--dsw-alias-scrollbar-hover-l2": accentHover,
        "--dsw-alias-settings-card-fill": dark ? surface(0.10) : "#ffffff",
        "--dsw-alias-settings-card-stroke": border3,
        "--dsw-alias-state-business-primary": accent,
        "--dsw-alias-state-business-tertiary": accentSurface(0.14),
        "--dsw-alias-state-error-primary": error,
        "--dsw-alias-state-error-secondary": error2,
        "--dsw-alias-state-idle-primary": ink(0.55),
        "--dsw-alias-state-success-primary": success,
        "--dsw-alias-state-success-secondary": success2,
        "--dsw-alias-state-success-tertiary": successBg,
        "--dsw-alias-state-warn-label": warn,
        "--dsw-alias-state-warn-primary": warn,
        "--dsw-alias-state-warn-secondary": warn2,
        "--dsw-alias-state-warn-tertiary": warnBg,
        "--dsw-alias-switch-thumb": accent,
        "--dsw-alias-toast-bg": dark ? surface(0.08) : "#ffffff",
        "--dsw-alias-toast-label": ink(0.12),
        "--dsw-alias-tooltip-bg": tooltipBg,
        "--dsw-alias-tooltip-key-bg": mixHex(tooltipBg, "#ffffff", 0.18),
        "--dsw-alias-turn-trigger-bg": dark ? surface(0.06) : surface(0.02),
        "--dsw-alias-turn-trigger-bg-hover": dark ? surface(0.12) : surface(0.05),
        "--dsw-focus-ring-color": accent,
        "--dsw-menu-surface-fill": dark ? alphaHex(surface(0.04), "f2") : "#fffffff2",
        "--dsw-specific-bubble": accentSurface(0.10),
        "--dsw-specific-menu": dark ? alphaHex(surface(0.04), "f2") : "#fffffff2",
        "--dsw-specific-selector": dark ? surface(0.14) : surface(0.06),
        "--dsw-specific-tip": tooltipBg,
        "--dsw-specific-bubble-highlight": accentSurface(0.15),
        "--dsw-specific-input-major": dark ? surface(0.06) : "#ffffff",
        "--dsw-specific-login-input": dark ? surface(0.03) : surface(0.02),
        "--dsw-specific-sidebar-fill": dark ? "#000000" : surface(0.03),
        "--dsw-specific-sidebar-nav-item-active": dark ? surface(0.14) : surface(0.06),
        "--dsw-specific-sidebar-nav-item-hover": dark ? surface(0.08) : surface(0.03),
        "--dsw-specific-sidebar-nav-item-active-accent": accent,
      };
    }

    /** Complete mode-specific theme for one spectrum, used by the full-theme switch. */
    function buildFullTheme(palette, mode) {
      if (palette === "acid" && mode === "dark") return FULL_SEMANTIC_THEME_TOKENS;
      const seed = paletteSeed(palette, mode);
      return { ...buildStaticScales(seed, mode), ...buildSemanticAliases(seed, mode) };
    }

    /** Inline body variables read by the scoped sidebar stylesheet. */
    const VAR_NAMES = [
      ["text", "text"],
      ["secondary", "secondary"],
      ["tertiary", "tertiary"],
      ["caption", "caption"],
      ["inverted", "inverted"],
      ["hover", "hover"],
      ["active", "active"],
      ["button", "button"],
      ["button-hover", "buttonHover"],
      ["border", "border"],
    ];

    /** Empty color state for every surface. */
    function emptyColors() {
      const colors = {};
      for (const surface of SURFACES) colors[surface.id] = { light: "", dark: "" };
      return colors;
    }

    /** Empty state for every border level. */
    function emptyBorders() {
      const borders = {};
      for (const border of BORDERS) borders[border.id] = { light: "", dark: "" };
      return borders;
    }

    /** Empty state for every pure neutral step. */
    function emptyNeutrals() {
      const neutrals = {};
      for (const neutral of NEUTRALS) neutrals[neutral.id] = { light: "", dark: "" };
      return neutrals;
    }

    /** Complete client state; also used to initialize the mirrored store. */
    function emptyState() {
      return {
        colors: emptyColors(),
        borders: emptyBorders(),
        neutrals: emptyNeutrals(),
        preset: "custom",
        radiusMode: "default",
        palette: "bluish",
        semanticTheme: false,
        syntaxTheme: "default",
        spectrumSelection: false,
        status: "loading",
        revision: -1,
      };
    }

    /** Settings row state mirrored from the Host config form. */
    function createStore() {
      return defineStore({
        init: emptyState,
        actions: {
          sync: (draft, state) => {
            if (state.revision <= draft.revision) return;
            draft.colors = state.colors;
            draft.borders = state.borders;
            draft.neutrals = state.neutrals;
            draft.preset = state.preset;
            draft.radiusMode = state.radiusMode;
            draft.palette = state.palette;
            draft.semanticTheme = state.semanticTheme;
            draft.syntaxTheme = state.syntaxTheme;
            draft.spectrumSelection = state.spectrumSelection;
            draft.status = state.status;
            draft.revision = state.revision;
          },
        },
      });
    }

    /** One grid row of light/dark color fields, shared by surfaces and borders. */
    function ColorGridRow(props) {
      const t = props.t ?? fallbackT;
      const labelFor = props.labelFor ?? ((item) => item.label);
      const values = props.values;
      const [draft, setDraft] = React.useState(values);

      React.useEffect(() => {
        setDraft(values);
      }, [values]);

      const commitDraft = (itemId, mode) => {
        const entry = draft[itemId] ?? { light: "", dark: "" };
        const raw = entry[mode].trim();
        if (raw === "") {
          setDraft(values);
          return;
        }
        const color = normalizeColor(raw);
        if (color === "") {
          setDraft(values);
          return;
        }
        props.setValue(itemId, mode, color);
      };

      /** Keep the draft to `#` plus at most eight hex digits while typing. */
      const sanitizeHexInput = (value) => {
        const cleaned = value.replace(/[^#0-9a-fA-F]/g, "");
        const digits = cleaned.replace(/#/g, "").slice(0, 8);
        return value.trim() === "" ? "" : `#${digits}`;
      };

      const field = (item, mode, label) => {
        const entry = draft[item.id] ?? { light: "", dark: "" };
        return React.createElement(
          "div",
          { className: "dsh-ui-colors-field", key: `${item.id}-${mode}` },
          React.createElement("span", { className: "dsh-ui-colors-label" }, label),
          React.createElement("input", {
            type: "text",
            className: "dsh-ui-colors-hex",
            value: entry[mode],
            placeholder: item.placeholder[mode],
            spellCheck: false,
            autoComplete: "off",
            inputMode: "text",
            maxLength: 9,
            pattern: "#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?",
            "aria-label": t("aria.color", { label: labelFor(item), mode: label }),
            onChange: (event) => {
              const next = sanitizeHexInput(event.target.value);
              setDraft({ ...draft, [item.id]: { ...entry, [mode]: next } });
            },
            onBlur: () => commitDraft(item.id, mode),
            onKeyDown: (event) => {
              if (event.key === "Enter") event.currentTarget.blur();
            },
          }),
          React.createElement(
            "button",
            {
              type: "button",
              className: "dsh-ui-colors-clear",
              "aria-label": t("clear", { label: labelFor(item), mode: label }),
              disabled: entry[mode] === "" && (values[item.id]?.[mode] ?? "") === "",
              onMouseDown: (event) => event.preventDefault(),
              onClick: () => {
                setDraft({ ...draft, [item.id]: { ...entry, [mode]: "" } });
                props.clearValue(item.id, mode);
              },
            },
            "×",
          ),
        );
      };

      const cell = (item) =>
        React.createElement(
          "div",
          { className: "dsh-ui-colors-cell", key: item.id },
          React.createElement("div", { className: "dsh-ui-colors-cell-title" }, labelFor(item)),
          React.createElement(
            "div",
            { className: "dsh-ui-colors-fields" },
            field(item, "light", t("field.light")),
            field(item, "dark", t("field.dark")),
          ),
        );

      const hasAny = props.items.some((item) => values[item.id]?.light || values[item.id]?.dark);
      const statusText =
        props.status === undefined
          ? undefined
          : props.status === "ready"
            ? t("status.stored")
            : props.status === "loading"
              ? t("status.loading")
              : t("status.unavailable");

      const grid = React.createElement("div", { className: "dsh-ui-colors-grid" }, props.items.map(cell));
      const content = props.collapsible
        ? React.createElement(
            "details",
            { className: "dsh-ui-colors-disclosure" },
            React.createElement(
              "summary",
              { className: "dsh-ui-colors-summary" },
              React.createElement(
                "span",
                { className: "dsh-ui-colors-summary-closed" },
                t("toggle.show", { label: props.toggleLabel ?? t("toggle.inputs") }),
              ),
              React.createElement(
                "span",
                { className: "dsh-ui-colors-summary-open" },
                t("toggle.hide", { label: props.toggleLabel ?? t("toggle.inputs") }),
              ),
              React.createElement("span", { className: "dsh-ui-colors-summary-caret", "aria-hidden": "true" }, "▸"),
            ),
            grid,
          )
        : grid;

      return React.createElement(
        "div",
        { className: "dsh-ui-colors-row" },
        React.createElement(
          "div",
          { className: "dsh-ui-colors-head" },
          React.createElement(
            "div",
            null,
            React.createElement("h3", { className: "dsh-ui-colors-title" }, props.title),
            React.createElement("div", { className: "dsh-ui-colors-desc" }, props.description),
          ),
          React.createElement(
            "button",
            {
              type: "button",
              className: "dsh-ui-colors-reset",
              "aria-label": props.resetAriaLabel,
              disabled: !hasAny,
              onClick: () => props.reset(),
            },
            t("reset"),
          ),
        ),
        content,
        statusText === undefined ? null : React.createElement("div", { className: "dsh-ui-colors-status", role: "status" }, statusText),
      );
    }

    /** One General-settings row: a grid of surfaces, each with light/dark color inputs. */
    function ColorsRow(props) {
      const t = props.t ?? fallbackT;
      const colors = props.useStore((state) => state.colors);
      const status = props.useStore((state) => state.status);
      return React.createElement(ColorGridRow, {
        items: SURFACES,
        values: colors,
        title: t("colors.title"),
        description: t("colors.description"),
        status,
        setValue: props.setColor,
        clearValue: props.clearColor,
        reset: props.reset,
        resetAriaLabel: t("colors.resetAria"),
        t,
        labelFor: (item) => t(`surface.${item.id}`),
      });
    }

    /** One General-settings row: the pure neutral static scale. */
    function NeutralsRow(props) {
      const t = props.t ?? fallbackT;
      const neutrals = props.useStore((state) => state.neutrals);
      return React.createElement(ColorGridRow, {
        items: NEUTRALS,
        values: neutrals,
        title: t("neutral.title"),
        description: t("neutral.description"),
        setValue: props.setNeutral,
        clearValue: props.clearNeutral,
        reset: props.resetNeutrals,
        resetAriaLabel: t("neutral.resetAria"),
        collapsible: true,
        toggleLabel: t("toggle.neutral"),
        t,
        labelFor: (item) => t("neutral.label", { id: item.id }),
      });
    }

    /** One General-settings row: four shared border levels with alpha. */
    function BordersRow(props) {
      const t = props.t ?? fallbackT;
      const borders = props.useStore((state) => state.borders);
      return React.createElement(ColorGridRow, {
        items: BORDERS,
        values: borders,
        title: t("borders.title"),
        description: t("borders.description"),
        setValue: props.setBorder,
        clearValue: props.clearBorder,
        reset: props.resetBorders,
        resetAriaLabel: t("borders.resetAria"),
        collapsible: true,
        toggleLabel: t("toggle.border"),
        t,
        labelFor: (item) => t(`border.${item.id}`),
      });
    }

    /** One General-settings row: three mutually exclusive radius presets. */
    function ShapesRow(props) {
      const t = props.t ?? fallbackT;
      const mode = props.useStore((state) => state.radiusMode);

      const cell = (option) =>
        React.createElement(
          "label",
          {
            className: `dsh-ui-shapes-cell${mode === option.id ? " dsh-ui-shapes-cell-active" : ""}`,
            key: option.id,
          },
          React.createElement("input", {
            type: "radio",
            className: "dsh-ui-shapes-radio",
            name: "dsh-ui-radius-mode",
            value: option.id,
            checked: mode === option.id,
            onChange: () => props.setRadiusMode(option.id),
          }),
          React.createElement(
            "span",
            { className: "dsh-ui-shapes-copy" },
            React.createElement("span", { className: "dsh-ui-shapes-title" }, t(`radius.${option.id}`)),
            React.createElement("span", { className: "dsh-ui-shapes-desc" }, t(`radius.${option.id}.desc`)),
          ),
        );

      return React.createElement(
        "div",
        { className: "dsh-ui-colors-row" },
        React.createElement(
          "div",
          { className: "dsh-ui-colors-head" },
          React.createElement(
            "div",
            null,
            React.createElement("h3", { className: "dsh-ui-colors-title" }, t("radius.title")),
          ),
        ),
        React.createElement("div", { className: "dsh-ui-shapes-grid" }, RADIUS_OPTIONS.map(cell)),
      );
    }

    /** Generic picker with one or more colored preview glyphs per option. */
    function SwatchPicker(props) {
      const [open, setOpen] = React.useState(false);
      const options = props.options;
      const current = options.find((option) => option.id === props.value) ?? options[0];
      const glyph = props.swatchChar ?? "▓";
      const menuId = `${props.pickerId}-listbox`;
      const optionsIn = (element) => {
        const picker = element.closest(".dsh-ui-colors-picker");
        const menu = picker?.querySelector('[role="listbox"]');
        return menu === undefined || menu === null
          ? []
          : [...menu.querySelectorAll('[role="option"]')];
      };
      const focusTrigger = (element) => {
        if (element === undefined) return;
        element
          .closest(".dsh-ui-colors-picker")
          ?.querySelector(".dsh-ui-colors-picker-button")
          ?.focus();
      };
      const focusOptionAt = (element, index) => {
        if (element === undefined) return;
        const items = optionsIn(element);
        items[index]?.focus();
      };
      const swatches = (option) => {
        const nodes = (option.swatches ?? [{ color: option.swatch }]).map((swatch, index) =>
          React.createElement(
            "span",
            { className: "dsh-ui-colors-swatch", style: { color: swatch.color }, key: `${option.id}-${index}` },
            glyph,
          ),
        );
        return React.createElement("span", { className: "dsh-ui-colors-swatches", "aria-hidden": "true" }, ...nodes);
      };
      return React.createElement(
        "div",
        {
          className: "dsh-ui-colors-picker",
          onBlur: (event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
          },
          onKeyDown: (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setOpen(false);
              focusTrigger(event.currentTarget);
            }
          },
        },
        React.createElement(
          "button",
          {
            type: "button",
            className: "dsh-ui-colors-select dsh-ui-colors-picker-button",
            "aria-label": props.ariaLabel,
            "aria-haspopup": "listbox",
            "aria-expanded": open,
            "aria-controls": menuId,
            title: props.buttonTitle,
            onClick: (event) => {
              const next = !open;
              setOpen(next);
              if (!next) return;
              const trigger = event?.currentTarget;
              const selected = options.findIndex((option) => option.id === current.id);
              requestAnimationFrame(() => focusOptionAt(trigger, selected < 0 ? 0 : selected));
            },
            onKeyDown: (event) => {
              if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              event.preventDefault();
              const trigger = event.currentTarget;
              setOpen(true);
              requestAnimationFrame(() =>
                focusOptionAt(
                  trigger,
                  event.key === "ArrowDown" ? 0 : options.length - 1,
                ),
              );
            },
          },
          React.createElement("span", { className: "dsh-ui-colors-picker-label" }, current.label),
          swatches(current),
          React.createElement("span", { className: "dsh-ui-colors-caret", "aria-hidden": "true" }, "▾"),
        ),
        React.createElement(
          "div",
          {
            className: "dsh-ui-colors-menu",
            id: menuId,
            role: "listbox",
            "aria-label": props.menuAriaLabel,
            hidden: !open,
          },
          options.map((option) =>
            React.createElement(
              "button",
              {
                type: "button",
                role: "option",
                key: option.id,
                "data-dsh-picker": props.pickerId,
                className: `dsh-ui-colors-option${option.id === props.value ? " dsh-ui-colors-option-active" : ""}`,
                "aria-selected": option.id === props.value,
                tabIndex: -1,
                onMouseDown: (event) => event.preventDefault(),
                onClick: (event) => {
                  focusTrigger(event?.currentTarget);
                  props.onChange(option.id);
                  setOpen(false);
                },
                onKeyDown: (event) => {
                  const items = optionsIn(event.currentTarget);
                  const index = items.indexOf(event.currentTarget);
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    const step = event.key === "ArrowDown" ? 1 : -1;
                    items[(index + step + items.length) % items.length]?.focus();
                    return;
                  }
                  if (event.key === "Home" || event.key === "End") {
                    event.preventDefault();
                    items[event.key === "Home" ? 0 : items.length - 1]?.focus();
                    return;
                  }
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setOpen(false);
                    focusTrigger(event.currentTarget);
                  }
                },
              },
              React.createElement("span", { className: "dsh-ui-colors-option-label" }, option.label),
              swatches(option),
            ),
          ),
        ),
      );
    }

    /** Neutral 500 preview for a preset, falling back to the host default. */
    function presetSwatches(presetId, neutrals) {
      const fallback = NEUTRAL_BY_ID["500"].placeholder;
      const entry =
        presetId === "custom"
          ? neutrals?.["500"] ?? {}
          : PRESET_BY_ID[presetId]?.neutrals?.["500"] ?? {};
      return [
        { color: normalizeColor(entry.light) || fallback.light },
        { color: normalizeColor(entry.dark) || fallback.dark },
      ];
    }

    /** One General-settings row: palette spectrum, named presets, and the full-theme switch. */
    function PaletteRow(props) {
      const t = props.t ?? fallbackT;
      const palette = props.useStore((state) => state.palette);
      const preset = props.useStore((state) => state.preset);
      const neutrals = props.useStore((state) => state.neutrals);
      const semanticTheme = props.useStore((state) => state.semanticTheme);
      const spectrumSelection = props.useStore((state) => state.spectrumSelection);
      const fullTheme = semanticTheme || ALWAYS_FULL_PALETTES.has(palette);
      const locked = ALWAYS_FULL_PALETTES.has(palette);
      return React.createElement(
        "div",
        { className: "dsh-ui-colors-row" },
        React.createElement(
          "div",
          { className: "dsh-ui-colors-head" },
          React.createElement(
            "div",
            null,
            React.createElement("h3", { className: "dsh-ui-colors-title" }, t("palette.title")),
            React.createElement(
              "div",
              { className: "dsh-ui-colors-desc" },
              t("palette.description"),
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "dsh-ui-colors-fields-row" },
          React.createElement(
            "div",
            { className: "dsh-ui-colors-field" },
            React.createElement("span", { className: "dsh-ui-colors-label" }, t("palette.spectrum")),
            React.createElement(SwatchPicker, {
              value: palette,
              onChange: props.setPalette,
              options: PALETTE_OPTIONS.map((option) => ({
                id: option.id,
                label: t(`spectrum.${option.id}`),
                swatches: [{ color: option.swatch }],
              })),
              ariaLabel: t("palette.spectrum.aria"),
              menuAriaLabel: t("palette.spectrum.options"),
              pickerId: "palette",
              swatchChar: "▓",
            }),
          ),
          React.createElement(
            "div",
            { className: "dsh-ui-colors-field" },
            React.createElement("span", { className: "dsh-ui-colors-label" }, t("palette.preset")),
            React.createElement(SwatchPicker, {
              value: preset,
              onChange: props.applyPreset,
              options: PRESET_OPTIONS.map((option) => ({
                ...option,
                label: t(`preset.${option.id}`),
                swatches: presetSwatches(option.id, neutrals),
              })),
              ariaLabel: t("palette.preset.aria"),
              menuAriaLabel: t("palette.preset.options"),
              pickerId: "preset",
              swatchChar: "▒",
              buttonTitle: t("palette.preset.title"),
            }),
          ),
        ),
        React.createElement(
          "div",
          { className: "dsh-ui-colors-checks" },
          React.createElement(
            "label",
            {
              className: `dsh-ui-colors-check${locked ? " dsh-ui-colors-check-disabled" : ""}`,
            },
            React.createElement("input", {
              type: "checkbox",
              checked: fullTheme,
              disabled: locked,
              "aria-label": t("palette.fullTheme"),
              onChange: (event) => props.setSemanticTheme(event.target.checked),
            }),
            React.createElement("span", null, t("palette.fullTheme")),
          ),
          React.createElement(
            "label",
            { className: "dsh-ui-colors-check" },
            React.createElement("input", {
              type: "checkbox",
              checked: spectrumSelection === true,
              "aria-label": t("palette.selection"),
              onChange: (event) => props.setSpectrumSelection(event.target.checked),
            }),
            React.createElement("span", null, t("palette.selection")),
          ),
        ),
      );
    }

    /** Four-color Shiki preview used by the syntax preset picker. */
    function syntaxSwatches(preset) {
      return ["comment", "keyword", "string", "function"].map((key) => ({ color: preset.dark[key] }));
    }

    /** One General-settings row: Shiki syntax token presets. */
    function SyntaxRow(props) {
      const t = props.t ?? fallbackT;
      const syntaxTheme = props.useStore((state) => state.syntaxTheme);
      return React.createElement(
        "div",
        { className: "dsh-ui-colors-row" },
        React.createElement(
          "div",
          { className: "dsh-ui-colors-head" },
          React.createElement(
            "div",
            null,
            React.createElement("h3", { className: "dsh-ui-colors-title" }, t("syntax.heading")),
            React.createElement(
              "div",
              { className: "dsh-ui-colors-desc" },
              t("syntax.description"),
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "dsh-ui-colors-fields-row" },
          React.createElement(
            "div",
            { className: "dsh-ui-colors-field" },
            React.createElement("span", { className: "dsh-ui-colors-label" }, t("syntax.theme")),
            React.createElement(SwatchPicker, {
              value: syntaxTheme,
              onChange: props.setSyntaxTheme,
              options: SHIKI_PRESETS.map((preset) => ({
                id: preset.id,
                label: t(`syntax.${preset.id}`),
                swatches: syntaxSwatches(preset),
              })),
              ariaLabel: t("syntax.aria"),
              menuAriaLabel: t("syntax.options"),
              pickerId: "syntax",
              swatchChar: "▓",
              buttonTitle: t("syntax.buttonTitle"),
            }),
          ),
        ),
      );
    }

    /** Settings section that hosts the customization rows. */
    function CustomizeSection(props) {
      const t = props.t ?? fallbackT;
      return React.createElement(
        "div",
        { className: "dsh-ui-colors-section" },
        React.createElement(PaletteRow, {
          useStore: props.useStore,
          t,
          setPalette: props.setPalette,
          applyPreset: props.applyPreset,
          setSemanticTheme: props.setSemanticTheme,
          setSpectrumSelection: props.setSpectrumSelection,
        }),
        React.createElement(SyntaxRow, {
          useStore: props.useStore,
          setSyntaxTheme: props.setSyntaxTheme,
          t,
        }),
        React.createElement(ColorsRow, {
          useStore: props.useStore,
          setColor: props.setColor,
          clearColor: props.clearColor,
          reset: props.reset,
          t,
        }),
        React.createElement(NeutralsRow, {
          useStore: props.useStore,
          setNeutral: props.setNeutral,
          clearNeutral: props.clearNeutral,
          resetNeutrals: props.resetNeutrals,
          t,
        }),
        React.createElement(BordersRow, {
          useStore: props.useStore,
          setBorder: props.setBorder,
          clearBorder: props.clearBorder,
          resetBorders: props.resetBorders,
          t,
        }),
        React.createElement(ShapesRow, {
          useStore: props.useStore,
          setRadiusMode: props.setRadiusMode,
          t,
        }),
      );
    }

    /** Resolve one surface's paired modes; an empty mode keeps its theme default. */
    function pairOf(colors, id) {
      const surface = SURFACE_BY_ID[id];
      const entry = colors[id] ?? { light: "", dark: "" };
      const light = normalizeColor(entry.light);
      const dark = normalizeColor(entry.dark);
      if (light === "" && dark === "") return undefined;
      return {
        light: light || surface.placeholder.light,
        dark: dark || surface.placeholder.dark,
      };
    }

    /** Resolve one border level's paired modes. */
    function pairOfBorder(borders, id) {
      const border = BORDER_BY_ID[id];
      const entry = borders[id] ?? { light: "", dark: "" };
      const light = normalizeColor(entry.light);
      const dark = normalizeColor(entry.dark);
      if (light === "" && dark === "") return undefined;
      return {
        light: light || border.placeholder.light,
        dark: dark || border.placeholder.dark,
      };
    }

    /** Resolve one pure neutral step's paired modes. */
    function pairOfNeutral(neutrals, id) {
      const neutral = NEUTRAL_BY_ID[id];
      const entry = neutrals[id] ?? { light: "", dark: "" };
      const light = normalizeColor(entry.light);
      const dark = normalizeColor(entry.dark);
      if (light === "" && dark === "") return undefined;
      return {
        light: light || neutral.placeholder.light,
        dark: dark || neutral.placeholder.dark,
      };
    }

    /** Build the radius override layer for one preset. */
    function radiusLayer(mode) {
      const factor = mode === "half" ? 0.5 : mode === "none" ? 0 : 1;
      const layer = {};
      for (const [name, px] of Object.entries(RADIUS_DEFAULTS)) {
        const value = `${Math.floor(px * factor)}px`;
        layer[`--dsw-radius-${name}`] = { light: value, dark: value };
      }
      return layer;
    }

    /** Client plugin body: read config, build both override layers, register the rows. */
    function apply(ctx) {
      const theme = ctx.theme;
      const form = ctx.configForms.get(NAMESPACE);
      const store = createStore();
      const body = typeof document === "undefined" ? undefined : document.body;
      if (ctx.locale !== undefined) {
        ctx.effect(
          () => ctx.locale.register(LOCALE_NS, { zh, en }),
          "ui-colors: locale dictionaries",
        );
      }
      const t = ctx.locale?.bind(LOCALE_NS) ?? fallbackT;
      let bound;
      let pendingWrites = 0;
      let currentState = emptyState();
      let appliedPaletteKey = null;
      let appliedColorKey = null;
      let appliedRadiusMode = null;
      let appliedSyntaxTheme = null;
      let appliedSelectionKey = null;
      let disposeLayer;
      let disposeRadiusLayer;
      let disposePaletteLayer;
      let disposeSyntaxLayer;
      let style;

      ctx.effect(() => {
        if (typeof document === "undefined") return;
        style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = STYLE_TEXT;
        document.head.appendChild(style);
        return () => {
          style?.remove();
          style = undefined;
        };
      }, "ui-colors: styles");

      const clearSidebarVars = () => {
        if (body === undefined) return;
        for (const mode of ["light", "dark"]) {
          for (const [name] of VAR_NAMES) {
            body.style.removeProperty(`--dsh-ui-colors-${name}-${mode}`);
          }
        }
      };

      const paintSidebarVars = (mode, palette) => {
        if (body === undefined) return;
        for (const [name, key] of VAR_NAMES) {
          body.style.setProperty(`--dsh-ui-colors-${name}-${mode}`, palette[key]);
        }
      };

      const tagTargets = () => {
        if (typeof document === "undefined") return;
        for (const element of document.querySelectorAll('[class*="_sidebarCol"], [class*="sidebarCol"]')) {
          if (!element.hasAttribute(SIDEBAR_ATTR)) element.setAttribute(SIDEBAR_ATTR, "");
        }
        for (const element of document.querySelectorAll('[class*="_centerCol"]')) {
          if (!element.hasAttribute(MAIN_ATTR)) element.setAttribute(MAIN_ATTR, "");
        }
        for (const element of document.querySelectorAll('[class*="_rightbarCol"]')) {
          if (!element.hasAttribute(PANEL_ATTR)) element.setAttribute(PANEL_ATTR, "");
        }
        const modal = document.querySelector('[data-shortcut-modal="settings"]');
        if (modal !== null) {
          for (const button of modal.querySelectorAll("button")) {
            const text = button.textContent?.trim() ?? "";
            const isCustomize = [...SECTION_LABELS].some(
              (label) => text === label || text.endsWith(label),
            );
            if (isCustomize && !button.hasAttribute(SECTION_ATTR)) {
              button.setAttribute(SECTION_ATTR, "");
            }
          }
        }
      };

      const setFlag = (name, on) => {
        if (body === undefined) return;
        if (on) body.setAttribute(name, "");
        else body.removeAttribute(name);
      };

      const applyColors = (colors, borders, neutrals) => {
        const layer = {};

        const sidebar = pairOf(colors, "sidebar");
        if (sidebar !== undefined) {
          const lightPalette = contrastPalette(sidebar.light);
          const darkPalette = contrastPalette(sidebar.dark);
          layer["--dsw-specific-sidebar-fill"] = { light: sidebar.light, dark: sidebar.dark };
          layer["--dsw-specific-sidebar-nav-item-hover"] = {
            light: lightPalette.hover,
            dark: darkPalette.hover,
          };
          layer["--dsw-specific-sidebar-nav-item-active"] = {
            light: lightPalette.active,
            dark: darkPalette.active,
          };
          paintSidebarVars("light", lightPalette);
          paintSidebarVars("dark", darkPalette);
        } else {
          clearSidebarVars();
        }
        setFlag(BODY_SIDEBAR_ATTR, sidebar !== undefined);

        const main = pairOf(colors, "main");
        if (main !== undefined && body !== undefined) {
          body.setAttribute(BODY_MAIN_ATTR, "");
          body.style.setProperty("--dsh-ui-colors-main-light", main.light);
          body.style.setProperty("--dsh-ui-colors-main-dark", main.dark);
        } else {
          setFlag(BODY_MAIN_ATTR, false);
          if (body !== undefined) {
            body.style.removeProperty("--dsh-ui-colors-main-light");
            body.style.removeProperty("--dsh-ui-colors-main-dark");
          }
        }

        const layer1 = pairOf(colors, "layer1");
        if (layer1 !== undefined) layer["--dsw-alias-bg-layer-1"] = layer1;

        const secondary = pairOf(colors, "secondary");
        if (secondary !== undefined) layer["--dsw-alias-bg-layer-2"] = secondary;

        const composer = pairOf(colors, "composer");
        if (composer !== undefined) layer["--dsw-specific-input-major"] = composer;

        const bubble = pairOf(colors, "bubble");
        if (bubble !== undefined) {
          layer["--dsw-specific-bubble"] = bubble;
          layer["--dsw-specific-bubble-highlight"] = {
            light: mix(bubble.light, "#000000", 8),
            dark: mix(bubble.dark, "#ffffff", 8),
          };
        }

        const code = pairOf(colors, "code");
        if (code !== undefined) {
          layer["--dsw-alias-markdown-code-block"] = code;
          layer["--dsw-alias-markdown-code-block-banner"] = {
            light: mix(code.light, "#000000", 4),
            dark: mix(code.dark, "#ffffff", 8),
          };
        }

        const panel = pairOf(colors, "panel");
        if (panel !== undefined && body !== undefined) {
          body.setAttribute(BODY_PANEL_ATTR, "");
          body.style.setProperty("--dsh-ui-colors-panel-light", panel.light);
          body.style.setProperty("--dsh-ui-colors-panel-dark", panel.dark);
        } else {
          setFlag(BODY_PANEL_ATTR, false);
          if (body !== undefined) {
            body.style.removeProperty("--dsh-ui-colors-panel-light");
            body.style.removeProperty("--dsh-ui-colors-panel-dark");
          }
        }

        for (const border of BORDERS) {
          const pair = pairOfBorder(borders, border.id);
          if (pair !== undefined) layer[border.token] = pair;
        }

        for (const neutral of NEUTRALS) {
          const pair = pairOfNeutral(neutrals, neutral.id);
          if (pair !== undefined) layer[neutral.token] = pair;
        }

        if (Object.keys(layer).length === 0) {
          disposeLayer?.();
          disposeLayer = undefined;
        } else {
          disposeLayer = theme.overrideTokens(NAMESPACE, layer);
        }

        tagTargets();
      };

      const applyRadius = (mode) => {
        disposeRadiusLayer = theme.overrideTokens(RADIUS_SOURCE, radiusLayer(mode));
      };

      const applyPalette = (palette, semanticTheme) => {
        const fullTheme = semanticTheme || ALWAYS_FULL_PALETTES.has(palette);
        const layer = {};
        if (fullTheme) {
          const light = buildFullTheme(palette, "light");
          const dark = palette === "acid" ? FULL_SEMANTIC_THEME_TOKENS : buildFullTheme(palette, "dark");
          const names = new Set([...Object.keys(light), ...Object.keys(dark)]);
          for (const name of names) {
            layer[name] = { light: light[name] ?? dark[name], dark: dark[name] ?? light[name] };
          }
        } else {
          const tokens = SPECTRA[palette];
          if (tokens === undefined) {
            disposePaletteLayer?.();
            disposePaletteLayer = undefined;
            setFlag(FULL_THEME_ATTR, false);
            return;
          }
          for (const [name, value] of Object.entries(tokens)) layer[name] = { light: value, dark: value };
        }
        disposePaletteLayer = theme.overrideTokens(PALETTE_SOURCE, layer);
        setFlag(FULL_THEME_ATTR, fullTheme);
      };

      const applySyntax = (themeId) => {
        const preset = SHIKI_PRESET_BY_ID[themeId];
        if (preset === undefined || preset.values === null) {
          disposeSyntaxLayer?.();
          disposeSyntaxLayer = undefined;
          return;
        }
        const layer = {};
        for (const [key, token] of Object.entries(SHIKI_TOKENS)) {
          layer[token] = { light: preset.light[key], dark: preset.dark[key] };
        }
        disposeSyntaxLayer = theme.overrideTokens(SHIKI_SOURCE, layer);
      };

      const applySelection = (palette, enabled) => {
        if (body === undefined) return;
        if (!enabled) {
          body.removeAttribute(SELECTION_ATTR);
          body.style.removeProperty(SELECTION_LIGHT_VAR);
          body.style.removeProperty(SELECTION_DARK_VAR);
          return;
        }
        const light = alphaHex(paletteSeed(palette, "light").accent, "40");
        const dark = alphaHex(paletteSeed(palette, "dark").accent, "40");
        body.setAttribute(SELECTION_ATTR, "");
        body.style.setProperty(SELECTION_LIGHT_VAR, light);
        body.style.setProperty(SELECTION_DARK_VAR, dark);
      };

      const commit = (patch, status) => {
        const previous = currentState;
        currentState = {
          ...previous,
          ...patch,
          status,
          revision: previous.revision + 1,
        };
        bound?.sync(currentState);

        const paletteKey = `${currentState.palette}:${currentState.semanticTheme}`;
        const colorKey = JSON.stringify({
          colors: currentState.colors,
          borders: currentState.borders,
          neutrals: currentState.neutrals,
        });
        const paletteChanged = appliedPaletteKey !== paletteKey;
        const colorChanged = appliedColorKey !== colorKey;
        const fullTheme = currentState.semanticTheme || ALWAYS_FULL_PALETTES.has(currentState.palette);

        // A full theme is rebuilt together with the color layer. This keeps the
        // palette layer alive and re-stacks the explicit color layer above it.
        if (paletteChanged || (fullTheme && colorChanged)) {
          applyPalette(currentState.palette, currentState.semanticTheme);
          appliedPaletteKey = paletteKey;
        }

        // A palette re-stack sits above the old color layer, so re-apply the
        // color layer afterwards even when its values did not change.
        if (colorChanged || paletteChanged) {
          applyColors(currentState.colors, currentState.borders, currentState.neutrals);
          appliedColorKey = colorKey;
        }

        if (appliedRadiusMode !== currentState.radiusMode) {
          applyRadius(currentState.radiusMode);
          appliedRadiusMode = currentState.radiusMode;
        }

        if (appliedSyntaxTheme !== currentState.syntaxTheme) {
          applySyntax(currentState.syntaxTheme);
          appliedSyntaxTheme = currentState.syntaxTheme;
        }

        const selectionKey = `${currentState.palette}:${currentState.spectrumSelection}`;
        if (appliedSelectionKey !== selectionKey) {
          applySelection(currentState.palette, currentState.spectrumSelection);
          appliedSelectionKey = selectionKey;
        }
      };

      const readForm = () => {
        if (pendingWrites > 0) return;
        const snapshot = form.getSnapshot();
        const value = snapshot.value ?? {};
        const colors = {};
        for (const surface of SURFACES) {
          colors[surface.id] = {
            light: normalizeColor(value[surface.light]),
            dark: normalizeColor(value[surface.dark]),
          };
        }
        const borders = {};
        for (const border of BORDERS) {
          borders[border.id] = {
            light: normalizeColor(value[border.light]),
            dark: normalizeColor(value[border.dark]),
          };
        }
        const neutrals = {};
        for (const neutral of NEUTRALS) {
          neutrals[neutral.id] = {
            light: normalizeColor(value[neutral.light]),
            dark: normalizeColor(value[neutral.dark]),
          };
        }
        const radiusMode = RADIUS_MODES.includes(value.radiusMode) ? value.radiusMode : "default";
        const palette = PALETTE_IDS.includes(value.palette) ? value.palette : "bluish";
        const semanticTheme =
          typeof value.semanticTheme === "boolean"
            ? value.semanticTheme
            : currentState.semanticTheme;
        const syntaxTheme = SHIKI_PRESET_IDS.includes(value.syntaxTheme)
          ? value.syntaxTheme
          : "default";
        const spectrumSelection = value.spectrumSelection === true;
        const preset = PRESET_IDS.includes(value.preset) ? value.preset : "custom";
        commit(
          {
            colors,
            borders,
            neutrals,
            preset,
            radiusMode,
            palette,
            semanticTheme,
            syntaxTheme,
            spectrumSelection,
          },
          snapshot.status,
        );
      };

      /** Run one form write and ignore stale snapshots until every write settles. */
      const write = (operation) => {
        pendingWrites += 1;
        let result;
        try {
          result = operation();
        } catch {
          result = undefined;
        }
        Promise.resolve(result)
          .catch(() => {})
          .finally(() => {
            pendingWrites -= 1;
            if (pendingWrites === 0) readForm();
          });
      };

      const setColor = (surfaceId, mode, value) => {
        const color = normalizeColor(value);
        const surface = SURFACE_BY_ID[surfaceId];
        if (color === "" || surface === undefined) return;
        const wasCustom = currentState.preset === "custom";
        const next = {
          ...currentState.colors,
          [surfaceId]: { ...(currentState.colors[surfaceId] ?? { light: "", dark: "" }), [mode]: color },
        };
        commit({ colors: next, preset: "custom" }, "ready");
        write(() => form.set(mode === "light" ? surface.light : surface.dark, color));
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      const clearColor = (surfaceId, mode) => {
        const surface = SURFACE_BY_ID[surfaceId];
        if (surface === undefined) return;
        const wasCustom = currentState.preset === "custom";
        const next = {
          ...currentState.colors,
          [surfaceId]: { ...(currentState.colors[surfaceId] ?? { light: "", dark: "" }), [mode]: "" },
        };
        commit({ colors: next, preset: "custom" }, "ready");
        write(() => form.unset(mode === "light" ? surface.light : surface.dark));
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      const setBorder = (borderId, mode, value) => {
        const color = normalizeColor(value);
        const border = BORDER_BY_ID[borderId];
        if (color === "" || border === undefined) return;
        const wasCustom = currentState.preset === "custom";
        const next = {
          ...currentState.borders,
          [borderId]: { ...(currentState.borders[borderId] ?? { light: "", dark: "" }), [mode]: color },
        };
        commit({ borders: next, preset: "custom" }, "ready");
        write(() => form.set(mode === "light" ? border.light : border.dark, color));
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      const clearBorder = (borderId, mode) => {
        const border = BORDER_BY_ID[borderId];
        if (border === undefined) return;
        const wasCustom = currentState.preset === "custom";
        const next = {
          ...currentState.borders,
          [borderId]: { ...(currentState.borders[borderId] ?? { light: "", dark: "" }), [mode]: "" },
        };
        commit({ borders: next, preset: "custom" }, "ready");
        write(() => form.unset(mode === "light" ? border.light : border.dark));
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      const setNeutral = (neutralId, mode, value) => {
        const color = normalizeColor(value);
        const neutral = NEUTRAL_BY_ID[neutralId];
        if (color === "" || neutral === undefined) return;
        const wasCustom = currentState.preset === "custom";
        const next = {
          ...currentState.neutrals,
          [neutralId]: { ...(currentState.neutrals[neutralId] ?? { light: "", dark: "" }), [mode]: color },
        };
        commit({ neutrals: next, preset: "custom" }, "ready");
        write(() => form.set(mode === "light" ? neutral.light : neutral.dark, color));
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      const clearNeutral = (neutralId, mode) => {
        const neutral = NEUTRAL_BY_ID[neutralId];
        if (neutral === undefined) return;
        const wasCustom = currentState.preset === "custom";
        const next = {
          ...currentState.neutrals,
          [neutralId]: { ...(currentState.neutrals[neutralId] ?? { light: "", dark: "" }), [mode]: "" },
        };
        commit({ neutrals: next, preset: "custom" }, "ready");
        write(() => form.unset(mode === "light" ? neutral.light : neutral.dark));
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      const setRadiusMode = (mode) => {
        if (!RADIUS_MODES.includes(mode)) return;
        commit({ radiusMode: mode }, "ready");
        write(() => form.set("radiusMode", mode));
      };

      const setPalette = (palette) => {
        if (!PALETTE_IDS.includes(palette)) return;
        commit({ palette }, "ready");
        write(() => form.set("palette", palette));
      };

      const setSemanticTheme = (enabled) => {
        const next = enabled === true;
        commit({ semanticTheme: next }, "ready");
        write(() => form.set("semanticTheme", next));
      };

      const setSyntaxTheme = (themeId) => {
        if (!SHIKI_PRESET_IDS.includes(themeId)) return;
        commit({ syntaxTheme: themeId }, "ready");
        write(() => form.set("syntaxTheme", themeId));
      };

      const setSpectrumSelection = (enabled) => {
        const next = enabled === true;
        commit({ spectrumSelection: next }, "ready");
        write(() => form.set("spectrumSelection", next));
      };

      const applyPreset = (presetId) => {
        if (!PRESET_IDS.includes(presetId)) return;
        if (presetId === "custom") {
          if (currentState.preset !== "custom") {
            commit({ preset: "custom" }, "ready");
            write(() => form.set("preset", "custom"));
          }
          return;
        }
        if (presetId === "clean") {
          commit(
            {
              colors: emptyColors(),
              borders: emptyBorders(),
              neutrals: emptyNeutrals(),
              preset: "clean",
            },
            "ready",
          );
          for (const surface of SURFACES) {
            write(() => form.unset(surface.light));
            write(() => form.unset(surface.dark));
          }
          for (const border of BORDERS) {
            write(() => form.unset(border.light));
            write(() => form.unset(border.dark));
          }
          for (const neutral of NEUTRALS) {
            write(() => form.unset(neutral.light));
            write(() => form.unset(neutral.dark));
          }
          write(() => form.set("preset", "clean"));
          return;
        }
        const preset = PRESET_BY_ID[presetId];
        if (preset === undefined) return;
        const nextColors = { ...currentState.colors };
        const nextBorders = { ...currentState.borders };
        const nextNeutrals = { ...currentState.neutrals };
        const fieldWrites = [];
        for (const [surfaceId, modes] of Object.entries(preset.colors ?? {})) {
          const surface = SURFACE_BY_ID[surfaceId];
          if (surface === undefined) continue;
          const entry = { ...(currentState.colors[surfaceId] ?? { light: "", dark: "" }) };
          for (const [mode, value] of Object.entries(modes)) {
            const color = normalizeColor(value);
            if (color === "" || surface[mode] === undefined) continue;
            entry[mode] = color;
            fieldWrites.push([surface[mode], color]);
          }
          nextColors[surfaceId] = entry;
        }
        for (const [borderId, modes] of Object.entries(preset.borders ?? {})) {
          const border = BORDER_BY_ID[borderId];
          if (border === undefined) continue;
          const entry = { ...(currentState.borders[borderId] ?? { light: "", dark: "" }) };
          for (const [mode, value] of Object.entries(modes)) {
            const color = normalizeColor(value);
            if (color === "" || border[mode] === undefined) continue;
            entry[mode] = color;
            fieldWrites.push([border[mode], color]);
          }
          nextBorders[borderId] = entry;
        }
        for (const [neutralId, modes] of Object.entries(preset.neutrals ?? {})) {
          const neutral = NEUTRAL_BY_ID[neutralId];
          if (neutral === undefined) continue;
          const entry = { ...(currentState.neutrals[neutralId] ?? { light: "", dark: "" }) };
          for (const [mode, value] of Object.entries(modes)) {
            const color = normalizeColor(value);
            if (color === "" || neutral[mode] === undefined) continue;
            entry[mode] = color;
            fieldWrites.push([neutral[mode], color]);
          }
          nextNeutrals[neutralId] = entry;
        }
        commit(
          {
            colors: nextColors,
            borders: nextBorders,
            neutrals: nextNeutrals,
            preset: presetId,
          },
          "ready",
        );
        for (const [field, color] of fieldWrites) write(() => form.set(field, color));
        write(() => form.set("preset", presetId));
      };

      const reset = () => {
        const wasCustom = currentState.preset === "custom";
        commit({ colors: emptyColors(), preset: "custom" }, "ready");
        for (const surface of SURFACES) {
          write(() => form.unset(surface.light));
          write(() => form.unset(surface.dark));
        }
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      const resetBorders = () => {
        const wasCustom = currentState.preset === "custom";
        commit({ borders: emptyBorders(), preset: "custom" }, "ready");
        for (const border of BORDERS) {
          write(() => form.unset(border.light));
          write(() => form.unset(border.dark));
        }
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      const resetNeutrals = () => {
        const wasCustom = currentState.preset === "custom";
        commit({ neutrals: emptyNeutrals(), preset: "custom" }, "ready");
        for (const neutral of NEUTRALS) {
          write(() => form.unset(neutral.light));
          write(() => form.unset(neutral.dark));
        }
        if (!wasCustom) write(() => form.set("preset", "custom"));
      };

      ctx.effect(() => form.subscribe(readForm), "ui-colors: config subscription");
      ctx.effect(() => () => {
        disposeLayer?.();
        disposeLayer = undefined;
        disposeRadiusLayer?.();
        disposeRadiusLayer = undefined;
        disposePaletteLayer?.();
        disposePaletteLayer = undefined;
        disposeSyntaxLayer?.();
        disposeSyntaxLayer = undefined;
        if (body !== undefined) {
          body.removeAttribute(FULL_THEME_ATTR);
          body.removeAttribute(SELECTION_ATTR);
          body.style.removeProperty(SELECTION_LIGHT_VAR);
          body.style.removeProperty(SELECTION_DARK_VAR);
        }
      }, "ui-colors: token layers");

      ctx.effect(() => {
        if (typeof document === "undefined" || body === undefined) return;
        if (typeof MutationObserver === "undefined") return;
        let frame = 0;
        const schedule = () => {
          if (frame !== 0) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            tagTargets();
          });
        };
        const observer = new MutationObserver(schedule);
        observer.observe(body, { childList: true, subtree: true });
        tagTargets();
        return () => {
          observer.disconnect();
          if (frame !== 0) cancelAnimationFrame(frame);
        };
      }, "ui-colors: surface markers");

      readForm();

      ctx.slots.inject("settings.section", () =>
        ctx.slots.register(
          {
            name: "settings.section",
            id: "customize",
            order: 5,
            label: () => t("nav"),
            locale: LOCALE_NS,
            store,
            inject: (actions) => {
              bound = actions;
              readForm();
              return {
                setColor,
                clearColor,
                setBorder,
                clearBorder,
                setNeutral,
                clearNeutral,
                applyPreset,
                reset,
                resetBorders,
                resetNeutrals,
                setRadiusMode,
                setPalette,
                setSemanticTheme,
                setSyntaxTheme,
                setSpectrumSelection,
                t,
              };
            },
          },
          CustomizeSection,
        ),
      );
    }

    /** Required client services; `remote` carries config-form invalidation. */
    const inject = ["theme", "slots", "configForms", "locale", "remote"];

    exports.apply = apply;
    exports.inject = inject;
    exports.__inspect = {
      surfaces: SURFACES,
      borders: BORDERS,
      neutrals: NEUTRALS,
      presets: PRESETS,
      paletteOptions: PALETTE_OPTIONS,
      presetOptions: PRESET_OPTIONS,
      syntaxPresets: SHIKI_PRESETS,
      locales: { en, zh },
    };
    return module.exports;
  },
});
