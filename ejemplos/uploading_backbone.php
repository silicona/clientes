<!DOCTYPE html>
<html>
<head>
	<title>Uploading</title>
	<meta charset="utf-8">
</head>
<body>
<h1>Uploading</h1>

<div class="box thumbnail">
	<div class="photo">
	<% if (avatar && avatar.url) { %>
	<img src="<%= avatar.url %>" alt="Contact photo" />
	<% } else { %>
	<img src="http://placehold.it/250x250" alt="Contact photo" />
	<% } %>
	<input id="avatar" name="avatar" type="file" 
	style="display: none" />
	</div>
	<!-- ... -->
</div>


<script type="text/javascript">
// Insert a new contact JSON into the contacts array
createContact(req, res) {
var contact = extractContactData(req);

  // Asssign a random id
  contact.id = makeId();
contacts.push(contact);

res.status(201)
.json(contact);
}

	// apps/contacts/views/contactPreview.js
class ContactPreview extends ModelView {
// ...

  get events() {
    return {
      'click img': 'showSelectFileDialog'
    };
  }

showSelectFileDialog() {
    $('#avatar').trigger('click');
  }

  // ...
}

When...

</script>
</body>
</html>