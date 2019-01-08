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
				$("svg").append(svgel("rect",{"x":"200","y":"237.5","width":"100","height":"25","rx":"1","ry":"0.5","class":"stru"}))
				$("svg").append(svgel("clipPath",{"id":"clipname"},"<rect x=\"200\" y=\"237.5\" width=\"100\" height=\"25\" rx=\"1\" ry=\"0.5\"></rect>"))
				if(mobile){
					$("body").append(el("input",{"style":"position:absolute;z-index:15;font-size:2.5vh","oninput":"name=this.value","id":"ninput"}))
					$("svg").append(svgel("rect",{"x":"215","y":"243.75","width":"35","height":"12.5","fill":"none","stroke":"none","id":"inpos"},""))
				}else{
					$("svg").append(svgel("text",{"x":"250","y":"250","id":"name","text-anchor":"middle","font-size":"7.5","clip-path":"url(\"#clipname\")"},"hi"))
				}
				$("svg").append(svgel("g",{"id":"gobtn","transform":mobile?"":"translate(-800,-800)"},""))
				$("#gobtn").append(svgel("rect",{"x":"265","y":"240","width":"25","height":"20","fill":"white","stroke":"black"},""))
				$("#gobtn").append(svgel("text",{"x":"277.5","y":"250","fill":"white","stroke":"black","text-anchor":"middle","alignment-baseline":"middle","font-size":"10"},"Play"))
				$("svg").append(svgel("g",{"id":"help"}))
				$("#help").append(svgel("rect",{"x":"480","y":"0","width":"20","height":"20","rx":"1","ry":"1","fill":"#aaaaaa","id":"helpb"}))
		        $("#help").append(svgel("text",{"x":"490","y":"10","font-size":"12.5","text-anchor":"middle","alignment-baseline":"middle"},"?"))
		        $("svg").append(svgel("rect",{"x":"350","y":"100","width":"150","height":"300","rx":"5","ry":"5","class":"stru","id":"chlogh"},""))
		        $("body").append(el("div",{"style":"position:absolute","id":"chlog"},"Space for changelog"))
		        $("svg").append(svgel("text",{"x":500,"y":20,"text-anchor":"end","alignment-baseline":"hanging","font-size":10,"id":"ghlink"},"GitHub"))
		        $("svg").append(svgel("text",{"x":500,"y":30,"text-anchor":"end","alignment-baseline":"hanging","font-size":10,"id":"ghlinks"},"GitHub Server"))
		        $("#ghlink").click(()=>{
		        	document.location.href="https://github.com/isaachew/webgame"
		        })
		        $("#ghlinks").click(()=>{
		        	document.location.href="https://github.com/isaachew/webgameserver"
		        })
		        $("#gobtn").click(()=>{
					smode(1)
					serv=choose(servers)
					da={"name":name}
					load("join",serv,()=>{console.log("id set");playid=result.id})
		        })
		        $("#help").click(()=>{
		        	$("body").append(el("div",{"style":"position:absolute;min-width:100vw;min-height:100vh;background-color:black;top:0;left:0;opacity:0.5","id":"hblack"}))
		        	$("body").append(el("div",{"style":"position:absolute;min-width:50vw;min-height:50vh;background-color:#C0C0C0;top:25vh;left:25vw;opacity:1;z-index:30000","id":"hcont"},"<span style='color:#777777;top:0;left:0;font-size:2.5vw' id='chelp'>x</span>"))
		        	$("#chelp").click(()=>{
		        		$("#hblack,#hcont").remove()
		        	})
		        })
			}
			$("#name").text(name.slice(0,namecr)+(count<30?"|":" ")+name.slice(namecr,name.length))
			j=gbb("#chlogh")
			$("#chlog").css("top",j.y).css("left",j.x).css("width",j.width).css("height",j.height)
			if(mobile){
				name=$("#ninput")[0].value
				inpr=gbb("#inpos")
				$("#ninput")
				.css("top",inpr.y)
				.css("height",inpr.height)
				.css("left",inpr.x)
				.css("width",inpr.width)
			}
			if(keyp){
				if(ke==="Enter"){
					$("#gobtn").click()
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
				$("svg").append(svgel("g",{"id":"sprites","transform":"translate(-1000,-1000)"},""))
				$("svg").append(svgel("g",{"id":"stats"},"<rect fill='#dddddd' opacity='0.75' id='statbar'>"))
				$("#stats").append(svgel("text",{"id":"score","clip-path":"url(#ctext)"},"Score: 0"))
				$("#stats").append(svgel("text",{"id":"name","clip-path":"url(#ctext)"},"Name: "+name))
				$("#stats").append(svgel("clipPath",{"id":"ctext"},"<rect y='0' id='ctrect'>"))
				$("#stats").append(svgel("g",{"id":"builds"}))
				for(i of pres){
					crespr(i.type)
					reqs=7/90*camvb[2]
					btile=$(svgel("g",{"transform":"translate("+
					(0.7*camvb[2]/3+
					($("#builds").children().length+1)*reqs)+",0)"
					}))
					sca=(reqs*3/4)/Math.max.apply(null,i.size)
					btile.append(svgel("rect",{"width":reqs,"height":reqs,"x":0,"y":0}))
					btile.append(svgel("use",{"href":"#"+i.type,"transform":"scale("+sca+")","x":0,"y":0},""))
					$("#builds").append(btile)
				}
			}
			for(en of entities.concat(buildings)){
				ty=en.type
				ids=$("g#sprites").children().toArray().map(a=>a.id)
				if(!($.inArray(ty,ids)+1)){
					crespr(ty)
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
					.attr("transform","rotate("+en.rot+","+(en.pos[0]+entdw/2)+","+(en.pos[1]+entdh/2)+")")
					if(entdis.attr("href")!=="#"+en.type){
						entdis.remove()
					}
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
			$("#stats").attr("transform","translate("+(camvb[0]+3/20*camvb[2])+","+camvb[1]+")")
			$("#statbar")
			.attr("x",0)
			.attr("y",0)
			.attr("width",0.7*camvb[2])
			.attr("height",0.1*camvb[3])
			$("#score,#name")
			.attr("x",0)
			.attr("font-size",camvb[3]/40)
			$("#score")
			.attr("y",camvb[3]/40)
			.text("Score: "+score)
			$("#name")
			.attr("y",camvb[3]/20)
			$("#ctrect")
			.attr("x",0)
			.attr("width",camvb[2]*7/30)
			.attr("height",0.1*camvb[3])
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