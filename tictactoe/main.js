(function($){
  $(document).ready(function(){
    var ticTacToe = {
      boardTopRow: [],
      boardMiddleRow: [],
      boardBottomRow: [],
      init: function (){
        this.cacheDom();
        this.bindEvents();
      },
      cacheDom: function (){
        this.$el = $('.game');
        this.$gameBoard = this.$el.find('.game__board');
        this.$topRow = this.$el.find('.game__board-row--top');
        this.$middleRow = this.$el.find('.game__board-row--middle');
        this.$bottomRow = this.$el.find('.game__board-row--bottom');
        this.$gameBoardPositions = this.$el.find('.board-square');
        this.$restart = this.$el.find('.game__restart');
      },
      bindEvents: function () {
        this.$gameBoard.on('click', '.board-square',  this.handleBoardClick.bind(this));
        this.$restart.on('click', this.restart.bind(this));
      },
      handleBoardClick: function(event){
        var $targetElement = $(event.target);
        if($targetElement.hasClass('board-square')) {
          var $targetParent = $targetElement.parent();
          if($targetParent.hasClass('game__board-row--top')){
            var elemIndex = $targetParent.children().index($targetElement);
            this.boardTopRow[elemIndex] = 1;
            this.$topRow[0].children[elemIndex].innerHTML = '<img src="img/X.png">';
            //check winner
            if(this.checkWinner()){
              alert('Game Over! Player Wins!');
            }else{ //if player didn't win let ai make move
              this.aiMove();
              if(this.checkWinner()){
                alert('Game Over! AI Wins!');
              }
            }
          }else{
            if($targetParent.hasClass('game__board-row--middle')){
              var elemIndexOne = $targetParent.children().index($targetElement);
              this.boardMiddleRow[elemIndexOne] = 1;
              this.$middleRow[0].children[elemIndexOne].innerHTML = '<img src="img/X.png">';
              //check winner
              if(this.checkWinner()){
                alert('Game Over! Player Wins!');
              }else{ //if player didn't win let ai make move
                this.aiMove();
                if(this.checkWinner()){
                  alert('Game Over! AI Wins!');
                }
              }
            }else{
              if($targetParent.hasClass('game__board-row--bottom')){
                var elemIndexTwo = $targetParent.children().index($targetElement);
                this.boardBottomRow[elemIndexTwo] = 1;
                this.$bottomRow[0].children[elemIndexTwo].innerHTML = '<img src="img/X.png">';
                //check winner
                if(this.checkWinner()){
                  alert('Game Over! Player Wins!');
                }else{ //if player didn't win let ai make move
                  this.aiMove();
                  if(this.checkWinner()){
                    alert('Game Over! AI Wins!');
                  }
                }
              }
            }
          }

        }
      },
      checkWinner: function(){
        var gameover = false;
        //check if player won
        if(this.boardTopRow[0] === 1 && this.boardTopRow[1] === 1 && this.boardTopRow[2] === 1){
          gameover = true;
        }else{
          if(this.boardTopRow[0] === 1 && this.boardMiddleRow[0] === 1 && this.boardBottomRow[0] === 1){
            gameover = true;
          }else{
            if(this.boardTopRow[2] === 1 && this.boardMiddleRow[2] === 1 && this.boardBottomRow[2] === 1){
              gameover = true;
            }else{
              if(this.boardBottomRow[0] === 1 && this.boardBottomRow[1] === 1 && this.boardBottomRow[2] === 1){
                gameover = true;
              }else{
                if(this.boardTopRow[0] === 1 && this.boardMiddleRow[1] === 1 && this.boardBottomRow[2] === 1){
                  gameover = true;
                }else{
                  if(this.boardTopRow[2] === 1 && this.boardMiddleRow[1] === 1 && this.boardBottomRow[0] === 1){
                    gameover = true;
                  }else{
                    if(this.boardMiddleRow[0] === 1 && this.boardMiddleRow[1] === 1 && this.boardMiddleRow[2] === 1){
                      gameover = true;
                    }
                  }
                }
              }
            }
          }
        }

        //check if computer won

        if(this.boardTopRow[0] === 0 && this.boardTopRow[1] === 0 && this.boardTopRow[2] === 0){
          gameover = true;
        }else{
          if(this.boardTopRow[0] === 0 && this.boardMiddleRow[0] === 0 && this.boardBottomRow[0] === 0){
            gameover = true;
          }else{
            if(this.boardTopRow[2] === 0 && this.boardMiddleRow[2] === 0 && this.boardBottomRow[2] === 0){
              gameover = true;
            }else{
              if(this.boardBottomRow[0] === 0 && this.boardBottomRow[1] === 0 && this.boardBottomRow[2] === 0){
                gameover = true;
              }else{
                if(this.boardTopRow[0] === 0 && this.boardMiddleRow[1] === 0 && this.boardBottomRow[2] === 0){
                  gameover = true;
                }else{
                  if(this.boardTopRow[2] === 0 && this.boardMiddleRow[1] === 0 && this.boardBottomRow[0] === 0){
                    gameover = true;
                  }else{
                    if(this.boardMiddleRow[0] === 0 && this.boardMiddleRow[1] === 0 && this.boardMiddleRow[2] === 0){
                      gameover = true;
                    }
                  }
                }
              }
            }
          }
        }
        return gameover;
      },
      aiMove: function(){
        var moveRowNum = this.aiMoveRow();
        var moveRowIndex;
        if(moveRowNum === 0){
          moveRowIndex = this.aiMoveIndex(this.boardTopRow);
          this.boardTopRow[moveRowIndex] = 0; //make move
          this.$topRow[0].children[moveRowIndex].innerHTML = '<img src="img/O.png">';
        }else{
          if(moveRowNum === 1){
            moveRowIndex = this.aiMoveIndex(this.boardMiddleRow);
            this.boardMiddleRow[moveRowIndex] = 0; //make move
            this.$middleRow[0].children[moveRowIndex].innerHTML = '<img src="img/O.png">';
          }else{
            moveRowIndex = this.aiMoveIndex(this.boardBottomRow);
            this.boardBottomRow[moveRowIndex] = 0; //make move
            this.$bottomRow[0].children[moveRowIndex].innerHTML = '<img src="img/O.png">';
          }
        }
      },
      aiMoveRow: function(){
        var rowFull = true;
        var row = Math.floor(Math.random() * 3);//choose the top, middle or bottom board row
        while(rowFull === true ){
          if(row === 0){
            var rowMoves = 0;
            var i;
            for(i = 0; i < this.boardTopRow.length; i++){
              if(this.boardTopRow[i] === 1 || this.boardTopRow[i] === 0){
                rowMoves++;
              }
            }
            if(rowMoves === 3){
              row = Math.floor(Math.random() * 3);
            }else{
              rowFull = false;
            }
          }else{
            if(row === 1){
              var rowMovesOne = 0;
              var j;
              for(j = 0; j < this.boardTopRow.length; j++){
                if(this.boardMiddleRow[j] === 1 || this.boardMiddleRow[j] === 0){
                  rowMovesOne++;
                }
              }
              if(rowMovesOne === 3){
                row = Math.floor(Math.random() * 3);
              }else{
                rowFull = false;
              }
            }else{
              if(row === 2){
                var rowMovesTwo = 0;
                var k;
                for(k = 0; k < this.boardBottomRow.length; k++){
                  if(this.boardBottomRow[k] === 1 || this.boardBottomRow[k] === 0){
                    rowMovesTwo++;
                  }
                }
                if(rowMovesTwo === 3){
                  row = Math.floor(Math.random() * 3);
                }else{
                  rowFull = false;
                }
              }
            }
          }
        }
        return row;
      },
      aiMoveIndex: function(array){
        var index = Math.floor(Math.random() * 3);
        while(array[index] === 1 || array[index] === 0){
          index = Math.floor(Math.random() * 3);
        }
        return index;
      },
      restart: function(){
        $.each(this.$gameBoardPositions, function(index, value){
          value.innerHTML = '';
          this.boardTopRow = [];
          this.boardMiddleRow = [];
          this.boardBottomRow = [];
        });
      }
    }

    ticTacToe.init();
  })
})(jQuery)