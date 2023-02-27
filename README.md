# react-scroll-ts

### Quick Exmaple

```typescript
<ReactScroll
  key="react-unique-key"
  targetID="target-id-to-scroll"
  baseLineOption={{ position: "top", offset: 300 }}
  elementOption={{ topOffset: 30, bottomOffset: 30 }}
  activeClassName="activated-classname-when-baseline-is-at-target"
  className="react-classname"
>
  Click to Warp
</ReactScroll>
```

### Props

| prop            | type               | description                                                                                       |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| targetID        | string             | target id to scroll                                                                               |
| baseLineOption  | { string, number } | position: string = "top" / "middle" / "bottom" offset: number = { offset of baseline }            |
| elementOption   | { number, number } | topOffset: number = { top offset of element } bottomOffset: number = { bottom offset of element } |
| activeClassName | string             | activated classname when baseline is at target                                                    |
