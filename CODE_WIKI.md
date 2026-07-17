# WebStack 网址导航 - Code Wiki

## 1. 项目概述

### 1.1 项目简介
WebStack 是一个面向设计师的开源网址导航网站，收集整理了国内外优秀的设计网站、UI设计资源、灵感创意网站等，为设计师提供一站式资源导航服务。

### 1.2 项目定位
- **目标用户**: UI设计师、产品经理、交互设计师
- **核心价值**: 提供优质设计资源的分类导航
- **技术定位**: 纯静态网站，无需后端支持

### 1.3 项目特色
- 多语言支持（中文/英文）
- 响应式设计，支持移动端
- 丰富的分类体系（10+大类，数十个子分类）
- 悬停动画效果，提升交互体验
- 图片懒加载优化性能

### 1.4 许可证
MIT License - 允许自由使用和二次开发

---

## 2. 项目架构

### 2.1 整体架构图
```
WebStack/
├── index.html          # 入口页（语言检测与重定向）
├── cn/                 # 中文版本
│   ├── index.html      # 中文主页面
│   └── about.html      # 中文关于页面
├── en/                 # 英文版本
│   ├── index.html      # 英文主页面
│   └── about.html      # 英文关于页面
├── assets/             # 静态资源
│   ├── css/            # 样式文件
│   ├── js/             # JavaScript文件
│   ├── images/         # 图片资源
│   └── fonts/          # 字体文件
├── 404.html            # 404错误页面
├── CNAME               # GitHub Pages域名配置
└── LICENSE             # 许可证文件
```

### 2.2 架构特点
- **无后端架构**: 纯静态HTML/CSS/JS，无需服务器端支持
- **多语言分离**: 中英文版本独立目录，便于维护
- **资源集中管理**: 所有静态资源统一存放在assets目录
- **入口统一**: 根目录index.html作为语言检测入口

---

## 3. 主要模块职责

### 3.1 入口模块 (index.html)

**职责**: 语言检测与自动重定向

**核心逻辑**:
- 检测浏览器语言设置（navigator.language / navigator.browserLanguage）
- 根据语言判断跳转到中文(cn/)或英文(en/)版本
- 配置SEO元信息和社交分享标签（Open Graph / Twitter Cards）

