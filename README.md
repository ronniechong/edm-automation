#EDM automation#
This is a simple EDM automation to convert Jade/Compass content into email friendly HTML template.

There will be two HTML copies, one standard html with external css file and one with inline style css

##Installation##

###Prerequisites###

Gem Premailer
```
gem install premailer
```
Node
```
http://nodejs.org/download/
```

Grunt
```
npm install grunt-cli
```

_Note: You may need to ```sudo``` to install_

### Running the build ###

```
grunt
```

##Instructions##
* Grunt watches any changes in Jade/SCSS and the HTML output
* Source files are in```src```
* Compiled files are exported to ```build```

##Notes##
* Files in ```src/core``` contain SCSS and Jade partials
* Sample EDM design is semi-responsive
* Only newer/modified files are compiled
* Inline CSS HTML has a postfix ```*-inline.html```


