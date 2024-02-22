const mongoose = require('mongoose');
const CodeBlock = require('./models/codeBlock');

// Step 1: Connect to MongoDB
mongoose.connect('mongodb+srv://yosbendavid:QQ5waku2JrjaXfEA@cluster0.r4ehk1d.mongodb.net/OnlineCodingApp')
    .then(() => {
        console.log('connected!');
    })
    .catch(() => {
        console.log('error');
    })

// Step 3: Define Schema
const codeBlockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  solution: {
    type: String,
    required: false,
  },
});

// Step 4: Create Model
const MyCollection = mongoose.model('problems', codeBlockSchema);

//step 5: create the CB's
const newCodeBlock1 = new MyCollection({
    title: 'Sum Two',
    explanation: 'Given two integers return the sum.',
    example: 'Input: a = 1\ntarget = 1\nOutput: 2\nExplanation: Because a + b == 2, we return 2.',
    code: 
    `var a = 5;
    var b = 6;
    var twoSum = function(a, b) {

      
      
    };`,
    solution: 
    `var a = 5;
    var b = 6;
    var twoSum = function(a, b) {

      let c = a + b;
      
      return c;
    };`,
});

const newCodeBlock2 = new MyCollection({
    title: 'alert',
    explanation: 'Use JS to alert to client and say Hello world',
    example: 'a****("Hello world");',
    code: 
    ``,
    solution: `alert("Hello world");`,
});

const newCodeBlock3 = new MyCollection({
  title: 'Compares',
  explanation: 'Return change the values and console.log() true',
  example: '',
  code: 
  `console.log(5 == 'a');
  console.log(5 === '5');
  `,
  solution: `alert("Hello world");`,
});

const newCodeBlock4 = new MyCollection({
  title: 'Leetcode - Two Sum',
  explanation: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n return in time complexity of O(n).',
  example: 'Input: nums = [2,7,11,15]\ntarget = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
  code: 
  `var nums = [2,9,11,15];
  var target = 9;
  var twoSum = function(nums, target) {

    //Code goes here..
    
  };`,
  solution: 
`
var nums = [2,9,11,15];
var target = 9;
var twoSum = function(nums, target) {
let mp = new Map();
let diff = target - nums[i];
for (let i = 0; i < nums.length; i++) {
  if (mp.has(diff)) {
    return [i, mp.get(diff)];
  }
  mp.set(nums[i], i);
}
};`,
});

// Save each code block to the database
Promise.all([
    newCodeBlock1.save(),
    newCodeBlock2.save(),
    newCodeBlock3.save(),
    newCodeBlock4.save()
])
.then(() => {
    console.log('All code blocks saved successfully');
})
.catch((err) => {
    console.error('Error saving code blocks:', err);
});
