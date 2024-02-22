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
    required: true,
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

const userSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },
    
});

// Step 4: Create Model
const MyCollection = mongoose.model('Problems', codeBlockSchema);

const userCollection = mongoose.model('Users', userSchema);

//step 5: create the CB's
const newCodeBlock1 = new MyCollection({
    title: 'Two Sum',
    explanation: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.',
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

const newCodeBlock2 = new MyCollection({
    title: 'Two Sum',
    explanation: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    example: `Input: x = 121
    Output: true
    Explanation: 121 reads as 121 from left to right and from right to left.
    `,
    code: 
    `var isPalindrome = function(x) {
    
    };
    `,
    solution: 'var nums = [2,9,11,15];\nvar target = 9;\nvar twoSum = function(nums, target) {\nlet mp = new Map();\nfor (let i = 0; i < nums.length; i++) {\nlet diff = target - nums[i];\nif (mp.has(diff)) {\nreturn [i, mp.get(diff)];\n}\nmp.set(nums[i], i);\n}\n};',
});

const newCodeBlock3 = new MyCollection({
    title: 'Two Sum',
    explanation: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.',
    example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
    code: 'var nums = [2,9,11,15];\nvar target = 9;\nvar twoSum = function(nums, target) {\n};',
    solution: 'var nums = [2,9,11,15];\nvar target = 9;\nvar twoSum = function(nums, target) {\nlet mp = new Map();\nfor (let i = 0; i < nums.length; i++) {\nlet diff = target - nums[i];\nif (mp.has(diff)) {\nreturn [i, mp.get(diff)];\n}\nmp.set(nums[i], i);\n}\n};',
});

const newCodeBlock4 = new MyCollection({
    title: 'Two Sum',
    explanation: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.',
    example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
    code: 'var nums = [2,9,11,15];\nvar target = 9;\nvar twoSum = function(nums, target) {\n};',
    solution: 'var nums = [2,9,11,15];\nvar target = 9;\nvar twoSum = function(nums, target) {\nlet mp = new Map();\nfor (let i = 0; i < nums.length; i++) {\nlet diff = target - nums[i];\nif (mp.has(diff)) {\nreturn [i, mp.get(diff)];\n}\nmp.set(nums[i], i);\n}\n};',
});

const newUser1 = new userCollection({
    type:"Observer"
});

const newUser2 = new userCollection({
    type: "Editor"
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
