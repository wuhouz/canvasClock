/**
 * Created by Jen on 2016/12/8.
 *
 * This clock can be set a different scale.
 */

var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width/200
function drawBackground() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth/2, 0, 2 * Math.PI, false);
    ctx.stroke();

    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 18 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    hourNumbers.forEach(function (number, i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 28 * rem);
        var y = Math.sin(rad) * (r - 28 * rem);
        ctx.fillText(number, x, y);
    });

    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 14 * rem);
        var y = Math.sin(rad) * (r - 14 * rem);
        ctx.beginPath();
        ctx.fillStyle = i % 5 == 0 ? "#000" : "#ccc";
        ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

function drawHour(hour, minute) {
    ctx.save();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    ctx.beginPath();
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = "round";
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r/2);
    ctx.stroke();
    ctx.restore();
}

function drawMinute(minute, second) {
    ctx.save();
    var rad = 2 * Math.PI / 60 * minute;
    var srad = 2 * Math.PI / 60 / 60 * second;
    ctx.beginPath();
    ctx.rotate(rad + srad);
    ctx.lineWidth = 4 * rem;
    ctx.lineCap = "round";
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r + 30 * rem);
    ctx.stroke();
    ctx.restore();
}

function drawSecond(second) {
    ctx.save();
    var rad = 2 * Math.PI / 60 * second;
    ctx.beginPath();
    ctx.fillStyle = "#c14543";
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem, 20 * rem);
    ctx.lineTo(2 * rem, 20 * rem);
    ctx.lineTo(1 * rem, -r + 20 * rem);
    ctx.lineTo(-1 * rem, -r + 20 * rem);
    ctx.fill();
    ctx.restore();
}

function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
    ctx.fill();
}

setInterval(function () {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    ctx.clearRect(0,0,width,height);
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute, second);
    drawSecond(second);
    drawDot();
    ctx.restore();
}, 1000);

