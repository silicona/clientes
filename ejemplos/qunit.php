<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit basic example</title>
  <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.5.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>

  <a href="http://qunitjs.com/cookbook/">Cookbook</a>
  <a href="v">Cookbook</a>
  <script src="https://code.jquery.com/qunit/qunit-2.5.0.js"></script>
  <script>

    QUnit.test( "a basic test example", function( assert ) {
      var value = "hello";
      assert.equal( value, "hello", "We expect value to be hello" );
    });

      // ok(verdadero [, mensaje])
    QUnit.test( "ok test", function( assert ) {
      assert.ok( true, "true succeeds" );
      assert.ok( "non-empty", "non-empty string succeeds" );
     
      assert.ok( false, "false fails" );
      assert.ok( 0, "0 fails" );
      assert.ok( NaN, "NaN fails" );
      assert.ok( "", "empty string fails" );
      assert.ok( null, "null fails" );
      assert.ok( undefined, "undefined fails" );
    });

      // equal( actual, expected [, message ] ) // ==
    QUnit.test( "equal test", function( assert ) {
      assert.equal( 0, 0, "Zero, Zero; equal succeeds" );
      assert.equal( "", 0, "Empty, Zero; equal succeeds" );
      assert.equal( "", "", "Empty, Empty; equal succeeds" );
      assert.equal( 0, false, "Zero, false; equal succeeds" );
     
      assert.equal( "three", 3, "Three, 3; equal fails" );
      assert.equal( null, false, "null, false; equal fails" );
    });

      // strictEqual( actual, expected [, message ] ) // ===
    QUnit.test( "equal test", function( assert ) {
      assert.strictEqual( 0, 0, "Zero, Zero; equal succeeds" );
      assert.strictEqual( "", 0, "Empty, Zero; equal succeeds" );
      assert.strictEqual( "", "", "Empty, Empty; equal succeeds" );
      assert.strictEqual( 0, false, "Zero, false; equal succeeds" );
     
      assert.strictEqual( "three", 3, "Three, 3; equal fails" );
      assert.strictEqual( null, false, "null, false; equal fails" );
    });

      // deepEqual
    QUnit.test( "deepEqual test", function( assert ) {
      var obj = { foo: "bar" };
     
      assert.deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
    });


  // Callbacks sincronicas
    // assert.expect() // Numero de afiramciones esperadas
    QUnit.test( "a test", function( assert ) {
      assert.expect( 2 );
     
      function calc( x, operation ) {
        return operation( x );
      }
     
      var result = calc( 2, function( x ) {
        assert.ok( true, "calc() calls operation function" );
        return x * x;
      });
     
      assert.equal( result, 4, "2 square equals 4" );
    });

    // Practical Example:

    QUnit.test( "a test", function( assert ) {
      assert.expect( 1 );
     
      var $body = $( "body" );
     
      $body.on( "click", function() {
        assert.ok( true, "body was clicked!" );
      });
     
      $body.trigger( "click" );
    });

  // Callback asincronos
    // assert.async()  // Devuelve una funcion done
    QUnit.test( "asynchronous test: async input focus", function( assert ) {
      var done = assert.async();
      var input = $( "#test-input" ).focus();
      setTimeout(function() {
        assert.equal( document.activeElement, input[0], "Input was focused" );
        done();
      });
    });

  // Acciones de usuario
    // trigger() // Dispara el evento
    // triggerHandler()  // Simula el evento para el test
     //Let's assume we have a simple key logger that we want to test:

    function KeyLogger( target ) {
      this.target = target;
      this.log = [];
     
      var that = this;
      this.target.off( "keydown" ).on( "keydown", function( event ) {
        that.log.push( event.keyCode );
      });
    }

    // Comprobacion del evento
    QUnit.test( "keylogger api behavior", function( assert ) {
      var doc = $( document ),
        keys = new KeyLogger( doc );
     
      // Trigger the key event
      doc.trigger( $.Event( "keydown", { keyCode: 9 } ) );
     
      // Verify expected behavior
      assert.deepEqual( keys.log, [ 9 ], "correct key was logged" );
    });

    //Custom Assertions
//Problem

//You have several tests that duplicate logic for asserting some expectation. This repetitive code lessens the readability of your tests and increases the surface for bugs.

