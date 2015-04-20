var casper;

casper.test.begin('OpenBliki System Tests', 5, function suite(test)
{
    "use strict";

	// Visit the index page:
	casper.start('http://localhost:8080/', function()
	{
		// Get the HTTP response:
        var response = this.status(false);

        // Assert that the response was successful:
        test.assert(response.currentHTTPStatus === 200, "A 200 status code is"
            + " expected");

		// Assert that the page body contains "donhey.io":
		test.assertTextExists("donhey.io", "The text donhey.io is expected.");

        // Click the login link:
        this.click('li.ng-scope > a:nth-child(1)');

        this.wait(1500, function()
        {
            test.assertTextExists("Username", "Username is expected.");

            // Fill in the login form:
            this.fillSelectors('form#loginForm.ng-pristine.ng-valid',
            {
                'input#username': 'admin',
                'input#password': 'admin'
            }, true);

            // Click the login button:
            this.click('#loginButton');

            this.wait(1000, function()
            {
                // Check that we've reached the users page:
                test.assertTextExists("Users", "The text Users is expected.");

                // Click the compose link:
                this.click('.nav > li:nth-child(1) > a:nth-child(1)');

                this.wait(1000, function()
                {
                    // Check that we've reached the compose page:
                    test.assertTextExists('Compose Something Brilliant!');
                });
            });
        });
    });

	// Run the casper test suite.
	casper.run(function()
	{
		test.done();
	});
});