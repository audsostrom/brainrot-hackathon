Flexbox, or the Flexible Box Layout, is a CSS layout model designed to create flexible and efficient layouts. It helps in aligning and distributing space among items in a container, even when their sizes are dynamic.

## Key Flexbox Concepts

There's some keywords and concepts you'll need to know to fully capitalize on the power of Flexbox.

* **The flex container**: The parent element which uses `display: flex` to enable flexbox styling on its children. With Tailwind, we designate an element to the flex container using `className: flex...`.
* **The flex items**: The direct children of a flex container that can be individually controlled using flexbox properties.
* **The axises**: There's two main axises on which flex items are placed within a flex container. The *main axis* is the primary axis along which flex items are placed. It is horizontal by default (left to right). The *cross-axis* is the axis perpendicular to the main axis. It is vertical by default (top to bottom). The axises can be toggled with the `flex-direction` property – in Tailwind, we use `flex-row` or `flex-col`.

## Rows and columns
By default, a flex container will have the main axis be horizontal, so there's no necessary need to ever specify `flex-row` to set the main axis to be horizontal. To set the main axis to be vertical, we specify `flex-col` with Tailwind. However, neither of will work if you forget to say `flex` in the styling on the parent container. Any specification or `flex-row` or `flex-col` must be done in conjunction with `flex`.

It's important to remember the orientation of your axises to align your content properly. `justify-content` and `align-items` will be your lifeline in assuring flex items are aligned where you'd like them to be regardless of screen size – which is fundamental to *responsive design*. To better illustrate this concept, here's a picture of the different stylings possible with flex containers beyond just `justify-content` and `align-items`.

<img src='https://miro.medium.com/v2/resize:fit:1400/0*YeaUsQyhXSL1TCTH.png'/>

There's a lot to take in with this one. Feel free to read through the documentation on [aligning items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) and [justifying content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).

To apply these CSS properties with Tailwind, you'll use [`items-<alignment>`](https://tailwindcss.com/docs/align-items) and [`justify-<alignment>`](https://tailwindcss.com/docs/justify-content) respectively.

For us, it might be helpful to set the outermost `div` in our Calculator component to be a flex container with `flex` that's vertically-oriented with `flex-col`. We want all of our content to *centered* both vertically and horizontally. Our code will look something like this as a result:

```ts
/// file: calculator.tsx
export default function Calculator() {

   ...

   return (
      <div"flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
        ...
      </div>
   );
}
```

## Alternatives to Flexbox
There are other models to building layouts: not just Flexbox. There's also **grid** and **block** models, each with their own use cases:

* **Block Layout**: the simplest and most traditional CSS layout model.
   * How it works: Elements are treated as block-level elements, stacking vertically. Each element takes up the full width of its parent by default. With Tailwind, we specify we want to use a block layout with `block`.
* **Grid Layout**: A two-dimensional layout model, where items are arranged both horizontally and vertically. 
   * How it works: You define rows and columns in a grid container. Items are placed into specific cells or span across multiple cells within that grid. With Tailwind, we specify we want to use a grid layout with `grid` and `grid-cols-{n}` (and/or `grid-row-{n}`).

Flexbox is greating for aligning content responsively, but don't discount the strengths of other layout models.

We'll use `block` styling on the results div for example:

```ts
/// file: calculator.tsx
export default function Calculator() {

   ...

   return (
      <div"flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
        <div className="block mb-4 w-full p-2 border border-gray-300 rounded text-right">
          5508
         </div>
      </div>
   );
}
```

Now this div will stetch to take up as much horizontal space as possible!

Additionally, a grid layout will make sense for our operation and numerical buttons. If we analyze the design of our calculator, you notice there's four columns with a bit of a gap in between. Let's add then the following divs around those buttons.

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
         {/** Added to apply a grid layout */}
         <div className="grid grid-cols-4 gap-2">
            ...
            <button className={btn}>1</button>
            ...
         </div>
      </div>
   );
}
```

Everything is starting to come together now visually! Now in the next steps, we're going to refine the *functionality* of our calculator.