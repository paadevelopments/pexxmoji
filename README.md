![](/rep_res/lib_banner.png)
Render uniform emoji views across all OS platforms.

## Demo Sample
### Emoji Input & Tray
![](/rep_res/lib_srn_sh1.png)

### Rendering Variants
![](/rep_res/lib_srn_sh2.png)

##
##

# Getting Started [ installation ]
## 1. By Source Reference
```
<head>
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.min.css">
// Load all emoji images
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.a.css">
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.b.css">
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.c.css">
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.d.css">
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.e.css">
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.f.css">
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.g.css">
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.h.css">
<link rel="stylesheet" type="text/css" href="path-to-css/pexxmoji.emo_set.i.css">
// .....................
<script type="text/javascript" src="path-to-js/jquery.js"></script>
<script type="text/javascript" src="path-to-js/pexxmoji.min.js"></script>
</head>
```
## 2. Via NPM
**Step 1.** Install both pexxmoji and jquery via Node CLI.
```
npm i pexxmoji jquery
```
**Step 2.** Import.
```
import 'pexxmoji/dist/pexxmoji.min.css';

import 'pexxmoji/dist/pexxmoji.emo_set.a.css';
import 'pexxmoji/dist/pexxmoji.emo_set.b.css';
import 'pexxmoji/dist/pexxmoji.emo_set.c.css';
import 'pexxmoji/dist/pexxmoji.emo_set.d.css';
import 'pexxmoji/dist/pexxmoji.emo_set.e.css';
import 'pexxmoji/dist/pexxmoji.emo_set.f.css';
import 'pexxmoji/dist/pexxmoji.emo_set.g.css';
import 'pexxmoji/dist/pexxmoji.emo_set.h.css';
import 'pexxmoji/dist/pexxmoji.emo_set.i.css';

import $ from 'jquery';
import pexxmoji from 'pexxmoji';
```
**Step 3.** Usage. (React App Example).
```
// window == browser window object.

var emoji = false;

function show_moji(event){
   emoji = new pexxmoji.pexxmoji( $, window, $('.pexx_input:eq(0)'), $('.pexx_e_tray:eq(0)') );
}

function sub_extrc(event){
   let aa = $('.pexx_input').text()
      .replace(/\'/g, '&prime;')
      .replace(/\"/g, '&Prime;')
      .replace(/</g, '&lsaquo;')
      .replace(/>/g, '&rsaquo;');

   // converting input text to an html rendered node
   $('.ren_str').html( pexxmoji.mojiparser( $, aa, 'to_html' ) );

   // extracting raw texts from the rendered html node
   $('.raw_str').text( pexxmoji.mojiparser( $, $('.ren_str'), 'to_text' ) );
}

function App(){
   return (
      <div className="App">
         <p className="raw_str"/>
         <p className="ren_str"/>
         <button onClick={ show_moji }>Tap Me</button>
         <button onClick={ sub_extrc }>Extract String</button>
         <div className="pexx_input" contentEditable />
         <div className="pexx_e_tray"/>
      </div>
   );
}

export default App;
```

##
# Usage
## Object Declaration
**NOTE:** The instantiation below is to be made once and should be done when document is ready.
**NOTE:** *$* == jquery init function. *window* == browser window object.
```
const emoji = new pexxmoji.pexxmoji( $, window, $('#input_element'), $('#emoji_tray_div'), [ tab_icons_array ], { event options } );
```

## mojiparser
**NOTE:** mojiparser is a standalone function as part of the library to handle in-app rendering of pexxmoji strings.
**NOTE:** *$* == jquery init function.
```
// For converting UTF-8 strings
/*
* This function will return an HTML string that will
* render the pexxmoji view when placed within the document.
*/
let emoji = pexxmoji.mojiparser( $, 'utf-8 string', 'to_html' );
...

// For converting rendered HTML to text
/*
* This function will return the raw utf-8 string from
* the already rendered pexxmoji HTML within the document.
*/
let text = pexxmoji.mojiparser( $, $('#element that holds the rendered pexxmoji'), 'to_text' );
```

##
# Event Options
| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `input`	| function	| function	| A callback function triggered oninput. Function returns an event as a 1st parameter. |
| `blur`	| function	| function	| A callback function triggered onblur. Function returns an event as a 1st parameter. |
| `focus`	| function	| function	| A callback function triggered onfocus. Function returns an event as a 1st parameter. |

##
# Release History
*  Initial [ v1.0.1 ]

##
# License
MIT
