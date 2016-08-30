var myBoard = [-1, -1 , -1 , -1, -1 , -1 ,-1, -1 , -1 ]
var currPlayer = 1;
var ch = ["O", "X"];

function move(i, c)
{
	if(myBoard[i-1] == -1)
	{
		myBoard[i-1] = c;
		$("#" + i)[0].innerHTML = ch[c];
		$("#" + i)[0].onclick = null;
	}
}

function play(i)
{
	move(i, currPlayer);
	currPlayer = (currPlayer+ 1)%2;
	var f = isVictory();
	if(f!=-1)
	{
		if(f!=2)
			alert(ch[f] + " has won");
		else
			alert("Valar Morghulis") //For lack of a better message
		var board = $(".board");
		for(var j in myBoard)
			myBoard[j].onclick = null;
	}

}

function isVictory(board)
{
	if(board == undefined)
		board = myBoard;
	for(var i=0; i<3; i++)
	{
		if( (board[i] == board[i+3] && board[i] == board[i+6]) && (board[i] != -1) )
		{
			//console.log("Column" + i)
			return board[i];
		}
	}
	var a = [0, 3, 6];
	for(var it in a)
	{
		var i = a[it];
		if( (board[i] == board[i+1]&& board[i] == board[i+2]) && (board[i] != -1) )
		{
			//console.log("Row" + i)
			return board[i];
		}
	}
	if ( ( (board[0] == board[4] && board[4] == board[8]) && (board[0] != -1)) ||
		 ( (board[6] == board[4] && board[4] == board[2]) && (board[2] != -1)) )
	{
		return board[4];
	}

	for(var i=0; i<9; i++)
	{
		if(board[i] == -1)
				return -1;
	}
	return 2;
}

function restart()
{
	myBoard = [-1, -1 , -1 , -1, -1 , -1 ,-1, -1 , -1 ];
    currPlayer = 1;
    restartEnv();
}
function restartEnv()
{
	var board = $("#board")[0];
	var html = '';
	for(var i=1; i<=3; i++)
	{
		html += "<tr>";
		for(var j=1; j<=3; j++)
		{
			var id = (i-1)*3 + j;
			html += "<td id=\"" + id + "\" class=\"board\" onclick='play("+id+");'></td>";
		}
		html += "</tr>";
	}
	board.innerHTML = html;
}

function getAllMoves(gBoard, player)
{
	var moves = [];
	for(var i=0; i<9; i++)
	{
		if( gBoard[i] == -1)
		{
			gBoard[i] = player;
			var b = [];
			for(var j in gBoard)
				b.push(gBoard[j])
			moves.push(b);
			gBoard[i] = -1;
		}
	}
	return moves;
}
var AIBot = {
	//Our Bot: It will be the best TicTacToe player ever
	
	//minimax
	
	minimax: function(gBoard, player)
	{
		var f = isVictory(gBoard);
		var bestValue, bestMove;
		bestMove = null;
		if(f == -1)
		{
			if( player == 0) // The max ply
			{
				bestValue = -Infinity;
				var moves = getAllMoves(gBoard, player);	
				for (var i in moves)
				{
					//console.log(moves[i])
					var scoreObject = AIBot.minmax(moves[i], 1 - player);
					if(scoreObject["value"] > bestValue)
					{
						bestValue = scoreObject["value"];
						bestMove = moves[i];
					}
				}
			}
			if(player == 1) // The min ply
			{
				bestValue = Infinity;
				var moves = getAllMoves(gBoard, player);
				for (var i in moves)
				{
					var scoreObject = AIBot.minmax(moves[i], 1 - player);
					if(scoreObject["value"] < bestValue)
					{
						bestValue = scoreObject["value"];
						bestMove = moves[i];
					}
				}
			}
		}
		else if(f==1)
		{
			bestValue = -10;
			bestMove = gBoard;
		}
		else if(f==0)
		{
			bestValue = 10;
			bestMove = gBoard;
		}
		else
		{
			bestValue = 0;
			bestMove = gBoard;
		}
		var score = {
					value: bestValue,
					move: bestMove
		};
		//console.log(score);
		return score;
	},

	move: function()
	{
		var score = AIBot.minmax(myBoard, 0);
		console.log(score);
		for(var i=0; i<9; i++)
		{
			if(score["move"][i] != myBoard[i])
			{
				play(i+1);
				console.log(i);
			}
		}
	}
}
