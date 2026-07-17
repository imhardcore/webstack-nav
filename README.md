# WebStack 网址导航

基于 Hugo + Decap CMS 的设计师网址导航网站，提供完整的内容管理后台和自动化部署。

## 技术栈

- **站点生成**: Hugo (静态站点生成器)
- **内容管理**: Decap CMS (基于 Git 的 CMS)
- **前端框架**: Bootstrap 3 + Xenon Theme + jQuery
- **部署**: GitHub Pages + GitHub Actions

## 功能特性

- 231+ 精选设计网站，覆盖 27 个分类
- 中英文双语支持
- 实时搜索功能
- 暗色模式切换
- 响应式设计，支持移动端
- Decap CMS 后台管理 (CRUD)
- GitHub Actions 自动构建部署
- 图片懒加载优化

## 项目结构

```
├── .github/workflows/    # GitHub Actions 部署工作流
├── archetypes/           # Hugo 内容模板
├── content/              # 页面内容 (cn/ 中文, en/ 英文)
├── data/                 # 数据文件
│   ├── sites.json       # 网址数据 (231 条)
│   └── categories.json  # 分类结构
├── i18n/                 # 国际化翻译文件
├── layouts/              # Hugo 模板
│   ├── _default/        # 基础模板
│   ├── partials/        # 组件 (侧边栏/导航栏/卡片等)
│   ├── index.html       # 首页
│   └── 404.html         # 404 页面
├── static/               # 静态资源
│   ├── admin/           # Decap CMS
│   ├── css/             # 样式文件
│   ├── js/              # 脚本文件
│   └── images/          # 图片资源 (含 200+ 网站图标)
├── scripts/              # 数据迁移脚本
└── hugo.toml             # Hugo 配置
```

## 本地运行

### 前置要求

- [Hugo Extended](https://gohugo.io/installation/) (v0.128.0+)

### 启动开发服务器

```bash
hugo server -D
```

访问 `http://localhost:1313/`

### 构建生产版本

```bash
hugo --minify
```

输出目录: `public/`

## 后台管理 (Decap CMS)

1. 访问 `https://你的域名/admin/`
2. 使用 GitHub 账号登录
3. 在 CMS 中管理网址和分类

### 配置 CMS

1. 编辑 `static/admin/config.yml`，设置你的 GitHub 仓库
2. 在 GitHub 创建 OAuth App (Settings → Developer settings → OAuth Apps)
3. 将 Client ID 填入 `config.yml` 的 `app_id`

## 部署到 GitHub Pages

1. 创建 GitHub 仓库并推送代码
2. 进入仓库 Settings → Pages
3. Source 选择 "GitHub Actions"
4. 等待 Actions 自动构建部署

推送代码到 `main` 分支会自动触发部署。

## 添加网址

### 方式 1: 通过 CMS 后台

访问 `/admin/` → 网址管理 → 添加新网址

### 方式 2: 编辑数据文件

编辑 `data/sites.json`，添加新条目:

```json
{
  "id": "example",
  "title": "网站名称",
  "url": "https://example.com/",
  "description": "网站描述",
  "logo": "example.png",
  "category": "常用推荐",
  "group": "top"
}
```

将网站图标 (120x120px PNG) 放入 `static/images/logos/` 目录。

## License

MIT License - 基于 [WebStack](https://github.com/WebStackPage/WebStackPage.github.io) 开源项目
