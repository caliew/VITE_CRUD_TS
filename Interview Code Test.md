// --------------------------------------------------------------
// HOW MANY TIMES A SPECIFIC WORD IN A GIVEN STRING CAN BE FORMED 
// FROM THE CHARACTERS PRESENT IN THE INPUT STRING
// --------------------------------------------------------------
function getStrCount(strText) {
    return strText.toLowerCase().split('').reduce((StrCount,char)=>{
        StrCount[char] = (StrCount[char] || 0) + 1;
        return StrCount;
    },{})
}
function countWord(StrInput,word) {
    const WordCount = getStrCount(word);
    const StrCount = getStrCount(StrInput);
    let count = Infinity;
    console.log(WordCount)
    Object.keys(WordCount).forEach((key)=>{
        if (!StrCount[key]) return 0;
        console.log(`[${count}]...<${key}> :: ${StrCount[key]}/${WordCount[key]}..${Math.floor(StrCount[key]/WordCount[key])}`)
        count = Math.min(count,Math.floor(StrCount[key]/WordCount[key]));
    })
    return count;
}
console.log(countWord('llBnaloaBaEWloon','Balloon'));
// -----------------------------------------------------
// Adding add and subtract Methods to Number.prototype
// Expanding the String.prototype
// -----------------------------------------------------
String.prototype.capitalizeWords = function() {
  return this.split(' ')
             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
             .join(' ');
};
const str = "hello world from javascript";
console.log(str.capitalizeWords()); // Output: "Hello World From Javascript"
// -----------------------------------------------------
// Complex Example - Handling Integer-Specific Operations:
// -----------------------------------------------------
Number.prototype.add = function(num) {
  if (!Number.isInteger(this) || !Number.isInteger(num)) {
    throw new Error('Only integers are allowed.');
  }
  return this + num;
};
Number.prototype.subtract = function(num) {
  if (!Number.isInteger(this) || !Number.isInteger(num)) {
    throw new Error('Only integers are allowed.');
  }
  return this - num;
};
// Example usage:
try {
  const result = (20).add(15).subtract(5);  // Result: 30
  console.log(result);  // Output: 30
} catch (error) {
  console.error(error.message);
}