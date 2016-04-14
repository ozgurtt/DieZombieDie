var game = new Phaser.Game(1000,600,Phaser.CANVAS,'gamediv');

// width and height of game
var width = 800;
var height = 600;

//global variables go here:
var timer;
var diceVal;
var button;
var titleDie;

var startMenuStage = {

	preload:function() {

		game.load.image('zombiehead', 'assets/sprites/zombie-head.png');
		game.load.image('startButton', 'assets/sprites/rollthedice.png');


		// dice spritesheet taken from opengameart.org/content/boardgame-pack
    	// credit to Kenney.nl
		game.load.spritesheet('dice', 'assets/sprites/diceRed.png', 64, 64);

	},

	create:function() {
		
		game.stage.backgroundColor = '#000000';
    	emitter = game.add.emitter(game.world.leftX, -75, 200);
    	emitter.makeParticles('zombiehead');
    	emitter.start(false, 5000, 20);

    	// define the title and game instructions
    	var title = " - DieZomebieDie -";
    	var slogan = "Roll the dice. Try to survive.";
    	var howToPlay = "How to play:";
    	var instructions = "-Arrow keys to move." + "\n" + "-Spacebar to shoot.";


    	// define the title and game instructions styles
    	var instructionsStyle = { font: "30px Impact", fill: "#666", align: "center" };
    	var titleStyle = { font: "75px Impact", fill: "#560000", align: "center" };
    	var sloganStyle = { font: "30px Impact", fill: "#560000", align: "center" };


    	// render the title and game instructions to correct position on canvas
    	var ttl = game.add.text(game.world.centerX-70, 0, title, titleStyle);
    	var slg = game.add.text(game.world.centerX, 75, slogan, sloganStyle);
    	var htp = game.add.text(game.world.centerX-50, 150, howToPlay, instructionsStyle);
    	var ins = game.add.text(game.world.centerX, 185, instructions, instructionsStyle);

    	titleDie = game.add.sprite(800, 195, 'dice');

    	game.input.onDown.addOnce(rollComplete, this);
    			
    	
    	



	},
	

	update:function() {

		titleDie.frame = game.rnd.pick([0,1,2,4,5,6]);

	}

}


//currently unused function
function roll() {

	var titleDie = game.add.sprite(800, 195, 'dice');

	var frames = [];
    	for (var i=0; i < 1000; i++) {
        	frames[i] = game.rnd.pick([0,1,2,4,5,6]);
   		}

    	titleDie.animations.add('roll', frames);
    	titleDie.animations.play('roll', 500);


	};

function rollComplete() {

	var titleDie = game.add.sprite(800, 195, 'dice');
	titleDie.animations.stop(null, true);
	titleDie.frame = game.rnd.pick([0,1,2,4,5,6]);

	switch(titleDie.frame) {
    case 0:
        diceVal = 6;
        break;
    case 1:
        diceVal = 1;
        break;
    case 2:
        diceVal = 2;
        break;
    case 4:
        diceVal = 5;
        break;
    case 5:
        diceVal = 3;
        break;
    case 6:
        diceVal = 4;
        break;
    default:
        return null;
        break;
    }
};



var gameOverStage = {

    preload: function(){
        game.load.image('startButton', 'assets/sprites/start.png');
    },

    create: function(){

        game.stage.backgroundColor = '#000000';

        // define the title and game instructions
        var title = " - Game Over -";
        var disclaimer = "The producers of DieZomebieDie did not \nharm any zombies in the making of this game.";
        //var howToPlay = "How to play:";
        //var instructions = "-Arrow keys to move." + "\n" + "-Spacebar to shoot.";


        // define the title and game instructions styles
        var titleStyle = { font: "75px Impact", fill: "#560000", align: "center" };
        var disclaimerStyle = { font: "30px Impact", fill: "#666", align: "center" };


        // render the title and game instructions to correct position on canvas
        var ttl = game.add.text(game.world.centerX-70, 0, title, titleStyle);
        var slg = game.add.text(game.world.centerX-125, 95, disclaimer, disclaimerStyle);

        game.add.sprite(800, 295, 'startButton');

        //game.input.onDown.addOnce(rollComplete, this);
                
    },

    update: function(){

    }
} 

var gameStage = {

    preload: function(){

    },

    create: function(){

    }, 

    update: function(){
        //update the player
        //update the zombies
        //update projectiles
        //detect collisions
        //update stats and timer
    }
}


game.state.add('startMenuStage', startMenuStage);
game.state.add('gameOverStage', gameOverStage);
game.state.add('gameStage', gameStage);
game.state.start('startMenuStage');

