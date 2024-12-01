As with any React-based application, HTML elements like `div`s, `header`s, `footer`s, etc., are crucial for structuring your web pages. Together we'll walk through declaring and using `div` elements and other HTML tags effectively.

## What is an HTML Element?
Web development is really tricky to start out. Sometimes concepts that engineers may find "basic" might be completely overwhelming for a beginner. This course assumes some familiarity with coding, but we'll also outline in more detail so everyone can understand and follow along.

One of the greatest tools at anyone's disposal is the documentation for any given language or framework. For this particular section, it's critical to understand the basics of the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (Document Object Model) – the piece that connects web pages to scripts or programming languages by representing the structure of a document, such as the HTML representing a web page—in memory. 

Without a proper understanding of HTML and the DOM, you'll severely limiting your ceiling as a software engineer, even though popular front-end frameworks like React or Next.js will try and abstract it from you. You'll notice the primary form of interaction you've had with HTML so far with your calculator project is through the `return` statement of your component.

A document containing HTML is described using the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) interface, which is extended by the HTML specification to include various HTML-specific features. One such important feature is the inclusion of [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) and various subclasses, each representing one of (or a family of closely related) elements. This is what allows us to then use standard HTML elements you might've heard of called `div`s.

If at any point you've found yourself lost with the above section, I would highly suggest skimming the [Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Learn). These are considered to the highest standard of documentation for basic web development.

## Anatomy of HTML Elements
Each HTML element, the building blocks of your web application, is composed of the following:

* **The opening tag**: The opening tag marks the start of an HTML element. It consists of the element's name enclosed in angle brackets. Attributes can also be included in the opening tag (more on that later). **The name of the opening tag is often how we'll refer to a specific HTML element**.

```html
/// page.tsx
<div className="text-white"> <!-- more on classNames this later -->
```

* **Closing Tag**: The closing tag marks the end of the HTML element. It is similar to the opening tag but includes a forward slash `/` before the element name.

```html
/// page.tsx
</div>
```

* **Props**: Props provide additional information to or about an element. They are included within the opening tag and consist of a name and value pair. There's a lot of *these* out there, but here's a mostly comprehensive [list](https://react.dev/reference/react-dom/components/common#common). The ones you'll probably use most often is `id` and `className` for the purposes of styling.

```html
/// page.tsx
<tagname propName="propValue">Content</tagname> <!-- an anonymized example -->
```

```html
/// page.tsx
<img src="image.jpg" alt="A beautiful landscape"> <!-- some tags have special requirements -->
```

However, some tags have props that are uniquely required to them, so we'll outline a list of common HTML elements you'll need to know.

## Basic tags to remember

Understanding the purpose of each tag is essential for structuring pages effectively and ensuring good semantic meaning for your HTML content. Here's a breakdown of commonly used tags, their purpose, and examples.

* `<div>`: A generic container used to group content for styling, layout, or scripting purposes. It doesn't carry semantic meaning.
* `<span>`: A generic inline container used for content that requires inline styling or manipulation.
* `<p>`: A paragraph of text, generally used all text content.
* `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`: Header elements for structuring the content with decreasing levels of importance, used for clear and hierarchical structure within your page.
* `<ul>`, `<ol>`, `<li>`: Unordered lists (`<ul>`) or ordered lists (`<ol>`) with list items (`<li>`) used for instances where you need a list in either in a bulleted or numbered format.
* `<a>`: A hyperlink to another page, resource, or an anchor on the same page.
* `<img>`: An embedded image from a local source or an external URL. This element requires the `src` property (In Next.JS, however, you'll find yourself more often using the built-in [`Image`](https://nextjs.org/docs/pages/api-reference/components/image) component from `next/image`)
* `<form>`, `<input>`, `<button>`: Interactive forms for user input, typically used for submitting data (e.g., search bars, login forms).
* etc, etc, etc...

There's a lot more tags out there you can [check out](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) for yourself. However, this list provided will suffice for this guide.

## What to do

For now, we're going to need the following text elements:
* Separate `button`s for representing each number from 0-9
* Separate `button`s for representing each basic mathematical function (addition, subtraction, multiplication, and division)
* Lastly, you'll want to have `button` for `+/-` (for toggling positive and negative numbers), `C` (for clear), and `%` (for percentages).

Hopefully you know what a calculator should look like. If not, that's really on you – but I am nice and I will provide you with a picture for inspiration.

<img src='/images/calculator.png' width=500 height=500/>

Because this content is *highly* structured in terms of layout, it's going to be important to declare your `div`s in the right order. Go row by row starting from the upper left-hand corner with the clear button and work your way across to the the division button, and do each row from there. If you get stuck, remember hints will be provided to you if you click on the hint button in the top bar.

**Important**: *Make sure the elements you create are all wrapped in one big div*, so Next.js doesn't get angry. JSX (JavaScript XML), which Next.js uses as part of React, requires components to return a single parent element. This is because JSX compiles to React.createElement(), which only allows one root element per component.