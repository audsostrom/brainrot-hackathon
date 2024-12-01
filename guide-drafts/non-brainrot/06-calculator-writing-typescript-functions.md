In TypeScript (the language our components are written in), functions are blocks of code that can be called to perform a specific task.

TypeScript builds upon JavaScript’s function system and introduces strong typing, allowing for more reliable and maintainable code. This guide will explain the purpose and anatomy of functions in TypeScript, how to type them, and common use cases.

## The Anatomy of a TypeScript function

A TypeScript function typically consists of the following:

* Function Declaration: The function’s name and signature
* Parameters (optional): Inputs to the function. Remember that in TypeScript, you can *should* the type of each parameter,
* Return Type (optional): The return type specifies what type of value the function will return. If not specified, TypeScript will infer the return type.
* Function Body: The body contains the logic of the function, which will be executed when the function is called.

Here's an illustrated example:

```
const <function declaration> = (<parameters (optional)>): <return type> => {
   <function body>
};
```

## What Can Functions Be Used For?
Functions in TypeScript are incredibly versatile and can be used in various scenarios:

* **Performing Calculations or Logic**: Functions encapsulate logic, whether it’s a mathematical calculation or conditional logic.
* **Handling User Input or Events**: Functions are used to handle user interaction, such as button clicks or form submissions.
* **Modularizing Code**: Functions help in breaking down large tasks into smaller, manageable pieces, making code easier to test and maintain.
* **Creating Reusable Code Snippet**: Functions allow you to reuse code in different parts of your application.
* **Handling Asynchronous Tasks**: Functions can handle asynchronous operations such as fetching data from an [API](https://aws.amazon.com/what-is/api/).

## Functions for a Calculator

For us, we definitely want to have functions for handling button click events such as: pressing a number or operation button, pressing the clear button, toggling negative and positive numbers, calculating percentages, and ultimately calculating our final result.

After outlining the needed functionality above, we definitely will need at least *five* functions if we want our code to be maintainable and easy to debug. Here's outline of what we might need to implement.

```ts
/// file: calculator.tsx
/** Some elements ommitted for clarity */
export default function Calculator() {

   const count: string = 8055;

   const handleInput = (e: React.ChangeEvent<any>) => {
      ...
   };

   const handleClear = () => {
      ...
   };

   const toggleNegative = () => {
      ...
   };

   const calculatePercentage = () => {
      ...
   };

   const calculateResult = () => {
      ...
   };

   return (
      ...
   );
}
```

You'll notice we're using strings to represent numbers and operations. This is an intentional design choice to make handling multiple-digit numbers easier – since TypeScript has built-in functions anyways to [convert strings representing equations into numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval). You can ignore the typical warnings that come from using `eval()` since you are building a calculator, not a full fintech SAAS.

You'll notice that `handleInput` takes in a parameter `e`. This parameter `e` is an Event that is triggered by a change in some element, according to this type. This change, and its value can be obtained by event-binding this function to one of our many numerical buttons like so:

```ts
/// file: calculator.tsx
/** Some elements ommitted for clarity */
export default function Calculator() {

   ...

   return (
      <div"flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
         <form className="w-full">
            <label className="block mb-4">
               <input
                  type="text"
                  value={count}
                  className="w-full p-2 border border-gray-300 rounded text-right"
                  readOnly
               />
            </label>
            <div className="grid grid-cols-4 gap-2">
               ...
               {/** 1 button refactored */}
               <input
                  type="button"
                  value="1"
                  onClick={handleInput}
                  className={btn}
               />
               ...
            </div>
         </form>
      </div>
   );
}
```

The `onClick` property is how Next.js handles [click events](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event). The value of the input (in the example, "1") gets passed to our `handleInput` function since the value is considered as part of the event, and we can access it like so:

```ts
/// file: calculator.tsx
/** Some elements ommitted for clarity */
export default function Calculator() {

   const count: string = 8055;

   const handleInput = (e: React.ChangeEvent<any>) => {
      // e should be "1" or some number string to combine strings together
      count += e.target.value;
   };

   return (
      ...
   );
}
```

Because we're using strings to represent `count`, or the value currently entered into a calculator - we want to be careful on how we handle our variables so our math is done correctly.

```ts
/// file: calculator.tsx
/** Some elements ommitted for clarity */
export default function Calculator() {

   const count: string = 8055;

   ...

   const toggleNegative = () => {
      // if it's already negative ("-" in front of string), then drop the "-"
      if (count.startsWith('-')) {
         count = count.substring(1);
      // otherwise add "-" to the front of the string
      } else {
         count = '-' + count;
      }
   };

  const calculatePercentage = () => {
      // using a try-catch here in case parseFloat() doesn't work
      try {
         count = (parseFloat(count) / 100).toString();
      } catch {
         count = 'Error';
      }
   };

   ...

   return (
      ...
   );
}
```

You'll notice we're using a lot of string manipulation here to make everything work. For example `parseFloat()` converts a string to a number so we can actually calculate a percentage, before converting it back to a string to satisfy the typing of `count`.

## For you to do
To ensure you fully understand how to build a calculator by yourself and follow the prescribed designs and functions given to you, you will have to implement the following yourself:

* `handleClear`: This should set `count` back to an empty string. The function should be the function that's triggered when the clear button is pressed (use the `onClick` prop).
* `calculateResult`: This should set `count` to the result of `eval(count).toString()`. It's suggested you put this in a try-catch block to ensure nothing goes wrong. This function should be triggered when you click the equals button (use the `onClick` prop).


After all this, you'll notice the calculator *still* isn't working! That's because any updates to `count` aren't getting updated in the state of application. We'll fix this in the next step.
