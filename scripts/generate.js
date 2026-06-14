const fs=require('fs'),path=require('path'),today=new Date().toISOString().slice(0,10),slug=today;
const feed=JSON.parse(fs.readFileSync(path.join(__dirname,'..','feed.json'),'utf8'));
if(feed.posts.find(p=>p.slug===slug)){console.log('Exists');process.exit(0)}
const pool=[
[{title:'西红柿炒鸡蛋的正确做法，先炒蛋还是先炒西红柿？',desc:'很多人第一步就错了。先炒蛋盛出，再炒西红柿出汁，最后混合。加一点糖提鲜是关键。',tag:'家常菜'},
{title:'酸辣土豆丝的脆爽秘诀：泡水这一步不能省',desc:'切好的土豆丝泡水10分钟去除多余淀粉，炒出来才脆。醋要分两次加，出锅前加第二次。',tag:'素菜'},
{title:'红烧肉肥而不腻的秘诀，不用焯水也能做',desc:'五花肉切块直接下锅煎到四面金黄，加冰糖炒糖色，加黄酒和开水小火炖1.5小时。',tag:'荤菜'}],
[{title:'麻婆豆腐的正宗做法：麻辣鲜香嫩烫',desc:'用嫩豆腐口感最好。牛肉末要炒酥，郫县豆瓣酱炒出红油，花椒粉最后撒不要煮。',tag:'家常菜'},
{title:'青椒肉丝怎么炒才嫩？腌制和火候是关键',desc:'肉丝用淀粉+蛋清+料酒腌制15分钟。大火快炒30秒盛出，青椒单独炒再合并。',tag:'荤菜'},
{title:'凉拌黄瓜好吃有诀窍：拍比切好，先腌出水分',desc:'黄瓜用刀拍裂再切段，加盐腌10分钟挤掉水分，再加蒜末醋生抽辣椒油拌匀更入味。',tag:'凉菜'}],
[{title:'鱼香肉丝没有鱼？正宗鱼香味怎么调',desc:'鱼香味来自泡辣椒+姜蒜末+糖醋酱油的黄金比例。木耳笋丝胡萝卜丝缺一不可。',tag:'家常菜'},
{title:'糖醋排骨的家常做法：不用油炸也好吃',desc:'排骨焯水后加冰糖炒糖色，加醋和酱油小火炖40分钟，大火收汁到浓稠拉丝。',tag:'荤菜'},
{title:'蒜蓉西兰花的正确焯水方法：加盐加油更翠绿',desc:'水开后加盐和几滴油，西兰花焯1分钟捞出过凉水。蒜蓉用小火炒到微黄再拌。',tag:'素菜'}],
[{title:'可乐鸡翅最简单做法：3种调料就搞定',desc:'鸡翅两面煎金黄，倒可乐没过鸡翅，加姜片和酱油，中小火15分钟收汁。新手零失败。',tag:'新手菜'},
{title:'西红柿鸡蛋汤怎么做好喝？加这一个东西',desc:'先炒西红柿出红油再加水。关键是在蛋液里加一点点淀粉水，倒进去蛋花更嫩更薄。',tag:'汤羹'},
{title:'手撕包菜的秘诀：大火快炒，手撕比刀切好吃',desc:'包菜一定要用手撕，刀切会破坏纤维口感差。干辣椒和蒜片爆香，大火翻炒1分钟出锅。',tag:'素菜'}],
[{title:'肉末茄子不油的秘诀：先干煸再炒',desc:'茄子切条不放油先干煸到软，盛出。再正常炒肉末和调料，最后放茄子吸收味道。',tag:'家常菜'},
{title:'水煮肉片的家庭版做法：不输饭店',desc:'里脊肉切薄片上浆。郫县豆瓣酱炒出红油加水煮开，滑入肉片煮到变色立即捞出。淋热油。',tag:'荤菜'},
{title:'家常豆腐的百变做法：老豆腐嫩豆腐怎么选',desc:'红烧用老豆腐不易碎，麻婆用嫩豆腐口感好。无论哪种都先焯水去豆腥味。',tag:'素菜'}],
[{title:'葱油拌面：5分钟搞定的懒人美食',desc:'小葱切段小火炸到焦黄，葱油+酱油+糖拌面。一次多做点葱油放冰箱能吃一个星期。',tag:'快手菜'},
{title:'糖醋里脊外酥里嫩的秘诀：挂糊和复炸',desc:'里脊肉切条腌制后用淀粉+蛋清挂糊。关键是复炸：第一遍炸熟，第二遍高温炸酥。',tag:'荤菜'},
{title:'清炒时蔬的万能公式：什么菜都能套用',desc:'热锅凉油+蒜末爆香+蔬菜大火快炒+蚝油/盐调味。绿叶菜炒1分钟，根茎类炒3分钟。',tag:'素菜'}],
[{title:'黄焖鸡米饭在家做：比外卖好吃',desc:'鸡腿肉切块焯水，加香菇土豆青椒焖15分钟。黄豆酱是灵魂调料，汤汁拌饭绝了。',tag:'家常菜'},
{title:'皮蛋豆腐最简单的做法：不用开火',desc:'内酯豆腐扣盘，皮蛋切碎铺上，淋上生抽醋香油蒜末葱花。夏天吃太清爽了。',tag:'凉菜'},
{title:'回锅肉的灵魂：二刀肉和郫县豆瓣酱',desc:'五花肉整块煮到筷子能插入，切薄片回锅煸出油。加郫县豆瓣炒出红油，蒜苗是标配。',tag:'荤菜'}],
[{title:'干煸四季豆不过油的做法：小火慢煸',desc:'四季豆去筋掰段，不放油小火慢慢煸到表面起皱。加肉末芽菜干辣椒一起炒。',tag:'家常菜'},
{title:'紫菜蛋花汤：蛋花漂亮的技巧',desc:'水开后关小火，蛋液沿筷子慢慢倒入。不要搅动，等蛋花凝固再轻轻推一下。',tag:'汤羹'},
{title:'十分钟搞定的快手炒面：比外卖还快',desc:'面条煮到八分熟过冷水。鸡蛋先炒散，加火腿青菜和面条，酱油蚝油调味大火翻匀。',tag:'快手菜'}],
];
const idx=(new Date().getDate()-1)%pool.length,items=pool[idx];
const titles=[`今日菜谱 | ${items[0].tag}`,'家常菜谱分享','每日一道家常菜','新手学做菜'];
const postTitle=titles[new Date().getDate()%titles.length];
feed.posts.unshift({slug,date:today,title:postTitle,items});feed.updated=today;
fs.writeFileSync(path.join(__dirname,'..','feed.json'),JSON.stringify(feed,null,2));
const html=`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${postTitle} - 家常菜谱</title><meta name="description" content="${items.map(i=>i.title).join('、')}"><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:root{--bg:#fafafa;--card:#fff;--text:#1a1a2e;--t2:#666;--accent:#dc2626;--border:#e5e7eb;--r:10px}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans SC",sans-serif;background:var(--bg);color:var(--text);line-height:1.7}.container{max-width:800px;margin:0 auto;padding:0 20px}header{background:var(--card);border-bottom:1px solid var(--border);padding:20px 0;margin-bottom:32px}header a{color:var(--accent);text-decoration:none;font-size:.9rem}header h1{font-size:1.3rem;margin-top:8px}.post{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:28px}.post .date{color:var(--t2);font-size:.8rem;margin-bottom:20px}.entry{margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)}.entry:last-child{border-bottom:none}.entry h3{font-size:1rem;margin-bottom:4px}.entry p{color:var(--t2);font-size:.9rem}.tag{display:inline-block;background:#fef2f2;color:var(--accent);font-size:.72rem;padding:2px 8px;border-radius:10px;margin-left:6px}footer{text-align:center;padding:32px 20px;color:var(--t2);font-size:.8rem}@media(max-width:600px){.post{padding:18px}}</style></head><body><header><div class="container"><a href="../index.html">← 菜谱首页</a><h1>${postTitle}</h1></div></header><main class="container"><article class="post"><div class="date">📅 ${today}</div>${items.map(i=>`<div class="entry"><h3>${i.title} <span class="tag">${i.tag}</span></h3><p>${i.desc}</p></div>`).join('')}</article></main><footer><p>家常菜谱 · 每日更新</p></footer></body></html>`;
fs.writeFileSync(path.join(__dirname,'..','posts',`${slug}.html`),html);
console.log('Generated:',postTitle);
