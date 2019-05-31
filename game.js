keyp=false
servers=["http://127.0.0.1:8080"]
ev=undefined
ke=undefined
$(document).keydown(function(e){keyp=!0;ev=e;ke=ev.key})
$(document).keyup(function(e){keyp=!0;ev=e;ke="keyup"})
name=""
entities=[]
buildings=[]
players=[]
result={}
da={}
pres=[]
npres=[]
camvb=[0,0,500,500]
cdir=[0,0]
score=0
fetch("/data/renders.txt").then((v)=>(v.text())).then(
(v)=>{
nn=v.split("\n").map((y)=>y.split(";"))
rends={}
for(i of nn){
rends[i[0]]=i[1]
}
})
function load(url,serv,func){
	fetch(serv+"/"+url+"?data="+encodeURIComponent(JSON.stringify(da)),{"method":"GET","mode":"cors"})
	.then((r)=>r.json(),function(r){
		console.log(r,"fetch error")
		smode(0)
	})
	.then(function(r){
		if(r!=undefined&&mode!==2){
			emfunc=()=>null
			result=r
			entities=r.entities
			buildings=r.buildings
			players=r.players
			pres=r.presets
			trps=r.trps
			score=(players[playid]||{"score":0}).score||0;
			(func||emfunc)(result)
			load("getdata",serv)
		}
	})
	da={}
	if(window.playid!==undefined){
		da.id=playid
	}
}
function svgel(n,attrs,content){
	if (typeof content === 'undefined') content = "";
	d=document.createElementNS("http://www.w3.org/2000/svg",n)
	for(k in attrs){
		if(attrs.hasOwnProperty(k)&&attrs[k]!=undefined){
			d.setAttribute(k,attrs[k])
		}
	}
	d.innerHTML=content
	return d
}
function el(n,attrs,content){
	if (typeof content === 'undefined') content = ""
	d=document.createElement(n)
	for(k in attrs){
		if(attrs.hasOwnProperty(k)&&attrs[k]!=undefined){
			d.setAttribute(k,attrs[k])
		}
	}
	d.innerHTML=content
	return d
}
function clears(){
	$("svg").children().not("style").remove()
	$("body").children().not("svg").remove()
	$("svg").append(svgel("rect",{"id":"erct","width":500,"height":500,"fill":"#ffffff"}))
}
namecr=0
count=0
mode=0
mobile=/Mobi|Android/i.test(navigator.userAgent)//||!0
ff=!0
clear=false
playid=undefined
newmode=false
function choose(ch){
	return ch[Math.floor(Math.random()*ch.length)]
}
function smode(mo){
	mode=mo
	clear=!0
	newmode=!0
}
function crespr(ty){
	sprhold=$("g#sprites")
	if(!$("#"+ty,sprhold)[0]){
		spri=$(svgel("g",{"id":ty,"class":"sprite"}))
		for(sh of rends[ty].split(" ")){
			st=sh[0]
			params=sh.slice(1).split(",")
			switch(st){
				case "R":
					spri.append(svgel("rect",{
						"x":params[0],
						"y":params[1],
						"width":params[2],
						"height":params[3],
						"transform":(params[4]?"rotate("+params.slice(4,7).join(",")+")":"")}
						))
					break
				case "E":
					spri.append(svgel("ellipse",{"cx":params[0],"cy":params[1],"rx":params[2]/2,"ry":params[3]/2}))
					break
				case "P":
					spri.append(svgel("polygon",{"points":params.join(" ")}))
					break
			}
			if(ty.slice(0,4)==="coll"){
				cols=["#777777","#ff0000"]
				$(spri).children().last().attr("fill",cols[ty.slice(4)]).attr("stroke","none")
			}
		}
		sprhold.append(spri)
	}
}
function gbb(el){
	elu=$(el)[0].getBoundingClientRect()
	return {"x":elu.left+scrollX,"y":elu.top+scrollY,"width":elu.width,"height":elu.height}
}
function scrbar(a){
	n=$("#builds")
	if((n.attr("scrl")-(-a/reqs))>=0&&(n.attr("scrl")-(-a/reqs))<=(n.children().length-4)){
		n.attr("scrl",n.attr("scrl")-(-a/reqs))
	}
}
re=function(el){$(el).attr("class","remo");
setTimeout(el.remove.bind(el),500)}
requestAnimationFrame(frame)
