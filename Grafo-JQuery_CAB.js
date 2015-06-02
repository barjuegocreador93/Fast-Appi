//creado por Camilo Barbosa
function isJQ(html,html2)
{
	return $(html).is(html2);
}
function isReady(html)
{	
	return isJQ(html,":visible");	
}
//id activ(#) + class scla(#)
function actv(id)
{
	this.name="activ_";
	this.scla="scla_";
	this.txt=0;	
	this.levl=0;	
	this.nsca=0;	
	this.id=id;
	this.pres=0;
	this.run=function(Titulos_bool)	
	{
		var name=this.name;
		var scla=this.scla;
		var id=this.id;						
		$("#"+name+id+"").click(function()
		{
			
			if(!isJQ("."+name+id+"","scla_actual"))
			{
				$("."+scla+id+"").addClass("scla_actual");
			}
			else
			{
				$(".scla_actual").hide();
				$(".scla_actual").removeClass("scla_actual");
			}	
			
			for(i=1;isReady("."+scla+i+"")||isJQ("."+scla+i+"",":not(:visible)");i++)
			{
				if(id===i)
				{
					if(isJQ("#"+name+id+"",".activ_togg"))
					{
						$("."+scla+id+"").slideToggle();
					}
					else
					{
						$("#"+name+id+"").hide();
						$("."+scla+id+"").slideDown();
					}
					
				}
				else
				{
					$("#"+name+i+"").slideDown();			
					$("."+scla+i+"").slideUp();
					for(var j=1;isReady("#"+name+i+"_"+j+"")||isJQ("#"+name+i+"_"+j+"",":not(:visible)");j++)
					{
						$("#"+name+i+"_"+j+"").hide();
						$("."+scla+i+"_"+j+"").hide();
					}	
				}
				
			}
			for(i=1;isReady("#"+name+id+"_"+i+"")||isJQ("#"+name+id+"_"+i+"",":not(:visible)");i++)	
			{
				$("#"+name+id+"_"+i+"").slideDown();
			}
			$("."+scla+id+"_off").slideUp();		
				
		});		
		this.print();
		var tit = name+id+"";
		var bool=1;
		for(var i=1;i<=6;i++)
			{
				if(isJQ("."+this.scla+this.id+"",".Tit_"+i+""))
				{					
					$("."+this.scla+this.id+"").filter(".Tit_"+i+"").prepend("<h"+i+">"+$("#"+tit).text()+"</h"+i+">");
					bool=0;
				}
				
			}
			
		if(this.levl===1&&this.txt===0)this.txt=name.length;	
		if(bool&&!isJQ("."+this.scla+this.id+"",".scla_noTit")&&Titulos_bool)
		{
			if(name.length===this.txt)			
			$("."+this.scla+this.id+"").prepend("<h2>"+$("#"+tit).text()+"</h2>");
			else if(name.length===this.txt+1)			
			$("."+this.scla+this.id+"").prepend("<h3>"+$("#"+tit).text()+"</h3>");
			else if(name.length===this.txt+2)			
			$("."+this.scla+this.id+"").prepend("<h4>"+$("#"+tit).text()+"</h4>");
			else if(name.length===this.txt+4)			
			$("."+this.scla+this.id+"").prepend("<h5>"+$("#"+tit).text()+"</h5>");
			else if(name.length===this.txt+6)			
			$("."+this.scla+this.id+"").prepend("<h6>"+$("#"+tit).text()+"</h6>");			
		}		
	};	
	this.print=function()
	{
		$("button").css("cursor","pointer");
		//Fast-Appi
		if(isJQ("div","."+this.scla+this.id+""))
		{
			$("div").addClass("scla_noTit");
		}
		if(this.pres)
		{
			var name_1=this.name, id_1=this.id;
			for( var i=1;isReady("#"+name_1+id_1+"_"+i+"")||isJQ("#"+name_1+id_1+"_"+i+"",":not(:visible)");i++)	
			{
				$("#"+name_1+id_1+"_"+i+"").slideDown();				
			}			
			$("#"+name_1+id_1+"").hide();	
		}		
		else 
		{
			$("#"+this.name+this.id+""&&this.levl===1).slideDown();			
			$("."+this.scla+this.id+"").hide();
			var name=this.name, id=this.id;
			for( var i=1;isReady("#"+name+id+"_"+i+"")||isJQ("#"+name+id+"_"+i+"",":not(:visible)");i++)	
			{
				$("#"+name+id+"_"+i+"").hide();				
			}	
		}
					
	};
}
//------------------------
//html JQueryCAB
function doc(id,clase)
{
	this.ele=[];	
	this.max_lvl=0;	
	this.addTitulos_bool=1;
	this.name=id
	this.scla=clase;
	
	this.add=function(docs)
	{					
		this.ele.push(docs);		
	};	
	this.acction=function()
	{
		for(var i=0;i < this.ele.length; i++)
		{
			this.ele[i].run(this.addTitulos_bool);						
		}
	};
	this.main=function()
	{
		for(var i=1;isReady("#"+this.name+i+"")||isJQ("#"+this.name+i+"",":not(:visible)"); i++)
		{
			var x=new actv(i);
			x.name=this.name;
			x.scla=this.scla;
			this.max_lvl=x.levl=1;
			if(isJQ("#"+x.name+x.id+"",".activ_on"))x.pres=1;		
			this.add(x);
			delete x;
		}
		for(var i=0;i<this.ele.length;i++)
		{		
			for(var j=1;isReady("#"+this.ele[i].name+this.ele[i].id+"_"+j+"")||isJQ("#"+this.ele[i].name+this.ele[i].id+"_"+j+"",":not(:visible)");j++)
			{
				var x1= new actv(j);
				x1.name=this.ele[i].name+this.ele[i].id+"_";
				x1.scla=this.ele[i].scla+this.ele[i].id+"_";
				if(isJQ("#"+x1.name+x1.id+"",".activ_on"))x1.pres=1;
				if(this.ele[i].nsca===0)this.max_lvl++;
				this.ele[i].nsca++;
				x1.levl=this.max_lvl;						
				this.add(x1);			
				delete x1;			
			}				
		}		
		this.acction();
	};
	
}