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
                $("svg").append(svgel("rect",{"x":"200","y":"237.5","width":"100","height":"25","rx":"1","ry":"0.5","fill":"#4444CC"}))
                $("svg").append(svgel("clipPath",{"id":"clipname"},"<rect x=\"200\" y=\"237.5\" width=\"100\" height=\"25\" rx=\"1\" ry=\"0.5\"></rect>"))
                if(mobile){
                    $("body").append(el("input",{"style":"position:absolute;top:50%;left:45%;z-index:15;width:10%","oninput":"name=this.value"}))
                }else{
                    $("svg").append(svgel("text",{"x":"250","y":"250","id":"name","text-anchor":"middle","font-size":"7.5","clip-path":"url(\"#clipname\")"},"hi"))
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
                    entid=load("join",serv,name)
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
                $("svg").append(svgel("g",{"id":"sprites","transform":"translate(-100)"},""))
            }
            try{
                ids=$.makeArray($("g#sprites").children()).map(a=>a.id)
                donespri=[]
                for(en of entities.concat(buildings)){
                    ty=en.type
                    if(!($.inArray(ty,ids)+1)&&!donespri.includes(ty)){
                        spri=$(svgel("g",{"id":ty,"class":"sprite"}))
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
                        donespri.push(ty)
                    }
                    allids=$.makeArray($("#svg").children()).map(a=>a.id)
                    if((en.pos[0]-camvb[0]>0)&&(en.pos[0]-camvb[0]<camvb[2])&&(en.pos[1]-camvb[1]>0)&&(en.pos[1]-camvb[1]<camvb[3])){
                        if(!allids.includes(en.id+"")){
                            spr=$(svgel("use",{"href":"#"+ty,"id":en.id,"class":"object"}))
                            $("#svg").append(spr)
                        }
                        entdis=$("use#"+en.id)
                        entdbox=entdis[0].getBBox()
                        entdw=entdbox.width
                        entdh=entdbox.height
                        entdis.attr("x",en.pos[0]).attr("y",en.pos[1])
                        entdis.attr("transform","rotate("+en.rot+","+(en.pos[0]+entdw/2)+","+(en.pos[1]+entdh/2)+")")
                    }
                }
                htnts=$.makeArray($(".object"))
                entis=entities.map(a=>a.id+"")
                for(k of htnts){
                    if(!entis.includes(k.id)){
                        re(k)
                    }
                    kd=[$(k).attr("x"),$(k).attr("y")]
                    if(kd[0]-camvb[0]<0||(kd[0]-camvb[0]>camvb[2])||(kd[1]-camvb[1]<0)||(kd[1]-camvb[1]>camvb[3])){
                        $(k).remove()
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