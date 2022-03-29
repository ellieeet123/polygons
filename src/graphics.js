// functions that draw stuff

// draw a checkerboard background. 
function background(offsetX, offsetY) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#eeeeee';
    for (let i = -150; i < canvas.width + 100; i += 50) {
        for (let j = -150; j < canvas.height + 100; j += 50) {
            if (count % 2 === 0) {
                ctx.fillRect(i - offsetX, j - offsetY, 50, 50);
            }
            count++;
        }
    }
    count = 0;
    ctx.fillStyle = '#cccccc';
    for (let i = -150; i < canvas.width + 100; i += 50) {
        for (let j = -150; j < canvas.height + 100; j += 50) {
            if (count % 2 === 1) {
                ctx.fillRect(i - offsetX, j - offsetY, 50, 50);
            }
            count++;
        }
    }
}

/*  [type] can be one of the following:
    - rectangles
    - spikes
*/
function drawObjects(type) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    if (type === 'rectangles') {
        for (let i = 0; i < objects[type].length; i++) {
            ctx.fillStyle = objects[type][i].color;
            // ignore the mess below, it works
            let startXCor = (canvas.width  / 2) + (-(playerPos.x)) + objects[type][i].startx;
            let startYCor = (canvas.height / 2) + (-(playerPos.y)) + (-(objects[type][i].starty));
            let endXCor   = (canvas.width  / 2) + (-(playerPos.x)) + objects[type][i].endx;
            let endYCor   = (canvas.height / 2) + (-(playerPos.y)) + (-(objects[type][i].endy));
            ctx.fillRect(
                startXCor,
                startYCor,
                endXCor - startXCor,
                endYCor - startYCor
            );
        }
    }
    else if (type === 'spikes') {
        for (let i = 0; i < objects[type].length; i++) {
            ctx.fillStyle = objects[type][i].color;
            // calculating actual position on canvas
            let x1 = (canvas.width  / 2) + (-(playerPos.x)) +    objects[type][i].points[0][0];
            let y1 = (canvas.height / 2) + (-(playerPos.y)) + (-(objects[type][i].points[0][1]));
            let x2 = (canvas.width  / 2) + (-(playerPos.x)) +    objects[type][i].points[1][0];
            let y2 = (canvas.height / 2) + (-(playerPos.y)) + (-(objects[type][i].points[1][1]));
            let x3 = (canvas.width  / 2) + (-(playerPos.x)) +    objects[type][i].points[2][0];
            let y3 = (canvas.height / 2) + (-(playerPos.y)) + (-(objects[type][i].points[2][1]));
            // draw triangles
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fill();
        }
    }
    else if (type === 'circles') {
        for (let i = 0; i < objects[type].length; i++) {
            ctx.fillStyle = objects[type][i].color;
            // calculating actual position on canvas
            let x = (canvas.width  / 2) + (-(playerPos.x)) +    objects[type][i].x;
            let y = (canvas.height / 2) + (-(playerPos.y)) + (-(objects[type][i].y));
            let r = objects[type][i].radius;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    else {
        throw new Error('drawObjects: type ' + type + ' is not a valid shape name');
    }
}

function drawPlayer() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = '#3366ff';
    ctx.fillRect(canvas.width / 2, canvas.height / 2, playerSize, playerSize);
}