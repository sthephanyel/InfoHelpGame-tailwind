import React, { useEffect } from "react"

export function AdSreen(){
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle
        console.log({ adsbygoogle })
        adsbygoogle.push({})
      } catch (e) {
        console.error(e)
      }
    }

    return () => {
      pushAd()
    }
  }, [])
  return (
    <>
      <ins className="adsbygoogle"
      //  style="display:block"
      style={{ display: "inline-block", width: "100%", height:"200px", backgroundColor: 'yellow' }}
      data-ad-client="ca-pub-2402825875737117"
      data-ad-slot="4823097633"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
    </>
  )
}