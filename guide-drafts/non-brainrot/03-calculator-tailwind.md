Now you've declared the appropriate HTML elements. Now what? Well first off, our UI - or User Interface – is looking a little lackluster. There's not much visual appeal here.

Designing accessible and stylish user interfaces is a whole field in of itself, but we can definitely take a crash course on it for the sake of our calculator. How hard can that be?

> **Author note**: It was indeed hard.

So if it's apparently *so hard*, how can we make this process of making things &#x2728;aesthetic&#x2728; easier? There's a lot of tools out there, so let's start by talking about one of the most popular ones: **Tailwind CSS**.

## Okay, What is Tailwind?
Tailwind CSS is a utility-first CSS framework designed to streamline the process of building modern, responsive web interfaces. Instead of writing custom CSS, developers use predefined utility classes directly in their HTML to style applications. 

This approach emphasizes rapid development and consistent design.

Wow! That's perfect for us. You'll notice that Tailwind has already been configured and set up for us. Tailwind is so popular now amongst engineers that when you initialize any new Next.js project, it'll automatically install it for you. 

You can take a peek at the `tailwind.config.ts` to see what's there. We only have the default settings right now since we don't have much need for custom utility classes, but there's many different options at your [disposal](https://tailwindcss.com/docs/adding-custom-styles).

When Tailwind is installed and configured for your application, it will allow you to apply in-line stylings **through the className prop** like so:

```ts
/// file: button.tsx
/** An arbitrary component example with some Tailwind styling */
export default function Button() {
  return (
    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
      Click Me
    </button>
  );
}
```


## That's a Lot to Take In...
Yeah, I'm really sorry this is so yappy. Here's a picture of Fat Brian Family Guy to encourage you to stick with it.

<img src='/images/fat-brian.webp' width=500 height=500 />

Are you still here? &#129402;

Okay good, because I will just directly tell you what you will need to use to give you calculator a consistent feel and how to apply it.

For starters, here's what we want our final product to look like:
<img src='/images/calculator.png' width=500 height=500 />

The gray on the white provides a nice contrast from the white background, and the blue and red buttons naturally draw you eyes to the intended functionality and usage of the calculator.

## Setting backgrounds

This design heavily employs the usage of background to distinguish elements. Tailwind offers support for setting [backgrounds](https://tailwindcss.com/docs/background-color) on a particular elements. We'll stray away from using arbitary values, and instead use Tailwind's built-in colors for a more consistent UI ([comprehensive Tailwind color list](https://tailwindcss.com/docs/customizing-colors)).

Let's revisit one of our buttons then. You might have something in your project right now that looks like this:

```ts
/// file: calculator.tsx
/** Omitting extra buttons for clarity */
export default function Calculator() {
  return (
      ...
    <button>1</button>
      ...
  );
}
```

Let's apply a gray background to this! To match the example image before, we'll use `bg-gray-200` like so:

```ts
/// file: calculator.tsx
/** Omitting extra buttons for clarity */
export default function Calculator() {
  return (
      ...
    <button className='bg-gray-200'>1</button>
      ...
  );
}
```

But you're not limited to just one Tailwind property per element. You can apply multiple to: (1) [center the text](https://tailwindcss.com/docs/text-align) with `text-center`, (2) create [rounded corners](https://tailwindcss.com/docs/border-radius#rounded-corners) with `rounded`, and give the button more breathing room with [padding](https://tailwindcss.com/docs/padding) by applying `p-2`. 

All of these correspond to [standard CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) you might be familiar with already.

So now we'll have something that looks more like this:

```ts
/// file: calculator.tsx
/** Omitting extra buttons for clarity */
export default function Calculator() {
  return (
      ...
    <button className='p-2 bg-gray-200 rounded text-center'>1</button>
      ...
  );
}
```

To add some nice visual flair, you can even add hover effects which are specified with the `hover` prefix. For example, if you want to make the gray background darker when hovering over a button, you can say something like `hover:bg-gray-300`, and that'll take a higher precendence over `bg-gray-200`.

All buttons except the clear and equals button will look the same. If want, you can even create a string variable within your components to make copy and pasting easier:

```ts
/// file: calculator.tsx
/** Omitting extra buttons for clarity */
export default function Calculator() {
   const btn: string = 'p-2 bg-gray-200 rounded text-center hover:bg-gray-300';
   return (
      ...
      <button className={btn}>1</button>
      ...
   );
}
```

We use the `{}` for variable replacement so the value we assign to the `className` prop gets evaluated as a string.

Your job now is to finish styling the remaining buttons in accordance to the design. Additionally make sure you create another div for displaying the result, if you didn't do so in the last step, like so:

```ts
/// file: calculator.tsx
/** Feel free to put whatever number as the result for now */
export default function Calculator() {
   const btn: string = 'p-2 bg-gray-200 rounded text-center hover:bg-gray-300';
   return (
      <div>
         <div className="block mb-4">
            <div className="w-full p-2 border border-gray-300 rounded text-right">5508</div>
        </div>
        ...
      </div>
   );
}
```

Lastly, you'll want to set the `div` containing all the buttons to have a white background. You can get fancy with it and add drop-shadows, rounded corners, and padding too.