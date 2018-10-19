keyp=false
servers=["https://webgameserver-isaachew.c9users.io"]
ev=undefined
ke=undefined
$(document).keydown(function(e){keyp=true;ev=e;ke=ev.key})
$(document).keyup(function(e){keyp=true;ev=e;ke="keyup"})
name=""
entities=[]
buildings=[]
players=[]
result={}
da={}
pres={}
fetch("data/builpres.json").then((a)=>{return a.json()},(c)=>{console.log(c)}).then((a)=>{pres=a})
camvb=[0,0,500,500]
cdir=[0,0]
score=0
function load(url,serv,func){
    fetch(serv+"/"+url+"?data="+JSON.stringify(da),{"method":"GET"})
    .then((r)=>r.json(),function(r){
        console.log(r)
        mode=0
        clear=true
    })
    .then(function(r){
        if(r!=undefined){
            emfunc=(a)=>null
            result=r
            entities=r.entities
            buildings=r.buildings
            players=r.players
            score=(players[playid]||0).score||0;
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
        if(attrs.hasOwnProperty(k)){
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
        if(attrs.hasOwnProperty(k)){
            d.setAttribute(k,attrs[k])
        }
    }
    d.innerHTML=content
    return d
}
function clears(){
    $("svg").children().not("style").remove()
    $("body").children().not("svg").remove()
}
namecr=0
count=0
mobile=/Mobi|Android/i.test(navigator.userAgent) ||!0
ff=true
clear=false
playid=undefined
function choose(ch){
    return ch[Math.floor(Math.random()*ch.length)]
}
function smode(mo){
    mode=mo
    clear=true
}
<<<<<<< HEAD
function clev(el){
    console.log("click")
    k=el.id.slice(1)
    en=(el.id[0]==="E")?entities[k]:buildings[k]
    if(en.type.slice(0,4)=="coll")da.collect=en.id
}
function crespr(ty){
    sprhold=$("g#sprites")
    if(!$("#"+ty,sprhold)[0]){
        spri=$(svgel("g",{"id":ty,"class":"sprite"}))
    	for(sh of rends[ty].split(" ")){
    		st=sh[0]
    		params=sh.slice(1).split(",")
    		if(st=="R"){
    			spri.append(svgel("rect",{
    				"x":params[0],
    				"y":params[1],
    				"width":params[2],
    				"height":params[3],
    				"transform":(params[4]?"rotate("+params.slice(4,7).join(",")+")":"")}
    				))
    		}else if(st=="E"){
    			spri.append(svgel("ellipse",{"cx":params[0],"cy":params[1],"rx":params[2]/2,"ry":params[3]/2}))
    		}else if(st=="P"){
    			spri.append(svgel("polygon",{"points":params.join(" ")}))
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
re=function(el){$(el).attr("class","remo");
setTimeout(el.remove.bind(el),500)}
requestAnimationFrame(frame)