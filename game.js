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
            da={}
            load("getdata",serv)
        }
    })
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
mobile=/Mobi|Android/i.test(navigator.userAgent)
mobile=true
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
re=function(el){$(el).attr("class","remo");
setTimeout(el.remove.bind(el),500)}
requestAnimationFrame(frame)