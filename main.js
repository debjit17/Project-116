lipstick_X = 0;
lipstick_Y = 0;

mustache_X = 0;
mustache_Y = 0;

sizeX = 470;
sizeY = 400;

var X;
var Y;


currentFilter = document.getElementById("setler").value;

function OnCFChanged()
{
    currentFilter = document.getElementById("setler").value;
}

function preload()
{
    mustache = loadImage('https://i.postimg.cc/3x3QzSGq/m.png');
    lipstick = loadImage('https://i.postimg.cc/PxFvYgkv/l1.png');
}

function setup()
{
    canvas = createCanvas(sizeX , sizeY);

    x = 50;
    y = (windowHeight - height) / 2;
    y = y + 70
    canvas.position(x, y);

    video = createCapture(VIDEO);
    video.size(sizeX , sizeY);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Initializing.... Model Loaded... Setup Successful...")
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        switch(currentFilter)
        {
            case "mustache":
                    X = results[0].pose.nose.x - 50;
                    Y = results[0].pose.nose.y + 2.5;
                break; 
    
            case "lipstick":
                    X = results[0].pose.nose.x - 35;
                    Y = results[0].pose.nose.y + 14.5;
                break; 
        }
    }
}

function draw()
{
    image(video, 0, 0, sizeX , sizeY);

    switch(currentFilter)
    {
        case "mustache":
                image(mustache, X, Y, 100, 35);
            break; 

        case "lipstick":
                image(lipstick, X, Y, 70, 30);
            break; 
    }
}

function take_snapshot()
{
    save("Filtered.png");
}
