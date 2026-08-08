const places={"日照": {"tag": "🏖️ 海滩 · 赶海 · 骑行", "budget": "¥1300–1900/人", "transport": "中等", "crowd": "★★★☆☆", "sea": "★★★★☆", "cost": "★★★☆☆", "days": "4天3夜", "pros": ["性价比高", "海岸线长，适合骑行", "赶海、看日出方便", "吃住容易控制预算"], "cons": ["城市娱乐项目相对少", "海景不是这几个里最惊艳"], "one": "🏆 最符合“便宜+有海+别太挤”"}, "威海": {"tag": "🌊 海岸线 · 环海骑行 · 海景", "budget": "¥1800–2600/人", "transport": "较远", "crowd": "★★★☆☆", "sea": "★★★★★", "cost": "★★★☆☆", "days": "4–5天", "pros": ["海景漂亮", "环海路线适合骑电动车", "城市干净舒服", "适合拍照、看日落"], "cons": ["长沙过去交通成本较高", "热门海边仍可能有人多", "整体预算比日照高"], "one": "🏆 愿意多花一点，海景优先选它"}, "连云港": {"tag": "🏝️ 连岛 · 海滩 · 低消费", "budget": "¥1500–2100/人", "transport": "较方便", "crowd": "★★☆☆☆", "sea": "★★★★☆", "cost": "★★★★☆", "days": "3–4天", "pros": ["消费低", "相对小众", "有海滩和海岛", "适合预算有限的学生党"], "cons": ["城市旅游内容较有限", "玩4天以上可能觉得项目少"], "one": "💰 想省钱又不想太热门，可以选它"}, "烟台": {"tag": "🏝️ 养马岛 · 海岸线 · 海鲜", "budget": "¥1900–2700/人", "transport": "较远", "crowd": "★★★☆☆", "sea": "★★★★★", "cost": "★★★☆☆", "days": "4–5天", "pros": ["海景不错", "养马岛适合拍照", "城市和海边结合好", "比青岛安静一些"], "cons": ["长沙过去交通成本偏高", "花费比日照高"], "one": "⚖️ 海景、城市、美食比较均衡"}, "青岛": {"tag": "🍺 海滨城市 · 老城区 · 美食", "budget": "¥1800–2800/人", "transport": "较方便", "crowd": "★★★★★", "sea": "★★★★☆", "cost": "★★☆☆☆", "days": "4天3夜", "pros": ["城市氛围好", "美食多", "海边+老城区一起玩", "夜生活丰富", "旅游项目多"], "cons": ["人多", "热门区域住宿贵", "不太符合“尽量不挤”"], "one": "🍺 最好玩之一，但也是最容易挤的之一"}, "北海": {"tag": "🌴 银滩 · 涠洲岛 · 热带海滨", "budget": "¥1800–2800/人", "transport": "较方便", "crowd": "★★★★☆", "sea": "★★★★☆", "cost": "★★★☆☆", "days": "4–5天", "pros": ["热带海滨感觉明显", "银滩有特色", "可去涠洲岛", "海鲜选择多"], "cons": ["8月炎热", "涠洲岛会明显增加预算", "暑期人流不算少"], "one": "🌴 想要热带海边感觉可以考虑"}, "珠海": {"tag": "🌴 海岛 · 情侣路 · 港珠澳大桥", "budget": "¥1800–2800/人", "transport": "方便", "crowd": "★★★☆☆", "sea": "★★★★☆", "cost": "★★☆☆☆", "days": "4天3夜", "pros": ["城市环境舒服", "海边+城市结合不错", "可以看港珠澳大桥", "节奏比深圳慢"], "cons": ["消费不算低", "海滩本身性价比一般", "纯看海不如山东沿海突出"], "one": "🌴 适合海边+城市休闲"}, "深圳": {"tag": "🌃 城市 · 海滩 · 娱乐", "budget": "¥2200–3200/人", "transport": "方便", "crowd": "★★★★☆", "sea": "★★★★☆", "cost": "★☆☆☆☆", "days": "4–5天", "pros": ["娱乐项目多", "城市体验丰富", "海滩选择多", "交通方便"], "cons": ["消费最高", "住宿价格容易上涨", "更偏城市+海"], "one": "🌃 钱不是问题、想玩城市娱乐再选"}};

