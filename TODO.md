
## TODO

### 0 - refactor

replace table by divs in list.component
show a progress message when searching in list.component

### 1 - services

ng: extract Split BackendService to BackendService (frontend-ng) and BackendAPI (frontend-common)
ng: extract Split UserService to UserService (frontend-ng) and UserAPI (frontend-common)
react/vue: reuse shared UserAPI and BackendAPI

### 2 - style

ng: extract CSS to get a common.css + customizable theme.css (a base exists in frontend-react)
ng: responsive

### 3 - components

react/vue: port ng components.
react/vue: reuse shared css