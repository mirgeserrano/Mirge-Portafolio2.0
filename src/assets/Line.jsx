

const Line = () => {
  return (
    <svg width="200" height="6" viewBox="0 0 200 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_i_458_3)">
    <line x1="-0.00148773" y1="1" x2="199.999" y2="1" stroke="url(#paint0_linear_458_3)"/>
    </g>
    <defs>
    <filter id="filter0_i_458_3" x="-0.00148773" y="0.5" width="200" height="5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_458_3"/>
    </filter>
    <linearGradient id="paint0_linear_458_3" x1="-0.00148773" y1="2" x2="199.999" y2="2" gradientUnits="userSpaceOnUse">
    <stop stopColor="#FA5252"/>
    <stop offset="1" stopColor="#DD2476"/>
    </linearGradient>
    </defs>
    </svg>
    
  )
}

export default Line