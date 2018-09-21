function frame(ts){
    mode=window.mode||0
    if(clear){
        clears()
        clear=false
        ff=true
    }
    switch(mode){
        case 0:
            if($("svg")[0].children.length<1){
                $("svg").append(svgel("style",{},""+
                "text{font-family:Ubuntu}.title{font-size:40px}"+
                ""
                ))
                $("svg").append(svgel("rect",{"x":"40vw","y":"47.5vh","width":"20vw","height":"5vh","rx":"0.2vw","ry":"0.1vh","fill":"#4444CC"}))
                $("svg").append(svgel("clipPath",{"id":"clipname"},"<rect x=\"40vw\" y=\"47.5vh\" width=\"20vw\" height=\"5vh\" rx=\"0.2vw\" ry=\"0.1vh\"></rect>"))
                if(mobile){
                    $("body").append(el("input",{"style":"position:absolute;top:50%;left:45%;z-index:15;width:10%","oninput":"name=this.value"}))
                }else{
                    $("svg").append(svgel("text",{"x":"50vw","y":"50vh","id":"name","text-anchor":"middle","font-size":"15px","clip-path":"url(\"#clipname\")"},"hi"))
                }
            }
            $("#name").text(name.slice(0,namecr)+(count<30?"|":" ")+name.slice(namecr,name.length))
            if(mobile){
                name=$("input")[0].value
            }
            if(keyp){
                if(ke==="Enter"){
                    mode=1
                    serv=choose(servers)
                    clear=true
                    entid=enter(serv,name)
                }else if(!mobile){
                    if(ke==="Backspace"){
                        name=name.slice(0,namecr-1)+name.slice(namecr,name.length)
                        namecr-=1
                    }else if(["ArrowLeft","ArrowRight"].includes(ke)) namecr+=2*(["ArrowLeft","ArrowRight"].indexOf(ke)-0.5)
                    else{
                        if(ke.length===1){
                            name=name.slice(0,namecr)+ke+name.slice(namecr,name.length)
                            namecr+=1
                        }
                    }
                }
            }
            if(namecr<0)namecr=0
            if(namecr>name.length)namecr=name.length
            count+=1
            if(count>=60)count=0
            break
        case 1:
            if(ff){
                $("svg").append(svgel("g",{"id":"sprites"},""))
            }
            try{
                for(en of entities){
                    ty=en.constructor.name
                    ids=$.makeArray($("g#sprites").children()).map(a=>a.id)
                    if(!Boolean($.inArray(ty,ids)+1)){
                        spri=$(svgel("g",{"id":ty,"stroke":"#FF0000"}))
                        sprhold=$("g#sprites")
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
                        }
                        sprhold.append(spri)
                    }
                    allids=$.makeArray($("#svg")).map(a=>a.id)
                    if(!allids.includes(en.id)){
                        spr=$(svgel("use",{"href":"#"+ty,"id":en.id}))
                        $("#svg").append(spr)
                    }
                    
                }
            }catch(err){console.log("play error: "+err)}
            break
        case 2:
            
    }
    if(keyp){
        keyp=false
    }
    ff=false
    requestAnimationFrame(frame)
}