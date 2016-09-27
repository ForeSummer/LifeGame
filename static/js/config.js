'use strict';

/*
 * Author: Guoyang Wei
 * Date: 2016/09/26
 * Description: 生命游戏配置文件
 */

/*
 * 配置文件说明
 * size: ['small', 'middle', 'large']
 * speed: ['slow', 'normal', 'fast']
 * colorChoose: ['black', 'red', 'purple', 'orange', 'blue', 'green']
 */

var config = {
  map: null,
  mapX: 10,
  mapY: 10,
  size: 'middle',
  speed: 'normal',
  speedList: {
    'slow': 2000,
    'normal': 1000,
    'fast': 300
  },
  colorChoose: 'black',
  gameArea: '#main-area',
  status: 0,
}

