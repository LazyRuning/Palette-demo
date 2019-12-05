document.body.ontouchstart = function (wjj) {
    wjj.preventDefault()
}
//得到canvas的dom元素
var canvas = document.getElementById('canvas')

// 获取canvas上下文
var context = canvas.getContext("2d")


//设置画布大小
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight
canvas.width = pageWidth
canvas.height = pageHeight

//画圆弧
var drawCircle = function (x, y) {
    context.beginPath()
    context.arc(x, y, 1, 0, Math.PI * 2)
    context.fill()
}
//画线
var drawLine = function (x1,y1,x2,y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
//橡皮檫
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add("active")
    pen.classList.remove("active")
}
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add("active")
    eraser.classList.remove("active")
}

//清屏
clear.onclick = function () {
    context.clearRect(1,1,canvas.width,canvas.height)
}
//画笔颜色选择
black.onclick = function () {
    black.classList.add("active")
    red.classList.remove("active")
    green.classList.remove("active")
    yellow.classList.remove("active")
    context.strokeStyle = "black"
}
red.onclick = function () {
    red.classList.add("active")
    black.classList.remove("active")
    green.classList.remove("active")
    yellow.classList.remove("active")
    context.strokeStyle = "red"
}
green.onclick = function () {
    green.classList.add("active")
    black.classList.remove("active")
    red.classList.remove("active")
    yellow.classList.remove("active")
    context.strokeStyle = "green"
}
yellow.onclick = function () {
    yellow.classList.add("active")
    black.classList.remove("active")
    red.classList.remove("active")
    green.classList.remove("active")
    context.strokeStyle = "yellow"
}
//画笔尺寸选择
thin.onclick = function () {
    context.lineWidth = 3 
    thin.classList.add("active")
    thick.classList.remove("active")
}
thick.onclick = function () {
    context.lineWidth = 5
    thick.classList.add("active")
    thin.classList.remove("active")
}

//存图
download.onclick = function () {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.href = url
    a.download = "我的画作"
    a.target = "_blank"
    a.click()
}
//手机触屏可用orPC端
var using = false
var lastPoint = {x:undefined,y:undefined}
if (canvas.ontouchstart === undefined) {
    //监听鼠标状态
    document.onmousedown = function (wjj) {
        using = true
        var x = wjj.clientX
        var y = wjj.clientY
        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            lastPoint = {x:x,y:y}
             
        }
    }
    document.onmousemove = function (wjj) {
        var x = wjj.clientX
        var y = wjj.clientY
        //判断是否在使用状态
        if (!using) { return }
        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            var newPoint = { x: x, y: y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }   
     document.onmouseup = function () {
        using = false
    }
} else {
    canvas.ontouchstart = function (wjj) {
        using = true
        var x = wjj.touches[0].lientX
        var y = wjj.touches[0].clientY
        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            lastPoint = {x:x,y:y}
             
        }
    }
    canvas.ontouchmove = function (wjj) {
        var x = wjj.touches[0].clientX
        var y = wjj.touches[0].clientY
        //判断是否在使用状态
        if (!using) { return }
        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            var newPoint = { x: x, y: y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    canvas.ontouchend = function () {
        using = false
    }
}
      







