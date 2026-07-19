# WebStack Nav 主题开发指南

> 本文档是开发新主题的唯一入口。提供 Figma 文件或文字描述即可启动开发。
> 阅读本文档后，你无需了解项目内部细节，按步骤执行即可交付。

---

## 1. 快速开始

### 你只需要提供

| 输入方式 | 示例 | 说明 |
|---|---|---|
| **Figma 文件** | `xxx.fig` 或 Figma 链接 | AI 解析其中的颜色、字体、组件，生成色板 |
| **文字想法** | "我想要一个暗绿色调的森林主题" | AI 根据描述生成色彩方案和交互风格 |
| **参考图片** | 截图或灵感图 | AI 还原或提取配色 |

### 交付物

开发完成后你将得到：
- `theme/[name]/theme.css` — 主题样式文件
- `layouts/partials/head.html` — 新增 readFile 内联（已有默认主题的保持不变）
- `static/js/theme.js` — THEMES 数组注册新主题
- 本地 Hugo 预览验证通过

---

## 2. 项目结构（只需关心高亮部分）

```
nav/
├── static/
│   └── css/
│       ├── tokens.css        ← 📍 默认主题变量定义（:root）
│       ├── layout.css        ← 布局（禁止修改，引用变量）
│       ├── components.css    ← 组件（禁止修改，引用变量）
│       └── base.css          ← 重置（禁止修改，引用变量）
├── theme/                    ← 📍 新主题放在这里
│   ├── README.md             ← 设计规范（你不需要改）
│   ├── theme-template.css    ← 新主题模板（复制起点）
│   └── [name]/               ← 📍 每个主题一个文件夹
│       └── theme.css
├── layouts/
│   └── partials/
│       └── head.html         ← 📍 新增 readFile 引入
└── static/js/
    └── theme.js              ← 📍 注册新主题
```

---

## 3. 开发流程（7 步）

### 步骤 1：创建主题文件夹

```
theme/[name]/theme.css
```

从 `theme/theme-template.css` 复制作为起点。

### 步骤 2：定义颜色方案

在 `[data-theme="name"]` 选择器内填充所有变量：

```css
[data-theme="name"] {
  /* 四层背景（亮度递增/递减） */
  --bg-base: ;
  --bg-surface: ;
  --bg-elevated: ;
  --bg-hover: ;

  /* 边框 */
  --border-subtle: ;
  --border-default: ;
  --border-strong: ;

  /* 文字 */
  --text-primary: ;
  --text-secondary: ;
  --text-tertiary: ;

  /* 强调色 */
  --accent: ;
  --accent-hover: ;
  --accent-dim: ;
  --accent-glow: ;

  /* 阴影 */
  --shadow-sm: ;
  --shadow-md: ;
  --shadow-lg: ;
  --shadow-glow: ;

  /* 必须定义 */
  --theme-color: ;  /* 值 = --bg-base */
}
```

**变量语义速查**：

| 变量 | 用途 | 举例 |
|---|---|---|
| `--bg-base` | body 最底层背景 | `#0b0f1a` |
| `--bg-surface` | 卡片/侧边栏/工具栏 | `#111827` |
| `--bg-elevated` | 悬浮层/激活态 | `#1a2234` |
| `--bg-hover` | hover 反馈 | `#1e293b` |
| `--text-primary` | 标题、正文（≥4.5:1） | `#f1f5f9` |
| `--text-secondary` | 描述（≥4.5:1） | `#94a3b8` |
| `--text-tertiary` | 弱文字（≥3:1） | `#64748b` |
| `--accent` | 强调色（logo高亮、激活态） | `#6366f1` |
| `--accent-hover` | 强调色 hover 态 | `#818cf8` |
| `--accent-dim` | 强调色半透明背景 | `rgba(...)` |
| `--accent-glow` | 强调色光晕 | `rgba(...)` |

> **外部设计系统映射**：如果你用 shadcn/Google/Material 等设计系统，
> 必须建立映射关系，不得直接用外部变量名。
> 例如 shadcn `--primary` → 项目 `--accent`，shadcn `--accent` → 项目 `--bg-hover`。

### 步骤 3：定义交互方案

在 `[data-theme="name"]` 选择器下定义 hover/active/focus 效果：

