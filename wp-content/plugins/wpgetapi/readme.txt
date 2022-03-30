=== WPGetAPI - Get external REST API data ===
Contributors: wpgetapi
Tags: api, external api, rest-api, connect, custom-endpoints, endpoint, rest
Requires at least: 4.0
Tested up to: 5.9.1
Stable tag: 1.4.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A WordPress plugin to POST or GET data from external REST API's. Connect to external API's and display the API data using a shortcode or template tag.

== Description ==

[Live Demo - Connecting WordPress to External API](https://wpgetapi.com/demo-connecting-wordpress-to-external-api/?utm_campaign=Demo&utm_medium=wporg&utm_source=readme)

WPGetAPI lets you easily get (or send) data from external REST API's using GET or POST requests and then display the returned data on your WordPress website.

This plugin is the easiest way to connect WordPress with external API's.

You can get data from REST API's in JSON format and return the data either in JSON string format or as a PHP array through the use of a shortcode or a template tag function. We strongly recommend the use of the template function to output the data as it is way more flexible.

 * Create WordPress to API connections
 * Connect to REST API's without writing a single line of code
 * Connect to unlimted API's
 * Connect to unlimited endpoints
 * Connect via GET requests or POST requests
 * Output the API data using a template tag (most flexible)
 * Output the API data using a shortcode
 * Set query parameters
 * Set header parameters
 * Set body parameters

= Docs =
View the docs and a Getting Started guide at the [WPGetAPI website](https://wpgetapi.com/?utm_campaign=Docs&utm_medium=wporg&utm_source=readme)

= Pro Plugin =
There is also a [Pro Plugin](https://wpgetapi.com/downloads/pro-plugin?utm_campaign=Pro&utm_medium=wporg&utm_source=readme) extension available that extends the functionality of this plugin and provides several features:

 *  Connect using the XML format
 *  Caching of API calls for each endpoint (you set the cache time)
 *  Get nested data from multidimensional arrays
 *  Add query variables within shortcodes


== Installation ==
= Requirements =
* WordPress version 4.0 and later
* PHP 5.6, Tested with PHP 8.0
* cURL

= Usage =

1. Go to the `WPGetAPI -> Setup` menu to add your API's.
2. Once your API's are saved, a new tab is created allowing you to add endpoints.
3. Once your endpoints are saved, you can use the template tag or shortcode to connect to your API and view the data.

== Frequently Asked Questions ==

= Where can I find docs? =

All of our [documentation can be found here](https://wpgetapi.com/docs/?utm_campaign=Docs&utm_medium=wporg&utm_source=faq).

= Will you help me if I am having trouble? =

Yes! Please [contact us](https://wpgetapi.com/contact/?utm_campaign=Contact&utm_medium=wporg&utm_source=faq) and we will get your API up and running.

= How do I connect WordPress to an external API? =

A good start is to visit our [Quick Start Guide](https://wpgetapi.com/docs/quick-start-guide/?utm_campaign=Quick-Start&utm_medium=wporg&utm_source=faq) as well as the rest of our docs.

= Can I connect to any REST API? =

It will depend. We currently do not have the ability to use OAuth or any other multi-step authentication methods. You should be able to connect to any REST API that uses either no authentication or uses some such combination of authentication using query string paramaters or headers. You can add unlimited query string parameters and headers. 

If your API's method of authentication was to have your 'api_key' appended to the URL, you would simply add 'api_key' into the Key field and then your actual api key string into the Value field of a query paramter. This would then append these values to the URL and authenticate your API.

= Can I use an XML based API? =

We support XML with our [Pro Plugin](https://wpgetapi.com/downloads/pro-plugin/?utm_campaign=Pro&utm_medium=wporg&utm_source=faq)

= How do I cache API calls? =

We support caching with our [Pro Plugin](https://wpgetapi.com/downloads/pro-plugin/?utm_campaign=Pro&utm_medium=wporg&utm_source=faq)


== Screenshots ==

1. The Setup screen where you can add your external API's
2. Once an external API has been added, a new page will be created to setup the API endpoints
2. A live demo of the output when debug mode is set to true


== Changelog ==

= 1.4.0 (2022-03-17) =
- Fix - refactor the building of request args. Body was not working correctly.
- Fix - change naming convention from Template Function to Template Tag within admin.
- Enhancement - modify output of debug to show more info and to show whether or not shortcode is used.

= 1.3.4 (2022-03-17) =
- Enhancement - add ability to use headers and body variables in Pro Plugin.

= 1.3.3 (2022-03-03) =
- Enhancement - style the debug output to make it easier to understand and provide links to docs.

= 1.3.2 (2022-02-22) =
- Bug fix - change paramater value fields to textarea. This allows the proper use of JSON strings within these fields.

= 1.3.1 (2022-02-16) =
- Bug fix - error with class property name that was not allowing proper $args to be sent to remote request

= 1.3.0 (2022-02-08) =
- Fix - rewrite headers parameters section

= 1.2.3 (2021-12-14) =
- Enhancement - add ability for query_variables to be used in shortcode with the Pro Plugin

= 1.2.2 (2021-11-09) =
- Enhancement - add args to debug info. Will be useful for endpoint_variables in Pro Plugin

= 1.2.1 (2021-11-05) =
- Bug fixes with encrypting values

= 1.2.0 (2021-11-04) =
- Enhancement - add option to JSON encode body parameters
- Enhancement - allow simple arrays to be sent in body

= 1.1.0 (2021-11-03) =
- Enhancement - reconfigure debug info
- Bug fixes

= 1.0.2 (2021-11-02) =
- Bug fixes

= 1.0.1 (2021-11-02) =
- Bug fixes

= 1.0.0 (2021-10-27) =
- Initial Release
