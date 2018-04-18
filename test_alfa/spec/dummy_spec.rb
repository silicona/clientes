# Location: spec/dummy_spec.rb
# Run 'bundle exec rake spec' desde '/'. 
# This will run all *_spec.rb files in the spec directory. 

require 'helper'

#describe 'A useless blog', :type => :request do # solo para Rails
# describe 'A useless blog', :type => :feature do
  
#   it "should at least work" do

#     visit 'https://google.com'

#     expect(page).to have_content 'Google.com'

#   end

# end

describe 'BOE', :type => :feature do

	# it 'La pagina de RSS tiene más de un enlaces de Anuncios' do
	# 	visit 'http://boe.es/rss/boe.php?s=5A' # // Actualización diaria


	# 	xml = Capybara.string(page.body)
	# 	expect(xml).to have_content 'BOE - Boletín Oficial del Estado'

	# 	entradas = xml.find_all('.entry').to_a
	# 	entradas.shift
	# 	expect(entradas.length > 1).to be_truthy

	# 	for entrada in entradas

	# 		expect(entrada).to have_link(nil, href: %r{http:\/\/www.boe.es\/diario_boe\/txt\.php\?id\=BOE}i)
			
	# 		enlace = entrada.find 'a'
	# 		expect(enlace).to have_content %r{Anuncio|Resoluci}i

	# 	end

	# end

	it 'La pagina de busqueda por fecha funciona' do

		visit 'http://www.boe.es/diario_boe/'

		hoy = Time.now.strftime("%d/%m/%Y")
		expect(page).to have_selector 'table.BoeCalen', count: 1

		# fecha = Time.now
		# fecha = fecha.strftime("%d/%m/%Y")
		# puts fecha
		# visit 'http://www.boe.es/boe/dias/' + fecha + '/index.php?s=5' # Busqueda por fecha

		input_fecha = page.find(:id, 'fechaBOE')
		input_fecha.send_keys hoy

		boton = input_fecha.sibling( 'input.boton' )
		boton.click

		hoy = hoy.split('/')
		expect(page).to have_current_path 'http://www.boe.es/boe/dias/' + hoy[2] + '/' + hoy[1] + '/' + hoy[0] + '/'

		enlaces = page.find_all('li.puntoMas').to_a
		expect(enlaces.size > 0).to be_truthy

	end

end
	
	#Test OK
feature 'Capybara Sample' dohn
  scenario 'success something' do

    visit 'http://google.es/'
    fill_in('lst-ib', with: 'Sample User')
    click_button('goto_next')
  end


	scenario 'La pagina de RSS tiene más de un enlaces de Anuncios' do

	 	visit 'http://boe.es/rss/boe.php?s=5A' # // Actualización diaria

	 	xml = Capybara.string(page.body)
		expect(xml).to have_content 'BOE - Boletín Oficial del Estado'

		entradas = xml.find_all('.entry').to_a
	 	entradas.shift
	 	expect(entradas.length > 1).to be_truthy

		for entrada in entradas

			expect(entrada).to have_link(nil, href: %r{http:\/\/www.boe.es\/diario_boe\/txt\.php\?id\=BOE}i)
			
			enlace = entrada.find 'a'
			expect(enlace).to have_content %r{Anuncio|Resoluci}i

		end

	end
end