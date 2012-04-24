/*
var App = Em.Application.create();

App.MyView = Em.View.extend({
  mouseDown: function() {
    window.alert("hello world!");
  }
});
*/

/*
App.president = Em.Object.create({
	name: "Barack Obama"
});

App.country = Em.Object.create({
	// Ending the property with 'Binding' tells Ember to
	// create a binding to the presidentName property.
	presidentNameBinding: 'MyApp.president.name'
});

// Later, after Ember has resolved bindings...
alert( App.country.get('presidentName') );
*/

/*
var App = Em.Application.create();

App.userController = Em.Object.create({
	content: Em.Object.create({
		firstName: "Albert",
		lastName: "Hofman",
		posts: 25,
		hobbies: "Riding bicycles"
	})
});

App.UserView = Em.View.extend({
	template: 'user',
	
	firstNameBinding: 'App.userController.content.firstName',
	lastNameBinding: 'App.userController.content.lastName'
});*/

/*
var App = Ember.Application.create();

App.view = Ember.View.create({
  templateName: "say",
  name: "Bob"
});

App.view.appendTo('#container');
*/

/*
var App = Ember.Application.create();

App.PeopleView = Ember.View.extend({
	people: [
		{ name: 'Yehuda' },
		{ name: 'Tom' }
	]
});
*/

/*
var App = Ember.Application.create();

App.ClickableView = Ember.View.extend({
	click: function(e) {
		console.log(e);
	}
});
*/



/*
var array = [1,2,3];

array.forEach(function(item) {
  console.log(item, this.indexOf(item));
}, array);
*/

/*
Person = Ember.Object.extend({
	name: 'none',
	sayHello: function() {
		console.log( "Hello from " + this.get('name') );
	}
});

var people = [
	Person.create({name: "Gerardo"}),
	Person.create({name: "Kari"}),
	Person.create({name: "Jen"}),
	Person.create({name: "Chappy"})
]

people.invoke('sayHello');
*/



/*
Test App
*/

var mainController;

var TestApp = Ember.Application.create();

/*
My Models
*/
TestApp.AjaxModel = Ember.Object.extend({
	
	ajaxData: function() {
		console.log('getData!!');
		$.ajax({
			url: "http://localhost:8888/fakeAjax/ajaxTest.php",
			beforeSend: function(jqXHR, settings) {
				// $('.loader').show();
			},
			success: function(data, textStatus, jqXHR) {
				console.log( "data: " + data );
				// console.log( "textStatus: " + textStatus );
				// console.log( "jqXHR: " + jqXHR );
				
				// $('.loader').hide();
				//console.log( mainController );
				
				mainController.set('content',data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// console.log( jqXHR );
				console.log( textStatus );
				console.log( errorThrown );
				
				// alert( "There was an error retrieving the data." );
				// $('.loader').hide();
			}
		});
	}.property()
});
/*
My Controllers
*/
TestApp.MainController = Ember.ArrayController.extend({
	content: ,
	
	initialize: function() {
		console.log( 'initialize' );
		this.get('doSomethingWithModel');
	}.property(),
	
	doSomethingWithModel: function() {
		var myModel = TestApp.AjaxModel.create();
		myModel.get('ajaxData');
	}.property()
});
/*
My Views
*/
TestApp.ResponseView = Ember.View.extend({
	// templateName: 'user',

	firstNameBinding: 'TestApp.MainController.content.firstName'
});

/*
TestApp.ArticlesView = Ember.View.extend({
  // templateName: 'app_templates_layouts_articles',

  willInsertElement: function() {
    var controller = this.get('controller');

    if (controller && controller.get && controller.get('content') == null) {
      controller.refresh();
    }
  } 
});
*/

$(document).ready(function(){
	mainController = TestApp.MainController.create();
	mainController.get('initialize');
});
