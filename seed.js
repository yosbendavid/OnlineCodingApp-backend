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
  functionHeader: {
    type: String,
    required: true,
  },
  functionParams: {
    type: [String],
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  solutionArg: [{
    type: mongoose.Schema.Types.Mixed,
    required: false,
  }],
  solutionOutput: [{
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }],
});

// Step 4: Create Model
const MyCollection = mongoose.model('problems', codeBlockSchema);

//step 5: create the CB's
const newCodeBlock1 = new MyCollection({
    title: 'Sum Two Numbers',
    explanation: 'Given two integers return the sum.\n Input: a = 1\ntarget = 1\nOutput: 2\nExplanation: Because a + b == 2, we return 2.',
    functionHeader: 'function twoSum(numOne, numTwo) {',
    functionParams: ['numOne', 'numTwo'],
    code: ``,
    solutionArg: [5, 9],
    solutionOutput: 16,
});

const newCodeBlock2 = new MyCollection({
    title: 'Say hello',
    explanation: 'Use JS to return string to say Hello world',
    functionHeader: 'function hello() {',
    functionParams: [],
    code: ``,
    solutionArg: [],
    solutionOutput: "Hello world",
});

const newCodeBlock3 = new MyCollection({
  title: 'Flip a String',
  explanation: 'Return a string flipped. \n For example: Input: hi Output: ih',
  functionHeader: 'function flip(word) {',
  functionParams: ['word'],
  code: ``,
  solutionArg: ['hello'],
  solutionOutput: "olleh",
});

const newCodeBlock4 = new MyCollection({
  title: 'Two Sum',
  explanation: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n' +
    'You may assume that each input would have exactly one solution, and you may not use the same element twice.\n return in time complexity of O(n).\n' +
    ' Input: nums = [2,7,11,15]\ntarget = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
  functionHeader: 'function twoSum(nums, target) {',
  functionParams: ['nums', 'target'],
  code: ``,
  solutionArg: [[2,7,11,15], 9],
  solutionOutput: [0,1],
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
