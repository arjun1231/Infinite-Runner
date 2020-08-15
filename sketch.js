var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7;

var PLAY = 1;
var END = 0;
var gameState = PLAY ;


var score = 0;
var GameOver,Restart;
localStorage["HighestScore"] = 0;

function preload(){
  trexImg = loadImage("man.png");
  groundImage = loadImage("ground2.png");

  backgroundImg = loadImage("background.jpg")

 
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("stone2.png");
  obstacle3 = loadImage("stone3.png");
  obstacle4 = loadImage("stone4.png");
  obstacle5 = loadImage("stone5.png");
  obstacle6 = loadImage("stone6.png");
  obstacle7 = loadImage("bird.png");
  GameOverImg = loadImage ("gameOver.png");
  RestartImg = loadImage("restart.png");
  
}

function setup() {
  createCanvas(displayWidth - 15,displayHeight - 145);
  
  trex = createSprite(50,568,20,50);
  trex.addImage(trexImg)
  trex.scale = 0.3;
  
  ground = createSprite(200,560,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /4;
  ground.velocityX = -7;
  
  invisibleGround = createSprite(200,570,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  GameOver = createSprite (650,200);
  GameOver.addImage (GameOverImg);
  Restart = createSprite(650,300);
  Restart.addImage (RestartImg);
  GameOver.scale = 0.8;
  Restart.scale = 0.8;
    GameOver.visible = false;
    Restart.visible = false;
  score = 0;
}

function draw() {
  background(backgroundImg);
  textSize(50)
  text("Score: "+ score, 1000,50);
  if(gameState === PLAY){
  
  score = score + Math.round(getFrameRate()/60);
 
  
  if(keyDown("space")&trex.y > 520) {
    trex.velocityY = -15;
  }
  
  trex.velocityY = trex.velocityY + 0.5
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
       gameState = END;
      
      
    }
  }
  else if (gameState === END){
    GameOver.visible = true ;
    Restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach (-1);
    if(mousePressedOver(Restart)){
      reset();
    }
  }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(2000,300,40,10);
    cloud.y = Math.round(random(80,400));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(2000,542,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,7));
    switch(rand) {
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
      case 7: obstacle.addImage(obstacle7);
              break;        
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset () {
  gameState = PLAY;
  GameOver.visible = false;
  Restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  if(localStorage["HighestScore"] < score){
    localStorage["HighestScore"] = score;
    
  }
  console.log (localStorage["HighestScore"])
  score = 0;
}