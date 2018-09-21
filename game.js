keyp=false
servers=["https://webgameserver-isaachew.c9users.io"]
ev=undefined
ke=undefined
$(document).keydown(function(e){keyp=true;ev=e;ke=ev.key})
name=""
connects=[]
entities=[]
buildings=[]
async function enter(serv,data){
    a=await fetch(serv+"/new?data="+data,{"method":"GET"})
    return a.json()
}
async function getd(serv,dat){
    a=await fetch(serv+"?data="+dat,{"method":"GET"})
    return a.json()
}
async function leave(serv,id){
    n=await fetch(serv+"/leave?id="+id,{"method":"GET"})
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
ff=true
clear=false
function choose(ch){
    return ch[Math.floor(Math.random()*ch.length)]
}
requestAnimationFrame(frame)