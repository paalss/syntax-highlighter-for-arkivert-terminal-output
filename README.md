# Syntax highlighter for Git Bash
![App_interface](images/app.png)

En webapp som viser arkivert Git Bash-logg i opprinnelige farger. Hvis man bruker Visual Studio Code's innebygde terminal og vil ta vare på loggen til ettertid og kopierer teksten, vil syntax highlightingen ignoreres. Når man da slipper det inn i Word, vil al teksten bli svart-på-hvit, totalt uleselig. Denne appen er en måte å få tilbake leseligheten på.

## Eksempeltekst
```
OS-navn@PC-type MINGW64 /c/xampp/htdocs/sider/annet/kodetester/nodetutorial/express-tut
$ npm run dev

> express-tut@1.0.0 dev C:\xampp\htdocs\sider\annet\kodetester\nodetutorial\express-tut
> nodemon index

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index index.js`
server started on 5000
[nodemon] restarting due to changes...
[nodemon] starting `node index index.js`
server started on 5000
[nodemon] restarting due to changes...
[nodemon] starting `node index index.js`
server started on 5000
[nodemon] app crashed - waiting for file changes before starting...
^C
```

![App_results](images/app-results.png)