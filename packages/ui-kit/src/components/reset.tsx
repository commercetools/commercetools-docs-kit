import React from 'react';
import { Global, css } from '@emotion/react';

/**
 * This component provides our global CSS Reset.
 * It builds on Eric Meyer's v2 reset plus our own reset here
 * which adds selected low-level and form-related fixes for browser inconsistencies
 * from bootstrap's "reboot", which is a fork off normalize.css.
 * It does not preformat semantic content elements, this is done in the styled components.
 */
const Reset = () => (
  <>
    <Global
      styles={css`
        html,
        body,
        #___gatsby,
        #gatsby-focus-wrapper {
          height: 100%;
          width: 100%;
        }
        html,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          vertical-align: baseline;
        }

        /* HTML5 display-role reset for older browsers */
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
          display: block;
        }
        blockquote,
        q {
          quotes: none;
        }
        blockquote::before,
        blockquote::after,
        q::before,
        q::after {
          content: '';
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        body {
          margin: 0;
          padding: 0;
          border: 0;
          font-style: normal;
          font-variant: normal;
          font-stretch: normal;
          text-align: left;
          vertical-align: baseline;

          /* Allow Browsers to invest more CPU into text rendering.
          We do NOT apply '-moz-osx-font-smoothing: grayscale' and '-webkit-font-smoothing: antialiased'.
          They worsen the experience on non-retina screens. */
          text-rendering: optimizelegibility;
          /* Allow chrome to use nicer text wrapping, e.g. avoiding orphans (as of writing only supported in chrome) */
          text-wrap: pretty;

          /* Prevent adjustments of font size after orientation changes in IE on Windows Phone and in iOS. */
          -webkit-text-size-adjust: 100%;

          /* Change the default tap highlight to be completely transparent in iOS. */
          -webkit-tap-highlight-color: rgba(black 0);
        }

        /* See https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
          and https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
          and the boostrap reboot source code */
        [tabindex='-1']:focus:not(:focus-visible) {
          outline: 0 !important;
        }

        img {
          max-width: 100%;
        }

        svg {
          overflow: hidden;
          vertical-align: middle;
        }

        caption {
          text-align: center;
          caption-side: bottom;
        }

        hr {
          height: 0;
          overflow: visible;
        }

        abbr[title] {
          border-bottom: none;
          text-decoration: underline dotted;
        }
        sub {
          bottom: -0.25em;
        }
        sup {
          top: -0.5em;
        }

        /**
        * FROM HERE ON ALL "TECHNICAL" FORM ELEMENT FIXES TAKEN FROM BOOTSTRAP REBOOT
        * (and removed all things that are already done in reset.css)
        */

        /* Allow labels to use 'margin' for spacing. */
        label {
          display: inline-block;
        }

        button {
          /* Remove the default 'border-radius' that macOS Chrome adds. */
          border-radius: 0;
        }
        button,
        input {
          /* Show the overflow in Edge */
          overflow: visible;
        }

        /* Work around a Firefox/IE bug where the transparent 'button' background
          results in a loss of the default 'button' focus styles.
          Credit: https://github.com/suitcss/base/ */
        button:focus {
          outline: 1px dotted;
        }

        /* Remove the inheritance of text transform in Firefox */
        button,
        select {
          text-transform: none;
        }

        /* Remove the inheritance of word-wrap in Safari. */
        select {
          word-wrap: normal;
        }

        /* Correct the inability to style clickable types in iOS and Safari. */
        button,
        [type='button'],
        [type='reset'],
        [type='submit'] {
          -webkit-appearance: button;
        }

        input[type='radio'],
        input[type='checkbox'] {
          box-sizing: border-box; /* 1. Add the correct box sizing in IE 10- */
        }

        textarea {
          overflow: auto; /* Remove the default vertical scrollbar in IE. */
          resize: vertical; /*  Textareas should really only resize vertically so they don't break their (horizontal) containers. */
        }

        fieldset {
          min-width: 0;
        }

        legend {
          line-height: inherit;
          color: inherit;
          white-space: normal;
        }

        /* Correct the cursor style of increment and decrement buttons in Chrome. */
        [type='number']::-webkit-inner-spin-button,
        [type='number']::-webkit-outer-spin-button {
          height: auto;
        }

        [type='search'],
        [type='search']::-webkit-search-decoration {
          -webkit-appearance: none;
        }

        /* Correct the inability to style clickable types in iOS and Safari. */
        ::-webkit-file-upload-button {
          -webkit-appearance: button;
        }

        output {
          display: inline-block;
        }

        summary {
          display: list-item;
          cursor: pointer;
        }

        template {
          display: none; /* Add the correct display in IE */
        }

        /* Always hide an element with the 'hidden' HTML attribute (from PureCSS).
           Needed for proper display in IE 10-. */
        [hidden] {
          display: none !important;
        }
      `}
    />
  </>
);
export default Reset;
