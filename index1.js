var config = {
    type: Phaser.AUTO,
    width: 625,
    height: 300,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var plataforms;
var player;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background1', 'assets/background1.png');
    this.load.image('chão', 'assets/chão.png');
    this.load.spritesheet('green', 'assets/green.png', { frameWidth: 29.7 , frameHeight: 50 });

}

function create() {
    this.add.image(312.5, 210, 'background1');

    platforms = this.physics.add.staticGroup();

    platforms.create(312.5, 290, 'chão').refreshBody();

    player = this.physics.add.sprite(190, 32, 'green')
   
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('green', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'green', frame: 3 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('green', { start: 4, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-200);
    }
}