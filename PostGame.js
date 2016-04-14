

var PostGame = {

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

        game.input.onDown.addOnce(restart, this);
                
    },

    update: function(){
        // nothing yet. we can add animations to the PostGame state later
    }
} 

function restart() {
    game.state.start('MenuState');
}