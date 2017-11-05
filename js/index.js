$(document).ready(function () {

    //工具函数
    function randomNum (min, max) {    //生成指定范围内的随机数 min <= num <= max
        var range = max - min;
        var rand = Math.random();
        var num = min + Math.round(rand * range);
        return num;
    }


    //创建飞机
    function createrPlane () {
        $('body').append('<img class="plane" src="img/plane.png" />');
    }

    //创建子弹 (子弹类型)
    function createrBullet (type) {
        //子弹类型，包括每次移动的长度，每次移动的时间间隔
        var bulletDefaule = {
            step: 5,
            time: 30
        };
        var creatInt = setInterval(function () {
            var bullet = $('<img class="bullet" src="img/plane.png" />').css({
                left: locationX,
                bottom: locationY
            });
            bullet.bind('aaa', function () {
                let self = $(this);
                moveFn(self, bulletDefaule);
            });
            $('body').append(bullet);
            bullet.trigger('aaa');
            function aaa () {
                console.log('ahahaha')
            }
        }, 200); //200ms生成一個子彈
    }

    //创建敌机
    function createrEnemy (type) {
        //敌机类型
        var enemyDefault = {

        };
        //生成敌机的随机位置
        function createLocation () {
            var x,y;
            x = randomNum(200, 1000);
            y = randomNum(200, 450);
            return {
                enemyX: x,
                enemyY: y
            }
        }

        var location = createLocation();
        var enemy = $('<img class="enemy" src="img/plane.png" />').css({
            left: location.enemyX,
            bottom: location.enemyY
        });
        $('body').append(enemy);
        enemyArr = $('.enemy');
    }

    //运动函数(dom, 子彈類型)
    function moveFn (elem, bulletType) {
        var node = elem.eq(0);
        var moveInt = setInterval(moveing, bulletType.time, node, bulletType.step);
        var isRemove = false;
        function moveing (node, step) {
            var bot = Number(node.css('bottom').split('px')[0]) + step;
            node.css('bottom', bot);
            var isHit = hitEnemy(Number(node.css('left').split('px')[0]), Number(node.css('bottom').split('px')[0])); //传递子弹位置
            isRemove = hidenFn(node, 0);
            
            //判断 如果子弹超出区域则消失，如果打中敌机则消失
            if (isRemove || isHit) {
                node.remove();
                clearInterval(moveInt);
            }
        }
    }

    //自毁函数(dom对象, 上下左右区域限制，敌机和自身血量)
    function hidenFn (elem, topVal, bottomVal, leftVal, rightVal, health) {
        if (Number(elem.css('bottom').split('px')[0]) > 500) {
            return true;
        }
        
    }

    //控制飞机移动
    function controlMove () {
        $('body').eq(0).keydown(function (event) {
            var plane = $('.plane');

            //分别为左右上下的判断
            if (event.keyCode === 37 || event.keyCode === 65) {
                var leftVal = Number(plane.css('left').split('px')[0]) - 10;
                if (Number(plane.css('left').split('px')[0]) > 0) {
                    plane.css('left', leftVal);
                    controlBulletLocation(Number(plane.css('left').split('px')[0]), Number(plane.css('bottom').split('px')[0]));
                }
            }
            if (event.keyCode === 39 || event.keyCode === 68) {
                var leftVal = Number(plane.css('left').split('px')[0]) + 10;
                if (Number(plane.css('left').split('px')[0]) < 1366) {
                    plane.css('left', leftVal);
                    controlBulletLocation(Number(plane.css('left').split('px')[0]), Number(plane.css('bottom').split('px')[0]));                    
                }
            }
            if (event.keyCode === 38 || event.keyCode === 87) {
                var leftVal = Number(plane.css('bottom').split('px')[0]) + 10;
                if (Number(plane.css('bottom').split('px')[0]) < 768) {
                    plane.css('bottom', leftVal);
                    controlBulletLocation(Number(plane.css('left').split('px')[0]), Number(plane.css('bottom').split('px')[0]));
                }
            }
            if (event.keyCode === 40 || event.keyCode === 83) {
                var leftVal = Number(plane.css('bottom').split('px')[0]) - 10;
                if (Number(plane.css('bottom').split('px')[0]) > 0) {
                    plane.css('bottom', leftVal);
                    controlBulletLocation(Number(plane.css('left').split('px')[0]), Number(plane.css('bottom').split('px')[0]));
                }
            }
        })
        //控制子弹生成的位置
        function controlBulletLocation (x, y) {
            locationX = x;
            locationY = y + 150;
            //createrBullet(0);
        }
    }

    //敌机被击中判断
    function hitEnemy (x, y) {
        var intArr = $('.enemy').filter(function (index) {
            if (x - 25 < Number($(this).css('left').split('px')[0]) && Number($(this).css('left').split('px')[0]) < x + 25) {
                if (y < Number($(this).css('left').split('px')[0]) && Number($(this).css('left').split('px')[0]) < y + 50) {
                    console.log('hhhh')
                    return true;
                }
            }
            return false;
        });
        intArr.each(function () {
            this.remove();
        });
        if (intArr.length > 0) {
            return true;
        }
        return false;
    }

    var bulletArr = [];
    var enemyArr = [];

    var locationX = 683;  //子彈初始位置
    var locationY = 200;

    createrPlane();
    controlMove();
    createrBullet(0);
    createrEnemy(0);

});