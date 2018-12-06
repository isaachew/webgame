function frame(ts){
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
		        $("#gobtn").click(()=>{
					serv=choose(servers)
					da={"name":name}
					load("join",serv,()=>{
						console.log("id set")
						camvb[0]=Math.random()*result.bounds[0]
						camvb[1]=Math.random()*result.bounds[1]
						smode(1)
						playid=result.id
					})
		        })
		        $("#help").click(()=>{
		        	$("body").append(el("div",{"style":"position:absolute;min-width:100vw;min-height:100vh;background-color:black;top:0;left:0;opacity:0.5","id":"hblack"}))
		        	$("body").append(el("div",{"style":"position:absolute;min-width:50vw;min-height:50vh;background-color:#C0C0C0;top:25vh;left:25vw;opacity:1","id":"hcont"},"<span style='color:#777777;top:0;left:0;font-size:2.5vw' id='chelp'>&#10006;</span>"))
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
			mode1()
			break
		case 2:
			if(ff){
				$("svg").append(svgel("g",{"id":"statsmodal"}))
				$("#statsmodal").append(svgel("rect",{"x":camvb[0],"y":camvb[1],"width":camvb[2],"height":camvb[3],"opacity":0.5}))
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
	if(players[playid]==undefined){
		console.log("player undefined")
		mode=2
		newmode=true
		return
	}
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
				crespr("coll0")
				crespr("coll1")
				$("svg").append(svgel("g",{"id":"sprites","transform":"translate(-1000,-1000)"},""))
				$("svg").append(svgel("g",{"id":"stats"},"<rect fill='#dddddd' opacity='0.75' id='statbar'>"))
				$("#stats").append(svgel("text",{"id":"score","clip-path":"url(#ctext)"},"Score: 0"))
				$("#stats").append(svgel("text",{"id":"name","clip-path":"url(#ctext)"},"Name: "+name))
				$("#stats").append(svgel("text",{"id":"res0","clip-path":"url(#ctext)"},": 0"))
				$("#stats").append(svgel("text",{"id":"res1","clip-path":"url(#ctext)"},": 0"))
				$("#stats").append(svgel("use",{"id":"resspr0","href":"#coll0"}))
				$("#stats").append(svgel("use",{"id":"resspr1","href":"#coll1"}))
				$("#stats").append(svgel("clipPath",{"id":"ctext"},"<rect y='0' id='ctrect'>"))
				$("#stats").append(svgel("g",{"id":"buihold","clip-path":"url(#buiclp)"}))
				reqs=7/90*camvb[2]
				$("#buihold").append(svgel("g",{"id":"builds","scrl":0}))
				$("#stats").append(svgel("clipPath",{"id":"buiclp"},"<rect x='"+(14*camvb[2]/45)+"' y='0' width='"+reqs*4+"' height='"+reqs+"'>"))
				$("#stats").append(svgel("g",{"transform":"translate("+reqs*2+")","id":"more"}))
				$("#more").append(svgel("rect",{"id":"recmore","width":reqs,"height":reqs,"x":0,"y":0,"fill":"#777777"}))
				$("#more").append(svgel("text",{"id":"texmore","x":0.5*reqs,"y":0.5*reqs,"text-anchor":"middle"},"More..."))
				$("#recmore").click(()=>{
					$("svg").append(svgel("rect",{"width":camvb[2],"height":camvb[3],"id":"morerect","opacity":"0.5","fill":"#000000"}))
					$("svg").append(svgel("rect",{"width":camvb[2]*3/4,"height":camvb[3]*3/4,"id":"morecont","fill":"#c0c0c0"}))
					$("svg").append(svgel("g",{"id":"morecontent"}))
					$("#morecontent").append(svgel("text",{"x":camvb[2]*3/8,"y":camvb[3]/30,"font-size":camvb[3]/30,"text-anchor":"middle"},"Create Defensive Building"))
					$("#morecontent").append(svgel("text",{"x":camvb[2]*88/120,"y":camvb[2]/60,"font-size":camvb[2]/60,"id":"closemore"},"&#10006;"))
					$("#morecontent").append(svgel("text",{"x":0,"y":0,"font-size":camvb[2]/50},"Type of projectile:"))
					$("#morecontent").append(svgel("text",{"x":0,"y":0,"font-size":camvb[2]/50},"Fire rate"))
					$("#morecontent").append(svgel("text",{"x":0,"y":0,"font-size":camvb[2]/50},"Damage per second"))
					$("#morecontent").append(svgel("text",{"x":0,"y":0,"font-size":camvb[2]/50},"Ground/air:"))
					$("#morecontent").append(svgel("text",{"x":0,"y":0,"font-size":camvb[2]/50},"Cost:"))
					$("#closemore").click(()=>{
						$("#morecont,#morerect,#morecontent").remove()
					})
				})
				for(id=0;id<pres.length;id++){
					i=pres[id][0]
					crespr(i.type)
					btile=$(svgel("g",{"transform":"translate("+
					id*reqs+",0)","id":"bui"+id}))
					sca=(reqs/2)/Math.max.apply(null,i.size)
					btile.append(svgel("rect",{"width":reqs,"height":reqs,"x":0,"y":0,"rx":camvb[2]/250,"ry":camvb[3]/250,"class":"btrect"}))
					btile.append(svgel("use",{"href":"#"+i.type,"transform":"scale("+sca+")","x":0,"y":0,"class":"buitile","stroke":"#808080","fill":"#404040"},""))
				    btile.append(svgel("text",{"fill":"#ffffff","y":reqs/16,"x":0,"alignment-baseline":"middle","text-anchor":"start","font-size":reqs/8},i.name))
				    btile.append(svgel("text",{"fill":"#ffffff","y":5*reqs/8,"x":reqs/4,"alignment-baseline":"middle","text-anchor":"start","font-size":3*reqs/20},i.cost[0]))
				    btile.append(svgel("text",{"fill":"#ffffff","y":7*reqs/8,"x":reqs/4,"alignment-baseline":"middle","text-anchor":"start","font-size":3*reqs/20},i.cost[1]))
				    btile.append(svgel("use",{"x":(reqs/4-5)/2,"y":reqs/2+2.5,"href":"#coll0"}))
				    btile.append(svgel("use",{"x":(reqs/4-5)/2,"y":3*reqs/4+2.5,"href":"#coll1"}))
					btile.click((n)=>{
						$(".btrect").css("stroke","none")
						if($("#r"+n.currentTarget.id+".phrect").toArray().length){
							$(".phrect,#buiprev,#buirange").remove()
						}else{
							buiobj=pres[n.currentTarget.id.slice(3)][0]
							$(".phrect,#buiprev,#buirange").remove()
							$(".btrect",n.currentTarget).css("stroke","#ffffff")
							$("svg").append(svgel("rect",{"x":camvb[0],"y":camvb[1]+0.1*camvb[3],"width":camvb[2],"height":0.9*camvb[3],"fill":"#ffffff","stroke":"none","opacity":0,"class":"phrect","id":"r"+n.currentTarget.id}))
							$("svg").append(svgel("use",{"id":"buiprev","href":"#"+buiobj.type,"x":0,"y":0,"opacity":0,"stroke":"#808080","fill":"#404040"}))
							$("svg").prepend(svgel("circle",{"id":"buirange","r":buiobj.radius,"cx":0,"cy":0,"opacity":0,"fill":"#ff7700","stroke":"#ffff00","stroke-width":camvb[2]/100}))
							$(".phrect").click((e)=>{
								tre=e.currentTarget.getBoundingClientRect()
								relw=tre.width/camvb[2]
								relh=tre.height/0.9/camvb[3]
								relx=tre.left
								rely=tre.top-relh*camvb[3]*0.1
								pcos=[(e.pageX-relx)/relw,(e.pageY-rely)/relh]
								prse=Object.assign({},pres[n.currentTarget.id.slice(3)][0])
								crds=[camvb[0]+pcos[0]-prse.size[0]/2,camvb[1]+pcos[1]-prse.size[1]/2]
								$("#buiprev,#buirange")
								.css("opacity",0.5)
								$("#buiprev")
								.attr("x",crds[0])
								.attr("y",crds[1])
								$("#buirange")
								.attr("cx",crds[0]+prse.size[0]/2)
								.attr("cy",crds[1]+prse.size[1]/2)
								prse.pos=crds
								prse.rot=0
							})
							$("#buiprev").click((e)=>{
								da.build=prse
								$(".phrect,#buiprev,#buirange").remove()
								$(".btrect").css("stroke","none")
							})
						}
					})
					$("#builds").append(btile)
				}
				$("#stats").append(svgel("polygon",{"id":"larrow"}))
				$("#larrow").click(()=>{
					scrbar(-reqs)
				})
				$("#stats").append(svgel("polygon",{"id":"rarrow"}))
				$("#rarrow").click(()=>{
					scrbar(reqs)
				})
			}
			for(en of entities.concat(buildings)){
				if(en.id[0]==="E"){
					en.pos[0]+=en.vel[0]/60
					en.pos[1]+=en.vel[1]/60
				}
				ty=en.type
				ids=$("g#sprites").children().toArray().map(a=>a.id)
				if(!ids.includes(ty)){
					crespr(ty)
				}
				allids=$("#objects").children().toArray().map(a=>a.id)
				if((en.pos[0]-camvb[0]>0)&&(en.pos[0]-camvb[0]<camvb[2])&&(en.pos[1]-camvb[1]>0)&&(en.pos[1]-camvb[1]<camvb[3])){
					if(!allids.includes(en.id+"")){
						spr=$(svgel("use",{"href":"#"+ty,"id":en.id,"class":"object","stroke":en.player?en.player.stroke:undefined,"fill":en.player?en.player.fill:undefined}))
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
			$("#resspr0")
			.attr("y",camvb[3]/24-colwid/2)
			$("#resspr1")
			.attr("y",camvb[3]*7/120-colwid/2)
			$("#resspr0,#resspr1")
			.attr("x",colwid*0.5)
			$("#res0,#res1")
			.attr("x",colwid*2)
			$("#ctrect")
			.attr("x",0)
			.attr("width",camvb[2]*7/45)
			.attr("height",0.1*camvb[3])
			$(".phrect")
			.attr("x",camvb[0])
			.attr("y",camvb[1]+0.1*camvb[3])
			reqs=7/90*camvb[2]
			$("#more")
			.attr("transform","translate("+reqs*2+")")
			$("#recmore")
			.attr("x",0)
			.attr("y",0)
			.attr("width",reqs)
			.attr("height",reqs)
			$("#texmore")
			.attr("x",0.5*reqs)
			.attr("y",0.5*reqs)
			.attr("font-size",camvb[2]/75)
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
				.attr("transform","scale("+reqs/2/Math.max.apply(null,pres[id][0].size)+")")
			})
			$("#morecontent")
			.attr("transform","translate("+(camvb[0]+camvb[2]/8)+","+(camvb[1]+camvb[3]/8)+")")
			$("rect","#buiclp")
			.attr("x",(14*camvb[2]/45))
			.attr("y",0)
			.attr("width",4*reqs)
			.attr("height",reqs)
			$(".btrect")
			.attr("width",reqs)
			.attr("height",reqs)
			$("#stats>rect,#recmore")
			.attr("rx",camvb[2]/250)
			.attr("ry",camvb[3]/250)
			$("#morerect")
			.attr("x",camvb[0])
			.attr("y",camvb[1])
			.attr("width",camvb[2])
			.attr("height",camvb[3])
			$("#morecont")
			.attr("x",camvb[0]+camvb[2]/8)
			.attr("y",camvb[1]+camvb[3]/8)
			.attr("width",camvb[2]*3/4)
			.attr("height",camvb[3]*3/4)
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
}
function clev(el){
	k=el.id.slice(1)
	en=(el.id[0]==="E")?entities[k]:buildings[k]
	console.log("click",en)
	if(en.type.slice(0,4)=="coll")da.collect=en.id
	if(en.id[0]==="B"){
		$("#buildgui").remove()
    	$("svg").append(svgel("g",{"id":"buildgui","transform":"translate("+(en.pos[0]+en.size[0])+","+(en.pos[1]+en.size[1])+")"}))
    	$("#buildgui").append(svgel("rect",{"x":0,"y":0,"width":camvb[2]/3,"height":camvb[3]/3,"fill":"#777777"}))
    	$("#buildgui").append(svgel("text",{"x":0,"y":0,"font-size":camvb[2]/60,"fill":"#ffffff","alignment-baseline":"hanging","text-anchor":"start"},en.name+" Level "+en.level))
    	$("#buildgui").append(svgel("rect",{"x":camvb[2]/48,"y":camvb[3]*25/96,"width":camvb[3]/8,"height":camvb[3]/16,"id":"buildbtn1"}))
    	$("#buildgui").append(svgel("text",{"x":camvb[2]/12,"y":camvb[3]*7/24,"alignment-baseline":"middle","text-anchor":"middle","fill":"#ffffff","id":"buildbtntx1"},"Upgrade"))
    	$("#buildgui").append(svgel("rect",{"x":9*camvb[2]/48,"y":camvb[3]*25/96,"width":camvb[3]/8,"height":camvb[3]/16,"id":"buildbtn2"}))
    	$("#buildgui").append(svgel("text",{"x":camvb[2]/4,"y":camvb[3]*7/24,"alignment-baseline":"middle","text-anchor":"middle","fill":"#ffffff","id":"buildbtntx2"},"Do something"))
    	$("#buildbtn1,#buildbtntx1").click(()=>{
    		console.log("this")
    		$("#buildgui").mouseleave()
    		da.upgrade=en.id
    	})
    	$("#buildgui").mouseleave((ev)=>{
    		console.log(ev.currentTarget)
    		$("#buildgui").remove()
    	})
    }
}