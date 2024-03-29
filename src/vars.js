// All of the global variables used in the game

function setVars(seed, difficulty) {
    window.gameRunning = true;
    window.playerDied = false;
    window.base_rng_seed = seed;
    window.playerPos = {
        "x": 0,
        "y": 0
    };
    window.cameraPos = {
        "x": 0,
        "y": 0
    }
    window.time = 0;
    window.fps = 0;
    window.mspf = 0; // milliseconds per frame
    window.targetFps = 60;
    window.mspt = 30; // milliseconds per tick
    window.headstart = 10; // seconds before evil circle of death starts
    window.difficulty = difficulty; // rate at which the circle expands
    window.gravityData = {
        "on": true, // if false, gravity is completely disabled
        "active": true, // set to false to reverse gravity
        "activeLastTick": true, 
        "timeFallen": 2,
        "prevFall": 0
    }
    window.jumping = false;
    window.jumpedTick = 0;
    window.lastTickTime = 0;
    window.tickNumber = 0;
    window.playerSpeed = 7; // the amount of pixels the player moves in
                            // the amount of ticks set in targetFps
    window.playerSize = 50;
    window.keydata = {
        "any": false,
        "arrows": {
            "up":    false,
            "down":  false,
            "left":  false,
            "right": false
        }
    }
    // an object with all seeds that have been generated, and the number they produced.
    // this is to prevent running the RNG multiple times, which improves performance.
    window.rngData = {};
    window.lineData = {};

    // these two are just for fun. 
    window.collisionschecked = 0;
    window.rngsGenerated = 0;
    window.skippedTicks = 0;

    /*
    ===== Epic guide to making objects =====

    RECTANGLES: 
    the startx and starty values will form the corner of the bottom left corner. 
    the endx and endy values will form the corner of the top right corner. 
    color obviously sets the color
    collide desides if collision physics will effect it. If it is set to false, the player
    will be able to pass right through it. 
    To make it an elevator, set the elevator attribute to true, and collide to false.

    SPIKES: 
    equalateral triangles that kill you. 
    spikes are positioned based off of the smallest possible square that it could fit into.
    x and y form the bottom left corner of that square. 
    size (pixels) is how long each side of the tri (and also square) will be
    direction is where it will face (up, down, left, right, must be lowercase)
    color sets the color of the spike
    collide desides if collision physics will effect it. If it is set to false, the player
    will be able to pass right through it. 

    Currently most objects are auto generated.
    */
    window.objects = {
        "rectangles": [
            {
                "startx": -100,
                "starty": -50,
                "endx": 200,
                "endy": -70,
                "color": "#ff0000",
                "collide": true,
            }
        ],
        "spikes": [],
        "circles": []
    }

    // config for the line section of the space generation
    window.generatorConfig = {
        "lineChance": 60,           // percent chance that a line will be generated
        "rightChance": 45,          // percent chance of a line generating in the right direction from it's start. chance for left will be 100 - rightChance
        "crazyness": 50,            // each block will be offset from a straight line by a random number from 0 to this.
        "minLength": 1000,          // minimum length of a line, pixels
        "maxLength": 1200,          // maximum length of a line, pixels
        "minSlope": 0.5,            // minimum slope of a line, rise over run
        "maxSlope": 2.0,            // maximum slope of a line, rise over run
        "smallSlopeChance": 70,     // percent chance of a line generating with a slope less than 1
        "minBlockDensity": 5,       // minimum percent of 50x50 chunks within the line that will spawn a block
        "maxBlockDensity": 7,       // maximum percent of 50x50 chunks within the line that will spawn a block
        "minBlockWidth": 80,        // minimum width of a block, pixels
        "maxBlockWidth": 200,       // maximum width of a block, pixels
        "blockHeight": 15,          // height of a block, pixels. This is the same for all blocks.
        "minLineHeight": 50,        // minimum height of a line, pixels.
                                    // The height of a line is essentially the range
                                    // of Y cords that blocks can spawn in, starting
                                    // from the origin of the line. In other words,
                                    // the thickness of a line. It still has the slope
                                    // from the min and max slope properties.
        "maxLineHeight": 200,       // maximum height of a line, pixels.
        "minSpikeBlockChance": 10,  // minimum percent of blocks that will have spikes on them
        "maxSpikeBlockChance": 20,  // maximum percent of blocks that will have spikes on them
        "minRandomSpikeChance": 6,  // minimum percent 50x50 chunks that will have a floating spike
        "maxRandomSpikeChance": 10, // maximum percent 50x50 chunks that will have a floating spike
        "colors": {                 // colors that different types can be
            "rectanglesNormal": [
                "#df2a2a",
                "#2a2adf",
                "#2adf2a",
                "#fcba03",
                "#0be35e",
                "#700ff7",
                "#0da5d4",
                "#d6510f",
                "#f7f70f",
                "#ed2da4",
            ]
        }
    }
}
