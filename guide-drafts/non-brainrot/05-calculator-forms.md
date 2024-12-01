As we discussed briefly before, some HTML elements carry a *semantic meaning*. That means they convey meaning about the content within them. These elements not only describe the content visually but also give context to web browsers, search engines, and assistive technologies. It also makes your code more readable and easier to maintain. 

With this in mind, it makes sense to refactor our work so that our calculator carries more semantic meaning.

## Forms
One of the most commonly used HTML elements is `<form>`. It has a well-defined use case for collecting user input to update the state of our application. In our calculator, we're collecting user input via button clicks and reacting accordingly. Here's some commonly used elements for HTML forms and their respective semantic meaning:

| **Element**   | **Purpose**                                                              |
|---------------|--------------------------------------------------------------------------|
| `<form>`      | Represents a collection of form elements.                               |
| `<input>`     | Represents an input field. Can be text, password, email, etc.           |
| `<textarea>`  | Represents a multi-line text input.                                     |
| `<button>`    | Represents a clickable button.                                          |
| `<label>`     | Associates a label with a form control.                                 |
| `<fieldset>`  | Groups related form elements together.                                  |
| `<legend>`    | Provides a title for the `<fieldset>`.                                   |


## How we'll refactor our code

You might've had something like this before:

```ts
/// file: calculator.tsx
/** Some elements ommitted for clarity */
export default function Calculator() {

   ...

   return (
      <div"flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
        <div className="block mb-4 w-full p-2 border border-gray-300 rounded text-right">
          5508
         </div>
         <div className="grid grid-cols-4 gap-2">
            ...
            <button className={btn}>1</button>
            ...
         </div>
      </div>
   );
}
```

Update this to now be the following:

```ts
/// file: calculator.tsx
/** Some elements ommitted for clarity */
export default function Calculator() {

   ...

   return (
      <div"flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
         {/** wrapping form element added */}
         <form className="w-full">
            <div className="block mb-4 w-full p-2 border border-gray-300 rounded text-right">
               5508
            </div>
            <div className="grid grid-cols-4 gap-2">
               ...
               <button className={btn}>1</button>
               ...
            </div>
         </form>
      </div>
   );
}
```

Next, let's focus on refactoring a buttons to reflect their intended semantic meaning. Since these buttons are how we collect input from the user we'll factor our numerical and operational buttons from this: `<button className={btn}>1</button>`

... to this:

```ts
/// file: calculator.tsx
/** Some elements ommitted for clarity */
export default function Calculator() {

   ...

   return (
      <div"flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
         <form className="w-full">
            <div className="block mb-4 w-full p-2 border border-gray-300 rounded text-right">
               5508
            </div>
            <div className="grid grid-cols-4 gap-2">
               ...
               {/** 1 button refactored */}
               <input
                  type="button"
                  value="1"
                  className={btn}
               />
               ...
            </div>
         </form>
      </div>
   );
}
```

The various supported input types can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), but the `button` type makes the most sense as user input is only collected with button clicks. The value prop is determines what's displayed on the button in this case. Even though we've changed the tag for this HTML element, you'll find the styling still looks the same. The power of Tailwind!

Do this process for the rest of your numerical and operational buttons. As for the div which is currently displaying some static number, we're going to refactor that as well to be an `<input>` tag:

```ts
/// file: calculator.tsx
/** Some elements ommitted for clarity */
export default function Calculator() {

   const count: string = '8055';

   return (
      <div"flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
         <form className="w-full">
            {/** Result display refactor */}
            <label className="block mb-4">
               <input
                  type="text"
                  value={count}
                  className="w-full p-2 border border-gray-300 rounded text-right"
                  readOnly
               />
            </label>
            ...
         </form>
      </div>
   );
}
```

You'll notice that this `<input>` tag for representing the result has a `readOnly` prop. This means the user can't interact with this input in any way that can modify it. We've also used data-binding to attach some variable to the value of this input. 

In the next step, we'll work towards modifying what count is so our calculator works.