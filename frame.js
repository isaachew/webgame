function frame(ts){
	mode=window.mode||0
	if(clear){
		clears()
		clear=false
		ff=true
	}
	switch(mode){
		case 0:
			$("svg").attr("viewBox","0 0 500 500")
			if(ff){
				$("svg").append(svgel("rect",{"x":"200","y":"237.5","width":"100","height":"25","rx":"1","ry":"0.5","fill":"#4444CC"}))
				$("svg").append(svgel("clipPath",{"id":"clipname"},"<rect x=\"200\" y=\"237.5\" width=\"100\" height=\"25\" rx=\"1\" ry=\"0.5\"></rect>"))
				if(mobile){
					$("body").append(el("input",{"style":"position:absolute;top:47.5%;left:45%;z-index:15;width:10%","oninput":"name=this.value"}))
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
					smode(1)
					serv=choose(servers)
					da={"name":name}
					load("join",serv,()=>{console.log("id set");playid=result.id})
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
			$("svg").attr("viewBox",camvb.join(" "))
			if(ff){
				$("svg").append(svgel("g",{"id":"objects"},""))
				if(mobile){
					sv=$("svg")
					sv.append(svgel("g",{"id":"arrs"},""))
					arrhdr=$("#arrs")
					for(g of ["10","12","01","21"]){
						arrhdr.append(svgel("ellipse",{"id":"ar"+g}))
					}
					arrhdr.children().on("touchstart",function(){
						i=$(this).attr("id").slice(2).split("")
						coff=[parseInt(i[0])-1,parseInt(i[1])-1]
						cdir[0]+=coff[0]
						cdir[1]+=coff[1]
					})
					sv.on("touchend",function(){cdir=[0,0]})
				}
				$("svg").append(svgel("g",{"id":"sprites","transform":"translate(-100)"},""))
				$("svg").append(svgel("g",{"id":"stats"},"<rect fill='#dddddd' opacity='0.75' id='statbar'>"))
				$("#stats").append(svgel("text",{"id":"score"},"Score: 0"))
				$("#stats").append(svgel("text",{"id":"name"},"Name: "+name))
			}
			ids=$("g#sprites").children().toArray().map(a=>a.id)
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
						if(ty.slice(0,4)==="coll"){
							cols=["#777777","#ff0000"]
							$(spri).children().last().attr("fill",cols[ty.slice(4)]).attr("stroke","none")
						}
					}
					sprhold.append(spri)
					donespri.push(ty,en.id)
				}
				allids=$("#objects").children().toArray().map(a=>a.id)
				if((en.pos[0]-camvb[0]>0)&&(en.pos[0]-camvb[0]<camvb[2])&&(en.pos[1]-camvb[1]>0)&&(en.pos[1]-camvb[1]<camvb[3])){
					if(!allids.includes(en.id+"")){
						spr=$(svgel("use",{"href":"#"+ty,"id":en.id,"class":"object"}))
						.click((n)=>{
							clev(n.target)
						})
						$("#objects").append(spr)
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
			entis=entities.concat(buildings).map(a=>a.id+"")
			for(k of htnts){
				if(!entis.includes(k.id)){
					re(k)
				}else{
					kd=k.id
					ks=kd.slice(1)
					kd=(kd[0]==="E")?entities[ks]:buildings[ks]
					kd=kd.pos
					if(kd[0]-camvb[0]<0||(kd[0]-camvb[0]>camvb[2])||(kd[1]-camvb[1]<0)||(kd[1]-camvb[1]>camvb[3])){
						$(k).remove()
					}
				}
			}
			if(keyp){
				console.log(ke)
				if(ke==="ArrowUp")cdir[1]=-1
				if(ke==="ArrowDown")cdir[1]=1
				if(ke==="ArrowLeft")cdir[0]=-1
				if(ke==="ArrowRight")cdir[0]=1
				if(ke==="keyup")cdir=[0,0]
			}
			if(mobile){
				for(a of arrhdr.children().toArray()){
					$(a).attr("fill","#808080")
					s=$(a).attr("id").slice(2).split("")
					gnd=[parseInt(s[0])-1,parseInt(s[1])-1]
					$(a)
					.attr("cx",camvb[0]+2/8*camvb[2]+gnd[0]*camvb[2]/10)
					.attr("cy",camvb[1]+7/8*camvb[3]+gnd[1]*camvb[3]/10)
					.attr("rx",camvb[2]/40)
					.attr("ry",camvb[3]/40)
				}
			}
			$("#statbar")
			.attr("x",camvb[0]+3/20*camvb[2])
			.attr("y",camvb[1])
			.attr("width",0.7*camvb[2])
			.attr("height",0.1*camvb[3])
			$("#score,#name")
			.attr("x",camvb[0]+3/20*camvb[2])
			.attr("font-size",camvb[3]/40)
			$("#score")
			.attr("y",camvb[1]+camvb[3]/40)
			.text("Score: "+score)
			$("#name")
			.attr("y",camvb[1]+camvb[3]/20)
			camvb[0]+=cdir[0]*5
			camvb[1]+=cdir[1]*5
			if(result.bounds){
				if(camvb[0]<0)camvb[0]=0
				if(camvb[1]<0)camvb[1]=0
				if(camvb[0]>result.bounds[0]-camvb[2])camvb[0]=result.bounds[0]-camvb[2]
				if(camvb[1]>result.bounds[1]-camvb[3])camvb[1]=result.bounds[1]-camvb[3]
				$("#statbar")
				.attr("fill",players[playid].fill)
				.attr("stroke",players[playid].stroke)
				$("#name")
				.text("Name: "+players[playid].name)
			}
			break
		case 2:
			
	}
	if(keyp){
		keyp=false
	}
	ff=false
	requestAnimationFrame(frame)
}