//var game = new Phaser.Game(1000,600,Phaser.CANVAS,'gamediv');

///Game.state.add('Boot', Game.Boot);
//Game.state.add('preload', Game.Preload);
game.state.add('MenuState', MenuState);
game.state.add('Game', GameState);
//Game.state.add('PostGame', PostGame);

game.state.start('MenuState');

