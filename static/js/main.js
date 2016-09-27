'use strict';

/*
 * Author: Guoyang Wei
 * Date: 2016/09/26
 * Description: 生命游戏主js文件，包含所有业务逻辑函数
 */

// 全局计时器，用来记录setInterval后返回的计时对象
var globalInterval = null;

/*
 * initMap(x, y)
 * 用来初始化地图，要求x，y均为不小于3的数字
 */
function initMap(x, y) {
  var map = [];
  if(!$.isNumeric(x) || !$.isNumeric(y)) {
    return null;
  }
  x = parseInt(x);
  y = parseInt(y);
  if(x < 3 || y < 3) {
    return null;
  }
  for (var j = 0; j < y; j ++) {
    var tmp = [];
    for(var i = 0; i < x; i ++) {
      tmp.push(Math.round(Math.random()));
    }
    map.push(tmp);
  }
  return map;
}

/*
 * showMap(config)
 * 用来绘制地图，需要传入游戏配置
 */
function showMap(config) {
  var map = config.map;
  if(!map) {
    return false;
  }
  var gameArea = $(config.gameArea);
  gameArea.empty();
  var color = config.colorChoose;
  var size = config.size;
  var width = 0;
  if(config.size == 'small') {
    width += config.mapX * 10;
  }
  else if(config.size == 'middle') {
    width += config.mapX * 20;
  }
  else {
    width += config.mapX * 30;
  }
  var $dom = $("<div class='cell-container' style='width:"+width+"px;'></div>");
  for(var i = 0; i < map.length; i ++) {
    var $row = $("<div class='cell-row "+ size +"-row'></div>");
    for(var j = 0; j < map[i].length; j ++) {
      if(map[i][j]) {
        $row.append("<span class='cell "+ color +" "+ size +"'></span>");
      }
      else {
        $row.append("<span class='cell dead "+ size +"'></span>");
      }
    }
    $dom.append($row);
  }
  gameArea.append($dom);
  return true;
}

/*
 * getNextStep(map)
 * 用来计算下一回合细胞的情况，需要传入游戏地图
 */
function getNextStep(map) {
  if(!map) {
    return null;
  }
  var count = 0;
  var relatedArray = [];
  var mapX = map.length;
  var mapY = map[0].length;

  var newMap = JSON.parse(JSON.stringify(map));

  for(var i = 0; i < mapX; i ++) {
    for(var j = 0; j < mapY; j ++) {
      count = 0;
      relatedArray = [];
      relatedArray.push(map[(i+1) % mapX][(j-1+mapY) % mapY]);
      relatedArray.push(map[(i+1) % mapX][j]);
      relatedArray.push(map[(i+1) % mapX][(j+1) % mapY]);
      relatedArray.push(map[i][(j-1+mapY) % mapY]);
      relatedArray.push(map[i][(j+1) % mapY]);
      relatedArray.push(map[(i-1+mapX) % mapX][(j-1+mapY) % mapY]);
      relatedArray.push(map[(i-1+mapX) % mapX][j]);
      relatedArray.push(map[(i-1+mapX) % mapX][(j+1) % mapY]);
      for(var k = 0; k < 8; k ++) {
        if(relatedArray[k]) {
          count ++;
        }
      }
      if(count == 3) {
        newMap[i][j] = 1;
      }
      else if(count == 2) {
        continue;
      }
      else{
        newMap[i][j] = 0;
      }
    }
  }
  return newMap;
}

/*
 * restart(config)
 * 重头开始一局新的生命游戏，会清空之前的游戏记录，需要传入游戏配置
 */
function restart(config) {
  stop(config);
  config.map = initMap(config.mapX, config.mapY);
  clearInterval(globalInterval);
  showMap(config);
  $('#stop a').html('stop');
  config.status = 1;
  globalInterval = setInterval(function() {
    config.map = getNextStep(config.map);
    showMap(config);
  }, config.speedList[config.speed]);
}

/*
 * stop(config)
 * 暂停游戏，需要传入游戏配置文件
 */
function stop(config) {
  if(config.status == 0) {
    return;
  }
  config.status = 0;
  $('#stop a').html('start');
  clearInterval(globalInterval);
}

/*
 * start(config)
 * 开始游戏，如果有进度则从上次进度开始，需要传入游戏配置
 */
function start(config) {
  if(config.status == 1) {
    return;
  }
  config.status = 1;
  $('#stop a').html('stop');
  if(config.map) {
    config.status = 1;
    globalInterval = setInterval(function() {
      config.map = getNextStep(config.map);
      showMap(config);
    }, config.speedList[config.speed]);
  }
  else {
    restart(config);
  }
}

/*
 * checkInfo(config)
 * 获取配置面板的配置信息并修改config， 需要传入游戏配置
 */
function checkInfo(config) {
  config.colorChoose = $('input[name="color"]:checked').val();
  config.speed = $('input[name="speed"]:checked').val();
  config.size = $('input[name="size"]:checked').val();
  var tmp = $('input[name="mapx"]').val();
  if($.isNumeric(tmp)) {
    config.mapX = parseInt(tmp);
  }
  tmp = $('input[name="mapy"]').val();
  if($.isNumeric(tmp)) {
    config.mapY = parseInt(tmp);
  }
}

/*
 * init(config)
 * 初始化游戏， 需要传入游戏配置
 */
function init(config) {
  if(!config) {
    return;
  }
  $('#'+ config.size).attr('checked', true);
  $('#'+ config.colorChoose).attr('checked', true);
  $('#'+ config.speed).attr('checked', true);
  $('input[name="mapx"]').val(config.mapX);
  $('input[name="mapy"]').val(config.mapY);
  
  $('#stop a').html('start');
  $('#restart').click(function() {
    checkInfo(config);
    restart(config);
  });
  $('#stop').click(function() {
    checkInfo(config);
    if(config.status == 0) {
      start(config);
    }
    else {
      stop(config);
    }
  });
}

init(config);