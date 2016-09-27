describe('initMap', function() {
  context('Base test', function() {
    it('Should be a function',function() {
      assert.isFunction(initMap);
    });
    it('Should have two arguments', function() {
      assert.equal(initMap.length, 2);
    });
  });
  
  context('Init map', function() {
    it("Should return error when x or y is less than 3", function() {
      assert.strictEqual(initMap(0, 4), null);
      assert.strictEqual(initMap(4, 0), null);
      assert.strictEqual(initMap(0, 0), null);
    });
    it("Should return error when x or y isn't a num", function() {
      assert.strictEqual(initMap('a', 4), null);
      assert.strictEqual(initMap(4, 'a'), null);
      assert.strictEqual(initMap('a', 'a'), null);
    });
    it('Should return an array with length equal to x', function() {
      assert.equal(initMap(10, 13)[0].length, 10);
    });
    it('Length of every item in array should equal to y', function() {
      assert.equal(initMap(10, 13).length, 13);
    });
  });
});

describe('showMap', function() {
  context('Base test', function() {
    it('Should be a function',function() {
      assert.isFunction(showMap);
    });
    it('Should have one arguments', function() {
      assert.equal(showMap.length, 1);
    });
  });
  
});

describe('getNextStep', function() {
  context('Base test', function() {
    it('Should be a function',function() {
      assert.isFunction(getNextStep);
    });
    it('Should have one argument', function() {
      assert.equal(getNextStep.length, 1);
    });
  });
  
  context('Generate next step map', function() {
    it('Should return null when input map is null', function() {
      assert.strictEqual(getNextStep(null), null);
    });
    it('Can get correct result', function() {
      var input1 = [[1,0,0],[0,0,1],[0,1,0]];
      var result1 = [[1,1,1],[1,1,1],[1,1,1]];
      var input2 = [[1,1,1],[1,1,1],[1,1,1]];
      var result2 = [[0,0,0],[0,0,0],[0,0,0]];
      var input3 = [[1,0,0],[0,0,0],[0,0,1]];
      var result3 = [[0,0,0],[0,0,0],[0,0,0]];
      assert.sameDeepMembers(getNextStep(input1), result1);
      assert.sameDeepMembers(getNextStep(input2), result2);
      assert.sameDeepMembers(getNextStep(input3), result3);
    })
  })
});

describe('restart', function() {
  context('Base test', function() {
    it('Should be a function',function() {
      assert.isFunction(restart);
    });
    it('Should have one argument', function() {
      assert.equal(restart.length, 1);
    });
  });
});

describe('stop', function() {
  context('Base test', function() {
    it('Should be a function',function() {
      assert.isFunction(stop);
    });
    it('Should have one argument', function() {
      assert.equal(restart.length, 1);
    });
  });
});

describe('start', function() {
  context('Base test', function() {
    it('Should be a function',function() {
      assert.isFunction(start);
    });
    it('Should have one argument', function() {
      assert.equal(restart.length, 1);
    });
  });
});

describe('checkInfo', function() {
  context('Base test', function() {
    it('Should be a function',function() {
      assert.isFunction(checkInfo);
    });
    it('Should have one argument', function() {
      assert.equal(restart.length, 1);
    });
  });
});

describe('init', function() {
  context('Base test', function() {
    it('Should be a function',function() {
      assert.isFunction(init);
    });
    it('Should have one argument', function() {
      assert.equal(restart.length, 1);
    });
  });
});