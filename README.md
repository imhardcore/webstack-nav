# WebStack 网址导航

基于 Hugo + Sveltia CMS 的现代化网址导航网站，专注于 AI、工具和设计资源的高效导航。

## 功能特性

- **侧边栏折叠** — 可折叠侧边栏，展开显示分类名称，折叠显示图标
- **实时搜索** — 支持网站名称和描述的模糊搜索
- **暗色模式** — 一键切换明暗主题，自动跟随系统
- **响应式布局** — 适配桌面端和移动端
- **Sveltia CMS 后台** — 基于 Git 的可视化内容管理，支持 Access Token 登录
- **GitHub Actions 自动部署** — 推送代码自动构建部署到 GitHub Pages
- **零依赖运行** — 纯静态站点，无需后端服务

## 技术栈

- **站点生成**: Hugo
- **内容管理**: Sveltia CMS
- **样式方案**: 原生 CSS（设计令牌 + 组件化）
- **图标字体**: Font Awesome + Linecons
- **部署**: GitHub Pages + GitHub Actions

## 项目结构

```
├── .github/workflows/    # GitHub Actions 部署工作流
├── content/              # 页面内容（_index.md 首页、about.md 关于）
├── data/                 # 数据文件
│   ├── sites.json       # 网址数据
│   └── categories.json  # 分类结构
├── layouts/              # Hugo 模板
│   ├── _default/        # 基础模板（baseof, single）
│   ├── partials/        # 组件模板
│   │   ├── head.html
│   │   ├── navbar.html
│   │   ├── sidebar.html
│   │   ├── site-card.html
│   │   ├── footer.html
│   │   └── scripts.html
│   ├── index.html       # 首页
│   └── 404.html         # 404 页面
├── static/               # 静态资源
│   ├── admin/           # Sveltia CMS 配置
│   ├── css/             # 样式文件
│   │   ├── tokens.css   # 设计令牌（颜色、间距、圆角等）
│   │   ├── base.css     # 基础重置
│   │   ├── layout.css   # 布局
│   │   ├── components.css # 组件样式
│   │   └── fonts/       # 图标字体
│   ├── js/              # 脚本（搜索、主题、懒加载等）
│   └── images/          # 图片资源
├── hugo.toml             # Hugo 配置
└── .gitignore
```

## 分类结构

当前包含 5 个分类组，共 27 个分类：

- **AI** — AI 对话、图像生成、编程助手等
- **遥远的破墙** — 代理工具、科学上网相关
- **SillyTavern** — LLM 角色扮演相关资源
- **设计资源** — UI/UX、图标素材、配色工具等
- **影视资源** — 流媒体、影评社区等

## 本地开发

### 环境要求

- [Hugo Extended](https://gohugo.io/installation/) v0.128.0+

### 启动开发服务器

```bash
hugo server -D
```

访问 `http://localhost:1313/webstack-nav/`

### 构建生产版本

```bash
hugo --minify
```

输出目录：`public/`

## 内容管理

### 通过 Sveltia CMS 后台

1. 访问 `https://imhardcore.github.io/webstack-nav/admin/`
2. 点击 "Sign In Using Access Token"
3. 输入 GitHub Personal Access Token（需包含 `repo` 权限）
4. 在后台管理网址和分类数据

> 点击对话框中的"如何获取 Access Token？"链接可直达 GitHub Token 创建页面。

### 手动编辑数据

编辑 `data/sites.json` 和 `data/categories.json` 直接修改数据。

新增网址格式：

```json
{
  "id": "example",
  "title": "网站名称",
  "url": "https://example.com/",
  "description": "网站描述",
  "logo": "default.png",
  "category": "分类名称",
  "group": "组ID"
}
```

网站图标放入 `static/images/logos/` 目录，建议 120x120px PNG 格式。

## 部署

本项目使用 GitHub Pages + GitHub Actions 自动部署：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建
3. 构建产物部署到 `gh-pages` 分支
4. 几分钟后访问 `https://imhardcore.github.io/webstack-nav/`

## License

MIT License — 基于 [WebStack](https://github.com/WebStackPage/WebStackPage.github.io) 开源项目二次开发
