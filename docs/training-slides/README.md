# Documentation Kit Training Slide Deck

Slide deck and a custom theme (not separated yet) to teach using the documentation kit. It's based on [mdx-deck](https://github.com/jxnblk/mdx-deck/)

You can mostly use the same components as you can in when writing documentation content.

## Writing with live preview

```sh
yarn
cd docs/training-slides
yarn develop
```

> annoying known bug: crashes when editing the deck while it's running: https://github.com/jxnblk/mdx-deck/issues/598

Sections / Modules of the presentation are authored in MDX files in the `./decks` folder.

## Presenter Mode

Use [_Presenter Mode_](https://github.com/jxnblk/mdx-deck/blob/master/docs/presenting.md) when on stage to show a preview of the next slide, a timer, and speaker notes.

## Keyboard Shortcuts

| Key                                | Description                              |
| ---------------------------------- | ---------------------------------------- |
| Left Arrow, Page Up, Shift + Space | Go to previous slide (or step in Appear) |
| Right Arrow, Page Down, Space      | Go to next slide (or step in Appear)     |
| Option + P                         | Toggle Presenter Mode                    |
| Option + O                         | Toggle Overview Mode                     |
| Option + G                         | Toggle Grid Mode                         |

In Presenter mode you can open a new window with the slides (regular view) that you can then move to the projector display and make fullscreen there.
It's synced with your presenter mode display.

## Presentation-Specific Layouts / Components

Not all mdx-deck builtins work or make sense.
The following are provided automatically without having to import them.
Some are from mdx-deck, some our custom ones

### `TitleSlide`: Wrapper to center a heading as a start slide

```md
<PresentationTitle>

# Module 1: Introduction

</PresentationTitle>

---
```

### `Aside`:

Puts a "sticky note" to the top right corner of the slide

```md
<Aside>Task 1</Aside>
```

### `Info`, `Warning`, `Error`

```md
<Warning>Do not publish without approval</Warning>
```

### `Split`: Two parts Side-By-Side (top level markdown elements are put next to each other)

```md
<Split>

> First

- Topics
  - subtopics
  - subtopics
  - subtopics

</Split>
```

### `Horizontal`: Any number of parts distributed horizontally:

```md
<Horizontal>

> one quote

> second quote

> third quote

</Horizontal>
```

### `Appear`: Let content appear piece by piece

```md
Content outside the `<Appear>` tag is immediately visible

<Appear>

Content inside the `<Appear>` tag is appearing after click or keyboard navigation

## A test heading!

</Appear>
```

(not working with bullet points yet)

https://github.com/jxnblk/mdx-deck/blob/master/docs/components.md#appear

### `Notes`: Speaker Notes

```md
<Notes>

- Only visible in presenter mode
- Markdown syntax can be used with empty lines around the content

</Notes>
```

### `Image`: Images taking the full available space

To use a local image, place it into the `static` folder.

```md
<Image src="https://example.com/kitten.png" />

<Image src="/commercetools-docs-repo-on-github.png" />
```

Alternatively use the standard markdown syntax for images (not stretching to full size then):

```md
![test image](/commercetools-docs-repo-on-github.png)
```
