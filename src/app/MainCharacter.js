class MainCharacter extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setVelocity(0, 0);
        this.setOrigin(0.5);
        this.body.setSize(this.body.sourceWidth * 0.5, this.body.height, this.body.sourceWidth * 0.5, this.height)
        this.common;      
    }

    createJump(){
        this.scene.input.keyboard.addKey('SPACE');        
        this.scene.input.keyboard.on('keydown_SPACE', function() {
            this.jump();
        }, this);    
        
        this.scene.input.keyboard.addKey('UP');        
        this.scene.input.keyboard.on('keydown_UP', function() {
            this.jump();
        }, this);            
    }

    jump() {
        const bodyRule = this.body.onFloor() || this.body.touching.down;
        if ((bodyRule)) {
            this.setData('isDoubleJumping', false);
            this.body.setVelocityY(-280);
        }

        if (!this.body.onFloor() && !this.body.touching.down) {
            const itens = this.getData('itens');
            const isDoubleJumping = this.getData('isDoubleJumping');

            if (itens.doubleJump && !isDoubleJumping) {
                this.body.setVelocityY(-330);
                this.setData('isDoubleJumping', true);
            }
        }
    }

    checkCursorMoviment(context) {
        if(context.cursors.right.isDown && context.cursors.left.isDown) {
            this.body.setVelocityX(0);  
        }

        if (context.cursors.right.isDown) {
            this.flipX = false;
            this.body.setVelocityX(100);
        } else if (context.cursors.left.isDown) {
            this.flipX = true;
            this.body.setVelocityX(-100);
        } else {
            this.body.setVelocityX(0);
        }
    }
    configureMainCharacter() {
        this.setDataEnabled();
        this.setData({
            isDoubleJumping: false,
            lifePoints: 400,
            shield: 0,
            itens: {
                doubleJump: false,
                spear: false,
                armor: false
            }
        });
    }

    getDoubleJumpItem() {
        const itens = {...this.getData('itens')};
        itens.doubleJump = true;
        this.setData('itens', itens);
    }
}

export default MainCharacter;