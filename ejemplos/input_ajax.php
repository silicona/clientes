<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
</head>
<body>


<?php

print_r($_POST);
echo '<br>';
print_r($_FILES);
echo '<br>';
?>

<form id="data" method="post" enctype="multipart/form-data">
    <input type="text" name="first" value="Bob" />
    <input type="text" name="middle" value="James" />
    <input type="text" name="last" value="Smith" />
    <input name="image" type="file" />
    <button>Submit</button>
</form>
<script type="text/javascript" src="../js/jquery-3.1.1.js"></script>

<script type="text/javascript">
	
$("form#data").submit(function(e) {
    e.preventDefault();    
    var formData = new FormData(this);

    console.log(formData);
    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: formData,
        //success: function (data) {
            //alert(data)
        //},
        cache: false,
        contentType: false,
        processData: false
    });
});
/*
$("form#data").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);    

    $.post($(this).attr("action"), formData, function(data) {
        alert(data);
    });
});
*/
</script>

<!-- 
<form enctype="multipart/form-data" id="formuploadajax" method="post">
        Nombre: <input type="text" name="nombre" placeholder="Escribe tu nombre">
        <br />
        <input  type="file" id="archivo1" name="archivo1"/>
        <br />
        <input  type="file" id="archivo2" name="archivo2"/>
        <br />
        <input type="submit" value="Subir archivos"/>
    </form>
    <div id="mensaje"></div>

    <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script>
    $(function(){
        $("#formuploadajax").on("submit", function(e){
            e.preventDefault();
            var f = $(this);
            //var f = $('#archivo1');
            console.log(f);
            console.log(f[0]);
            var formData = new FormData(document.getElementById("formuploadajax"));
            //formData.append("dato", "valor");
            //formData.append(f.attr("name"), $(this)[0].files);
            $.each(f, function(uno){
            	formData.append(uno.attr("name"), uno.attr('value'));

            })

            $.ajax({
                url: "input_ajax_recibe.php",

                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
	     					processData: false
            })
                .done(function(res){
                	console.log(res);
                    $("#mensaje").html("Respuesta: " + res);
                });
        });
    });
    </script> -->
</body>
</html>