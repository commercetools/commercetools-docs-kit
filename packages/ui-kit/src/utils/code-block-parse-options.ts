import React from 'react';
import parseNumericRange from './parse-numeric-range';

export type CodeBlockOptions = {
  title: string;
  highlightLines: number[];
  noPromptLines: number[];
  secondaryTheme: boolean;
};
const defaultOptions: CodeBlockOptions = {
  title: '',
  highlightLines: [],
  noPromptLines: [],
  secondaryTheme: false,
};

// this should get an array, parseNumericRange should be applied on
const getLinesForRange = (value: string) => {
  return value && typeof value === 'string'
    ? parseNumericRange(value.trim()).filter((n) => n > 0)
    : [];
};

export default function parseCodeBlockOptions(
  props: Record<string, string | boolean>
): CodeBlockOptions {
  const allowedOptions = [
    'secondaryTheme',
    'title',
    'highlightLines',
    'noPromptLines',
  ];
  const rawOptions = Object.keys(props)
    .filter((key) => allowedOptions.includes(key))
    .reduce((obj: Record<string, string | boolean>, key) => {
      obj[key] = props[key];
      return obj;
    }, {});
  if (rawOptions.secondaryTheme === 'false') rawOptions.secondaryTheme = false; // Boolean("false") = true
  return {
    ...defaultOptions,
    title: rawOptions.title?.toString(),
    highlightLines: getLinesForRange(rawOptions.highlightLines as string),
    noPromptLines: getLinesForRange(rawOptions.noPromptLines as string),
    secondaryTheme: Boolean(rawOptions.secondaryTheme),
  };
}
