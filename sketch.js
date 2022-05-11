var trex ,trex_running;
var ground;
var groundImg;
var invisibleGround;
var obstacle1,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6; 
var dado;
var score = 0;
var gameState = "play";
var obstaclesGroup;
var cloudsGroup;
var gameOver, gameOverImg;
var restart, restartImg;
var trexCollided;
var jumpSound, dieSound, checkpointSound;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage ("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage ("gameOver.png");
  restartImg = loadImage("restart.png");
  trexCollided = loadAnimation ("trex_collided.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkpoint.mp3");

}

function setup(){
  createCanvas(600,200)
  trex = createSprite(50, 160, 20, 40);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided", trexCollided);
  trex.scale = 0.5;
 
  ground = createSprite(200, 170, 400,20);
  ground.addImage(groundImg);
  ground.x = ground.width/2;

  invisibleGround = createSprite(200, 180, 400, 10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  //var numAleatorio = Math.round(random(0,10));
  //console.log(numAleatorio);

  //trex.debug = true; 
  trex.setCollider("circle", 0, 0, 40);

}

function draw(){
  background(180);
  text("Puntuación: " + Math.round(score), 450, 50);
  
  if(gameState === "play"){
    ground.velocityX = -(4+3*score/100);
    score += 1/10;

    if(score%100===0){
      checkpointSound.play();
    }

    if(keyDown("space") && trex.y>130){
      trex.velocityY = -13;
      jumpSound.play();
    }

    if(ground.x<0){
      ground.x = ground.width/2;
    }

    trex.velocityY = trex.velocityY + 0.8;

    spawnObstacles();
    spawnClouds();

    if(trex.isTouching(obstaclesGroup)){
      gameState= "end";
      dieSound.play();
    }
  }

  if(gameState === "end"){
    trex.changeAnimation("collided", trexCollided);
    trex.velocityY = 0;
    ground.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(0.57);
    cloudsGroup.setLifetimeEach(-1);
  }

  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60===0){
    var cloud = createSprite(600, 50, 40, 20);
    cloud.y = Math.round(random(10, 120));
    cloud.velocityX = -(4+3*score/100);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    trex.depth = cloud.depth + 1;
    cloud.lifetime = 210;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount%60 === 0){
    var obstacle = createSprite(700, 160, 20, 40);
    obstacle.velocityX= -(4+3*score/100);
    //Colocar la imagen 
    dado = Math.round(random(1,6));

    switch(dado){
      case 1: obstacle.addImage(obstacle1); break;
      case 2: obstacle.addImage(obstacle2); break;
      case 3: obstacle.addImage(obstacle3); break;
      case 4: obstacle.addImage(obstacle4); break;
      case 5: obstacle.addImage(obstacle5); break;
      case 6: obstacle.addImage(obstacle6); break;
    }
    
    obstacle.scale =0.5;
    obstacle.lifetime= 200;
    obstaclesGroup.add(obstacle);
  }
}