keyp=false
servers=["https://webgameserver-isaachew.c9users.io"]
ev=undefined
ke=undefined
$(document).keydown(function(e){keyp=true;ev=e;ke=ev.key})
name=""
entities=[]
buildings=[]
players=[]
result={}
da={}
camvb=[0,0,500,500]
gdir=[0,0]
function load(url,serv){
    a=fetch(serv+"/"+url+"?data="+JSON.stringify(da),{"method":"GET"})
    .then(function(r){return r.json()})
    .then(function(r){
        result=r
        entities=r.entities
        buildings=r.buildings
        players=r.players
        load("getdata",serv)
    })
    da={}
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
//mobile=/Mobi|Android/i.test(navigator.userAgent)
mobile=true
ff=true
clear=false
function choose(ch){
    return ch[Math.floor(Math.random()*ch.length)]
}
re=function(el){$(el).attr("class","remo");
setTimeout(el.remove.bind(el),500)}
requestAnimationFrame(frame)