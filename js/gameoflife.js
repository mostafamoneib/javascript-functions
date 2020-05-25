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
  // let args = [...arguments];
  // if (args.length === 0) return {topRight: [0,0], bottomLeft: [0,0]};
  // let minX = state[0][0], minY = state[0][1];
  // let maxX = state[0][0], maxY = state[0][1];
  // for (i in state) {
  //   if(state[i][0] < minX) minX = state[i][0];
  //   if(state[i][1] < minY) minY = state[i][1];
  //   if(state[i][0] > maxX) maxX = state[i][0];
  //   if(state[i][1] > maxY) maxY = state[i][1];
  // }
  // return {topRight: [maxX, maxY], bottomLeft: [minX, minY]};

  if(state.length === 0) return {topRight: [0,0], bottomLeft: [0,0]}

  const xValues = state.map(([x,_]) => x);
  const yValues = state.map(([_,y]) => y);

  return {
    topRight: [Math.max(...xValues), Math.max(...yValues)], 
    bottomLeft: [Math.min(...xValues), Math.min(...yValues)]
  }
};

const printCells = (state) => {
  const { topRight, bottomLeft } = corners(state);
  let board = "";
  for (let i = bottomLeft[0]; i <= topRight[0]; i++) {
    let row = [];
    for (let j = bottomLeft[1]; j <= topRight[1]; j++) {
      row.push(printCell([i,j], state));
    }  
    board += row.join(" ") + "\n";
  }
  return board;
};

// const getNeighborsOf = ([x, y]) => {
//   let arrayOfNeighbors = [];
//   for (let i = x-1; i <= x+1; i++) {
//     for (let j = y-1; j<= y+1; j++) {
//       if (i === x && j === y) continue;
//       arrayOfNeighbors.push([i,j]);
//     }
//   } 
//   return arrayOfNeighbors;
// };

const getNeighborsOf = ([x, y]) => [
  [x-1, y-1], [x-1, y], [x-1, y+1],
  [x, y-1],             [x, y+1],
  [x+1, y-1], [x+1, y], [x+1, y+1] 
];

/*
  filter method beta5od callback function
  for each n in the neighbors array of the cell ..
  return n dy law if condition ba3d el arrow succeeds
  condition: get the contains function and bind to it, that its 'this' parameter refers to state array
  the contains function takes as a parameter a cell .. 
  so to actually call the contains function add '(n)' beside it to call it
 */
const getLivingNeighbors = (cell, state) => {
  return getNeighborsOf(cell).filter((n) => contains.bind(state)(n));
};

const willBeAlive = (cell, state) => {
  const neighbors = getLivingNeighbors(cell, state);
  const alive = contains.call(state, cell);
  const willBeAlive = (neighbors.length === 3 || (neighbors.length === 2 && alive)) ? true: false;
  return willBeAlive;
};

const calculateNext = (state) => {
  const { topRight, bottomLeft } = corners(state);
  let newState = [];
  for(let i = bottomLeft[0]-1; i <= topRight[0]+1; i++ ){
    for(let j = bottomLeft[1]-1; j <= topRight[1]+1; j++){
      if(willBeAlive([i,j], state)) newState.push([i,j]);
    }
  }
  return newState;
};

const iterate = (state, iterations) => {
  let stateArray = [state];
  //let currentState = state;
  for (let i = 0; i < iterations; i++) {
    // let newState = calculateNext(currentState);
    // stateArray.push(newState);
    // currentState = newState;
    stateArray.push(calculateNext(stateArray[stateArray.length - 1]));
  }
  return stateArray;
};

const main = (pattern, iterations) => {
  const result = iterate(startPatterns[pattern], iterations);
  // for (i in result) {
  //   console.log(printCells(result[i]));
  // }
  result.forEach((v) => { return console.log(printCells(v))});
};

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