# Syntax highlighter for Git Bash
![App_interface](images/app.png)

En webapp som viser arkivert Git Bash-logg i opprinnelige farger.

Hvis man bruker Visual Studio Code's innebygde terminal og vil ta vare på loggen til ettertid, vil man ikke kunne beholde fargene / syntax highligting-en på teksten. Limer man teksten inn i Word vil alt bli svart-på-hvitt, totalt uleselig.

Denne appen skal få tilbake (noe av*) leseligheten. *: Dvs. så langt gjenkjenner den første linje i git bash (den med directory-path, shabang og det), nodemon og heroku syntax.

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