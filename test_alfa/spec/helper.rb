# Location: spec/helper.rb

require 'rubygems'
require 'bundler'

begin
  Bundler.setup(:default, :development)

rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Run `bundle install` to install missing gems"
  exit e.status_code

end

require 'rspec'
require 'capybara/rspec'

Capybara.default_driver = :selenium

=begin
	
The last configuration file we need is a spec helper so that we don’t have to require everything in each test file.
The following one will do that quite nicely.
Note at the end that we switch the Capybara driver to Selenium, as it’s not using that by default.

=end

RSpec.configure do |config|

	config.around(:example) do |example|

		#puts 'Antes en Around'

		#yield
		example.run

		#puts 'Despues en Around'

	end

	config.after(:example) do |ejemplo|

		#puts 'Despues en After example'
		
	end

	config.after(:suite) do |suite|

		#puts 'Despues en After Suite'

		# puts suite.methods

	end

end
