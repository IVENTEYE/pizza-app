import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="136" r="125" /> 
    <rect x="0" y="285" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="332" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="450" rx="8" ry="8" width="90" height="26" /> 
    <rect x="148" y="440" rx="20" ry="20" width="130" height="43" />
  </ContentLoader>
)

export default Skeleton