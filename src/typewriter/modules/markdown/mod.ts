// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { Marked } from "marked";

export const mkdwn = new Marked(
  {
    pedantic: false,
    gfm: true,
    breaks: false,
  },
);
