class Food{
    constructor(){
        this.milkImg = loadImage("images/Milk.png");
        var foodStock, lastFed;
    }

    display(){
        imageMode(CENTER);
        image(this.milkImg, 720, 220, 70, 70);

        var x = 80, y = 100;

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10===0){
                    x = 80;
                    y = y+50;
                }
                image(this.image, x, y, 50, 50);
                x = x+30;
            }
        }
    }

}