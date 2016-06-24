Hello = new Meteor.Collection("hello");

if (Meteor.isClient) {
  Template.body.onCreated(function() {
    this.query = new ReactiveVar({});

    this.autorun(() => {
      console.log("query before:", this.query.get());
      console.log("Object.keys(this.query.get()):", Object.keys(this.query.get()));

      this.subscribe("helloSub", this.query.get());

      console.log("query after:", this.query.get());
      console.log("Object.keys(this.query.get()):", Object.keys(this.query.get()));
    });
  });
}

if (Meteor.isServer) {
  Meteor.publish("helloSub", function(query) {
    return Hello.find(query);
  });
}
