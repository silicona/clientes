
require 'rspec/expectations'
require 'capybara'
require 'capybara/mechanize'
require 'capybara/cucumber'
require 'test/unit/assertions'
require 'mechanize'

World(Test::Unit::Assertions)

Capybara.configure do |config|

	# config.default_driver = :mechanize	# Webdriver headless - mas tarde Selenium
	config.default_driver = :selenium
	config.app_host = "http://localhost/clientes"
	#config.app = :rack

end

World(Capybara)