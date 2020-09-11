
var dog, happyDog, database, foodS, foodStock;
var hungryDogImg, nothungryDogImg, milkImg;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  hungryDogImg = loadImage("images/dogImg.png");
  nothungryDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(800, 800);

  dog = createSprite(350, 450, 20, 20);
  dog.addImage("hungry", hungryDogImg);
  
  foodObj = new Food(100, 100, 50, 50);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46, 139, 87);

 /* if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(nothungryDogImg);
    }
  */
  drawSprites();
  textSize(20);
  stroke("black");
  fill("white");
  text("Note: Press UP_ARROW Key To Feed BlackJack Milk", 100, 100);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
   lastFed = data.val()
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: " + lastFed%12 + " PM", 350, 30);
  }else if(lastFed===0){
    text("Last Feed: 12 AM", 350, 30);
  }else{
    text("Last Feed: " + lastFed + " AM", 350, 30);
  }

}


function readStock(data){
  foodS = data.val();
}
  
  
function writeStock(x){
  
  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}


function feedDog(){
  dog.addImage("happy",happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
  });
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  });
}