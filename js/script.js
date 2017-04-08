var chessBoard = []
var me = true; 
var over = false;

//赢法数组
var win = [];
//赢法统计数组
var mywin = [];
var computerwin = [];


for(var i=0; i<15;i++)
{
	chessBoard[i] = [];
	for(var j=0; j<15; j++)
	{
		chessBoard[i][j] = 0;
	}
}


for(var i=0; i<15;i++)
{
	win[i] = [];
	for(var j=0; j<15; j++)
	{
		win[i][j] = [];
	}
}


//赢法种类的索引
var count = 0;
//横线赢法
for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			win[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线赢法
for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			win[j+k][i][count] = true;
		}
		count++;
	}
}
//斜线赢法
for(var i=0;i<11;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			win[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线赢法
for(var i=0;i<11;i++)
{
	for(var j=14;j>3;j--)
	{
		for(var k=0;k<5;k++)
		{
			win[i+k][j-k][count] = true;
		}
		count++;
	}
}

for(var i=0;i<count;i++)
{
	mywin[i] = 0;
	computerwin[i] = 0;
}




var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = '#BFBFBF';

for(var i=0; i<15; i++)
{
	context.moveTo(15 + i*30,15);	//画棋盘的竖线
	context.lineTo(15 + i*30,435);
	context.stroke();

	context.moveTo(15,15 + i*30);	//画棋盘的横线
	context.lineTo(435,15 + i*30);
	context.stroke();

}

var oneStep = function(i,j,me){

	context.beginPath();
	context.arc(15 + i*30,15 + j*30,13,0,2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30+2,15 + j*30-2,13,15 + i*30+2,15 + j*30-2,0);

	if(me)
	{
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	}
	else
	{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}

	context.fillStyle = gradient;
	context.fill();
}
chess.onclick = function(e)
{
	if(over)
	{
		return;
	}
	if(!me)
	{
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30); 
	var j = Math.floor(y/30); 
	if(chessBoard[i][j] === 0)
	{
		oneStep(i,j,me);
		chessBoard[i][j] = 1;
		for(var k=0;k<count;k++)
		{
			if(win[i][j][k])
			{
				mywin[k]++;
				computerwin[k] = 6;
				if(mywin[k] == 5)
				{
					window.alert("你赢了");
					over = true;
				}
			}
		}
		if(!over)
		{
			me = !me;
			computerAI();
		}
	}

}
var computerAI = function()
{
	var myscore = [];
	var computerscore = [];
	var max = 0;
	var u = 0,v = 0;
	for(var i=0;i<15;i++)
	{
		myscore[i] = [];
		computerscore[i] = [];
		for(var j=0;j<15;j++)
		{
			myscore[i][j] = 0;
			computerscore[i][j] = 0;
		}
	}
	for(var i=0; i<15;i++)
	{
		for(var j=0; j<15;j++)
		{
			if(chessBoard[i][j]==0)
			{
				for(var k=0;k<count;k++)
				{
					if(win[i][j][k])
					{
						if(mywin[k] == 1)
						{
							myscore[i][j] += 200;
						}
						else if(mywin[k] == 2)
						{
							myscore[i][j] += 400;
						}
						else if(mywin[k] == 3)
						{
							myscore[i][j] += 2000;
						}
						else if (mywin[k] == 4)
						{
							myscore[i][j] += 10000;
						}

						if(computerwin[k] == 1)
						{
							computerscore[i][j] += 223;
						}
						else if(computerwin[k] == 2)
						{
							computerscore[i][j] += 430;
						}
						else if(computerwin[k] == 3)
						{
							computerscore[i][j] += 2200;
						}
						else if (computerwin[k] == 4)
						{
							computerscore[i][j] += 20000;
						}

					}
				}
				if(myscore[i][j] > max)
				{
					max = myscore[i][j]
					u = i;
					v = j;
				}
				else if(myscore[i][j] == max)
				{
					if(computerscore[i][j] > computerscore[u][v])
					{
						u = i;
						v = j;
					}
				}

				if(computerscore[i][j] > max)
				{
					max = computerscore[i][j]
					u = i;
					v = j;
				}
				else if(computerscore[i][j] == max)
				{
					if(myscore[i][j] > myscore[u][v])
					{
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v] = 2;
	for(var k=0;k<count;k++)
		{
			if(win[u][v][k])
			{
				computerwin[k]++;
				mywin[k] = 6;
				if(computerwin[k] == 5)
				{
					window.alert("电脑赢了");
					over = true;
				}
			}
		}
		if(!over)
		{
			me = !me;
		}

}


