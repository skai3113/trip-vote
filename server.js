const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const fs=require("fs"), path=require("path");
const app=express(), server=http.createServer(app), io=new Server(server);
const PORT=process.env.PORT||3000, ADMIN_KEY=process.env.ADMIN_KEY||"change-me";
const file=path.join(__dirname,"votes.json");
const blank={
 destination:{日照:0,威海:0,连云港:0,烟台:0,青岛:0,北海:0,珠海:0,深圳:0},
 days:{"3天2夜":0,"4天3夜":0,"5天4夜":0,"6天5夜":0},
 budget:{"¥1500以内":0,"¥1500–2000":0,"¥2000–2500":0,"¥2500–3000":0,"¥3000+":0},
 style:{"海边躺平":0,"沿海骑行":0,"赶海":0,"游泳/玩水":0,"日出日落":0,"海鲜美食":0},
 concern:{"人太多":0,"花钱太多":0,"行程太赶":0,"坐车太久":0,"海不好看":0},
 dream:{日照:0,威海:0,连云港:0,烟台:0,青岛:0,北海:0,珠海:0,深圳:0}
};
function clone(x){return JSON.parse(JSON.stringify(x))}
function load(){try{return JSON.parse(fs.readFileSync(file,"utf8"))}catch{fs.writeFileSync(file,JSON.stringify(blank,null,2));return clone(blank)}}
let votes=load();
app.use(express.json()); app.use(express.static(path.join(__dirname,"public")));
app.get("/api/results",(q,r)=>r.json(votes));
app.post("/api/vote",(q,r)=>{
 const b=q.body||{}, keys=["destination","days","budget","style","concern","dream"];
 for(const k of keys){if(!b[k]||!Object.hasOwn(votes[k],b[k]))return r.status(400).json({error:"invalid"})}
 for(const k of keys)votes[k][b[k]]++;
 fs.writeFileSync(file,JSON.stringify(votes,null,2)); io.emit("results",votes); r.json({ok:true,results:votes});
});
app.post("/api/suggest",(q,r)=>{
 const place=String(q.body?.place||"").trim().slice(0,30), why=String(q.body?.why||"").trim().slice(0,100);
 if(!place)return r.status(400).json({error:"empty"});
 const f=path.join(__dirname,"suggestions.json"); let a=[]; try{a=JSON.parse(fs.readFileSync(f,"utf8"))}catch{}
 a.push({place,why,time:new Date().toISOString()}); fs.writeFileSync(f,JSON.stringify(a,null,2));
 io.emit("suggestions",a); r.json({ok:true,suggestions:a});
});
app.get("/api/suggestions",(q,r)=>{try{r.json(JSON.parse(fs.readFileSync(path.join(__dirname,"suggestions.json"),"utf8")))}catch{r.json([])}});
app.post("/api/reset",(q,r)=>{if(q.headers["x-admin-key"]!==ADMIN_KEY)return r.status(403).json({error:"forbidden"});votes=clone(blank);fs.writeFileSync(file,JSON.stringify(votes,null,2));io.emit("results",votes);r.json({ok:true})});
io.on("connection",s=>{s.emit("results",votes);let a=[];try{a=JSON.parse(fs.readFileSync(path.join(__dirname,"suggestions.json"),"utf8"))}catch{}s.emit("suggestions",a)});
app.get("*",(q,r)=>r.sendFile(path.join(__dirname,"public","index.html")));
server.listen(PORT,()=>console.log("running on "+PORT));
