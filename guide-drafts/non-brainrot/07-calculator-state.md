To fix our calculator, we're going to have to understand application state, the difference between client-side and server-side rendering, and how the `useState` hooks work within a Next.js application.

## What is Application State?
Application state refers to the data that an application stores and manages during its lifecycle. In the context of a Next.js app, this often refers to the data that affects the rendering of a component. State is typically used to hold values that need to be updated or changed during the user’s interaction with the app (e.g., input fields, form values, or UI settings).

In the provided Calculator component, `count` needs to be stored in the application state, since it holds the current value displayed in the calculator.

## Client-side vs. Server-side Rendering

The difference between client-side and server-side rendering hinges entirely upon your understanding between the relationship between clients and servers in modern web applications, so make sure you understand [that](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview) first.

### Client-Side Rendering (CSR)
With client-side rendering, the application runs entirely in the user's browser. Next.js can be configured to use CSR for specific pages or components, meaning that the page is loaded with minimal HTML and relies on JavaScript to load and render the content.

User interaction happens entirely on the client side. This means the count state is updated and rendered without needing to reload the page or make any requests to the server.

In the context of our project, the calculator's interactive UI relies on client-side JavaScript for real-time updates as users input numbers and perform calculations.

### Server-Side Rendering (SSR)
In server-side rendering, the HTML is generated on the server and sent to the client. This allows the browser to display content faster because the initial page load includes the pre-rendered HTML. However, interactions after the initial load often rely on JavaScript for updates.

Next.js defaults to server-side rendering for pages, but you can opt into client-side rendering with features like `use client` directive (as in your code), static generation, or by using React hooks for state and effects in components.

## How This Pertains to Us

With all this in mind then, it makes sense for us to declare our calculator as a client component to let us use hooks for managing application state. You can convert a component to be rendered client-side with the `use client` directive. While you're doing that, you should also import the appropriate React Hooks for managing state:


```ts
/// file: calculator.tsx
'use client';
import { useState } from 'react';

export default function Calculator() {
   ...
}
```

`useState` is useful for enabling the ability to store and manage data that can change over time within your component. When the state changes, Next.js will re-render the component to reflect those changes in the UI.

Let's break down how it works:

``const [state, setState] = useState(initialValue);``
* **`state`**: This represents the current value of the state.
* **`setState`**: This is a function that allows you to update the state.
* **`initialValue`**: This is the initial value that the state will have when the component is first rendered.

Now that we've done that, we can now track and manage the value of `count` appropriately in response to user interactions.

```ts
/// file: calculator.tsx
'use client';
import { useState } from 'react';

export default function Calculator() {

   // changed from `const count: string = 8055;`
   const [count, setCount] = useState('');
}
```

Now we can refactor all of our functions accordingly:

```ts
/// file: calculator.tsx
export default function Calculator() {

   const [count, setCount] = useState('');

   const handleInput = (e: React.ChangeEvent<any>) => {
      // changed from count = count + e.target.value
      setCount(count + e.target.value);
   };

   return (
      ...
   );
}
```

Make sure that changes that were being made to the `count` before are now appropriately refactored into `setCount` function calls.

Once you've done that, you've successfully completed your own calculator! Congrats.