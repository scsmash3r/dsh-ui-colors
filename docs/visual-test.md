# Visual color test

Paste everything below this line into a DSH chat to check surfaces, borders, text, links, selection, and Shiki syntax colors.

---

# Color test

## Text and links

A paragraph with **bold**, *italic*, `inline code`, ~~strikethrough~~, and a [Shiki link](https://shiki.style/). Here is a second [project link](https://github.com/DDDPG/dsh-plugins).

> A blockquote with a [link](https://example.com), **strong text**, and `inline code`.

- A bullet with `inline code`
- ~~A tildes strikethrough~~
- A [link in a list](https://example.com)

1. An ordered item
2. Another item with **bold**

| Element | Sample |
| --- | --- |
| Surface | A table row |
| Border | A second row |
| Link | [example](https://example.com) |

---

## Shiki syntax sample

The tilde fence below checks Tildes, comment, keyword, string, template expression, function, parameter, constant, and punctuation colors.

~~~ts
// Shiki token sample: https://shiki.style/
const palette = "neon-yellow";

function greet(name: string, mood: "light" | "dark"): string {
  const message = `Hello, ${name} — ${mood} mode`;
  return message;
}

const config = { enabled: true, retries: 3 };
~~~

Select this paragraph to check the `::selection` background. The text keeps its normal foreground color.

> Select this quoted line too.
