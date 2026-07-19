# WebStack Nav 设计规范

> 本文档定义 WebStack Nav 的页面布局、组件排版格式、后台数据交互和主题系统规范。
> 主题开发**必须严格遵守**本文档，尤其是 [§4 主题系统架构](#4-主题系统架构) 中的硬性规则。

---

## 目录

1. [页面布局](#1-页面布局)
2. [组件排版格式](#2-组件排版格式)
3. [后台数据交互](#3-后台数据交互)
4. [主题系统架构](#4-主题系统架构)
5. [新主题开发流程](#5-新主题开发流程)
6. [踩坑记录与反模式](#6-踩坑记录与反模式)

---

## 1. 页面布局

### 1.1 整体结构

页面采用**上下结构**：

```
┌──────────────────────────────────────────────┐
│  Toolbar（工具栏）- sticky 顶部，全宽          │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─────────┐  ┌──────────────────────────┐  │
│  │         │  │                          │  │
│  │ Sidebar │  │  Content（内容区）        │  │
│  │ 侧边栏   │  │  - 独立滚动               │  │
│  │ 浮动岛   │  │  - 卡片网格布局           │  │
│  │         │  │                          │  │
│  └─────────┘  └──────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘
```

### 1.2 工具栏（Toolbar）

- **定位**：`sticky` 顶部，全宽
- **高度**：固定（由 `--toolbar-height` 令牌定义）
- **布局**：`flex`，三段式结构

```
┌──────────┬────────────────────┬──────────────────┐
│  左侧     │     居中区          │     右侧          │
│ (品牌)    │  (常用网站入口)     │  (搜索+主题+链接) │
└──────────┴────────────────────┴──────────────────┘
```

| 区域 | 内容 | 对齐方式 |
|------|------|---------|
| 左侧 | 品牌标识（文字或图片，后台可控） | 左对齐 |
| 居中 | 5 个常用网站入口（后台可控） | 居中，`flex: 1` |
| 右侧 | 搜索按钮 + 主题切换 + 后台入口 + GitHub 链接 | 右对齐 |

**搜索交互**：点击放大镜按钮，搜索框从右侧向左滑出。

### 1.3 侧边栏（Sidebar）

- **定位**：`sticky`，浮动岛样式（圆角 + 阴影 + 边框）
- **宽度**：展开态 / 折叠态（由 `--sidebar-width` / `--sidebar-collapsed` 令牌定义）
- **滚动**：侧边栏整体不随内容滚动，内部导航列表独立滚动
- **结构**：

```
┌─────────────────┐
│  Logo 区         │  ← 后台可控（文字/图片）
├─────────────────┤
│                 │
│  导航列表        │  ← 分类项，图标 + 文字
│  (独立滚动)      │
│                 │
├─────────────────┤
│  折叠按钮        │  ← 底部
└─────────────────┘
```

**折叠态**：仅显示图标，文字隐藏。

### 1.4 内容区（Content）

- **定位**：`flex: 1`，独立滚动
- **结构**：搜索框（可选） → 分类区 → 页脚
- **分类区**：每个分类一个 `<section>`，包含标题 + 卡片网格

### 1.5 响应式断点

| 断点 | 工具栏 | 侧边栏 | 内容区 |
|------|--------|--------|--------|
| 桌面（>1024px） | 全宽，三段式 | 浮动岛，展开态 | 卡片网格 |
| 平板（768-1024px） | 全宽，三段式 | 浮动岛 | 减小内边距 |
| 移动（≤768px） | 全宽 | 固定定位，折叠态 | 全宽，单列 |

---

## 2. 组件排版格式

### 2.1 网站卡片（Site Card）

- **元素**：`<a>` 语义化链接
- **结构**：

```html
<a class="site-card" href="..." target="_blank" rel="noopener">
    <div class="card-header">
        <img class="card-icon" width="32" height="32" loading="lazy" alt="...">
        <span class="card-title">标题</span>
    </div>
    <p class="card-desc">描述</p>
</a>
```

- **网格**：响应式列数（桌面多列，移动单列），具体列数由主题定义
- **卡片尺寸**：`min-height` 保证完整显示描述，不截断
- **交互**：hover 有反馈（由主题定义），搜索匹配时有高亮动效

### 2.2 分类区（Category Section）

```html
<section class="category-section" id="分类ID">
    <div class="section-header">
        <h2 class="section-title">分类名称</h2>
        <span class="section-count">N 个网站</span>
    </div>
    <div class="cards-grid">
        <!-- 网站卡片 -->
    </div>
</section>
```

### 2.3 导航项（Nav Item）

```html
<a href="#分类ID" class="nav-item" data-label="分类名称">
    <i class="图标class" aria-hidden="true"></i>
    <span class="nav-text">分类名称</span>
</a>
```

- 点击平滑滚动到对应分类区
- 当前可见分类对应的导航项有激活态

### 2.4 常用网站入口（Quick Links）

```html
<nav class="toolbar-center" aria-label="常用网站">
    <ul class="quick-links">
        <li>
            <a href="..." class="quick-link" title="..." aria-label="...">
                <i class="图标class" aria-hidden="true"></i>
                <span class="quick-link-text">名称</span>
            </a>
        </li>
    </ul>
</nav>
```

### 2.5 搜索框

- 桌面端：放大镜按钮 + 滑出式搜索框
- 搜索内容区网站卡片，匹配项高亮，自动滚动到第一个匹配项
- 回车提交

### 2.6 可访问性要求（所有组件通用）

- icon-only 按钮必须有 `aria-label`
- 装饰性图标必须有 `aria-hidden="true"`
- 表单控件必须有 `<label>` 或 `aria-label`
- 所有交互元素必须有 `:focus-visible` 样式
- 动画必须响应 `prefers-reduced-motion`
- 使用语义化 HTML（`<button>`, `<a>`, `<nav>`, `<main>`）

---

## 3. 后台数据交互

### 3.1 数据文件结构

所有内容由 `data/` 目录下的 JSON 文件驱动，通过 Sveltia CMS 管理。

> **重要**：数据文件名**不得包含连字符 `-`**，否则 Hugo 模板解析时会被当作减法运算符。
> 必须使用下划线 `_`（如 `quick_links.json`），模板中用 `.Site.Data.quick_links` 访问。

#### `data/categories.json` — 分类

```json
{
  "groups": [
    {
      "id": "nav",
      "icon": "fa fa-compass",
      "name": "导航",
      "categories": [
        { "id": "AI", "icon": "fa fa-magic", "name": "AI" },
        { "id": "GFW", "icon": "fa fa-globe", "name": "遥远的破墙" }
      ]
    }
  ]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `groups[].id` | string | 分组 ID |
| `groups[].icon` | string | 分组图标 class（Font Awesome） |
| `groups[].name` | string | 分组名称 |
| `groups[].categories[]` | array | 分类列表 |
| `categories[].id` | string | 分类 ID（用于锚点跳转） |
| `categories[].icon` | string | 分类图标 class |
| `categories[].name` | string | 分类名称（纯字符串） |

#### `data/sites.json` — 网站

```json
{
  "sites": [
    {
      "id": "chatgpt",
      "title": "ChatGPT",
      "url": "https://chat.openai.com/",
      "description": "OpenAI 推出的 AI 对话助手...",
      "logo": "default.png",
      "category": "AI",
      "group": "nav"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 网站唯一 ID |
| `title` | string | 网站标题 |
| `url` | string | 网站链接 |
| `description` | string | 网站描述（完整显示，不截断） |
| `logo` | string | Logo 文件名（位于 `images/logos/`） |
| `category` | string | 所属分类 ID（对应 categories.json） |
| `group` | string | 所属分组 ID |

#### `data/quick_links.json` — 常用网站入口

```json
{
  "quickLinks": [
    { "id": "chatgpt", "title": "ChatGPT", "url": "...", "icon": "fa fa-comments" }
  ]
}
```

#### `data/logo.json` — Logo 配置

```json
{
  "logo": {
    "type": "text",
    "text": "My Navigation",
    "accentText": "My",
    "image": "",
    "imageAlt": "My Navigation",
    "imageWidth": 32,
    "imageHeight": 32
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"text"` / `"image"` | Logo 类型 |
| `text` | string | 完整文字（type=text 时） |
| `accentText` | string | 高亮文字部分（type=text 时） |
| `image` | string | 图片路径（type=image 时） |
| `imageAlt` | string | 图片 alt 文本 |
| `imageWidth` | number | 图片宽度（px） |
| `imageHeight` | number | 图片高度（px） |

**图片规格**：32×32px，PNG/SVG，小于 10KB。

### 3.2 Sveltia CMS 配置

- 配置文件：`static/admin/config.yml`
- 认证方式：Token-based（`auth_methods: [token]`）
- 必须包含：`site_url`, `display_url`, `logo_url`
- YAML 选项使用多行列表格式
- 分类名称存储为纯字符串（非多语言对象）

### 3.3 数据渲染流程

```
categories.json  ─┐
                  ├─→ Hugo 模板循环渲染 ─→ 侧边栏导航 + 内容区分类
sites.json       ─┘
quick_links.json ────→ 工具栏居中入口
logo.json        ────→ 侧边栏 Logo 区
```

---

## 4. 主题系统架构

### 4.1 主题定义

主题**不是简单的颜色切换**，而是应用一套完整的样式体系，包括：

- **颜色方案**：背景层级、文字层级、强调色、边框、阴影
- **交互方案**：hover/active/focus 反馈方式、过渡动效
- **动画效果**：入场动画、交互动画、微动效

### 4.2 主题文件结构

```
nav/
├── static/
│   └── css/
│       ├── tokens.css        # 基础令牌（含默认主题 :root）
│       ├── base.css          # 基础重置
│       ├── layout.css        # 布局（引用令牌，禁止硬编码颜色）
│       ├── components.css    # 组件基础样式（引用令牌）
│       └── js/
│           └── theme.js      # 主题切换逻辑 + THEMES 列表
├── theme/                    # 规范文档 + 各主题独立文件夹
│   ├── README.md             # 本文档
│   ├── theme-template.css    # 新主题模板
│   └── [name]/               # 每个主题一个独立文件夹
│       ├── README.md         # 主题说明（可选）
│       └── theme.css         # 主题样式（颜色+交互+动画）
└── layouts/
    ├── _default/
    │   └── baseof.html       # 通过 data-theme 属性切换，默认主题在此设置
    └── partials/
        └── head.html         # 通过 readFile 内联主题 CSS
```

### 4.3 主题引入方式

使用 Hugo 的 `readFile` 函数**内联**主题 CSS 到 `<head>` 中（而非 `<link>` 引用），避免额外 HTTP 请求：

```html
{{ $theme := readFile "theme/[name]/theme.css" }}
{{ if $theme }}<style id="theme-[name]">{{ $theme | safeCSS }}</style>{{ end }}
```

### 4.4 硬性规则（必须遵守）

#### R1. 布局文件禁止硬编码颜色

`layout.css`、`components.css`、`base.css` 中**严禁**出现硬编码颜色值（hex、rgb、rgba、hsl 字面量）。

**错误示例**：
```css
/* ❌ layout.css */
.toolbar {
  background: rgba(17, 24, 39, 0.8);  /* 硬编码，不随主题变化 */
}
```

**正确做法**：
```css
/* ✅ 使用主题变量 + color-mix 实现半透明 */
.toolbar {
  background: color-mix(in srgb, var(--bg-surface) 85%, transparent);
}
```

#### R2. 半透明背景必须用 color-mix

需要半透明效果（毛玻璃、悬浮层）时，**必须**使用 `color-mix(in srgb, var(--bg-surface) X%, transparent)`，禁止硬编码 `rgba()`。

原因：硬编码的 `rgba()` 不会随主题切换而变化，导致浅色主题下背景仍是深色。

#### R3. 主题文件必须用 `[data-theme="name"]` 选择器

每个主题通过 `[data-theme="name"]` 属性选择器定义变量和样式，不得污染 `:root`（`:root` 仅用于默认主题）。

#### R4. 不得改变布局结构和尺寸令牌

主题文件**只能**修改：
- 颜色相关变量（`--bg-*`, `--text-*`, `--accent-*`, `--border-*`, `--shadow-*`）
- 交互效果（hover/active/focus 过渡）
- 动画效果（@keyframes、animation）

主题文件**不得**修改：
- 布局属性（display、position、flex、grid 结构）
- 尺寸令牌（`--toolbar-height`、`--sidebar-width`、`--sidebar-collapsed`、`--nav-item-height`）
- 间距令牌（`--space-*`）
- 字体令牌（`--font-sans`、`--font-mono`）
- 过渡时长令牌（`--t-fast`、`--t-medium`）

#### R5. 必须提供 `--theme-color` 变量

每个主题必须定义 `--theme-color` 变量，用于同步更新 `<meta name="theme-color">`。值应等于 `--bg-base`。

#### R6. 必须包含动效降级

主题中的所有动画和过渡必须包含 `prefers-reduced-motion: reduce` 降级处理。

#### R7. 必须满足 WCAG AA 对比度

- 正文文字（`--text-primary`、`--text-secondary`）与背景对比度 ≥ 4.5:1
- 大文字/弱文字（`--text-tertiary`）与背景对比度 ≥ 3:1

### 4.5 项目变量语义说明

开发新主题时，必须理解项目变量的语义，避免与外部设计系统（如 shadcn）的变量名冲突：

| 项目变量 | 语义 | 说明 |
|---------|------|------|
| `--bg-base` | 页面最底层背景 | body 背景 |
| `--bg-surface` | 卡片/侧边栏/工具栏表面 | 主要容器背景 |
| `--bg-elevated` | 悬浮元素/激活态 | 高于 surface 的层级 |
| `--bg-hover` | hover 反馈层 | 鼠标悬停时的背景色 |
| `--text-primary` | 主文字 | 标题、正文 |
| `--text-secondary` | 次文字 | 描述、辅助文字 |
| `--text-tertiary` | 弱文字 | 占位符、禁用态 |
| `--accent` | **强调色** | 用于 logo 高亮、激活态文字、强调按钮 |
| `--accent-hover` | 强调色 hover | 强调色悬停态 |
| `--accent-dim` | 强调色背景（半透明） | 用于激活态背景、焦点环 |
| `--accent-glow` | 强调色发光 | 高亮/光晕效果 |
| `--border-subtle` | 弱边框 | 分隔线 |
| `--border-default` | 默认边框 | 卡片边框 |
| `--border-strong` | 强边框 | hover/激活态边框 |
| `--theme-color` | 主题色 | 同步到 meta 标签，等于 `--bg-base` |

> **注意**：shadcn 的 `--accent` 语义是「hover 背景」，与项目 `--accent`（强调色）不同。
> 引用外部设计系统时，必须建立映射关系，而非直接复用变量名。
> 例如：shadcn `--accent`（hover 背景）→ 项目 `--bg-hover`；shadcn `--primary`（主色）→ 项目 `--accent`（强调色）。

### 4.6 主题切换机制

- HTML 根元素通过 `data-theme` 属性标记当前主题
- `static/js/theme.js` 中的 `THEMES` 数组定义所有可用主题
- JS 切换 `data-theme` 值并持久化到 `localStorage`
- 切换时同步更新 `<meta name="theme-color">` 和 `color-scheme` 样式

---

## 5. 新主题开发流程

### 5.1 开发步骤

1. **创建主题文件夹**：在 `theme/` 下创建 `[name]/` 文件夹
2. **复制模板**：将 `theme/theme-template.css` 复制到 `theme/[name]/theme.css`
3. **实现颜色方案**：填充所有变量值，确保对比度达标
4. **实现交互方案**：定义 hover/active/focus 过渡效果
5. **实现动画效果**：定义入场动画和微动效，包含降级处理
6. **引入主题**：在 `layouts/partials/head.html` 中用 `readFile` 内联 CSS
7. **注册主题**：在 `static/js/theme.js` 的 `THEMES` 数组中添加新主题
8. **设置默认主题**：如需更改默认主题，修改 `layouts/_default/baseof.html` 的 `data-theme` 属性和 `static/css/tokens.css` 的 `:root` 块

### 5.2 强制检查清单

新主题开发完成后，**必须**通过以下全部检查：

#### 颜色与对比度
- [ ] `--bg-base`、`--bg-surface`、`--bg-elevated`、`--bg-hover` 四层背景亮度递增（深色主题）或递减（浅色主题）
- [ ] `--text-primary` 与 `--bg-surface` 对比度 ≥ 4.5:1
- [ ] `--text-secondary` 与 `--bg-surface` 对比度 ≥ 4.5:1
- [ ] `--text-tertiary` 与 `--bg-surface` 对比度 ≥ 3:1
- [ ] `--theme-color` 已定义，值等于 `--bg-base`

#### 变量完整性
- [ ] 所有 [§4.5](#45-项目变量语义说明) 中列出的变量都已定义
- [ ] 没有修改布局结构、尺寸、间距、字体、过渡时长令牌
- [ ] 没有引用 `:root`（仅使用 `[data-theme="name"]` 选择器）

#### 交互与动画
- [ ] 卡片 hover 有反馈
- [ ] 导航项 hover 和 active 态有反馈
- [ ] 快捷入口 hover 有反馈
- [ ] 图标按钮 hover 有反馈
- [ ] `:focus-visible` 焦点环已定义
- [ ] 包含 `prefers-reduced-motion: reduce` 降级

#### 集成验证
- [ ] 在 `head.html` 中用 `readFile` 内联引入
- [ ] 在 `theme.js` 的 `THEMES` 数组中注册
- [ ] 本地 `hugo server` 预览，切换到新主题验证效果
- [ ] **切换其他主题再切回来，确认样式正确还原**（防止变量残留）
- [ ] **检查工具栏背景是否随主题变化**（防止硬编码）
- [ ] **检查侧边栏、卡片、搜索框等所有组件是否随主题变化**

---

## 6. 踩坑记录与反模式

> 本节记录历史踩坑案例，新主题开发时**必须**规避。

### 6.1 布局文件硬编码颜色（2026-07-19 发现）

**现象**：切换到浅色主题时，工具栏背景仍是深灰色，与浅色页面不协调。

**根因**：`layout.css` 中工具栏背景硬编码为 `rgba(17, 24, 39, 0.8)`，没有使用主题变量。

**修复**：改为 `color-mix(in srgb, var(--bg-surface) 85%, transparent)`。

**教训**：
- `layout.css`、`components.css`、`base.css` 中**严禁硬编码颜色**
- 需要半透明效果时，**必须**用 `color-mix(in srgb, var(--bg-X) X%, transparent)`
- 新主题开发完成后，**必须**切换主题验证所有组件是否随主题变化

### 6.2 数据文件名含连字符导致 Hugo 解析失败（2026-07-19 发现）

**现象**：Hugo 启动报错 `bad character U+002D '-'`。

**根因**：`data/quick-links.json` 文件名含连字符 `-`，Hugo 模板中 `.Site.Data.quick-links.quickLinks` 被解析为减法运算。

**修复**：重命名为 `quick_links.json`，模板改为 `.Site.Data.quick_links.quickLinks`。

**教训**：Hugo 数据文件名**必须用下划线 `_`**，不得用连字符 `-`。

### 6.3 主题文件存放位置不一致（历史问题）

**现象**：早期主题放在 `static/css/themes/`，后改为 `theme/[name]/`，导致规范文档与实际不一致。

**根因**：规范未及时更新。

**修复**：统一为 `theme/[name]/theme.css`，每个主题一个独立文件夹。

**教训**：主题文件**必须**放在 `theme/[name]/` 下，不得放在 `static/css/themes/`。

### 6.4 外部设计系统变量名冲突（2026-07-18 发现）

**现象**：shadcn 主题中直接使用 shadcn 的 `--accent` 变量名，与项目 `--accent` 语义冲突。

**根因**：shadcn 的 `--accent` 是「hover 背景」，项目的 `--accent` 是「强调色」。

**修复**：建立映射关系：shadcn `--accent` → 项目 `--bg-hover`；shadcn `--primary` → 项目 `--accent`。

**教训**：引用外部设计系统时，**必须**建立变量映射，不得直接复用外部变量名。

### 6.5 动画初始 opacity:0 导致内容永久隐藏（历史问题）

**现象**：卡片使用 `opacity: 0` + `animation: forwards`，JS 执行中断时卡片永久不可见。

**根因**：初始状态设为 `opacity: 0`，依赖动画恢复，但动画被中断时无法恢复。

**修复**：移除 `opacity: 0`，改用 `animation: both` 或让默认状态为可见。

**教训**：动画**不得**依赖初始隐藏状态，元素默认状态**必须**是可见的（`opacity: 1`）。

---

**最后更新**：2026-07-19
