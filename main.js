var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //loads the images for the bullet and the player
    game.load.image('player', 'assets/sprites/beball1.png');
    game.load.image('bullet', 'assets/sprites/enemy-bullet.png');
    game.load.image('zombie', 'assets/sprites/zombieSprite.png');
}

var sprite;
var zombies;
var bullets;
var shotsFired = 0;
var shotsFiredString = '';
var shotsFiredText;
var shotsAccuracy = shotsFired/hits;
var shotsAccuracyString = '';
var shotsAccuracyText;
var hits = 0;
var fireRate = 350;
var nextFire = 0;
var zombieReset = 16;
var zombiesString = '';
var zombiesText;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //////game.physics.startSystem(Phaser.Physics.P2JS);
    //the background
    game.stage.backgroundColor = '#000000';
    /////game.world.setBounds(0,0,1000, 600);
    //the bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(10000, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);    
    //the player spawns middle of the map
    sprite = game.add.sprite(500, 300, 'player');
    sprite.scale.set(.75); //sets the size of the player
    sprite.anchor.set(0.5);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.allowRotation = false;
    ///////game.physics.p2.enable(sprite, true);
    //the zombies
    zombies = game.add.group();
    zombies.enableBody = true;
    zombies.physicsBodyType = Phaser.Physics.ARCADE;
    //spawns first round of zombies
    spawnZombies();
    //the shots fired/accuracy and zombies killed
    shotsFiredString = 'Shots Fired: ';
    shotsFiredText = game.add.text(10, 10, shotsFiredString + shotsFired, { font: '14px Arial', fill: '#fff' });
    shotsAccuracyString = 'Shots Accuracy: ';
    shotsAccuracyText = game.add.text(10, 22, shotsAccuracyString + shotsAccuracy, { font: '14px Arial', fill: '#fff' });
    zombiesString = 'Zombies Killed: ';
    zombiesText = game.add.text(10, 34, zombiesString + hits, { font: '14px Arial', fill: '#fff' });
}

function spawnZombies() {
    // spawns 3x2 zombies randomly spawned on the bottom and the top of the screen
    for (var count = 0; count < 8; count++) {
        var newZombie = zombies.create(game.rnd.integerInRange(100, 900), game.rnd.integerInRange(50, 100), 'zombie');
        newZombie.scale.set(.75);
        var newZombie = zombies.create(game.rnd.integerInRange(100, 900), game.rnd.integerInRange(500, 550), 'zombie');
        newZombie.scale.set(.75);
    }
}

function hitDetection(bullet, zombie) {
    //when a bullet hits a zombie it kills both the bullet and the zombie
    bullet.kill();
    zombie.kill();
    //changes the accuracy of the player and the zombies killed
    hits++;
    zombiesText.text = zombiesString + hits;
    shotsAccuracy = hits / shotsFired;
    shotsAccuracy = shotsAccuracy * 100;
    shotsAccuracyText.text = shotsAccuracyString + shotsAccuracy.toFixed(0) + '%';
    //onces all the zombies die it will spawn a new set of zombies
    zombieReset--;
    if (zombieReset == 0) {
        spawnZombies();
        zombieReset = 16;
    }
}

function playerDamage(hero, zombie) {
    //when the player touches the zombie it kills the player
    hero.kill();
}

function update() {
    //checks if sprite is alive
    if (sprite.alive) {
        //rotates the sprite to where the cursor is 
        sprite.rotation = game.physics.arcade.angleToPointer(sprite);
        //shoots the bullets
        if (game.input.activePointer.isDown) {
            shoot();
        }
        //the player movement using WASD, can change the speed by changing the numbers
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            sprite.x -= 3;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            sprite.x += 3;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            sprite.y -= 3;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            sprite.y += 3;
        }
        //this is for bullet collision and player damage
        game.physics.arcade.overlap(bullets, zombies, hitDetection, null, this);
        game.physics.arcade.overlap(sprite, zombies, playerDamage, null, this);
    }
}

function shoot() {
    //shooting mechanic where you can change the firerate, bullet speed, and how many bullets you allow alive
    if (game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(sprite.x - 8, sprite.y - 8);
        game.physics.arcade.moveToPointer(bullet, 450);
        //changes the shots fired and accuracy of the player
        shotsFired++;
        shotsFiredText.text = shotsFiredString + shotsFired;
        shotsAccuracy = hits / shotsFired;
        shotsAccuracy = shotsAccuracy * 100;
        shotsAccuracyText.text = shotsAccuracyString + shotsAccuracy.toFixed(0) + '%';
    }

}

function render() {
    //used for debugging
    //game.debug.text('Active Bullets: ' + bullets.countLiving(), 32, 32);
    //game.debug.text('Bullets Fired: ' + bullets.countDead(), 32, 42);
    
}

