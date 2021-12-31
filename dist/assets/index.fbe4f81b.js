var c=Object.defineProperty;var d=(r,t,e)=>t in r?c(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var o=(r,t,e)=>(d(r,typeof t!="symbol"?t+"":t,e),e);import{j as f,r as a,R as u,a as x}from"./vendor.76088a56.js";const g=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=e(i);fetch(i.href,l)}};g();class p{constructor(t,e,s){o(this,"index");o(this,"x");o(this,"y");o(this,"walls");o(this,"visited");this.x=t,this.y=e,this.index=s,this.visited=!1,this.walls={top:!0,right:!0,bottom:!0,left:!0}}}class m{constructor(){o(this,"cells");o(this,"progressStack",[]);o(this,"iterations",0);this.cells=[]}initCells(t,e){let s=0;this.cells=[];for(let i=0;i<e;i++)for(let l=0;l<t;l++)this.cells.push(new p(l,i,s)),s++}getCells(){return this.cells}createMaze(){const t=this.cells[0],e=this.getRandomNeighbour(t);e&&(this.removeWall(t,e),this.progressStack.push(e.index))}nextStep(){const t=this.cells[this.progressStack[this.progressStack.length-1]],e=this.getRandomNeighbour(t);return this.iterations++,this.cells.filter(s=>!s.visited).length===0?!1:e?(this.removeWall(t,e),this.progressStack.push(e.index),!0):(this.progressStack.pop(),this.nextStep())}getRandomNeighbour(t){if(!t)return;const e=[this.findCellByPosition(t.x,t.y-1),this.findCellByPosition(t.x+1,t.y),this.findCellByPosition(t.x,t.y+1),this.findCellByPosition(t.x-1,t.y)].filter(i=>!!i).filter(i=>this.progressStack.indexOf(i.index)===-1).filter(i=>!(i==null?void 0:i.visited));return e[Math.floor(Math.random()*e.length)]}removeWall(t,e){const s=e.y<t.y,i=e.y>t.y,l=e.x<t.x,n=e.x>t.x;s?(t.walls.top=!1,e.walls.bottom=!1):i?(t.walls.bottom=!1,e.walls.top=!1):l?(t.walls.left=!1,e.walls.right=!1):n&&(t.walls.right=!1,e.walls.left=!1),t.visited=!0,e.visited=!0,this.setCell(t),this.setCell(e)}findCellByPosition(t,e){return this.cells.find(s=>s.x===t&&s.y===e)}findCellIndexByPosition(t,e){return this.cells.findIndex(s=>s.x===t&&s.y===e)}setCell(t){const e=this.findCellIndexByPosition(t.x,t.y);e&&(this.cells[e]=t)}}const h=f.exports.jsx;class y{constructor(t){o(this,"canvas");o(this,"ctx");o(this,"playInterval");o(this,"machine");o(this,"fillScreen",!0);o(this,"playSpeed",20);o(this,"cellSize",20);o(this,"canvasWidth",this.fillScreen?Math.floor(window.innerWidth-window.innerWidth%this.cellSize):800);o(this,"canvasHeight",this.fillScreen?Math.floor(window.innerHeight-window.innerHeight%this.cellSize):800);o(this,"lineWidth",2);o(this,"strokeColor","#222");o(this,"cellColor","#000");o(this,"visitedCellColor","#FFF");this.canvas=t;const e=t.getContext("2d");if(e)this.ctx=e;else throw new Error("Could not get canvas context");this.canvas.width=this.canvasWidth,this.canvas.height=this.canvasHeight,this.machine=new m,this.machine.initCells(Math.floor(this.canvasWidth/this.cellSize),Math.floor(this.canvasHeight/this.cellSize)),this.redrawGrid(),this.play()}play(){this.machine.createMaze(),console.log(this.machine.getCells()),this.redrawGrid(),this.playInterval=setInterval(()=>{this.machine.nextStep()?this.redrawGrid():this.playInterval&&(clearInterval(this.playInterval),console.log("DONE"))},this.playSpeed)}redrawGrid(){this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.machine.getCells().forEach(t=>{const e=t.x*this.cellSize,s=t.y*this.cellSize,i=this.cellSize;this.ctx.fillStyle=t.visited?this.visitedCellColor:this.cellColor,this.ctx.strokeStyle=this.strokeColor,this.ctx.lineWidth=this.lineWidth,this.ctx.fillRect(e,s,i,i),t.walls.top&&(this.ctx.beginPath(),this.ctx.moveTo(e,s),this.ctx.lineTo(e+this.cellSize,s),this.ctx.stroke()),t.walls.right&&(this.ctx.beginPath(),this.ctx.moveTo(e+this.cellSize,s),this.ctx.lineTo(e+this.cellSize,s+this.cellSize),this.ctx.stroke()),t.walls.bottom&&(this.ctx.beginPath(),this.ctx.moveTo(e,s+this.cellSize),this.ctx.lineTo(e+this.cellSize,s+this.cellSize),this.ctx.stroke()),t.walls.left&&(this.ctx.beginPath(),this.ctx.moveTo(e,s),this.ctx.lineTo(e,s+this.cellSize),this.ctx.stroke())})}}const v=()=>{const r=a.exports.useRef(null);return a.exports.useEffect(()=>{r.current&&new y(r.current)},[]),h("canvas",{id:"maze",ref:r})};function S(){return h("div",{className:"App",children:h(v,{})})}u.render(h(x.StrictMode,{children:h(S,{})}),document.getElementById("root"));
