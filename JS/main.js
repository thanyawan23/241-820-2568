/*
//String, Number, Boolean, Object, Array


//1. String
let firstName = "John Doe";
const idcard = '123';
//2. Number
let age = 30;
let height = 5.9;

//3. Boolean
let isStudent = false;

//การต่อสตริงใช้ , หรือ +
firstName = "test";

console.log("My name is", firstName, 'and I am', age, 'years old.');

/*
+ บวก
- ลบ
* คูณ
/ หาร
% หารเอาเศษ mod
*/

/*
let number1 = 'test';
let number2 = 'xxx';

let result = number1 + number2; //การบวกสตริงจะเป็นการต่อสตริง
console.log("ผลบวก =", result);
*/

/*Conditional Statement
//if, else if, else
//==, ===, !=, !==, >, <, >=, <=
//&&, ||,!
/*

/*
== เท่ากับ
+= ไม่เท่ากับ
> มากกว่า
< น้อยกว่า
>= มากกว่าหรือเท่ากับ
<= น้อยกว่าหรือเท่ากับ
*/

/*
let number1 = 10;
let number2 = 20;

let condition1 = number1 != number2; //Boolean ค่า true หรือ false
console.log("result of condition is:", condition1);
*/

/*
let number1 = 25;
let number2 = 25;

//if - else conditional statement
if (number1 != number2) {
   console.log("this if");
} else if (number1 == number2) {
   console.log("this else if");
} else {
    console.log("this else");
}
*/

/*
Grade
>= 80 A
>= 70 B
>= 60 C
>= 50 D
< 50 F
*/

/*
let score = prompt("ป้อนคะแนนของคุณ")
console.log("คะแนนของคุณคือ", score);

if (score >= 80) { //false
    console.log("เกรด A")
} else if (score >= 70) { //false
    console.log("เกรด B")
}    else if (score >= 60) { //false
    console.log("เกรด C")
}       else if (score >= 50) { //false
    console.log("เกรด D")
} else { 
    console.log("เกรด F")
}
*/
   
/*
&& และ
|| หรือ
! ไม่
*/

/*
let number1 = 5
let number2 = 8
// true && false
let condition = !(number1 >= 3 || number2 >= 10);
console.log("condition:", condition);


let age = 30;
let gender = 'ชาย';

if (age >=18 && gender == 'ชาย') {
    console.log("ผู้ชายที่มีอายุ 20 ปีขึ้นไป");
}
*/

/*
let  number = 20
if (number % 2 != 0){
    console.log("เป็นเลขคู่");
} 
*/

/* loop statement
while
for
*/

let counter = -5;
while(counter < 10){
    console.log("Hello World");
    //counter = counter + 1;
    counter += 1;
}

for(let i = 0; i < 10; i++){
    console.log("Hello for from for loop");
}