```css
/* 卡片 hover */
[data-theme="name"] .site-card {
  transition: transform var(--t-medium), box-shadow var(--t-medium),
              border-color var(--t-medium), background var(--t-medium);
}
[data-theme="name"] .site-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  background: var(--bg-elevated);
}

/* 导航项 */
[data-theme="name"] .nav-item { transition: background var(--t-fast), color var(--t-fast); }
[data-theme="name"] .nav-item:hover { background: var(--bg-hover); color: var(--text-primary); }
[data-theme="name"] .nav-item.active { background: var(--accent-dim); color: var(--accent); }

/* 焦点环 */
[data-theme="name"] *:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

**可覆盖的组件选择器列表**：

| 选择器 | 说明 |
|---|---|
| `.site-card` | 网站卡片（hover 上浮/边框/阴影） |
| `.nav-item` / `.nav-item:hover` / `.nav-item.active` | 侧边栏导航项 |
| `.quick-link` / `.quick-link:hover` | 工具栏常用入口 |
| `.icon-btn` / `.icon-btn:hover` | 图标按钮（搜索/主题切换） |
| `*:focus-visible` | 全局焦点环 |
| `.toolbar` | 工具栏（可加 backdrop-filter） |
| `.section-title::before` | 分类标题装饰条 |
| `.theme-menu` / `.theme-menu-item` | 主题下拉菜单 |
| `.logo-mark` / `.logo .accent` | Logo 高亮色 |

### 步骤 4：定义动画（可选）

```css
@keyframes name-card-enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
[data-theme="name"] .site-card { animation: name-card-enter 0.3s ease both; }
/* 错开延迟用 nth-child(1)~(6) */
```

### 步骤 5：动效降级（必须）

```css
@media (prefers-reduced-motion: reduce) {
  [data-theme="name"] *,
  [data-theme="name"] *::before,
  [data-theme="name"] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 步骤 6：集成到项目

**6a. head.html 新增 readFile**：

```html
<!-- 在 </head> 前的 Open Graph 注释之前添加 -->
{{ $newTheme := readFile "theme/[name]/theme.css" }}
{{ if $newTheme }}<style id="theme-[name]">{{ $newTheme | safeCSS }}</style>{{ end }}
```

**6b. theme.js 注册主题**：

```js
// 在 THEMES 数组末尾添加
{ id: '[name]', name: '中文名', icon: 'fa-xxx' }
```

可选图标：`fa-cube` `fa-moon-o` `fa-sun-o` `fa-magic` `fa-palette` `fa-paint-brush` `fa-star` `fa-fire` `fa-leaf` `fa-bolt` `fa-gem`

### 步骤 7：本地预览验证

```bash
tools\hugo\hugo.exe server --port 8767 --baseURL http://localhost:8767/ --bind 127.0.0.1
```

打开浏览器 → 主题菜单 → 切换到新主题 → 检查所有组件。

---

## 4. 硬性规则（违反即返工）

| 规则 | 说明 |
|---|---|
| **R1** | 布局文件（layout.css、components.css、base.css）禁止修改 |
| **R2** | 布局文件禁止硬编码颜色（它们已全部使用 var()） |
| **R3** | 半透明效果必须用 `color-mix(in srgb, var(--bg-X) X%, transparent)` |
| **R4** | 只用 `[data-theme="name"]` 选择器，不污染 `:root` |
| **R5** | 不修改布局/尺寸/间距/字体/过渡时长令牌 |
| **R6** | 必须定义 `--theme-color`（值 = `--bg-base`） |
| **R7** | 必须包含 `prefers-reduced-motion` 降级 |
| **R8** | WCAG AA 对比度：primary/secondary ≥ 4.5:1，tertiary ≥ 3:1 |

---

## 5. 允许硬编码颜色的例外区

以下区域是组件固有品牌色，不属于主题色，可以保留硬编码：

| 位置 | 颜色 | 原因 |
|---|---|---|
| `.logo-mark` 渐变 | `#3b82f6 → #60a5fa` | Logo 品牌色 |
| `.logo-text-accent` | `#3b82f6` | Logo 品牌色 |
| `.google-search-icon` | `#4285f4` | Google 品牌色 |
| `.google-search-input` focus | `#4285f4` | Google 品牌色 |
| `.gemini-btn` | `#1a73e8` | Google 品牌色 |
| `neonPulse` 动画阴影 | `rgba(99,102,241,...)` | 搜索匹配动效 |
| `.sidebar-collapse-btn:hover` | `color: #fff` | 按钮反转色（非主题色） |

---

## 6. 从 Figma 文件开发

当你提供 `.fig` 文件或 Figma 链接时，AI 会执行：

1. **解析设计文件** → 提取颜色、字体、间距、圆角
2. **映射到项目变量** → 将 Figma 的设计令牌映射到项目的 CSS 变量语义
3. **生成色板** → 在对话中展示色板预览供你确认
4. **检查对比度** → 自动校验 WCAG AA 合规
5. **生成 theme.css** → 按步骤 2-5 自动填充
6. **集成 + 预览** → 自动完成步骤 6-7

### Figma 输出示例

你只需说：
> "这是我的 Figma 设计文件 [附件]，用它开发一个叫 xxx 的新主题"

或：
> "解析这个 Figma 链接 https://figma.com/file/xxx，提取配色方案"

---

## 7. 从想法开发

当你只有文字想法时，AI 会执行：

1. **理解意图** → 分析风格关键词（如「森林」「海洋」「赛博朋克」）
2. **生成色彩方案** → 提出色板供你确认
3. **生成设计稿** → 渲染色板 + 组件预览的可视化
4. **你确认方向** → 同意后生成 theme.css
5. **集成 + 预览**

### 想法输入示例

> "做一个薄荷绿的浅色主题，清新淡雅"
> "暗红色调的赛博朋克风，强调色用霓虹粉"
> "参考 Vercel 的黑白风格做极简主题"

---

## 8. 对比度速查表

新主题定义颜色后，用此表校验：

| 组合 | 要求 | 检查方式 |
|---|---|---|
| `--text-primary` vs `--bg-surface` | ≥ 4.5:1 | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) |
| `--text-secondary` vs `--bg-surface` | ≥ 4.5:1 | 同上 |
| `--text-tertiary` vs `--bg-surface` | ≥ 3:1 | 同上 |

AI 在生成色板时会自动计算对比度并在设计稿中标注。

---

## 9. 踩坑速查

| 坑 | 后果 | 规避方法 |
|---|---|---|
| layout.css 硬编码颜色 | 浅色主题工具栏不变色 | 永远不要改 layout.css |
| 数据文件名含连字符 | Hugo 启动报错 | 只用下划线 `_` |
| 主题文件放错位置 | readFile 读不到 | 必须放 `theme/[name]/theme.css` |
| 外部设计系统变量名冲突 | accent 语义混乱 | 先建立映射关系 |
| opacity:0 作初始状态 | JS 中断后内容消失 | 默认状态必须 opacity:1 |

---

**最后更新**：2026-07-19
