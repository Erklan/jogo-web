var config = {
    type: Phaser.AUTO,
    width: 900,
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

var plataforms;
var player;
var objects;
var wall;
var cursors;
var up;
var left;
var right;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background1', 'assets/background-preto.jpg');
    this.load.image('chão', 'assets/floor.png');
    this.load.image('parede', 'assets/wall.png');
    this.load.image('porta', 'assets/porta.png');
    this.load.image('porta2', 'assets/Porta destaque.jpg');
    this.load.image('janela', 'assets/janela1aberta.png');
    this.load.image('mesa', 'assets/mesa.png');
    this.load.image('janela2', 'assets/janela2aberta.jpg');
    this.load.image('pombo', 'assets/Pombo destaque.png');
    this.load.spritesheet('green', 'assets/green.png', { frameWidth: 29.7, frameHeight: 50 });
    this.load.spritesheet('red', 'assets/red.png', { frameWidth: 29.7, frameHeight: 50 });

}

function create() {
    //configurações background
    this.add.image(800, 600, 'background1');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 600, 'chão').refreshBody();
    platforms.create(150, 270, 'chão').refreshBody();
    platforms.create(1250, 400, 'chão').refreshBody();
   
    wall = this.physics.add.staticGroup();
    wall.create(450, 300, 'parede');
    
    //objetos da cena
    objects = this.physics.add.staticGroup();
    objects.create(350, 513, 'porta');
    objects.create(825, 510, 'porta2');
    objects.create(370, 180, 'porta2');
    objects.create(70, 180, 'porta');
    objects.create(220, 160, 'janela');
    objects.create(530, 223, 'mesa');
    objects.create(570, 490, 'janela');
    objects.create(223, 192, 'pombo');

    //jogador 1
    player1 = this.physics.add.sprite(150, 560, 'green')
    player1.setCollideWorldBounds(true);
    player1.setBounce(0.1);
    //jogadorm2
    player2 = this.physics.add.sprite(825, 360, 'red')
    player2.setCollideWorldBounds(true);
    player2.setBounce(0.1);

    //colisão de jogadores com backgroung
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player1, wall);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player2, wall);

    //animação jogador 1
    this.anims.create({
        key: 'left1',
        frames: this.anims.generateFrameNumbers('green', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn1',
        frames: [{ key: 'green', frame: 3 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right1',
        frames: this.anims.generateFrameNumbers('green', { start: 4, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    //animação jogador 2
    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('red', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn2',
        frames: [{ key: 'red', frame: 3 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('red', { start: 4, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    //movimentação de jogadores
    cursors = this.input.keyboard.createCursorKeys();
    up = this.input.keyboard.addKey("W");
    left = this.input.keyboard.addKey("A");
    right = this.input.keyboard.addKey("D");
}  
 
function update() {
    //movimentação jogador 1 (por setas)
    if (cursors.left.isDown) {
        player1.setVelocityX(-160);

        player1.anims.play('left1', true);
    }
    else if (cursors.right.isDown) {
        player1.setVelocityX(160);

        player1.anims.play('right1', true);
    }
    else {
        player1.setVelocityX(0);

        player1.anims.play('turn1');
    }
    if (cursors.up.isDown && player1.body.touching.down) {
        player1.setVelocityY(-350);
    }
    //movimentação jogador 2 (teclas WAD)
    if (left.isDown) {
        player2.setVelocityX(-160);

        player2.anims.play("left2", true);
    }
    else if (right.isDown) {
        player2.setVelocityX(160);

        player2.anims.play("right2", true);
    }
    else {
        player2.setVelocityX(0);
        
        player2.anims.play('turn2');
    }
    if (up.isDown && player2.body.touching.down) {
        player2.setVelocityY(-350);
    }
}