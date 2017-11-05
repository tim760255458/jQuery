$(document).ready(function () {

    //创建飞机
    function createrPlane () {
        $('body').append('<img class="plane" src="img/plane.png" />');
    }

    //创建子弹
    function createrBullet () {
        $('body').append('<img class="bullet" src="img/plane.png" />');
        bulletArr = $('.bullet');
        moveFn(bulletArr.eq(0), 500, 2, 10);
    }

    //创建敌机
    function createrEnemy () {
        $('body').append('<img class="enemy" src="img/plane.png" />');
        enemyArr = $('.enemy');
    }

    //运动函数
    function moveFn (elem, bottomVal, step, time) {
        console.log(elem, step, time)
        var moveInt = setInterval(moveing, time, elem, bottomVal, step);
        var isRemove = false;
        function moveing (elem, bottomVal, step) {
            let bot = Number(elem.css('bottom').split('px')[0]) + step;
            console.log(bot)
            elem.css('bottom', bot);
            isRemove = hidenFn(elem, 0, bottomVal);
            if (isRemove) {
                clearInterval(moveInt);
            }
        }
    }

    //自毁函数(dom对象, 上下左右区域限制，敌机和自身血量)
    function hidenFn (elem, topVal, bottomVal, leftVal, rightVal, health) {
        if (Number(elem.css('bottom').split('px')[0]) > bottomVal) {
            elem.remove();
            return true;
        }
        
    }

    //控制飞机移动
    function controlMove () {
        $('body').eq(0).keydown(function (event) {
            var plane = $('.plane');
            if (event.keyCode === 37) {
                var leftVal = Number(plane.css('left').split('px')[0]) - 10;
                if (Number(plane.css('left').split('px')[0]) > 0) {
                    plane.css('left', leftVal);
                }
            }
            if (event.keyCode === 39) {
                var leftVal = Number(plane.css('left').split('px')[0]) + 10;
                if (Number(plane.css('left').split('px')[0]) < 1366) {
                    plane.css('left', leftVal);
                }
            }
        })
    }

    var bulletArr = [];
    var enemyArr = [];

    createrPlane();
    controlMove();
    createrBullet();
    createrEnemy();

});