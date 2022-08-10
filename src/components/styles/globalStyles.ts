import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
// colors
	--color-tone-1: #000000;
	--color-tone-2: #787c7e;
	--color-tone-3: #878a8c;
	--color-tone-4: #d3d6da;
	--color-tone-5: #edeff1;
	--color-tone-6: #f6f7f8;
	--color-tone-7: #ffffff;
	--color-tone-8: #121212;
	--color-tone-9: #dfdfdf;
	--color-tone-10: #000000;
	--color-tone-11: #787c7e;
	--color-tone-12: #363636;
	--green: #6aaa64;
	--darkendGreen: #538d4e;
	--yellow: #c9b458;
	--darkendYellow: #b59f3b;
	--lightGray: #d3d6da;
	--gray: #86888a;
	--gray-2: #dcdcdc;
	--gray-3: #dfdfdf;
	--darkGray: #939598;
	--white: #fff;
	--black: #212121;
	--black-2: #121212;
	--black-3: #363636;
	--orange: #f5793a;
	--blue: #85c0f9;
// breakpoints
	--tablet: 768px;
	--desktop: 1024px;
}


/* Box sizing rules */
*,
*::before,
*::after {
	box-sizing: border-box;
}

a:not([class]) {
	text-decoration-skip-ink: auto;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
h5,
p {
	margin: 0;
}
html{
	margin: 0;
	padding: 0;
	font-size: 62.5%;  
}


/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */

/* Set core root defaults */
html:focus-within {
	scroll-behavior: smooth;
}

body {
	text-rendering: optimizeSpeed;
  	line-height: 1.5;
	font-family: "Open sans", sans-serif;
}

/* Make images easier to work with */
img,
picture {
	max-width: 100%;
	max-height: 100%;
	display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
	font-family: inherit;
}

a {
	color: inherit;
	text-decoration: inherit; /* no underline */
}

ul,
ol {
	list-style: none;
	padding: 0;
}

/* Accessability */
@media (prefers-reduced-motion: reduce) {
	html:focus-within {
		scroll-behavior: auto;
	}
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}



`;

export default GlobalStyles;
