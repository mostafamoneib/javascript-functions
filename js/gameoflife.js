function seed() {
  const returnArray = [];
  let args = [...arguments];  // betemla args b kol haga in arguments
  for(i in args){
    returnArray.push(args[i]);
  }
  return returnArray;
}

function same([x, y], [j, k]) {
  if(x!== j || y!==k) return false;
  else return true;  
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  for (i in this) {
    if(this[i][0] === cell[0] && this[i][1] === cell[1]) return true;
    else continue;
  }  
  return false;
}

const printCell = (cell, state) => {
  const alive = contains.call(state, cell);
  if (alive) return '\u25A3';
  else return '\u25A2'; 
};

const corners = (state = []) => {
  let args = [...arguments];
  if (args.length === 0) return {topRight: [0,0], bottomLeft: [0,0]};
  let minX = state[0][0], minY = state[0][1];
  let maxX = state[0][0], maxY = state[0][1];
  for (i in state) {
    if(state[i][0] < minX) minX = state[i][0];
    if(state[i][1] < minY) minY = state[i][1];
    if(state[i][0] > maxX) maxX = state[i][0];
    if(state[i][1] > maxY) maxY = state[i][1];
  }
  return {topRight: [maxX, maxY], bottomLeft: [minX, minY]};
};

const printCells = (state) => {};

const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;