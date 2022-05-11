# react-title-config

> Jenkins change test


## Install

```bash
npm install react-title-config
```

## Usage

```jsx
import React from "react"
import TitleConfig from "react-title-config"

 // NOTE: it might be any router you want
import { BrowserRouter } from "react-router-dom"

// your main page or whatever
import MainPage from "/pages/Main"


const config = [
  {
    path: "/about",
    exact: true,
    skipPrefix: true,
    title: "About us",
  },
  {
    exact: true,
    path: ["/login", "/registration", "/reset-password"],
    title: "User actions",
  },
  {
    path: /^\/accounts\/[A-Za-z0-9]+/i,
    title: "Account page",
  },
  {
    path: pathname => pathname.length === "42",
    title: (params, descriptor, extras) => {
      const tab = params.queryParams.tab

      switch (tab) {
        case "one": return "The Hitchhiker's Guide to the Galaxy"
        case "two": return "The Restaurant at the End of the Universe"
        case "three": return "Life, the Universe and Everything"
        case "four": return "So Long, and Thanks for All the Fish"
        case "five": return "\tMostly Harmless"
        default: return "Not sure about this one"
      }
    },
  },
]

const defaultTitle = "No matches"
const titlePrefix = "Prefixed. "

const App = () => (
  <BrowserRouter>
    <>
      <TitleConfig
        config={titlesConfig}
        defaultTitle={defaultTitle}
        prefix={titlePrefix}
        customProperty="All extra props will be passed to title functtion as second parameter"
      />
      <MainPage/>
    </>
  </BrowserRouter>
)
```

## Props

### `config (required)` : `Array`

An array of title descriptors

### `defaultTitle` : `String` | `default: ''`

This title will be set in case there's no matches

### `prefix` : `String` | `default: ''`

A static string prefixing each title without `skipPrefix: true`

## Config Descriptor

### `path (required)` : `String | RegExp | PathFunction | Array<string | RegExp | PathFunction>`

A path to match with current pathname.

`PathFunction` accepts current pathname as parameter and returns whether the pathname matches: `(pathname: String) => Boolean`

### `title (required)` : `String | TitleFunction`

A title which will be rendered in case of match.  

`TitleFunction` accepts current location params, matched descriptor and object containing all extra props passed to component: `(params: PathParams, descriptor: ConfigDescriptor, extras: Object) => Boolean`

`PathParams` is an object of following shape:

```javascript
{
  hash: String,
  href: String,
  pathname: String,
  queryParams: Object
}
```

### `exact` : `Boolean` | `default: false`

Defines matching rule for plain strings. With `exact` set to true title will be set only in case of full match.

`path: "/accounts"` will match `/accounts/9379992` by default and it will match only `/accounts` in case of `exact: true`

### `skipPrefix` : `Boolean` | `default: false`

Current title will not be prefixes if `skipPrefix` is set to true

## License

MIT © [Alex Khismatulin](https://github.com/alexkhismatulin)