QUnit.test( "retrieving object keys", function( assert ) {
  var objectKeys = keys( { a: 1, b: 2 } );
  assert.ok( objectKeys.indexOf("a") > -1, "Object keys" );
  assert.ok( objectKeys.indexOf("b") > -1, "Object keys" );
 
  var arrayKeys = keys( [1, 2] );
  assert.ok( arrayKeys.indexOf("1") > -1, "Array keys" );
  assert.ok( arrayKeys.indexOf("2") > -1, "Array keys" );
});

//Solution

//Define a function to encapsulate the expectation in a reusable unit. Invoke this.push within the body to notify QUnit that an assertion has taken place.

  

QUnit.assert.contains = function( needle, haystack, message ) {
  var actual = haystack.indexOf(needle) > -1;
  this.push(actual, actual, needle, message);
};

QUnit.test("retrieving object keys", function( assert ) {
  var objectKeys = keys( { a: 1, b: 2 } );
  assert.contains( "a", objectKeys, "Object keys" );
  assert.contains( "b", objectKeys, "Object keys" );
 
  var arrayKeys = keys( [1, 2] );
  assert.contains( "1", arrayKeys, "Array keys" );
  assert.contains( "2", arrayKeys, "Array keys" );
});


//Keeping Tests Atomic
//Problem

//When tests are lumped together, it's possible to have tests that should pass but fail or tests that should fail but pass. This is a result of a test having invalid results because of side effects of a previous test:

QUnit.test( "2 asserts", function( assert ) {
  var fixture = $( "#qunit-fixture" );
 
  fixture.append( "<div>hello!</div>" );
  assert.equal( $( "div", fixture ).length, 1, "div added successfully!" );
 
  fixture.append( "<span>hello!</span>" );
  assert.equal( $( "span", fixture ).length, 1, "span added successfully!" );
});

//The first append() adds a <div> that the second equal() doesn't take into account.
//Solution

//Use the QUnit.test() method to keep tests atomic, being careful to keep each assertion clean of any possible side effects. You should only rely on the fixture markup, inside the #qunit-fixture element. Modifying and relying on anything else can have side effects:

  

 
QUnit.test( "Appends a div", function( assert ) {
  var fixture = $( "#qunit-fixture" );
 
  fixture.append( "<div>hello!</div>" );
  assert.equal( $( "div", fixture ).length, 1, "div added successfully!" );
});
 
QUnit.test( "Appends a span", function( assert ) {
  var fixture = $( "#qunit-fixture" );
 
  fixture.append("<span>hello!</span>" );
  assert.equal( $( "span", fixture ).length, 1, "span added successfully!" );
});

//QUnit will reset the elements inside the #qunit-fixture element after each test, removing any events that may have existed. As long as you use elements only within this fixture, you don't have to manually clean up after your tests to keep them atomic.
//Discussion

//In addition to the #qunit-fixture fixture element and the filters explained in the section called "Efficient Development", QUnit also offers a ?noglobals flag. Consider the following test:
 

QUnit.test( "global pollution", function( assert ) {
  window.pollute = true;
  assert.ok( pollute, "nasty pollution" );
});

//Grouping Tests
//Problem

//You've split up all of your tests to keep them atomic and free of side effects, but you want to keep them logically organized and be able to run a specific group of tests on their own.
//Solution

//ou can use the QUnit.module() function to group tests together:


QUnit.module( "group a" );
QUnit.test( "a basic test example", function( assert ) {
  assert.ok( true, "this test is fine" );
});
QUnit.test( "a basic test example 2", function( assert ) {
  assert.ok( true, "this test is fine" );
});
 
QUnit.module( "group b" );
QUnit.test( "a basic test example 3", function( assert ) {
  assert.ok( true, "this test is fine" );
});
QUnit.test( "a basic test example 4", function( assert ) {
  assert.ok( true, "this test is fine" );
});

//All tests that occur after a call to QUnit.module() will be grouped into that module. The test names will all be preceded by the module name in the test results. You can then use that module name to select tests to run (see the section called "Efficient Development").


//In addition to grouping tests, QUnit.module() can be used to extract common code from tests within that module. The QUnit.module() function takes an optional second parameter to define functions to run before and after each test within the module:

QUnit.module( "module", {
  beforeEach: function( assert ) {
    assert.ok( true, "one extra assert per test" );
  }, afterEach: function( assert ) {
    assert.ok( true, "and one extra assert after each test" );
  }
});
QUnit.test( "test with beforeEach and afterEach", function( assert ) {
  assert.expect( 2 );
});
  </script>
</body>
</html>