const esc=s=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pbox=document.querySelector("#places");
for(const [name,d] of Object.entries(places)){
 const c=document.createElement("article"); c.className="place";
 c.innerHTML=`<label><input type="radio" name="destination" value="${name}"><b>${name}</b><span class="tag">${d.tag}</span></label>
 <div class="stats"><span>💰 ${d.budget}</span><span>🚄 长沙：${d.transport}</span><span>👥 人流：${d.crowd}</span><span>🌊 海景：${d.sea}</span><span>💸 消费：${d.cost}</span><span>⏰ ${d.days}</span></div>
 <div class="cols"><div><strong>👍 优点</strong><ul>${d.pros.map(x=>`<li>${x}</li>`).join("")}</ul></div><div><strong>👎 缺点</strong><ul>${d.cons.map(x=>`<li>${x}</li>`).join("")}</ul></div></div>
 <div class="one">${d.one}</div>`;
 pbox.appendChild(c);
}
const qs=[
 ["days","② 玩几天？⏰",["3天2夜","4天3夜","5天4夜","6天5夜"]],
 ["budget","③ 人均预算上限？💰",["¥1500以内","¥1500–2000","¥2000–2500","¥2500–3000","¥3000+"]],
 ["style","④ 最想玩什么？🏖️",["海边躺平","沿海骑行","赶海","游泳/玩水","日出日落","海鲜美食"]],
 ["concern","⑤ 最不能接受什么？👥",["人太多","花钱太多","行程太赶","坐车太久","海不好看"]],
 ["dream","❤️ 如果完全不考虑价格，最想去哪？",Object.keys(places)]
];
const qbox=document.querySelector("#questions");
qs.forEach(([key,title,opts])=>{let c=document.createElement("section");c.className="card";c.innerHTML=`<h2>${title}</h2>`;opts.forEach(x=>c.innerHTML+=`<label class="opt"><input type="radio" name="${key}" value="${x}">${x}</label>`);qbox.appendChild(c)});
function render(v){
 let box=document.querySelector("#results");box.innerHTML="";
 for(const [key,vals] of Object.entries(v)){let card=document.createElement("div");card.className="card";let total=Object.values(vals).reduce((a,b)=>a+b,0);card.innerHTML=`<h3>${key==="destination"?"🌊 目的地":key==="dream"?"❤️ 梦想目的地":key}</h3>`;
 Object.entries(vals).sort((a,b)=>b[1]-a[1]).forEach(([n,k])=>{let pct=total?Math.round(k/total*100):0;card.innerHTML+=`<div class="r"><div><span>${n}</span><b>${k}票 · ${pct}%</b></div><i><em style="width:${pct}%"></em></i></div>`});box.appendChild(card)}
}
function showSuggestions(a){document.querySelector("#suggestions").innerHTML=a.length?`<p class="muted">已收到：${a.map(x=>`<b>${esc(x.place)}</b>${x.why?`（${esc(x.why)}）`:""}`).join("、")}</p>`:""}
document.querySelector("#suggest").onclick=async()=>{let place=other.value.trim();if(!place)return;let r=await fetch("/api/suggest",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({place,why:why.value})});if(r.ok){other.value="";why.value="";document.querySelector("#status").textContent="✅ 已加入候选建议！"}};
document.querySelector("#submit").onclick=async()=>{
 let payload={}; for(const [k] of [["destination"],...qs.map(x=>[x[0]])]){let e=document.querySelector(`input[name="${k}"]:checked`);if(!e){status.textContent="还有选项没投哦～";return}payload[k]=e.value}
 let b=submit;b.disabled=true;b.textContent="提交中…";let r=await fetch("/api/vote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});let d=await r.json();if(d.ok){status.textContent="✅ 投票成功！票数会实时同步。";render(d.results)}else status.textContent="提交失败";b.disabled=false;b.textContent="提交我的正式投票";
};
const socket=io();socket.on("results",render);socket.on("suggestions",showSuggestions);fetch("/api/suggestions").then(r=>r.json()).then(showSuggestions);
