# ReactiveVar `instance.subscribe` bug

### Description

I've created a reproduction [here](https://github.com/mokolodi1/reactivevar-subscribe-bug).

The Meteor release for this bug is `1.2.1`. This bug is not present in the latest release of `1.3.4`.

After creating the project with `meteor create`, I removed `insecure` and `autopublish` and added `reactive-var`.

I'm using Mac OS X El Capitan and Chrome version 51.0.2704.103 (64-bit).

When passing the result of a ReactiveVar's `.get()` to `Template.instance().subscribe` as an argument, the ReactiveVar's value is set to the subscription's handle. (I'm assuming it's the subscription handle based on the `onStop` function but I haven't done thorough investigation.)

Passing an object as a parameter to a subscribe function should not change the object.

[Example](https://github.com/mokolodi1/reactivevar-subscribe-bug/blob/master/reactivevar-subscribe-bug.js#L10): `this.subscribe("helloSub", this.query.get());`

### How to recreate

```sh
git clone https://github.com/mokolodi1/reactivevar-subscribe-bug
cd reactivevar-subscribe-bug
meteor
open http://localhost:3000/
```

### Javascript code from reproduction

```js
Hello = new Meteor.Collection("hello");

if (Meteor.isClient) {
  Template.body.onCreated(function() {
    this.query = new ReactiveVar({});

    console.log("query before:", this.query.get());
    console.log("Object.keys(this.query.get()):", Object.keys(this.query.get()));

    this.subscribe("helloSub", this.query.get());

    // NOTE: this.query.get() should still be {}
    console.log("query after:", this.query.get());
    console.log("Object.keys(this.query.get()):", Object.keys(this.query.get()));
  });
}

if (Meteor.isServer) {
  Meteor.publish("helloSub", function(query) {
    return Hello.find(query);
  });
}

```

### Google Chrome screenshot

![Google Chrome screenshot](https://raw.githubusercontent.com/mokolodi1/reactivevar-subscribe-bug/master/chrome-console-screenshot.png)
