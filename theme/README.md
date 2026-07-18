# WebStack Nav 主题规范

> 本文档定义 WebStack Nav 的主题系统架构、设计令牌、主题开发规范。
> 当前版本：v1.0 · 2026-07-18

---

## 目录

1. [架构概览](#1-架构概览)
2. [设计令牌](#2-设计令牌)
3. [主题文件结构](#3-主题文件结构)
4. [主题开发规范](#4-主题开发规范)
5. [组件样式映射](#5-组件样式映射)
6. [主题切换机制](#6-主题切换机制)
7. [内置主题清单](#7-内置主题清单)
8. [Web Interface Guidelines 合规清单](#8-web-interface-guidelines-合规清单)

---

## 1. 架构概览

### 设计原则

- **令牌驱动**：所有视觉属性通过 CSS 自定义属性（CSS Variables）定义，组件只引用令牌
- **主题隔离**：每个主题是一个独立的 CSS 文件，只覆盖令牌值，不写组件样式
- **语义命名**：令牌使用语义化命名（如 `--bg-surface`）而非视觉命名（如 `--color-dark`）
- **可访问性**：所有主题必须满足 WCAG AA 对比度标准（4.5:1 文字 / 3:1 大文字）
- **动效一致**：过渡时长、缓动函数由令牌统一控制

### 三层架构

```
┌─────────────────────────────────────────┐
│  Layer 1: tokens.css（默认主题令牌）       │
│  - 定义所有令牌的默认值                    │
│  - :root 选择器                           │
└─────────────────────────────────────────┘
                   ↓ 覆盖
┌─────────────────────────────────────────┐
│  Layer 2: theme/[name].css（主题覆盖）     │
│  - 只覆盖需要变化的令牌                    │
│  - [data-theme="name"] 选择器             │
└─────────────────────────────────────────┘
                   ↓ 引用
┌─────────────────────────────────────────┐
│  Layer 3: base/layout/components.css     │
│  - 组件样式通过 var() 引用令牌            │
│  - 不直接写颜色值                         │
└─────────────────────────────────────────┘
```

---

## 2. 设计令牌

### 2.1 背景层级（Background）

| 令牌 | 语义 | 默认值（Dark） |
|------|------|---------------|
| `--bg-base` | 页面最底层背景 | `#0b0f1a` |
| `--bg-surface` | 卡片/侧边栏表面 | `#111827` |
| `--bg-elevated` | 悬浮元素（输入框、激活态） | `#1a2234` |
| `--bg-hover` | hover 反馈层 | `#1e293b` |

**层级关系**：`base < surface < elevated < hover`（亮度递增）

### 2.2 边框（Border）

| 令牌 | 语义 | 默认值 |
|------|------|--------|
| `--border-subtle` | 最弱分隔线 | `rgba(148,163,184,0.08)` |
| `--border-default` | 默认边框 | `rgba(148,163,184,0.12)` |
| `--border-strong` | 强调边框 | `rgba(148,163,184,0.2)` |

### 2.3 文字（Text）

| 令牌 | 语义 | 默认值 | 对比度（vs bg-base） |
|------|------|--------|---------------------|
| `--text-primary` | 主文字（标题/正文） | `#f1f5f9` | 15.3:1 AAA |
| `--text-secondary` | 次文字（描述/标签） | `#94a3b8` | 5.9:1 AA+ |
| `--text-tertiary` | 弱文字（占位/时间戳） | `#64748b` | 3.5:1 AA（大文字） |

### 2.4 强调色（Accent）

| 令牌 | 语义 | 默认值 |
|------|------|--------|
| `--accent` | 主强调色（按钮/链接/焦点） | `#6366f1` |
| `--accent-hover` | 强调色 hover 态 | `#818cf8` |
| `--accent-dim` | 强调色背景（焦点环） | `rgba(99,102,241,0.12)` |
| `--accent-glow` | 强调色发光（卡片高亮） | `rgba(99,102,241,0.4)` |

### 2.5 辅助色（Status）

| 令牌 | 语义 | 默认值 |
|------|------|--------|
| `--success` | 成功 | `#10b981` |
| `--warning` | 警告 | `#f59e0b` |
| `--danger` | 危险/错误 | `#ef4444` |
| `--info` | 信息 | `#3b82f6` |

### 2.6 圆角（Radius）

| 令牌 | 语义 | 默认值 | 用途 |
|------|------|--------|------|
| `--r-sm` | 小圆角 | `8px` | 按钮/输入框/小卡片 |
| `--r-md` | 中圆角 | `12px` | 卡片/侧边栏 |
| `--r-lg` | 大圆角 | `16px` | 大容器 |
| `--r-xl` | 超大圆角 | `20px` | 模态框 |

### 2.7 阴影（Shadow）

| 令牌 | 语义 | 默认值 |
|------|------|--------|
| `--shadow-sm` | 小阴影 | `0 1px 2px rgba(0,0,0,0.3)` |
| `--shadow-md` | 中阴影 | `0 4px 12px rgba(0,0,0,0.4)` |
| `--shadow-lg` | 大阴影 | `0 12px 32px rgba(0,0,0,0.5)` |
| `--shadow-glow` | 发光阴影 | `0 0 24px rgba(99,102,241,0.25)` |

### 2.8 间距（Space）

| 令牌 | 值 | 用途 |
|------|----|----|
| `--space-xs` | `4px` | 紧凑间距（图标内） |
| `--space-sm` | `8px` | 小间距（元素间） |
| `--space-md` | `16px` | 中间距（区块内） |
| `--space-lg` | `24px` | 大间距（区块间） |
| `--space-xl` | `32px` | 超大间距（页面级） |

### 2.9 字体（Font）

| 令牌 | 默认值 | 用途 |
|------|--------|------|
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Noto Sans SC', 'PingFang SC', sans-serif` | 正文 |
| `--font-mono` | `'JetBrains Mono', 'SF Mono', monospace` | 代码/参数 |

**字号规范**：
- 卡片标题：14px / 600 weight
- 分类标题：16px / 700 weight
- 卡片描述：12px / 400 weight
- 次要标签：11px / 600 weight

### 2.10 过渡（Transition）

| 令牌 | 值 | 用途 |
|------|----|----|
| `--t-fast` | `150ms ease` | hover / focus 即时反馈 |
| `--t-medium` | `250ms cubic-bezier(0.4,0,0.2,1)` | 展开/折叠/位置变化 |

**规则**：
- 必须显式列出过渡属性（禁止 `transition: all`）
- 只动 `transform` 和 `opacity`（compositor-friendly）
- 必须在 `@media (prefers-reduced-motion: reduce)` 中禁用

### 2.11 尺寸（Size）

| 令牌 | 值 | 用途 |
|------|----|----|
| `--toolbar-height` | `60px` | 工具栏固定高度 |
| `--sidebar-width` | `200px` | 侧边栏展开宽度 |
| `--sidebar-collapsed` | `60px` | 侧边栏折叠宽度 |
| `--nav-item-height` | `44px` | 导航项高度 |
| `--icon-size` | `18px` | 图标标准尺寸 |

---

## 3. 主题文件结构

```
nav/
├── static/
│   └── css/
│       ├── tokens.css           # 默认令牌（:root）
│       ├── base.css             # 基础重置（引用令牌）
│       ├── layout.css           # 布局（引用令牌）
│       ├── components.css       # 组件（引用令牌）
│       └── themes/              # 主题目录（新增）
│           ├── dark.css         # 深色主题（默认）
│           ├── light.css        # 浅色主题
│           ├── midnight.css     # 午夜蓝主题
│           ├── forest.css       # 森林绿主题
│           └── sunset.css       # 日落橙主题
├── theme/                       # 主题规范文档（本目录）
│   ├── README.md                # 本文档
│   ├── design-tokens.md         # 令牌详细说明
│   └── theme-template.css       # 新主题模板
└── layouts/
    └── _default/
        └── baseof.html          # 通过 data-theme 属性切换
```

---

## 4. 主题开发规范

### 4.1 主题文件模板

每个主题文件必须遵循以下结构：

```css
/* ============================================
   WebStack Nav - [主题名称] Theme
   描述：[主题风格描述]
   作者：[作者]
   日期：[YYYY-MM-DD]
   ============================================ */

[data-theme="themename"] {
  /* === 背景层级 === */
  --bg-base: #xxxxxx;
  --bg-surface: #xxxxxx;
  --bg-elevated: #xxxxxx;
  --bg-hover: #xxxxxx;

  /* === 边框 === */
  --border-subtle: rgba(...);
  --border-default: rgba(...);
  --border-strong: rgba(...);

  /* === 文字 === */
  --text-primary: #xxxxxx;
  --text-secondary: #xxxxxx;
  --text-tertiary: #xxxxxx;

  /* === 强调色 === */
  --accent: #xxxxxx;
  --accent-hover: #xxxxxx;
  --accent-dim: rgba(...);
  --accent-glow: rgba(...);

  /* === 辅助色（可选，不覆盖则用默认） === */
  /* --success, --warning, --danger, --info */

  /* === 阴影（可选，浅色主题建议覆盖） === */
  /* --shadow-sm, --shadow-md, --shadow-lg, --shadow-glow */

  /* === theme-color（meta 标签同步） === */
  --theme-color: #xxxxxx;
}
```

### 4.2 命名规范

- 主题文件名：小写英文，如 `midnight.css`
- `data-theme` 属性值：小写英文，与文件名一致
- 主题名称：可中文，如"午夜蓝"

### 4.3 必须覆盖的令牌

每个主题**必须**定义以下令牌：

- `--bg-base`, `--bg-surface`, `--bg-elevated`, `--bg-hover`
- `--text-primary`, `--text-secondary`, `--text-tertiary`
- `--accent`, `--accent-hover`, `--accent-dim`, `--accent-glow`

### 4.4 对比度要求

所有主题必须满足：
- `--text-primary` 对 `--bg-base` ≥ 4.5:1（正文）
- `--text-secondary` 对 `--bg-base` ≥ 4.5:1（正文）
- `--text-tertiary` 对 `--bg-base` ≥ 3:1（大文字/图标）
- `--accent` 对 `--bg-surface` ≥ 4.5:1（按钮文字）

### 4.5 禁止事项

- ❌ 主题文件中写组件样式（如 `.site-card { ... }`）
- ❌ 使用 `!important` 覆盖令牌
- ❌ 直接写颜色值在组件 CSS 中（必须用 `var()`）
- ❌ 改变间距/圆角/尺寸令牌（保持跨主题一致性）

---

## 5. 组件样式映射

### 组件 → 令牌引用表

| 组件 | 背景令牌 | 文字令牌 | 边框令牌 | 备注 |
|------|---------|---------|---------|------|
| 工具栏 | `rgba(--bg-surface, 0.8)` | `--text-secondary` | `--border-subtle` | 毛玻璃 backdrop-filter |
| 侧边栏 | `--bg-surface` | `--text-secondary` | `--border-subtle` | 浮动岛 |
| 网站卡片 | `--bg-surface` | `--text-primary` | `--border-subtle` | hover → `--accent` 边框 |
| 输入框 | `--bg-surface` | `--text-primary` | `--border-default` | focus → `--accent` |
| 按钮（icon-btn） | `transparent` | `--text-secondary` | 无 | hover → `--bg-hover` |
| 导航项 | `transparent` | `--text-secondary` | 无 | active → `--bg-elevated` |
| 分类标题 | 透明 | `--text-primary` | 无 | 左侧色块用 `--accent` |
| 快捷入口 | `transparent` | `--text-secondary` | 无 | hover → `--bg-hover` |

### 交互态

| 状态 | 背景 | 文字 | 边框 |
|------|------|------|------|
| default | `--bg-surface` | `--text-secondary` | `--border-subtle` |
| hover | `--bg-hover` | `--text-primary` | `--border-default` |
| active/selected | `--bg-elevated` | `--text-primary` | `--accent` |
| focus-visible | 原态 | 原态 | `--accent` + 2px outline |
| disabled | `--bg-surface` | `--text-tertiary` | `--border-subtle` |

---

## 6. 主题切换机制

### 6.1 HTML 结构

```html
<html lang="zh-cn" data-theme="dark">
```

### 6.2 CSS 加载顺序

```html
<!-- head.html -->
<link rel="stylesheet" href="css/tokens.css">      <!-- 默认令牌 -->
<link rel="stylesheet" href="css/base.css">         <!-- 基础重置 -->
<link rel="stylesheet" href="css/layout.css">       <!-- 布局 -->
<link rel="stylesheet" href="css/components.css">   <!-- 组件 -->
<link rel="stylesheet" href="css/themes/dark.css">  <!-- 主题 -->
<link rel="stylesheet" href="css/themes/light.css">
```

### 6.3 JS 切换

```javascript
// 主题切换逻辑
function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem('theme', name);
  // 同步 meta theme-color
  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--theme-color').trim();
  document.querySelector('meta[name="theme-color"]')
    .setAttribute('content', themeColor);
}

// 初始化
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);
```

### 6.4 主题按钮交互

- 点击 theme-toggle 按钮在 `dark` / `light` 之间切换（最常用）
- 长按或右键弹出主题选择菜单（所有主题）
- 主题选择持久化到 `localStorage`

---

## 7. 内置主题清单

### 计划主题

| 主题名 | 文件 | `data-theme` | 风格描述 | 状态 |
|--------|------|-------------|---------|------|
| 深色（默认） | `dark.css` | `dark` | 深蓝灰背景 + 紫蓝强调 | ✅ 已实现（tokens.css） |
| 浅色 | `light.css` | `light` | 白灰背景 + 蓝紫强调 | 📋 待开发 |
| 午夜蓝 | `midnight.css` | `midnight` | 深邃蓝黑 + 青色强调 | 📋 待开发 |
| 森林绿 | `forest.css` | `forest` | 深绿背景 + 翠绿强调 | 📋 待开发 |
| 日落橙 | `sunset.css` | `sunset` | 暖灰背景 + 橙红强调 | 📋 待开发 |
| 赛博朋克 | `cyberpunk.css` | `cyberpunk` | 纯黑背景 + 霓虹粉/青 | 📋 待开发 |

---

## 8. Web Interface Guidelines 合规清单

### 8.1 无障碍（Accessibility）

- [x] 所有 icon-only 按钮有 `aria-label`
- [x] 表单控件有 `<label>` 或 `aria-label`
- [x] 装饰性图标有 `aria-hidden="true"`
- [x] 使用语义化 HTML（`<button>`, `<a>`, `<nav>`）
- [ ] **待修复**：添加 skip link 跳到 `<main>`
- [ ] **待修复**：`go-top` 应为 `<button>` 而非 `<a href="#">`
- [ ] **待修复**：当前分类导航项添加 `aria-current="true"`

### 8.2 焦点态（Focus States）

- [x] 所有交互元素有 `:focus-visible` 样式
- [x] 未使用 `outline: none` 无替代
- [x] 使用 `:focus-visible` 而非 `:focus`

### 8.3 动画（Animation）

- [x] 遵守 `prefers-reduced-motion`
- [x] 过渡属性显式列出（无 `transition: all`）
- [x] 只动 `transform` / `opacity`（少数 `left`/`max-width` 例外）

### 8.4 排版（Typography）

- [ ] **待修复**：`google-search.html` placeholder `...` → `…`
- [x] 数字使用 `font-variant-numeric: tabular-nums`

### 8.5 图片（Images）

- [x] `<img>` 有 `width` 和 `height`
- [x] 非首屏图片 `loading="lazy"`
- [x] 首屏图片 `loading="eager"`

### 8.6 暗色模式（Dark Mode）

- [x] `<html>` 设置 `color-scheme: dark`
- [x] `<meta name="theme-color">` 匹配背景色
- [ ] **待修复**：主题切换时动态更新 `theme-color`

### 8.7 触摸与交互（Touch & Interaction）

- [ ] **待修复**：添加 `touch-action: manipulation`
- [ ] **待修复**：模态框/抽屉添加 `overscroll-behavior: contain`

### 8.8 反模式检查

- [x] 未禁用缩放
- [x] 未阻止粘贴
- [x] 未使用 `transition: all`
- [x] 无 `<div onClick>` 导航
- [x] 图标按钮有 `aria-label`

---

## 附录：主题开发流程

### 创建新主题步骤

1. 复制 `theme/theme-template.css` 到 `static/css/themes/[name].css`
2. 重命名 `[data-theme="themename"]` 为你的主题名
3. 覆盖所有必须令牌（见 4.3）
4. 使用对比度检查工具验证可访问性
5. 在 `head.html` 中引入新主题 CSS
6. 在主题切换菜单中添加选项
7. 更新本文档第 7 节的主题清单

### 对比度验证工具

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG Color Contrast Validator](https://color.a11y.com/)

---

**维护者**：WebStack Nav Team
**最后更新**：2026-07-18
