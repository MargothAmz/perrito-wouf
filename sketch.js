

var dog;

//El alumno escribirá esto.
var dogpos;
var database;
var position;

function preload(){
    backdrop=loadImage("background.jpg");
    dogimg=loadAnimation("dog1.png","dog2.png","dog3.png");
    foodimg=loadImage("hotdog.png");
}
function setup(){
    
    createCanvas(500,500);


    //Inicializar la base de datos.
  database = firebase.database();

    dog=createSprite(200,200,100,100);

    dog.addAnimation("running",dogimg);
    dog.scale=0.5;
    food=createSprite(450,450);
    food.addImage(foodimg);
    food.scale=0.5;

     //.ref() and .on
   dogpos = database.ref("ball/position");
   dogpos.on("value",readposition);

}

function draw(){
    background(backdrop);
    
    if(keyDown(LEFT_ARROW)){
        changePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(5,0);
       
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+5);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").update({
      x:  position.x + x,
        y: position.y + y   
    });
   }


//Función para leer la posición.
function readposition(data){
    position = data.val()
    console.log(position)
    dog.x = position.x;
    dog.y = position.y;
}