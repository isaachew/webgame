function frame(ts){
	fps=1000/(ts-lt)
	lt=ts
	
	if(clear){
		clears()
		clear=false
	}
	if(newmode){
		newmode=false
		ff=true
	}
	switch(mode){
		case 0:
			if(ff){
				if(!$("#svg").length){
					$("body").css("background-color","#c0c0c0")
					apsvel("body","svg",{"id":"svg"})
					apsvel("svg","rect",{"id":"erct","width":500,"height":500,"fill":"#ffffff"})
				}
				apsvel("svg","rect",{"x":"200","y":"237.5","width":"100","height":"25","rx":"1","ry":"0.5","class":"stru"})
				apsvel("svg","clipPath",{"id":"clipname"},"<rect x=\"200\" y=\"237.5\" width=\"100\" height=\"25\" rx=\"1\" ry=\"0.5\"></rect>")
				x=document.cookie.match(/(^| )(nam=(.*?)($|;))/)
				name=x?x[3]:""
				if(mobile){
					$("body").append(el("input",{"style":"position:absolute;z-index:15;font-size:2.5vh","oninput":"name=this.value","id":"ninput"}))
					apsvel("svg","rect",{"x":"215","y":"243.75","width":"35","height":"12.5","fill":"none","stroke":"none","id":"inpos"},"")
				}else{
					apsvel("svg","text",{"x":"250","y":"250","id":"name","text-anchor":"middle","font-size":"7.5","clip-path":"url(\"#clipname\")"},name)
				}
				apsvel("svg","g",{"id":"gobtn","transform":mobile?"":"translate(-800,-800)"},"")
				apsvel("svg","text",{"x":250,"y":150,"text-anchor":"middle","alignment-baseline":"middle","font-size":25},"Title")
				apsvel("svg","text",{"x":250,"y":225,"text-anchor":"middle","alignment-baseline":"middle","font-size":10},"Enter Name")
				apsvel("svg","text",{"x":250,"y":275,"text-anchor":"middle","alignment-baseline":"middle","font-size":10},"Press Enter to start")
				apsvel("#gobtn","rect",{"x":"265","y":"240","width":"25","height":"20","fill":"white","stroke":"black"},"")
				apsvel("#gobtn","text",{"x":"277.5","y":"250","fill":"white","stroke":"black","text-anchor":"middle","alignment-baseline":"middle","font-size":"10"},"Play")
				apsvel("svg","g",{"id":"help"})
				apsvel("#help","rect",{"x":"480","y":"0","width":"20","height":"20","rx":"1","ry":"1","fill":"#aaaaaa","id":"helpb"})
				apsvel("#help","text",{"x":"490","y":"10","font-size":"12.5","text-anchor":"middle","alignment-baseline":"middle"},"?")
				apsvel("svg","rect",{"x":"350","y":"100","width":"150","height":"300","rx":"5","ry":"5","class":"stru","id":"chlogh"})
				$("body").append(el("div",{"style":"position:absolute;overflow:scroll","id":"chlog"}))
				$("#gobtn").click(()=>{
					serv=choose(servers)
					da={"name":name}
					document.cookie="nam="+name
					load("join",serv,()=>{
						camvb[0]=Math.random()*(result.bounds[0]-camvb[2])
						camvb[1]=Math.random()*(result.bounds[1]-camvb[3])
						smode(1)
						playid=result.id
					})
				})
				$("#help").click(()=>{
					$("body").append(el("div",{"style":"position:absolute;width:100vw;height:100vh;background-color:black;top:0;left:0;opacity:0.5","id":"hblack"}))
					$("body").append(el("div",{"style":"position:absolute;width:50vw;height:50vh;background-color:#C0C0C0;top:25vh;left:25vw;opacity:1","id":"hcont"},"<span style='color:#777777;top:0;left:0;font-size:2.5vw' id='chelp'>&#10006;</span>"))
					$("#hcont").append(el("div",{"style":"top:10vh;width:100%;height:40vh;background-color:#ffffff;overflow:auto","id":"htext"}))
					for(i of helpc){			
						$("#htext").append("<p>"+i.replace(/</g,"&lt;").replace(/{(.*?)}/g,(...rm)=>{
							return `<img src=${rm[1]}>`
						})+"</p>")
					}
					$("#chelp").click(()=>{
						$("#hblack,#hcont").remove()
					})
				})
				apsvel("#help","text",{"x":"490","y":"10","font-size":"12.5","text-anchor":"middle","alignment-baseline":"middle"},"?")
				apsvel("svg","rect",{"x":"350","y":"100","width":"150","height":"300","rx":"5","ry":"5","class":"stru","id":"chlogh"},"")
				fetch("data/changelog.txt")
				.then((v)=>(v.text()))
				.then((v)=>{
					allfl=v.split("\n")
					allfl.reverse()
					for(i of allfl){
						n=i.split("'\"'")
						$("#chlog").append(el("h2",{},n[0]))
						$("#chlog").append(el("ul",{},n.slice(1).map((k)=>("<li>"+k.replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</li>"))))
					}
				})
				apsvel("svg","text",{"x":500,"y":20,"text-anchor":"end","alignment-baseline":"hanging","font-size":10,"id":"ghlink"},"GitHub")
				apsvel("svg","text",{"x":500,"y":30,"text-anchor":"end","alignment-baseline":"hanging","font-size":10,"id":"ghlinks"},"GitHub Server")
				$("#ghlink").click(()=>{
					document.location.href="https://github.com/isaachew/webgame"
				})
				$("#ghlinks").click(()=>{
					document.location.href="https://github.com/isaachew/webgameserver"
				})
			}
			$("svg").attr("viewBox","0 0 500 500")
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
					if(ke==="Backspace"&&namecr>0){
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
			mode1()
			break
		case 2:
			if(ff){
				apsvel("svg","g",{"id":"statsmodal"})
				apsvel("#statsmodal","rect",{"x":camvb[0],"y":camvb[1],"width":camvb[2],"height":camvb[3],"opacity":0.5})
				apsvel("#statsmodal","text",{"x":camvb[2]/2+camvb[0],"y":camvb[3]/2+camvb[1],"fill":"#ffffff","font-size":camvb[2]/50,"text-anchor":"middle"},"Score:"+players[playid])
				apsvel("#statsmodal","text",{"x":camvb[2]/2+camvb[0],"y":3*camvb[3]/4+camvb[1],"fill":"#ffffff","font-size":camvb[2]/30,"text-anchor":"middle"},"Press a key to continue")
			}
			if(keyp){
				smode(0)
			}
	}
	if(keyp){
		keyp=false
	}
	ff=false
	requestAnimationFrame(frame)
}
function mode1(){
	if(players[playid].left){
		mode=2
		newmode=true
		return
	}
	$("svg").attr("viewBox",camvb.join(" "))
	if(ff){
		apsvel("svg","g",{"id":"objects"},"")
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
		apsvel("svg","g",{"id":"sprites","transform":"translate(-1000,-1000)"},"")
		apsvel("svg","g",{"id":"stats"},"<rect fill='#dddddd' opacity='0.75' id='statbar'>")
		apsvel("svg","g",{"id":"scb","transform":"translate(400,380)","dn":"0"})
		apsvel("#scb","rect",{"fill":"#808080","width":0.2*camvb[2],"height":camvb[3]/50,"id":"scbu"})
		$("#scbu").click(()=>{
			if($("#scb").attr("dn")<=0){return}
			$("#scb")
			.attr("dn",(i,a)=>(parseInt(a)-1))
		})
		apsvel("#scb","rect",{"fill":"#808080","y":0.22*camvb[3],"width":0.2*camvb[2],"height":camvb[3]/50,"id":"scbd"})
		$("#scbd").click(()=>{
			if($("#scb").attr("dn")+1<players.length){
				$("#scb")
				.attr("dn",(i,a)=>(parseInt(a)+1))
			}
		})
		apsvel("#scb","text",{"x":0.1*camvb[2],"y":camvb[3]/100,"fill":"#ffffff","font-size":camvb[2]/75},"Up")
		apsvel("#scb","text",{"x":0.1*camvb[2],"y":0.23*camvb[3],"fill":"#ffffff","font-size":camvb[3]/75},"Down")
		apsvel("#stats","text",{"id":"score","clip-path":"url(#ctext)"},"Score: 0")
		apsvel("#stats","text",{"id":"name","clip-path":"url(#ctext)"},"Name: "+name)
		apsvel("#stats","text",{"id":"res0","clip-path":"url(#ctext)"},": 0")
		apsvel("#stats","text",{"id":"res1","clip-path":"url(#ctext)"},": 0")
		apsvel("#stats","use",{"id":"resspr0","href":"#coll0"})
		apsvel("#stats","use",{"id":"resspr1","href":"#coll1"})
		apsvel("#stats","clipPath",{"id":"ctext"},"<rect y='0' id='ctrect'>")
		apsvel("#stats","g",{"id":"buihold","clip-path":"url(#buiclp)"})
		reqs=7/90*camvb[2]
		apsvel("#buihold","g",{"id":"builds","scrl":0})
		apsvel("#stats","clipPath",{"id":"buiclp"},"<rect x='"+(14*camvb[2]/45)+"' y='0' width='"+reqs*4+"' height='"+reqs+"'>")
		ind=0
		for(id in pres){
			i=pres[id][0]
			crespr(id)
			btile=$(svgel("g",{"transform":"translate("+
			ind*reqs+",0)","id":"bui"+id}))
			sca=(reqs/2)/Math.max.apply(null,i.size)
			btile.append(svgel("rect",{"width":reqs,"height":reqs,"x":0,"y":0,"rx":camvb[2]/250,"ry":camvb[3]/250,"class":"btrect"}))
			btile.append(svgel("use",{"href":"#"+id,"transform":"scale("+sca+")","x":0,"y":0,"class":"buitile","stroke":"#808080","fill":"#404040"},""))
			btile.append(svgel("text",{"fill":"#ffffff","y":reqs/16,"x":0,"alignment-baseline":"middle","text-anchor":"start","font-size":reqs/8},i.name))
			btile.append(svgel("text",{"fill":"#ffffff","y":5*reqs/8,"x":reqs/4,"alignment-baseline":"middle","text-anchor":"start","font-size":3*reqs/20},i.cost[0]))
			btile.append(svgel("text",{"fill":"#ffffff","y":7*reqs/8,"x":reqs/4,"alignment-baseline":"middle","text-anchor":"start","font-size":3*reqs/20},i.cost[1]))
			btile.append(svgel("use",{"href":"#coll0","class":"collbds0"}))
			btile.append(svgel("use",{"href":"#coll1","class":"collbds1"}))
			btile.click((n)=>{
				$(".btrect").css("stroke","none")
				if($("#r"+n.currentTarget.id+".phrect").toArray().length){
					$(".phrect,#buiprev,#buirange").remove()
				}else{
					cid=n.currentTarget.id.slice(3)
					buiobj=pres[cid][0]
					$(".phrect,#buiprev,#buirange").remove()
					$(".btrect",n.currentTarget).css("stroke","#ffffff")
					apsvel("svg","rect",{"x":camvb[0],"y":camvb[1]+0.1*camvb[3],"width":camvb[2],"height":0.9*camvb[3],"fill":"#ffffff","stroke":"none","opacity":0,"class":"phrect","id":"r"+n.currentTarget.id})
					apsvel("svg","use",{"id":"buiprev","href":"#"+cid,"x":0,"y":0,"opacity":0,"stroke":"#808080","fill":"#404040"})
					apsvel("#objects","circle",{"id":"buirange","r":buiobj.radius,"cx":0,"cy":0,"opacity":0,"fill":"#ff7700","stroke":"#ffff00","stroke-width":camvb[2]/100})
					$(".phrect").click((e)=>{
						tre=e.currentTarget.getBoundingClientRect()
						relw=tre.width/camvb[2]
						relh=tre.height/0.9/camvb[3]
						relx=tre.left
						rely=tre.top-relh*camvb[3]*0.1
						pcos=[(e.pageX-relx)/relw,(e.pageY-rely)/relh]
						crds=[camvb[0]+pcos[0]-buiobj.size[0]/2,camvb[1]+pcos[1]-buiobj.size[1]/2]
						$("#buiprev,#buirange")
						.css("opacity",0.5)
						$("#buiprev")
						.attr("x",crds[0])
						.attr("y",crds[1])
						$("#buirange")
						.attr("cx",crds[0]+buiobj.size[0]/2)
						.attr("cy",crds[1]+buiobj.size[1]/2)
					})
					$("#buiprev").click((e)=>{
						da.build=[cid,crds]
						$(".phrect,#buiprev,#buirange").remove()
						$(".btrect").css("stroke","none")
					})
				}
			})
			$("#builds").append(btile)
			ind++
		}
		apsvel("#stats","polygon",{"id":"larrow"})
		$("#larrow").click(()=>{
			scrbar(-reqs)
		})
		apsvel("#stats","polygon",{"id":"rarrow"})
		$("#rarrow").click(()=>{
			scrbar(reqs)
		})
	}
	for(var en of entities.concat(buildings)){//Rendering
		if(en.id[0]==="E"){//Entities move if they have velocity
			en.pos[0]+=en.vel[0]/60
			en.pos[1]+=en.vel[1]/60
		}
		ty=en.type
		ids=$("g#sprites").children().toArray().map(a=>a.id)
		if(!ids.includes(ty)){
			crespr(ty)
		}
		allids=$("#objects").children().toArray().map(a=>a.id)
		if((en.pos[0]-camvb[0]>0)&&(en.pos[0]-camvb[0]<camvb[2])&&(en.pos[1]-camvb[1]>0)&&(en.pos[1]-camvb[1]<camvb[3])){//Camera check
			epl=en.player			
			if(!allids.includes(en.id+"")){//Rendering the entity
				console.log(epl,epl?epl.stroke:undefined,epl?epl.fill:undefined,ty,"entity spawn")
				spr=$(svgel("use",{"href":"#"+ty,"id":en.id,"class":"object","stroke":(epl||{}).stroke,"fill":(epl||{}).fill,"pid":(epl||{"id":""}).id}))
				.click((n)=>{
					clev(n.target)
				})
				$("#objects").append(spr)
			}
			entdis=$("#"+en.id)
			entdbox=entdis[0].getBBox()
			entdw=entdbox.width
			entdh=entdbox.height
			entdis.attr("x",en.pos[0]).attr("y",en.pos[1])
			.attr("transform","rotate("+en.rot+","+(en.pos[0]+entdw/2)+","+(en.pos[1]+entdh/2)+")")
			if(en.hp<en.maxhp){//Health bar
				if($("#"+en.id+"hb").length){
					console.log("hb update",en.hp/en.maxhp)
					$("#"+en.id+"hb .hebg")
					.attr("width",en.size[0]*en.hp/en.maxhp*0.75)
					.attr("height",en.size[0]/5*0.75)
					.add("#"+en.id+"hb .hebr")
					.attr("x",en.pos[0]+en.size[0]*0.125)
					.attr("y",en.pos[1]-en.size[1]*0.3)
				}else{
					apsvel("#objects","g",{"id":en.id+"hb","class":"hb"})
					apsvel("#"+en.id+"hb","rect",{"x":en.pos[0]+en.size[0]*0.125,"y":en.pos[1]-en.size[1]*0.3,"width":en.size[0]*0.75,"height":en.size[0]/5*0.75,"fill":"#ff0000","class":"hebr"})
					apsvel("#"+en.id+"hb","rect",{"x":en.pos[0]+en.size[0]*0.125,"y":en.pos[1]-en.size[1]*0.3,"width":en.size[0]*en.hp/en.maxhp*0.75,"height":en.size[0]/5*0.75,"fill":"#00ff00","class":"hebg"})
				}
			}else if($("#"+en.id+"hb").length){
				$("#"+en.id+"hb").remove()//Remove it
			}
			if(entdis.attr("href")!=="#"+en.type||entdis.attr("pid")!=(epl||{"id":""}).id){
				console.log(entdis.attr("pid"),(epl||{"id":""}).id)
				entdis.remove()//The entity is replaced/rendered differently
			}
		}
	}
	htnts=$.makeArray($(".object"))//Camera bounding box clipping
	entis=entities.concat(buildings).map(a=>a.id+"")
	for(k of htnts){
		if(!entis.includes(k.id)){
			$(k).remove()
		}else{
			kd=k.id
			ks=kd.slice(1)
			kd=(kd[0]==="E")?entities[ks]:buildings[ks]
			kd=kd.pos
			if(kd[0]-camvb[0]<0||(kd[0]-camvb[0]>camvb[2])||(kd[1]-camvb[1]<0)||(kd[1]-camvb[1]>camvb[3])){
				$(k).remove()
				$("#"+k.id+"hb").remove()
			}
		}
	}
	hebs=$.makeArray($(".hb"))//Health bar removal
	for(k of hebs){
		if(!$("#"+k.id.slice(0,-2)).length){
			$(k).remove()
		}
	}
	plss=result.playerss//Scoreboard system
	tf=parseInt($("#scb").attr("dn"))
	for(i=0;i<10;i++){
		f=plss[i+tf]
		if($("#scbg"+i).length){
			if(plss.length-i-tf>0){
				$("#scbr"+i)
				.attr("fill",f.fill)
				.attr("stroke",f.stroke)
				$("#scbt"+i)
				.text((i+tf+1)+". "+f.name)
			}else{
				$("#scbg"+i).remove()			
			}
		}else if(plss.length>i+tf){
			apsvel("#scb","g",{"id":"scbg"+i})
			apsvel("#scbg"+i,"rect",{"y":(i+1)*camvb[3]/50,"width":camvb[2]/5,"height":camvb[3]/50,"fill":plss[i].fill,"stroke":plss[i].stroke,"id":"scbr"+i})
			apsvel("#scbg"+i,"text",{"y":(i+1.5)*camvb[3]/50,"x":camvb[2]/10,"text-anchor":"middle","alignment-baseline":"middle","font-size":camvb[3]/75,"id":"scbt"+i})
		}
	}
	//Key press test
	switch(ke){
		case "ArrowUp":cdir[1]=-1;break
		case "ArrowDown":cdir[1]=1;break
		case "ArrowLeft":cdir[0]=-1;break
		case "ArrowRight":cdir[0]=1;break
		case "w":cdir[1]=-1;break
		case "s":cdir[1]=1;break
		case "a":cdir[0]=-1;break
		case "d":cdir[0]=1;break
		case "keyup":cdir=[0,0]
	}
	if(mobile){
		for(a of arrhdr.children().toArray()){//Directional buttons
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
	$("#score,#name,#res0,#res1")
	.attr("font-size",camvb[2]/60)
	$("#score")
	.attr("y",camvb[3]/60)
	.text("Score: "+score)
	$("#name")
	.attr("y",camvb[3]/30)
	$("#res0")
	.attr("y",camvb[3]/20)
	.text(": "+players[playid].resources[0])
	$("#res1")
	.attr("y",camvb[3]/15)
	.text(": "+players[playid].resources[1])
	bbsv=gbb("#svg")
	colwid=gbb($("#coll0")).width*(camvb[2]/Math.min(bbsv.width,bbsv.height))
	sf=camvb[2]/colwid/100
	$("#resspr0")
	.attr("transform","translate("+camvb[2]/100+","+(camvb[3]/24-camvb[2]/200)+")")
	$("#resspr1")
	.attr("transform","translate("+camvb[2]/100+","+(camvb[3]*7/120-camvb[2]/200)+")")
	$("#res0,#res1")
	.attr("x",camvb[2]/50)
	$(".collbds0")
	.attr("transform","translate("+(reqs/8-camvb[2]/200)+","+(reqs/2+camvb[2]/200)+")")
	$(".collbds1")
	.attr("transform","translate("+(reqs/8-camvb[2]/200)+","+(reqs*3/4+camvb[2]/200)+")")
	$(".trpcspr0")
	.attr("transform","translate("+camvb[2]/200+","+96*camvb[2]/800+")")
	$(".trpcspr1")
	.attr("transform","translate("+camvb[2]/200+","+676*camvb[2]/4800+")")
	$("#resspr0,#resspr1,.collbds0,.collbds1,trpcspr0,trpcspr1")
	.attr("transform",(n,v)=>((v||"")+" scale("+sf+")"))
	$("#ctrect")
	.attr("x",0)
	.attr("width",camvb[2]*7/45)
	.attr("height",0.1*camvb[3])
	$(".phrect")
	.attr("x",camvb[0])
	.attr("y",camvb[1]+0.1*camvb[3])
	reqs=7/90*camvb[2]
	$("#larrow")
	.attr("points",[1+12,2,3+12,3,3+12,1].map((k)=>(reqs*k/4)))
	$("#rarrow")
	.attr("points",[3+32,2,1+32,3,1+32,1].map((k)=>(reqs*k/4)))
	$("#builds")
	.attr("transform","translate("+Math.floor(14*camvb[2]/45-reqs*$("#builds").attr("scrl"))+")")
	$("#builds").children().each((id,elem)=>{
		$(elem)
		.attr("transform","translate("+id*reqs+")")
		$(".buitile",elem)
		.attr("transform","scale("+reqs/2/Math.max.apply(null,pres[elem.id.slice(3)][0].size)+")")
	})
	$("rect","#buiclp")
	.attr("x",(14*camvb[2]/45))
	.attr("y",0)
	.attr("width",4*reqs)
	.attr("height",reqs)
	$(".btrect")
	.attr("width",reqs)
	.attr("height",reqs)
	$("#scb")
	.attr("transform","translate("+(camvb[0]+camvb[2]*0.8)+","+(camvb[1]+camvb[3]*0.76)+")")
	camvb[0]+=cdir[0]*camvb[2]/100
	camvb[1]+=cdir[1]*camvb[3]/100
	if(camvb[0]<0)camvb[0]=0
	if(camvb[1]<0)camvb[1]=0
	if(camvb[0]>result.bounds[0]-camvb[2])camvb[0]=result.bounds[0]-camvb[2]
	if(camvb[1]>result.bounds[1]-camvb[3])camvb[1]=result.bounds[1]-camvb[3]
	$("#statbar")
	.attr("fill",players[playid].fill)
	.attr("stroke",players[playid].stroke)
	$("#name")
	.text("Name: "+players[playid].name)
	$("#erct")
	.attr("x",camvb[0])
	.attr("y",camvb[1])
	.attr("width",camvb[2])
	.attr("height",camvb[3])
}
function clev(el){//If clicked
	$("#buildintf").remove()
	k=el.id.slice(1)
	en=(el.id[0]==="E")?entities[k]:buildings[k]
	if(en.type.slice(0,4)=="coll")da.collect=en.id
	if(en.id[0]==="B"&&en.player.id===playid){
		tt=pres[en.ty]
		nl=tt[en.level]
		npl=tt[en.level-1]
		apsvel("svg","g",{"id":"buildintf"})
		apsvel("#buildintf","ellipse",{"cx":(en.pos[0]+en.size[0]),"cy":(en.pos[1]+en.size[1]),"rx":en.radius,"ry":en.radius,"fill":"#ff8000","stroke":"#ffff00","stroke-width":camvb[2]/100,"opacity":"0.5","id":"rangec"})
		apsvel("#buildintf","g",{"id":"buildgui","transform":"translate("+(en.pos[0]+en.size[0])+","+(en.pos[1]+en.size[1])+")"})
		apsvel("#buildgui","rect",{"x":0,"y":0,"width":camvb[2]/3,"height":camvb[3]/3,"fill":"#606060","id":"brect"})
		apsvel("#buildgui","text",{"x":0,"y":0,"font-size":camvb[2]/60,"fill":"#ffffff","alignment-baseline":"hanging","text-anchor":"start"},en.name+" Level "+en.level)
		if(nl!=undefined){
			apsvel("#buildgui","rect",{"x":camvb[2]/48,"y":camvb[3]*25/96,"width":camvb[3]/8,"height":camvb[3]/16,"font-size":camvb[2]/30,"id":"buildbtn1"})
			apsvel("#buildgui","text",{"x":camvb[2]/12,"y":camvb[3]*7/24,"alignment-baseline":"middle","text-anchor":"middle","fill":"#ffffff","id":"buildbtntx1"},"Upgrade")
			apsvel("#buildgui","text",{"x":camvb[2]/36+colwid/2,"y":camvb[3]*5/24,"alignment-baseline":"middle","text-anchor":"start","fill":"#ffffff","id":"bucsta"},nl.cost[0])
			apsvel("#buildgui","text",{"x":camvb[2]*7/36+colwid/2,"y":camvb[3]*5/24,"alignment-baseline":"middle","text-anchor":"start","fill":"#ffffff","id":"bucstb"},nl.cost[1])
			apsvel("#buildgui","use",{"href":"#coll0","x":camvb[2]/36-colwid/2,"y":camvb[3]*5/24-colwid/2})
			apsvel("#buildgui","use",{"href":"#coll1","x":camvb[2]*7/36-colwid/2,"y":camvb[3]*5/24-colwid/2})
			apsvel("#buildgui","line",{"x1":camvb[2]/6,"x2":camvb[2]/6,"y1":camvb[3]/60,"y2":camvb[3]*25/96,"stroke":"#ffffff"})
		}
		apsvel("#buildgui","rect",{"x":9*camvb[2]/48,"y":camvb[3]*25/96,"width":camvb[3]/8,"height":camvb[3]/16,"id":"buildbtn2"})
		apsvel("#buildgui","text",{"x":camvb[2]/4,"y":camvb[3]*7/24,"alignment-baseline":"middle","text-anchor":"middle","fill":"#ffffff","id":"buildbtntx2"},"Sell")
		apsvel("#buildgui","g",{"id":"upstats"})
		c=1
		for(i in nl){
			k=nl[i]
			if(i[0]!=i[0].toLowerCase()){
				apsvel("#buildgui","text",{"x":camvb[2]/6,"y":(c+0.5)*camvb[3]/60,"font-size":camvb[3]/60,"alignment-baseline":"middle"},i+(i==="shoot"?"s":"")+": "+((i==="shoot")?("s: "+k?"Yes":"No"):k))
				if(npl[i]){
					apsvel("#buildgui","text",{"y":(c+0.5)*camvb[3]/60,"font-size":camvb[3]/60,"alignment-baseline":"middle"},i+(i==="shoot"?"s":"")+": "+((i==="shoot")?(npl[i]?"Yes":"No"):npl[i]))
				}
			}
			c++
		}
		if(en.troops){
			l=en.troops.length
			$("#brect").attr("width",camvb[2]/12*Math.ceil(l/2+4))
			apsvel("#buildgui","g",{"id":"troopgui"})
			for(f=0;f<l;f++){
				trp={}
				for(i=0;i<players[playid].trlev[en.troops[f]];i++){
					for(j in trps[en.troops[f]][i]){
						trp[j]=trps[en.troops[f]][i][j]
					}
				}
				console.log(trp)
				apsvel("#troopgui","g",{"id":"trppr"+f,"transform":"translate("+((f%Math.ceil(l/2))*camvb[2]/12+camvb[2]/3)+","+(Math.floor(f/l*2)*camvb[3]/6)+")"})
				apsvel("#trppr"+f,"rect",{"x":0,"y":0,"width":camvb[2]/12,"height":camvb[3]/6,"rx":camvb[2]/200,"ry":camvb[2]/200,"fill":"#c08000"})
				crespr(en.troops[f])
				apsvel("#trppr"+f,"use",{"href":"#"+en.troops[f],"transform":"translate("+camvb[2]/48+",0) scale("+camvb[2]/24/trp.size+")","stroke":"#808080","fill":"#404040"})
				collbox=gbb("#coll0")
				apsvel("#trppr"+f,"text",{"name":"trpnam"+f,"alignment-baseline":"hanging","font-size":camvb[2]/60,"fill":"#ffffff"},trps[en.troops[f]][0].name)
				apsvel("#trppr"+f,"use",{"href":"#coll0","class":"trpcspr0"})
				apsvel("#trppr"+f,"use",{"href":"#coll1","class":"trpcspr1"})
				apsvel("#trppr"+f,"text",{"class":"trpctx0","x":camvb[2]/50,"y":camvb[3]/8,"alignment-baseline":"middle","font-size":camvb[2]/60},trp.cost[0])
				apsvel("#trppr"+f,"text",{"class":"trpctx1","x":camvb[2]/50,"y":camvb[3]*7/48,"alignment-baseline":"middle","font-size":camvb[2]/60},trp.cost[1])
				$("#trppr"+f).click((ev)=>{
					t=ev.currentTarget
					t=t.id.slice(5)
					dt={}
					for(i=0;i<players[playid].trlev[en.troops[t]];i++){
						for(j in trps[en.troops[t]][i]){
							dt[j]=trps[en.troops[t]][i][j]
						}
					}
					dt.pos=en.pos.concat([])
					dist=Math.random()+2
					ang=Math.random()*2*Math.PI
					dt.pos[0]+=en.size[0]*dist*Math.cos(ang)
					dt.pos[1]+=en.size[1]*dist*Math.sin(ang)
					dt.type=en.troops[t]
					da.troop=dt
				})
			}
		}
		if(en.uptrp){
			console.log("troop upgrade gui")
			wid=$("#brect").attr("width")
			apsvel("#buildgui","g",{"id":"upgtrp","transform":"translate("+wid+",0)"})
			$("#brect").attr("width",(a,i)=>(parseInt(i)+Math.ceil(en.uptrp.length/2)*camvb[2]/12))
			for(i=0;i<en.uptrp.length;i++){
				tae=trps[en.uptrp[i]]
				le=players[playid].trlev[en.uptrp[i]]
				crespr(en.uptrp[i])
				apsvel("#upgtrp","g",{"id":"uptrp"+i,"transform":"translate("+camvb[2]/12*(i%Math.floor(en.uptrp.length/2))+","+camvb[3]/6*Math.floor(i/en.uptrp.length*2)+")"})
				apsvel("#uptrp"+i,"rect",{"width":camvb[2]/12,"height":camvb[2]/6,"fill":tae.length>le?"#8040c0":"#808080"})
				apsvel("#uptrp"+i,"use",{"href":"#"+en.uptrp[i],"transform":"translate("+camvb[2]/48+") scale("+(camvb[2]/tae[le-1].size/24)+")","id":"uptr"+i,"stroke":"#808080","fill":"#404040"})
				apsvel("#uptrp"+i,"text",{"fill":"white","font-size":camvb[2]/60},tae.name)
				if(tae.length>le){
					apsvel("#uptrp"+i,"use",{"href":"#coll0","x":camvb[2]/36-colwid/2,"y":camvb[3]/8})
					apsvel("#uptrp"+i,"use",{"href":"#coll1","x":camvb[2]/36-colwid/2,"y":camvb[3]*7/48})
					apsvel("#uptrp"+i,"text",{"fill":"black","x":camvb[2]/36+colwid/2,"y":camvb[3]/8+colwid/2,"font-size":camvb[2]/60,"alignment-baseline":"middle","text-anchor":"start"},tae[le].cost[0])
					apsvel("#uptrp"+i,"text",{"fill":"black","x":camvb[2]/36+colwid/2,"y":camvb[3]*7/48+colwid/2,"font-size":camvb[2]/60,"alignment-baseline":"middle","text-anchor":"start"},tae[le].cost[1])
					apsvel("#uptrp"+i,"text",{"fill":"white","font-size":camvb[2]/60,"text-anchor":"start","alignment-baseline":"hanging"},tae[le].name)
					$("#uptrp"+i).click(()=>{
						da.uptrp=en.uptrp[i]
					})
				}	
			}
		}
		$("#buildgui").attr("transform",(i,a)=>{
			console.log(a)
			arr=a.slice(10,-1).split(",").map(a=>parseInt(a))
			console.log("bound check",arr)
			arr[0]=Math.min(arr[0],result.bounds[0]-$("#brect").attr("width"))
			arr[1]=Math.min(arr[1],result.bounds[1]-camvb[3]/3)
			return "translate("+arr+")"
		})
		$("#buildbtn1,#buildbtntx1").click(()=>{
			$("#buildgui").mouseleave()
			da.upgrade=en.id
		})
		$("#buildbtn2,#buildbtntx2").click(()=>{
			$("#buildgui").mouseleave()
			da.sell=en.id
		})
		$("#buildgui").mouseleave((ev)=>{
			$("#buildintf").remove()
		})
	}else{
		apsvel("svg","g",{"transform":"translate("+(en.pos[0]+en.size[0])+","+(en.pos[1]+en.size[1])+")","id":"trpgui"})
		apsvel("#trpgui","rect",{"width":camvb[2]/3,"height":camvb[3]/3,"fill":"#808080"})
		$("#trpgui").mouseleave((ev)=>{
			$("#trpgui").remove()
		})
		apsvel("#buildgui","text",{"x":0,"y":0,"font-size":camvb[2]/60,"fill":"#ffffff","alignment-baseline":"hanging","text-anchor":"start"},npl.name+" Level "+en.level)
		
		
		
		
		
		
		
		
		
		
	}
}
