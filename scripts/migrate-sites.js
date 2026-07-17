// 数据迁移脚本 - 从 cn/index.html 提取网址数据生成 data/sites.json
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'cn', 'index.html'), 'utf-8');

// 分类到分类组的映射
const categoryGroupMap = {
    '常用推荐': 'top',
    '推荐': 'top',
    '社区资讯': 'top',
    'UED团队': 'top',
    '发现产品': 'inspiration',
    '界面灵感': 'inspiration',
    '网页灵感': 'inspiration',
    '图标素材': 'resources',
    'LOGO设计': 'resources',
    '平面素材': 'resources',
    'UI资源': 'resources',
    'Sketch资源': 'resources',
    '字体资源': 'resources',
    'Mockup': 'resources',
    '摄影图库': 'resources',
    'PPT资源': 'resources',
    '图形创意': 'tools',
    '界面设计': 'tools',
    '交互动效': 'tools',
    '在线配色': 'tools',
    '在线工具': 'tools',
    'Chrome插件': 'tools',
    '设计规范': 'tutorial',
    '视频教程': 'tutorial',
    '设计文章': 'tutorial',
    '设计电台': 'tutorial',
    '交互设计': 'tutorial'
};

// 提取所有分类标题及其位置
const headerRegex = /<h4 class="text-gray"><i[^>]*id="([^"]*)"[^>]*><\/i>([^<]+)<\/h4>/g;
let match;
const categories = [];
while ((match = headerRegex.exec(html)) !== null) {
    categories.push({
        id: match[1],
        name: match[2].trim(),
        position: match.index
    });
}

// 为每个分类添加结束位置(下一个分类的起始位置)
for (let i = 0; i < categories.length; i++) {
    categories[i].endPosition = i + 1 < categories.length 
        ? categories[i + 1].position 
        : html.length;
}

// 提取网址卡片数据
const cardRegex = /onclick="window\.open\('([^']+)',\s*'_blank'\)"[^>]*data-original-title="([^"]*)"[^]*?data-src="[^"]*logos\/([^"]+)"[^]*?<strong>([^<]+)<\/strong>[^]*?<p class="overflowClip_2">([^<]*)<\/p>/g;

const sites = [];
const seenUrls = new Set();

for (const cat of categories) {
    const section = html.substring(cat.position, cat.endPosition);
    let cardMatch;
    while ((cardMatch = cardRegex.exec(section)) !== null) {
        const url = cardMatch[1];
        const title = cardMatch[4].trim();
        const description = cardMatch[5].trim();
        const logo = cardMatch[3].trim();
        
        // 去重: 基于 URL
        if (seenUrls.has(url)) {
            continue;
        }
        seenUrls.add(url);
        
        // 生成 id: 从 URL 提取域名
        let id = '';
        try {
            const urlObj = new URL(url);
            id = urlObj.hostname.replace('www.', '').split('.')[0];
        } catch {
            id = title.toLowerCase().replace(/[^a-z0-9]/g, '');
        }
        
        sites.push({
            id: id,
            title: title,
            url: url,
            description: description,
            logo: logo,
            category: cat.name,
            group: categoryGroupMap[cat.name] || 'top'
        });
    }
}

// 按 id 去重(处理 logo 不同但 URL 相同的情况)
const uniqueSites = [];
const seenIds = new Set();
for (const site of sites) {
    if (!seenIds.has(site.id)) {
        seenIds.add(site.id);
        uniqueSites.push(site);
    } else {
        // 如果 id 已存在，加上数字后缀
        let suffix = 2;
        let newId = `${site.id}${suffix}`;
        while (seenIds.has(newId)) {
            suffix++;
            newId = `${site.id}${suffix}`;
        }
        site.id = newId;
        seenIds.add(newId);
        uniqueSites.push(site);
    }
}

// 输出结果 - 包装为对象以适配 Decap CMS
const output = JSON.stringify({ sites: uniqueSites }, null, 2);
const outputPath = path.join(__dirname, '..', 'data', 'sites.json');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log(`Migration complete: ${uniqueSites.length} sites extracted to data/sites.json`);

// 输出分类统计
const stats = {};
for (const site of uniqueSites) {
    stats[site.category] = (stats[site.category] || 0) + 1;
}
console.log('\nCategory statistics:');
for (const [cat, count] of Object.entries(stats)) {
    console.log(`  ${cat}: ${count}`);
}
