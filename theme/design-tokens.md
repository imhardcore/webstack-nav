# 设计令牌详细说明

> 本文档详细说明每个设计令牌的用途、取值范围、主题化注意事项。

---

## 1. 背景层级系统

### 层级关系图

```
┌─────────────────────────────────────┐
│  --bg-base  (页面底层)               │
│  ┌───────────────────────────────┐  │
│  │  --bg-surface  (卡片/侧边栏)    │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  --bg-elevated  (悬浮)    │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │  --bg-hover        │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 令牌用途

| 令牌 | 用途 | 示例组件 |
|------|------|---------|
| `--bg-base` | 页面 body 背景 | `<body>` |
| `--bg-surface` | 卡片、侧边栏表面 | `.site-card`, `.sidebar` |
| `--bg-elevated` | 悬浮元素、激活态 | 输入框 focus, `.nav-item.active` |
| `--bg-hover` | hover 反馈层 | `.icon-btn:hover`, `.quick-link:hover` |

### 主题化规则

- **深色主题**：亮度递增 `base < surface < elevated < hover`
- **浅色主题**：亮度递减 `base > surface > elevated > hover`
- **彩色主题**：保持亮度关系，改变色相
- 透明度叠加：工具栏使用 `rgba(surface, 0.8)` + `backdrop-filter`

---

## 2. 文字对比度

### 对比度要求

| 令牌 | 对比度要求 | 用途 |
|------|----------|------|
| `--text-primary` | ≥ 4.5:1（AAA 建议 7:1） | 标题、正文、卡片名 |
| `--text-secondary` | ≥ 4.5:1 | 描述、标签、导航文字 |
| `--text-tertiary` | ≥ 3:1 | 占位符、时间戳、弱标签 |

### 计算工具

```javascript
// 对比度计算（Y = 0.2126 R + 0.7152 G + 0.0722 B，线性 RGB）
function contrastRatio(c1, c2) {
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
```

### 验证清单

每个主题开发完成后，必须验证：
- [ ] `--text-primary` 对 `--bg-base` ≥ 4.5:1
- [ ] `--text-primary` 对 `--bg-surface` ≥ 4.5:1
- [ ] `--text-secondary` 对 `--bg-base` ≥ 4.5:1
- [ ] `--text-secondary` 对 `--bg-surface` ≥ 4.5:1
- [ ] `--accent` 对 `--bg-surface` ≥ 4.5:1（按钮文字场景）

---

## 3. 强调色系统

### 强调色用途

| 令牌 | 用途 |
|------|------|
| `--accent` | 主按钮、链接、focus 环、激活态边框 |
| `--accent-hover` | hover 态（比 accent 更亮/饱和） |
| `--accent-dim` | focus 半透明背景（rgba） |
| `--accent-glow` | 发光效果（卡片高亮、box-shadow） |

### 配色建议

- **蓝紫系**（默认）：`#6366f1` - 科技感、专业
- **青色系**：`#06b6d4` - 清新、现代
- **翠绿系**：`#10b981` - 自然、成长
- **橙红系**：`#f97316` - 活力、温暖
- **粉色系**：`#ec4899` - 活泼、创意

### 规则

- `--accent-hover` 必须比 `--accent` 亮度高 10-15%
- `--accent-dim` 是 `--accent` 的 12% 透明度版本
- `--accent-glow` 是 `--accent` 的 40% 透明度版本

---

## 4. 间距系统

### 间距用途

```
┌─ space-xl (32px) ─ 页面级区块间距
│  ┌─ space-lg (24px) ─ 区块内大间距
│  │  ┌─ space-md (16px) ─ 元素组间距
│  │  │  ┌─ space-sm (8px) ─ 元素间距
│  │  │  │  ┌─ space-xs (4px) ─ 紧凑间距
```

### 8px 网格

所有间距是 4 的倍数，主要使用 8px 网格：
- `4px` - 图标内边距
- `8px` - 元素间距
- `16px` - 区块内边距
- `24px` - 区块间距
- `32px` - 页面级间距

### 主题化规则

- ❌ 不要在主题中覆盖间距令牌
- 间距保持跨主题一致性，确保布局稳定

---

## 5. 圆角系统

### 圆角用途

| 令牌 | 值 | 用途 |
|------|----|----|
| `--r-sm` | 8px | 按钮、输入框、小卡片、快捷入口 |
| `--r-md` | 12px | 网站卡片、侧边栏、工具栏 |
| `--r-lg` | 16px | 大容器、模态框 |
| `--r-xl` | 20px | 全屏抽屉、特殊容器 |

### 主题化规则

- 可在主题中覆盖圆角令牌（如圆润主题 vs 锐利主题）
- 建议范围：4px（锐利）- 16px（圆润）

---

## 6. 阴影系统

### 阴影层级

| 令牌 | 用途 | 强度 |
|------|------|------|
| `--shadow-sm` | 轻微悬浮 | 最弱 |
| `--shadow-md` | 卡片悬浮 | 中 |
| `--shadow-lg` | 模态框/抽屉 | 强 |
| `--shadow-glow` | 强调发光 | 装饰性 |

### 主题化规则

- **深色主题**：阴影较重（0.3-0.5 透明度）
- **浅色主题**：阴影较轻（0.05-0.12 透明度）
- `--shadow-glow` 颜色必须与 `--accent` 一致

---

## 7. 字体系统

### 字体栈

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Noto Sans SC', 'PingFang SC', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', monospace;
```

### 字号规范

| 元素 | 字号 | 字重 | 行高 |
|------|------|------|------|
| 分类标题 `.section-title` | 16px | 700 | 1.2 |
| 卡片标题 `.card-title` | 14px | 600 | 1.3 |
| 正文 / 导航文字 | 13px | 500 | 1.5 |
| 卡片描述 `.card-desc` | 12px | 400 | 1.5 |
| 标签 / 次要 | 11px | 600 | 1.4 |

### 主题化规则

- ❌ 不在主题中覆盖字体令牌
- 字体保持跨主题一致

---

## 8. 过渡系统

### 过渡令牌

```css
--t-fast: 150ms ease;                           /* hover/focus */
--t-medium: 250ms cubic-bezier(0.4, 0, 0.2, 1); /* 展开/折叠 */
```

### 使用规则

1. **显式列出属性**：`transition: background var(--t-fast), color var(--t-fast);`
2. **禁止 `transition: all`**
3. **只动 transform/opacity**（compositor-friendly）
4. **必须遵守 reduced-motion**：
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

---

## 9. 尺寸系统

### 固定尺寸

| 令牌 | 值 | 说明 |
|------|----|----|
| `--toolbar-height` | 60px | 工具栏固定高度 |
| `--sidebar-width` | 200px | 侧边栏展开宽度 |
| `--sidebar-collapsed` | 60px | 侧边栏折叠宽度 |
| `--icon-size` | 18px | 图标标准尺寸 |

### 主题化规则

- ❌ 不在主题中覆盖尺寸令牌
- 尺寸保持跨主题一致，确保布局稳定

---

## 10. 主题切换技术细节

### CSS 变量继承

```css
:root {
  --accent: #6366f1;  /* 默认值 */
}

[data-theme="light"] {
  --accent: #4f46e5;  /* 覆盖值 */
}

.site-card:hover {
  border-color: var(--accent);  /* 自动使用当前主题值 */
}
```

### JavaScript 切换

```javascript
// 切换主题
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
  updateMetaThemeColor();
}

// 读取存储的主题
function getStoredTheme() {
  return localStorage.getItem('theme') || 'dark';
}

// 同步 meta theme-color
function updateMetaThemeColor() {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue('--theme-color')
    .trim();
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && color) {
    meta.setAttribute('content', color);
  }
}

// 初始化
setTheme(getStoredTheme());
```

### 防闪烁（FOUC）

在 `<head>` 中内联脚本，在 CSS 加载前设置主题：

```html
<script>
  (function() {
    var theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

---

**维护者**：WebStack Nav Team
**最后更新**：2026-07-18
