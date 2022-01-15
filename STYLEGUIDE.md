# CryptoChefs React Style Guide

## Basic Rules

- Only include one React component per file (multiple Stateless, or Pure, Components are allowed per file. `eslint: react/no-multi-comp`)
- Always use JSX syntax.
- Do not use `React.createElement` unless you’re initializing the app from a file that is not JSX

## Naming

- **Extensions:** Use `.jsx` extension for React components.
- **Filename:** Use PascalCase for filenames. E.g., `ErrorCard.jsx`.
- **Reference** Naming: Use PascalCase for React components and camelCase for their instances. `eslint: react/jsx-pascal-case`

```javascript
// bad
import errorCard from "./ErrorCard";

// good
import ErrorCard from "./ErrorCard";

// bad
const ErrorItem = <ErrorCard />;

// good
const errorItem = <ErrorCard />;
```

- **Component Naming**: Use the filename as the component name. For example, ReservationCard.jsx should have a reference name of ReservationCard. However, for root components of a directory, use index.jsx as the filename and use the directory name as the component name:

```javascript
// bad
import Footer from "./Footer/Footer";

// bad
import Footer from "./Footer/index";

// good
import Footer from "./Footer";
```

- **Props Naming:** Avoid using DOM component prop names for different purposes.

```javascript
// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />
```

## Alignment

- Follow these alignment styles for JSX syntax. `eslint: react/jsx-closing-bracket-location react/jsx-closing-tag-location`

```javascript
// bad
<Foo superLongParam="bar"
anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>
```

## Quotes

- Always use double quotes (") for JSX attributes, but single quotes (') for all other JS. `eslint: jsx-quotes`

```javascript
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />
```

## Spacing

- Always include a single space in your self-closing tag. `eslint: no-multi-spaces, react/jsx-tag-spacing`

```javascript
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
/>

// good
<Foo />
```

- Do not pad JSX curly braces with spaces. `eslint: react/jsx-curly-spacing`

```javascript
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```

## Props

- Always use camelCase for prop names.

```javascript
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```

- Omit the value of the prop when it is explicitly true. `eslint: react/jsx-boolean-value`

```javascript
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>

// good
<Foo hidden />
```

- Avoid using an array index as key prop, prefer a unique ID. It's an anti-pattern.

```javascript
// bad
{
  todos.map((todo, index) => <Todo {...todo} key={index} />);
}

// good
{
  todos.map((todo) => <Todo {...todo} key={todo.id} />);
}
```

## Parentheses

- Wrap JSX tags in parentheses when they span more than one line. `eslint: react/jsx-wrap-multilines`

```javascript
// bad
render() {
  return <MyComponent variant="long body" foo="bar">
            <MyChild />
          </MyComponent>;
}

// good
render() {
  return (
    <MyComponent variant="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

## Tags

- Always self-close tags that have no children. `eslint: react/self-closing-comp`

```javascript
// bad
<Foo variant="stuff"></Foo>

// good
<Foo variant="stuff" />
```

- If your component has multi-line properties, close its tag on a new line. `eslint: react/jsx-closing-bracket-location`

```javascript
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```

## Methods

- Use arrow functions to close over local variables.

```javascript
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={() => doSomethingWith(item.name, index)}
        />
      ))}
    </ul>
  );
}
```
