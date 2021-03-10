# JS Challenge for Jagaad
#### _Author:_ Nikita Romanchuk


## Prerequesits
In order to make things work you should have a few tools installed:
- [Node.JS](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started)
- Your [favourite IDE](https://code.visualstudio.com/)

## Before you run the app or the tests (mandatory)
__Before__ running app either via Docker or Vue-CLI, you should have all corresponding __environment files filled__.

Example of filling the file:
```
VUE_APP_BASE_URI=https://api.musement.com/api/v3
VUE_APP_DEFAULT_VENUE_ID=164
VUE_APP_DEFAULT_ACTIVITIES_LIMIT=6
```
>Make sure ```DEFAULT_VENUE_ID``` corresponds the existing venue, otherwise you'll be navigated to error page.

###
There're three environments specified:
1. `development` - running unit tests or the app itself via `npm run serve`. Requires __.env.development.local__;
3. `production` - cypress tests via `npm run test:e2e` and the app itself via Docker. Requires __.env.production.local__.

## Running the app
```sh
npm run docker:build
npm run docker:start
```
After docker does all it's ✨magic ✨, the app will be available on [localhost:8080][dockerized-app-link].

Wanna see logs? Run
```sh
docker logs -f webapp
```

## Testing
Mandatory _(inside the project's root folder)_:
```sh
npm i
```


#### Unit
__Jest__ is used as a unit-testing tool.
There're a few unit tests provided for some of shared (aka common) components.
All test files match _<component_name>.spec.js_ and are situated in the corresponding components folders.
Running unit tests:
```sh
npm run test:unit
```

#### E2E
__Cypress__ is used as a e2e-testing tool.
All test files are situated in _<root_directory>/tests/e2e/specs/_
There're a few e2e tests provided:
1. Venues page tests
    1.1 General content is displayed correctly;
    1.2 Pagination & query pagination
2. Cart tests
    2.1 Cart initial state;
    2.2 Adding items to cart
    2.3 Removing items from cart

##### Running tests:
Auto:
```sh
npm run test:e2e -- --headless
```
Manual:
```sh
npm run test:e2e
```

## External links

I needed to somehow handle outside click for wishlist/cart dropdown. The code below handles this case.
It was taken from [stack overflow issue][StackOverflow].
```js
Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = event => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});
```

#
   [dockerized-app-link]: <http://127.0.0.1:8080>
   [StackOverflow]: <https://stackoverflow.com/questions/36170425/detect-click-outside-element>
