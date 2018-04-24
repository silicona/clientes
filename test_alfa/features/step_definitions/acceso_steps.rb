
Dado /que llego a inicio/ do

	visit 'http:localhost/clientes'

end

Y /que veo a los usuarios/ do

	expect(page).to have_current_path '/clientes/'

	usuarios = page.all('tbody tr').size()

	expect(usuarios > 0).to be_truthy

end

Cuando /oprimo el primer boton (.*)/ do |texto|

	usuarios = page.all('tbody tr')

	usuarios.first.click_button(texto)

end


Entonces /voy a su perfil y veo su telefono/ do

	expect(page).to have_content 'Teléfono'
	# expect(page).to have_current_path %r{http:\/\/localhost\/clientes\/#perfil\/\d+}

end
