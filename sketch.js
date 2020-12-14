
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var gameState = 0;
var cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cloudsGroup, obstaclesGroup;
var gameOver, gameOverImg;
var score = 0;

function preload() {
  trex_running = loadAnimation("images/trex1.png", "images/trex3.png", "images/trex4.png");
  trex_collided = loadAnimation("images/trex_collided.png");
  groundImage = loadImage("images/ground2.png");

  
  cloudImage = loadImage("images/cloud.png");
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");

  restartImg = loadImage("images/restart.png");

  gameOverImg = loadImage("images/gameOver.png");
  
}
function setup() {
  createCanvas(displayWidth - 300, 300);
  trex = createSprite(200, 250);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.7;
  trex.setCollider("circle",-10,10,30);
  
  ground = createSprite(width/2, height- 20, width, 20);
  ground.x = ground.width / 2;
  ground.addImage(groundImage);

  /*restart = createSprite(width/2, height/2);
  restart.addImage(restartImg);
  restart.visible = false;*/

  gameOver = createSprite();
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  invisibleGround = createSprite(width/2, height- 10, width, 20);
  invisibleGround.x = invisibleGround.width / 2;
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup  = new Group();
}

function draw() {
  background(220);

  if(gameState === 0){
    trex.visible = false;
    ground.visible = false;
    textSize(20);
    text("Press Space to start game", width/2 - 100, height/2);
    if(keyWentDown("space")){
        gameState = 1;
    }
  }
    if(gameState === 1){
        trex.visible = true;
        ground.visible = true;

        gameOver.visible = false;
       // restart.visible = false;

        score = Math.round(frameCount/2);
        textSize(20);
        text("Score: " + score, trex.x  + 600, 100);

        spawnClouds();
        spawnObstacles();

        trex.velocityX = 9;

        if(keyDown("space") && trex.y >245){
            trex.velocityY = -14;
        }
        trex.velocityY = trex.velocityY + 0.8;

        invisibleGround.x = trex.x;

        if (frameCount%60 === 0){
            ground.x =  trex.x + 700;
          }

        camera.position.y = height/2;
        camera.position.x = trex.x + 400;
      }

      if(obstaclesGroup.isTouching(trex)) {
        gameState = 2;
      }

      if(gameState === 2){
        trex.velocityX = 0;
        trex.velocityY = 0;

      /*  restart.visible = true;
        restart.x = trex.x + 400;
        restart.y = trex.y - 50;*/

        gameOver.x = trex.x + 400;
        gameOver.y = height/2;
        gameOver.visible = true;

        /*textSize(20);
        text("Press Space to restart game", gameOver.x, trex.y - 100);*/

        trex.pause();

        /*if(keyDown("space") && gameState === 2){
          gameState = 1;
        }*/

        obstaclesGroup.setLifetimeEach(-1);
      }
  
  trex.collide(invisibleGround);
  drawSprites();

 
}

function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var cloud = createSprite(trex.x + 800,120);
      cloud.y = Math.round(random(80,120));
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;

       //assign lifetime to the variable
      cloud.lifetime = 204;
      
      //adjust the depth
      cloud.depth = trex.depth - 1;
      
      cloudsGroup.add(cloud);
    }
    
  }

  function spawnObstacles() {
      if(frameCount % 50 === 0) {
        var obstacle = createSprite(trex.x + 1000,255,10,40);
        //obstacle.velocityX = -6;
        
        //generate random obstacles
        var rand = Math.round(random(1,6));
        
        switch(rand){
          case 1: obstacle.addImage(obstacle1);
            break;
          case 2: obstacle.addImage(obstacle2);
            break;
          case 3: obstacle.addImage(obstacle3);
            break;
          case 4: obstacle.addImage(obstacle4);
            break;
          case 5: obstacle.addImage(obstacle5);
            break;
          case 6: obstacle.addImage(obstacle6);
            break;
            
          default: break;
              
        }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.7;

      if(score%700 === 0){
        obstacle.scale = obstacle.scale + 0.2;
      }
      obstacle.lifetime = 250;
      
      obstaclesGroup.add(obstacle);
    }
  }

  function reset(){
    gameState = 1;
  }
  