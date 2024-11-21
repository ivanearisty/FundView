# FundView

## Team Start

### Tutorials

1. Learn fundamentals of React https://nextjs.org/learn/react-foundations
2. Learn funamentals of NextJS https://nextjs.org/learn
3. Look at D3 Project I made to see how to implement D3: https://github.com/ivanearisty/obsidian/tree/master/Classes%20%2B%20Uni/INFOVI/Assignment/Assignment%203

### Structure

- Libs: apis to communicate with the backedn asyncrhonously

- Components: Where you are going to make React.FC functions that return a renderable object by the DOM
  - You can organize charts as components and pass "props" to them, which will be the data
  - Charts should update using React hooks like useState() or useEffect(), these will make the chart reload on data changing

- Remember that every folder in app is a route if it includes a page.tsx file.
- Slugs are special folder names that take in an argument from the url as input
- There are a few other restricted names like layout.tsx and error.tsx, but we don't have to worry about those for now.
- To render your charts, create the components necessary for the page, and pass the props into the chart.

```tsx
<div>
    {loading ? (
    <>
        <div style={{ height: "100px" }}></div>
        <ClipLoader color="white" size={200} />
    </>
    ) : (
    data && <Graph data={data} metric={selectedMetric} />
    )}
</div>
```