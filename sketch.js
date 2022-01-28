        var PLAY = 1;
        var END = 0;
        var gameState = PLAY;

        var Ninja, Ninja_Running, Ninja_Died, NinjaStanding;

        var invisibleGround;

        var obstaclesGroup, obstacle1, obstacle2, obstacle3;

        var gameOverImg;
        

        var backgroundSound;

        var bg, bg1;
        var score = 0;



        function preload(){

        Ninja_Running = loadAnimation("ninja1.png", "ninja2.png", "ninja3.png", "ninja4.png", "ninja5.png");
        Ninja_Running.frameDelay = 10;
        Ninja_Died = loadAnimation("ninjaDie.png");
        NinjaStanding = loadAnimation("StandingNinja.png");

        obstacle1 = loadImage("obstacle1.png");
        obstacle2 = loadImage("obstacle2.png");
        obstacle3 = loadImage("obstacle3.png");

        gameOverImg = loadImage("GameOver.png");
        

        bg = loadImage("Background.png");
        /*
        Sakuya by PeriTune | https://peritune.com/
        Creative Commons Attribution 3.0 Unported License
        https://creativecommons.org/licenses/by/4.0/
        Music promoted by https://www.chosic.com/free-music/all/ 
        */
        backgroundSound = loadSound("Sakuya.mp3");

        }

        function setup() {
        createCanvas(windowWidth, windowHeight);
        bg1 = createSprite(width/2-100, height/2-250, width, height);
        bg1.addImage(bg);

        bg1.scale = 2.5;
        

        backgroundSound.play();

        Ninja = createSprite(70,height-115,100,100);
        Ninja.addAnimation("Standing", NinjaStanding);
        Ninja.addAnimation("Running", Ninja_Running);
        Ninja.addAnimation("Died", Ninja_Died);
        Ninja.scale = 0.9;

        gameOver = createSprite(width/2,height/2-50);
        gameOver.addImage(gameOverImg);

        invisibleGround = createSprite(width/2, height-15, width, 20);
        invisibleGround.visible = false;

        obstaclesGroup = createGroup();

        }



        function draw() {
        background(0);
        text("Score:"+ score,500,50);

        if(bg1.x<425){
                bg1.x = width/2;
              }
   
        if(gameState === PLAY){
                bg1.velocityX = -2;
                
           gameOver.visible = false;

           score = score + Math.round(getFrameRate()/60);

           if(keyDown("Space")){
              Ninja.velocityY= -30;
           }
                
        
           Ninja.velocityY+= 5;
        
        
        
           if(keyDown("Right")){
             Ninja.changeAnimation("Running", Ninja_Running);
             Ninja.scale = 0.5; 
           }

          
           spawnObstacles();


           if(obstaclesGroup.isTouching(Ninja)){
             gameState = END;
           }
        }

  
        else if(gameState === END){
                gameOver.visible = true;

                //Ninja.velocity = 0;
                //obstaclesGroup.velocity = 0; 
                bg1.velocityX = 0;  
                

               Ninja.changeAnimation("Died", Ninja_Died );

                obstaclesGroup.setLifetimeEach(-1);

                obstaclesGroup.setVelocityXEach(0);
        }

        Ninja.collide(invisibleGround);

        
        if(mousePressedOver(gameOver)) {
                reset();
        }

          
        
        drawSprites();
        }

        function reset(){

                gameState = PLAY;
                obstaclesGroup.destroyEach();
                Ninja.changeAnimation("Standing", NinjaStanding);
                score = 0;
                Ninja.scale = 0.9;
        }

        function spawnObstacles(){
        if (frameCount % 115 === 0){
            var obstacle = createSprite(900,450,20,30);
            obstacle.velocityX = -(6 + score/100);
        
            //generate random obstacles
            var rand = Math.round(random(1,3));
            switch(rand) {
                case 1: obstacle.addImage(obstacle1);
                        break;
                case 2: obstacle.addImage(obstacle2);
                        break;
                case 3: obstacle.addImage(obstacle3);
                        break;
                default: break;
             }
        
             //assign scale and lifetime to the obstacle           
             obstacle.scale = 0.55;
             obstacle.lifetime = 300;
        
             //add each obstacle to the group
             obstaclesGroup.add(obstacle);
        }
        }