**关键代码**: [index.html](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/index.html#L26-L41)

```javascript
if (language.indexOf("en") > -1) {
    document.location.href = "en/index.html";
} else if (language.indexOf("zh") > -1) {
    document.location.href = "cn/index.html";
} else {
    document.location.href = "en/index.html";
}
```

### 3.2 导航主页面模块 (cn/index.html / en/index.html)

**职责**: 展示分类导航内容

**页面结构**:
| 区域 | 功能 |
|------|------|
| 侧边栏菜单 | 分类导航，支持展开/收起 |
| 顶部导航栏 | 语言切换、GitHub链接 |
| 内容区域 | 网址卡片展示 |

**分类体系**:
- 常用推荐
- 社区资讯
- 灵感采集（发现产品、界面灵感、网页灵感）
- 素材资源（图标、LOGO、平面、UI、Sketch、字体、Mockup、摄影、PPT）
- 常用工具（图形创意、界面设计、交互动效、在线配色、在线工具、Chrome插件）
- 学习教程（设计规范、视频教程、设计文章、设计电台、交互设计）
- UED团队

**网址卡片组件**:
```html
<div class="xe-widget xe-conversations box2 label-info" onclick="window.open('url', '_blank')">
    <div class="xe-comment-entry">
        <a class="xe-user-img">
            <img data-src="../assets/images/logos/xxx.png" class="lozad img-circle" width="40">
        </a>
        <div class="xe-comment">
            <a href="#" class="xe-user-name overflowClip_1"><strong>网站名称</strong></a>
            <p class="overflowClip_2">网站描述</p>
        </div>
    </div>
</div>
```

### 3.3 关于页面模块 (about.html)

**职责**: 展示网站介绍和站长信息

**内容结构**:
- 网站介绍（项目背景、使用说明）
- 站长信息（Viggo的个人简介）
- 联系方式（QQ群号）
- 版权信息

### 3.4 404页面模块 (404.html)

**职责**: 处理页面访问错误

**特色功能**:
- 动画效果（bounce-in动画）
- 响应式设计
- 返回主页链接

---

## 4. 关键类与函数说明

### 4.1 JavaScript核心函数

#### 4.1.1 Xenon主题初始化 (xenon-custom.js)

**文件位置**: [assets/js/xenon-custom.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js)

**初始化流程**:
```javascript
$(document).ready(function() {
    // 1. 初始化公共变量
    public_vars.$body = $("body");
    public_vars.$pageContainer = public_vars.$body.find(".page-container");
    // ...
    
    // 2. 设置侧边栏菜单
    setup_sidebar_menu();
    
    // 3. 设置水平菜单
    setup_horizontal_menu();
    
    // 4. 初始化各种组件
    // Perfect Scrollbar、表单验证、日期选择器等
});
```

**公共变量结构**:
| 变量名 | 用途 |
|--------|------|
| `$body` | 页面body元素 |
| `$pageContainer` | 页面容器 |
| `$sidebarMenu` | 侧边栏菜单 |
| `$mainContent` | 主内容区域 |
| `$mainFooter` | 页脚 |
| `$horizontalNavbar` | 水平导航栏 |
| `defaultColorsPalette` | 默认配色方案 |

#### 4.1.2 侧边栏菜单函数

**setup_sidebar_menu()** - 初始化侧边栏菜单

**功能**:
- 自动展开当前激活的菜单项
- 响应式处理（大屏幕/平板屏幕切换）
- 绑定菜单项点击事件

**代码位置**: [xenon-custom.js#L1124-L1176](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1124-L1176)

**sidebar_menu_item_expand($li, $sub)** - 展开菜单项

**功能**: 使用TweenMax动画库实现平滑展开效果

**代码位置**: [xenon-custom.js#L1178-L1242](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1178-L1242)

**sidebar_menu_item_collapse($li, $sub)** - 收起菜单项

**功能**: 使用TweenMax动画库实现平滑收起效果

**代码位置**: [xenon-custom.js#L1244-L1265](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1244-L1265)

#### 4.1.3 水平菜单函数

**setup_horizontal_menu()** - 初始化水平菜单

**功能**:
- 支持点击展开/悬停展开两种模式
- 移动端特殊处理
- 子菜单动画效果

**代码位置**: [xenon-custom.js#L1280-L1429](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1280-L1429)

#### 4.1.4 Perfect Scrollbar函数

**ps_init()** - 初始化完美滚动条

**功能**: 为侧边栏菜单添加自定义滚动条

**代码位置**: [xenon-custom.js#L1482-L1499](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1482-L1499)

**ps_update()** - 更新滚动条

**功能**: 菜单展开/收起时更新滚动条状态

**代码位置**: [xenon-custom.js#L1459-L1479](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1459-L1479)

**ps_destroy()** - 销毁滚动条

**功能**: 清理滚动条实例

**代码位置**: [xenon-custom.js#L1501-L1507](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1501-L1507)

#### 4.1.5 复选框/单选框替换函数

**cbr_replace()** - 自定义复选框和单选框样式

**功能**: 将原生表单元素替换为自定义样式元素

**代码位置**: [xenon-custom.js#L1512-L1582](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1512-L1582)

#### 4.1.6 日期格式化函数

**date(format, timestamp)** - PHP风格日期格式化

**功能**: 支持多种日期格式输出（如Y-m-d, H:i:s等）

**代码位置**: [xenon-custom.js#L1630-L1950](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1630-L1950)

#### 4.1.7 属性默认值函数

**attrDefault($el, data_var, default_val)** - 获取元素属性值或默认值

**功能**: 安全获取data属性，如果不存在则返回默认值

**代码位置**: [xenon-custom.js#L1609-L1617](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js#L1609-L1617)

### 4.2 Xenon API函数 (xenon-api.js)

**文件位置**: [assets/js/xenon-api.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-api.js)

**rtl()** - 检测RTL模式

**功能**: 判断页面是否为从右到左的语言模式

**show_loading_bar(options)** - 显示加载进度条

**功能**: 创建并显示顶部加载进度条，支持动画效果

**参数**:
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| pct | number | 0 | 进度百分比(0-100) |
| delay | number | 1.3 | 动画持续时间 |
| wait | number | 0 | 延迟开始时间 |
| before | function | 空 | 开始前回调 |
| finish | function | 空 | 完成后回调 |
| resetOnEnd | boolean | true | 完成后是否重置 |

**hide_loading_bar()** - 隐藏加载进度条

**功能**: 隐藏并重置进度条

### 4.3 样式文件说明

#### 4.3.1 核心样式文件

| 文件 | 用途 |
|------|------|
| [bootstrap.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/bootstrap.css) | Bootstrap框架核心样式 |
| [xenon-core.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/xenon-core.css) | Xenon主题基础样式 |
| [xenon-components.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/xenon-components.css) | Xenon组件样式 |
| [xenon-skins.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/xenon-skins.css) | Xenon皮肤样式 |
| [nav.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/nav.css) | 导航网站自定义样式 |

#### 4.3.2 nav.css关键样式

**box2类** - 网址卡片样式

```css
.box2 {
    height: 86px;
    cursor: pointer;
    border-radius: 4px;
    padding: 0px 30px;
    background-color: #fff;
    border: 1px solid #e4ecf3;
    transition: all 0.3s ease;
}

.box2:hover {
    transform: translateY(-6px);
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
}
```

**overflowClip_1/2类** - 文字溢出处理

```css
.overflowClip_1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;  /* 单行 */
    -webkit-box-orient: vertical;
}

.overflowClip_2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;  /* 两行 */
    -webkit-box-orient: vertical;
}
```

---

## 5. 依赖关系

### 5.1 前端依赖库

| 依赖 | 版本 | 用途 | 文件位置 |
|------|------|------|----------|
| jQuery | 1.11.1 | JavaScript核心库 | [jquery-1.11.1.min.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/jquery-1.11.1.min.js) |
| Bootstrap | 3.x | CSS框架 | [bootstrap.min.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/bootstrap.min.js), [bootstrap.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/bootstrap.css) |
| TweenMax | - | 动画库 | [TweenMax.min.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/TweenMax.min.js) |
| lozad.js | - | 图片懒加载 | [lozad.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/lozad.js) |
| Font Awesome | - | 图标字体 | [font-awesome.min.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/fonts/fontawesome/css/font-awesome.min.css) |
| Linecons | - | 线性图标 | [linecons.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/fonts/linecons/css/linecons.css) |

### 5.2 外部服务依赖

| 服务 | 用途 | 配置位置 |
|------|------|----------|
| Google Analytics | 网站流量统计 | index.html, cn/index.html, en/index.html |
| 百度统计 | 网站流量统计 | index.html, cn/index.html, en/index.html |
| Google Adsense | 广告服务 | index.html, cn/index.html, en/index.html |
| Open Graph | 社交分享 | 各页面meta标签 |
| Twitter Cards | Twitter分享 | 各页面meta标签 |

### 5.3 依赖关系图

```
index.html
    │
    ├──→ cn/index.html / en/index.html
    │           │
    │           ├── bootstrap.css
    │           ├── xenon-core.css
    │           ├── xenon-components.css
    │           ├── xenon-skins.css
    │           ├── nav.css
    │           ├── font-awesome.css
    │           ├── linecons.css
    │           │
    │           ├── jquery-1.11.1.min.js
    │           ├── bootstrap.min.js
    │           ├── TweenMax.min.js
    │           ├── lozad.js
    │           ├── xenon-api.js
    │           ├── xenon-toggles.js
    │           ├── xenon-custom.js
    │           ├── resizeable.js
    │           └── joinable.js
    │
    ├──→ 404.html (独立页面)
    │
    └──→ CNAME (GitHub Pages配置)
```

---

## 6. 项目运行方式

### 6.1 本地运行

#### 方法1: 直接打开
```bash
# 在浏览器中直接打开 index.html
# 或
直接双击 index.html 文件
```

#### 方法2: 使用本地服务器
```bash
# 使用Python简单HTTP服务器
python -m http.server 8000

# 使用Node.js http-server
npx http-server -p 8000

# 使用PHP内置服务器
php -S localhost:8000
```

访问地址: `http://localhost:8000`

### 6.2 部署方式

#### 方式1: GitHub Pages
1. Fork项目到自己的GitHub账户
2. 进入项目Settings -> Pages
3. 选择主分支作为源
4. 设置自定义域名（可选，需要CNAME文件）

#### 方式2: 静态托管
1. 将所有文件上传到静态托管服务
2. 配置域名解析
3. 确保CNAME文件正确配置

#### 方式3: 结合后端框架
项目提供多种后端版本支持：
- Wordpress主题: https://github.com/owen0o0/WebStack
- Laravel版本: https://github.com/hui-ho/WebStack-Laravel
- Hugo主题: https://github.com/shenweiyan/WebStack-Hugo
- Vue版本: https://github.com/Anjaxs/WebStack-vue
- Golang版本: https://github.com/ch3nnn/webstack-go

### 6.3 开发建议

#### 添加新网站
1. 在对应语言的index.html中找到目标分类
2. 添加新的网址卡片代码：
```html
<div class="col-sm-3">
    <div class="xe-widget xe-conversations box2 label-info" onclick="window.open('https://example.com/', '_blank')">
        <div class="xe-comment-entry">
            <a class="xe-user-img">
                <img data-src="../assets/images/logos/example.png" class="lozad img-circle" width="40">
            </a>
            <div class="xe-comment">
                <a href="#" class="xe-user-name overflowClip_1"><strong>网站名称</strong></a>
                <p class="overflowClip_2">网站描述</p>
            </div>
        </div>
    </div>
</div>
```
3. 将网站图标(120x120px)放入assets/images/logos/目录

#### 添加新分类
1. 在侧边栏菜单中添加新的菜单项
2. 在内容区域添加对应分类标题和内容
3. 确保中英文版本同步更新

---

## 7. 文件结构详解

### 7.1 根目录文件

| 文件 | 说明 |
|------|------|
| [index.html](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/index.html) | 入口页面，语言检测与重定向 |
| [CNAME](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/CNAME) | GitHub Pages自定义域名配置 |
| [LICENSE](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/LICENSE) | MIT许可证文件 |
| [README.md](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/README.md) | 项目说明文档 |

### 7.2 cn/目录

| 文件 | 说明 |
|------|------|
| [index.html](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/cn/index.html) | 中文主页面，包含所有分类和网址 |
| [about.html](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/cn/about.html) | 中文关于页面 |

### 7.3 en/目录

| 文件 | 说明 |
|------|------|
| [index.html](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/en/index.html) | 英文主页面，包含所有分类和网址 |
| [about.html](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/en/about.html) | 英文关于页面 |

### 7.4 assets/css/目录

| 文件 | 说明 |
|------|------|
| [bootstrap.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/bootstrap.css) | Bootstrap框架样式 |
| [xenon.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/xenon.css) | Xenon主题总样式 |
| [xenon-core.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/xenon-core.css) | Xenon核心样式 |
| [xenon-components.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/xenon-components.css) | Xenon组件样式 |
| [xenon-forms.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/xenon-forms.css) | Xenon表单样式 |
| [xenon-skins.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/xenon-skins.css) | Xenon皮肤样式 |
| [nav.css](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/nav.css) | 导航网站自定义样式 |

### 7.5 assets/js/目录

| 文件 | 说明 |
|------|------|
| [jquery-1.11.1.min.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/jquery-1.11.1.min.js) | jQuery核心库 |
| [bootstrap.min.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/bootstrap.min.js) | Bootstrap组件脚本 |
| [TweenMax.min.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/TweenMax.min.js) | GSAP动画库 |
| [lozad.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/lozad.js) | 图片懒加载库 |
| [xenon-api.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-api.js) | Xenon API函数 |
| [xenon-custom.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-custom.js) | Xenon主题初始化和自定义功能 |
| [xenon-toggles.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/xenon-toggles.js) | Xenon开关组件脚本 |
| [resizeable.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/resizeable.js) | 可调整大小组件脚本 |
| [joinable.js](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/js/joinable.js) | 可连接组件脚本 |

### 7.6 assets/images/目录

| 子目录 | 说明 |
|--------|------|
| [flags/](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/images/flags) | 国家/地区旗帜图标 |
| [logos/](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/images/logos) | 网站图标(120x120px) |

### 7.7 assets/css/fonts/目录

| 子目录 | 说明 |
|--------|------|
| [fontawesome/](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/fonts/fontawesome) | Font Awesome图标字体 |
| [linecons/](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/fonts/linecons) | Linecons线性图标 |
| [elusive/](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/fonts/elusive) | Elusive图标字体 |
| [glyphicons/](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/fonts/glyphicons) | Glyphicons图标字体 |
| [meteocons/](file:///C:/Users/imyan/Desktop/ai_shit/trae/projects/nav/assets/css/fonts/meteocons) | Meteocons天气图标 |

---

## 8. 技术特点总结

### 8.1 技术栈
- **HTML5**: 语义化标签
- **CSS3**: Flexbox布局、动画效果、响应式设计
- **JavaScript**: jQuery、TweenMax动画、懒加载
- **Bootstrap 3**: CSS框架
- **Xenon Theme**: 后台管理主题

### 8.2 性能优化
- 图片懒加载（lozad.js）
- 图标字体减少HTTP请求
- 静态资源CDN（Google Fonts）

### 8.3 用户体验
- 平滑滚动导航
- 卡片悬停动画效果
- 响应式设计适配多设备
- 多语言支持

### 8.4 扩展性
- 模块化代码结构
- 支持多种后端框架集成
- 活跃的社区支持和多种衍生版本

---

## 9. 注意事项

1. **图标尺寸**: 网站图标需为120x120px，放入assets/images/logos/目录
2. **懒加载**: 使用`data-src`属性替代`src`，添加`lozad`类
3. **中英文同步**: 修改内容时需同步更新cn/和en/两个目录
4. **SEO优化**: 确保每个页面都有完整的meta标签和OG标签
5. **广告配置**: Google Adsense和统计代码需要替换为自己的ID

---

*文档生成时间: 2026-07-17*
*项目版本: WebStack v1.x*