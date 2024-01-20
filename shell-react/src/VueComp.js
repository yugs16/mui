const prom= import("comp2/Comp2App")

const LazyComponent = React.lazy(() => import("comp2/Comp2App"))

// const RemoteOrderApp = React.lazy(() => import("order/OrderApp"));
// const RemoteDeliveryApp = React.lazy(() => import("delivery/DeliveryApp"));
import React, { useRef, useEffect, Suspense, useState } from 'react'
// import { Suspense } from "react";

let rsg 

export default () => {
    const ref = useRef(null);
    const [rerender, setRerender] = useState()

    useEffect(() => {
            
      prom.then(rs=>{
        console.log('rs', rs)
        rsg = rs
        rs.mount(ref)
        // console.log(LazyComponent)
        setRerender(true)

      });


      // mount(ref.current)
    }, [])
  //   return (<Suspense fallback={<div>Loading...</div>}>
  //     <Comp></Comp>
  // </Suspense>)

    return ( rerender? <div ref={ref} />:  <div ref={ref} />)
}
