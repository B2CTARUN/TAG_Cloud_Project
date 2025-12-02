import mongoose from 'mongoose';
import { Problem } from './src/models/problem.model.js';
import { DB_NAME } from './src/constants.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const sampleProblems = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "easy",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    example_cases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    test_cases: [
      {
        input: "[2,7,11,15]\n9",
        output: "[0,1]"
      },
      {
        input: "[3,2,4]\n6",
        output: "[1,2]"
      }
    ],
    solution: {
      c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    for(int i = 0; i < numsSize; i++) {
        for(int j = i + 1; j < numsSize; j++) {
            if(nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return result;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for(int i = 0; i < nums.size(); i++) {
            for(int j = i + 1; j < nums.size(); j++) {
                if(nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for(int i = 0; i < nums.length; i++) {
            for(int j = i + 1; j < nums.length; j++) {
                if(nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []`
    },
    input_format: "First line contains space-separated integers nums. Second line contains integer target.",
    output_format: "Space-separated indices of the two numbers."
  },
  {
    title: "Reverse String",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    difficulty: "easy",
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    example_cases: [
      {
        input: 's = [\"h\",\"e\",\"l\",\"l\",\"o\"]',
        output: '[\"o\",\"l\",\"l\",\"e\",\"h\"]',
        explanation: "The string is reversed in place."
      }
    ],
    test_cases: [
      {
        input: '["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: '["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    solution: {
      c: `#include <string.h>

void reverseString(char* s, int sSize) {
    int left = 0, right = sSize - 1;
    while(left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void reverseString(vector<char>& s) {
        reverse(s.begin(), s.end());
    }
};`,
      java: `class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while(left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}`,
      python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        s.reverse()`
    },
    input_format: "Array of characters s.",
    output_format: "Reversed array of characters."
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "easy",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    example_cases: [
      {
        input: 's = \"()\"',
        output: "true",
        explanation: "The string is valid."
      },
      {
        input: 's = \"()[]{}\"',
        output: "true",
        explanation: "The string is valid."
      },
      {
        input: 's = \"(]\"',
        output: "false",
        explanation: "The closing bracket ']' does not match the opening bracket '('."
      }
    ],
    test_cases: [
      {
        input: '"()"',
        output: "true"
      },
      {
        input: '"()[]{}"',
        output: "true"
      },
      {
        input: '"(]"',
        output: "false"
      }
    ],
    solution: {
      c: `#include <stdbool.h>
#include <string.h>

bool isValid(char* s) {
    int len = strlen(s);
    char stack[10000];
    int top = -1;
    for(int i = 0; i < len; i++) {
        if(s[i] == '(' || s[i] == '{' || s[i] == '[') {
            stack[++top] = s[i];
        } else {
            if(top == -1) return false;
            if((s[i] == ')' && stack[top] != '(') ||
               (s[i] == '}' && stack[top] != '{') ||
               (s[i] == ']' && stack[top] != '[')) {
                return false;
            }
            top--;
        }
    }
    return top == -1;
}`,
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for(char c : s) {
            if(c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if(st.empty()) return false;
                if((c == ')' && st.top() != '(') ||
                   (c == '}' && st.top() != '{') ||
                   (c == ']' && st.top() != '[')) {
                    return false;
                }
                st.pop();
            }
        }
        return st.empty();
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for(char c : s.toCharArray()) {
            if(c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if(stack.isEmpty()) return false;
                if((c == ')' && stack.peek() != '(') ||
                   (c == '}' && stack.peek() != '{') ||
                   (c == ']' && stack.peek() != '[')) {
                    return false;
                }
                stack.pop();
            }
        }
        return stack.isEmpty();
    }
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                if not stack or stack[-1] != mapping[char]:
                    return False
                stack.pop()
            else:
                stack.append(char)
        return not stack`
    },
    input_format: "String s containing parentheses.",
    output_format: "true if valid, false otherwise."
  }
];

// Programmatically add 150 placeholder problems (Sample Problem 4 ... Sample Problem 153)
(function generateAdditionalProblems() {
  const difficulties = ["easy", "medium", "hard"];
  const problemTypes = [
    "Array manipulation",
    "String processing",
    "Graph",
    "Dynamic Programming",
    "Greedy",
    "Math",
    "Hashing",
    "Binary Search",
    "Two Pointers",
    "Sliding Window"
  ];

  for (let i = 4; i <= 153; i++) { // inclusive -> 150 problems
    const idx = i - 4; // 0-based
    const difficulty = difficulties[idx % difficulties.length];
    const type = problemTypes[idx % problemTypes.length];

    const problem = {
      title: `Sample Problem ${i}`,
      description: `Automatically generated placeholder problem #${i}. Type: ${type}. Provide a complete problem statement and test cases as needed.`,
      difficulty,
      constraints: [
        "This is a generated placeholder. Replace constraints with real ones."
      ],
      example_cases: [
        {
          input: `Example input for Sample Problem ${i}`,
          output: `Example output for Sample Problem ${i}`,
          explanation: `This is an example case for the generated problem #${i}.`
        }
      ],
      test_cases: [
        {
          input: `Input for test case 1 of Sample Problem ${i}`,
          output: `Expected output for test case 1 of Sample Problem ${i}`
        },
        {
          input: `Input for test case 2 of Sample Problem ${i}`,
          output: `Expected output for test case 2 of Sample Problem ${i}`
        }
      ],
      solution: {
        c: `// Solution placeholder for Sample Problem ${i}\n#include <stdio.h>\nint main() { /* implement */ return 0; }`,
        cpp: `// Solution placeholder for Sample Problem ${i}\n#include <bits/stdc++.h>\nusing namespace std;\nint main(){ /* implement */ return 0; }`,
        java: `// Solution placeholder for Sample Problem ${i}\nclass Solution {\n    public static void main(String[] args) { /* implement */ }\n}`,
        python: `# Solution placeholder for Sample Problem ${i}\nif __name__ == "__main__":\n    pass`
      },
      input_format: "Placeholder input format. Replace with actual format.",
      output_format: "Placeholder output format. Replace with actual format."
    };

    sampleProblems.push(problem);
  }
})();

async function addProblems() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log('Connected to MongoDB');

    for (const problem of sampleProblems) {
      const existingProblem = await Problem.findOne({ title: problem.title });
      if (!existingProblem) {
        await Problem.create(problem);
        console.log(`Added problem: ${problem.title}`);
      } else {
        console.log(`Problem already exists: ${problem.title}`);
      }
    }

    console.log('All problems added successfully');
  } catch (error) {
    console.error('Error adding problems:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addProblems();
