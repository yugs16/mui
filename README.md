# MUI

A small test project to understand Micro Frontend rendering using **Module Federation** library, ie, [MFE](https://www.npmjs.com/package/@module-federation/node).

We are trying to use UI components created in a separate hosted application in another hosted application.

### Architecture:
The repo contains 3 mini-projects/applications. We have 2 remote applications and 1 host application.

**Remote:** 
- Comp1-react-webpack: It's configured using react+webpack.
- Comp2-vue-webpack: It's configured using vue+webpack.

**Host:**
- Shell directory acts as a main host application, it is configured using react+webpack.

### Installation and Working:
After clone and `cd mui` follow the below steps. 
- Run the first remote project having component 1 for host.
  - `cd comp1-react-webpack`
  - `npm install`
  - `npm run web-start`, a server should start on `localhost:5000`
- Come back to root dir., and then run the second remote project having component 2 for host.
  - `cd comp2-vue-webpack`
  - `npm install`
  - `npm run web-start`, a server should start on `localhost:8000`
 
- Come back to root dir., and then run the third project, which is our host project.
  - `cd shell-react`
  - `npm install`
  - `npm run web-start`, a server should start on `localhost:3000`, and something like below image will appear-

    ![image](https://github.com/yugs16/mui/assets/9073610/09b42ea1-c9ba-41d7-baee-8b5c699200cc)
- Now, when you click on the link, *Component React*, you will see a component of project 1 being rendered here, i.e, we were able to render react component of localhost:5000 inside localhost:3000 project, see below-

![image](https://github.com/yugs16/mui/assets/9073610/be2505b0-2194-4cce-9f28-28336b7d068c)
- Now, when you click on the link, *Component Vue*, you will see a component of project 2 being rendered here, i.e, we were able to render a vue component of localhost:8000 inside localhost:3000 project, see below-

![image](https://github.com/yugs16/mui/assets/9073610/880f1fc7-3a99-4407-97a0-ae567392a86b)

### Apporach and MFE:
- Remote projects, having webpback+mfe are exporting components/functions using ModuleFederation plugin, check their respective webpack.config.js file.
``` 
// from comp1 project
plugins: [
  new ModuleFederationPlugin({
      name: "comp1",
      filename: "comp1-app.js",
      exposes: {
        "./Comp1App": "./src/App.js",
      },
      shared: {
        ...deps,
        ... // check webpack.config.js file of comp1 project for full code
      },
    }),...
  ],

// from comp2 project
 new ModuleFederationPlugin({
    name: "comp2Webpack",
    filename: "comp2-webpack-app.js",
    exposes: {
      "./Comp2WebPackApp": "./src/Header.vue",
      './mountWrapper': './src/mountWrapper'
    },
    shared: require("./package.json").dependencies,
  }),
```
- Host project,ie, shell-react, have webpack.config.js file which imports other project's exported components/functions.

```
plugins: [
    new ModuleFederationPlugin({
    name: "main",
    filename: "remoteEntry.js",
    remotes: {
      "comp1": "comp1@http://localhost:5000/comp1-app.js",
      "comp2Webpack": 'comp2Webpack@http://localhost:8000/comp2-webpack-app.js'
    },
    shared: {
      ...deps,
      ... // check webpack.config.js file of the shell project for full code
    }
  })
],
```
- Host project is then using these components inside App.js, when you check this file you will notice the react component is rendered directly after import, but for the Vue component, we need to mount that component to host dom/ref, by calling mountWrapper function first.
```
// We are mounting Comp2WebPackApp of Vue application to react-dom ref. Check mountWrapper function of comp2 project to see mount behavior
function RemoteApp2 (props) {

  const divRef = useRef(null);

  console.log(props, 'check')

  useEffect(()=>{
    import("comp2Webpack/Comp2WebPackApp").then((comp)=>{
      mountWrapper(divRef.current, comp.default, {...props});
    }).catch(e=>{throw e;});

  }, [])

  return (
    <div ref={divRef}></div>
  )
}
```
**- Also note that a prop, `prjectName='main'` is being passed in both react and vue components from the shell project, just to showcase the exchange of data.**


