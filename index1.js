var config = {
    type: Phaser.AUTO,
    width: 625,
    height: 600,
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

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background1', 'assets/background1.png');
    this.load.image('chão', 'assets/chão.png');

}

function create() {
    this.add.image(312.5, 300, 'background1');

    platforms = this.physics.add.staticGroup();

    platforms.create(312.5, 377, 'chão').refreshBody();
}

function update() {
}