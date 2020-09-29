# Angular
### How to install Angular CLI and few commands
- install nodeJs and configure npm to classpath
- npm install -g @angular/cli
- ng -version
- ng help
- ng serve [1. build the app [compile/transpile] , 2. start server 3. watch resources for changes and rebuild and hot deploy on change ]
- defailt port 4200
- Open [will open in new browser]
- ng serve --port 5100 --open 

- ng new <project_name>
- ng generate component <name-of-component>
- ng generate class <className> 


more reference document will be located at https://angular.io/docs

- Component Based Framework
- Clean separation of template coding and application logic
- Built in support of data binding and dependency injection
- Support responsive we design and modern framework 

- Component | view template | directive | service  | Module
![How does component works](https://github.com/zuned/angular/blob/master/HowDoesAppRootWorks.jpg)


- How to install BootStrap : -> `npm install bootstrap`
- how to install fontawesome : -> 'npm install @fortawesome/fontawesome`

- To include local css/font , we update angular.json file

- ng add @angular/localize
- npm install @ng-bootstrap/ng-bootstrap
