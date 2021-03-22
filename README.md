<h1 align="center">xs-react-table</h1>
<p>
  <a href="https://www.npmjs.com/package/xs-react-table" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/xs-react-table.svg">
  </a>
  <a href="https://github.com/icerockartic/xs-react-table#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/icerockartic/xs-react-table/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/icerockartic/xs-react-table/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/icerockartic/xs-react-table" />
  </a>
</p>

> A small, simple and headless UI react table. It's up to you to define the shape, attributes, eventlisteners, styles, ... of every single element of your table. 

## Installation

```
  npm i xs-react-table

  yarn add xs-react-table

  import { Table } from 'xs-react-table'
```
## Demo

#### [Code Sandbox](https://codesandbox.io/s/xs-react-table-demo-gvcdi)



## Basic Usage

**Define thead, tbody and tfoot using this basic skeleton:**

```

  {
    tr: {
      rows: [
        {
          td: {
            cols: [
              {
                content: "Your Text Here",
              }
            ]
          }
        },
      ]
    }
  }

```

*Example:*

```

  const head = {
    tr: {
      rows: [
        {
          td: {
            cols: [
              {
                content: "First Name",
              },
              {
                content: "Last Name",
              },
            ]
          }
        },
      ]
    }
  }


  const body = {
    tr: {
      rows: [
        {
          td: {
            cols: [
              {
                content: "John",
              },
              {
                content: "Doe",
              },
            ]
          }
        },
        {
          td: {
            cols: [
              {
                content: "Jane",
              },
              {
                content: "Doe",
              },
            ]
          }
        },
      ]
    }
  }


  const foot = {
    tr: {
      rows: [
        {
          td: {
            cols: [
              {
                content: "Whatever",
              },
              {
                content: "You",
              },
              {
                content: "Like",
              },
            ]
          }
        }
      ]
    }
  }
```
**Pass them to <Table\> component**

```
  <Table head={head} body={body} foot={foot} />
```

### Extra fields

#### will be updated

## Author


👤 **Truong Nguyen**

- Github: [@icerockartic](https://github.com/icerockartic)



## 📝 License

Copyright © 2021 [Truong Nguyen](https://github.com/icerockartic).<br />
This project is [MIT](https://github.com/icerockartic/xs-react-table/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
