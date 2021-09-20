

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
                <?php
$content = file_get_contents("https://datastudio.google.com/embed/reporting/a003daed-461b-4943-a28c-4d39ab160131/page/PqcSC");
$content = str_replace('</head>', '<link rel="stylesheet" href="css/simpleIframe.css"></head>', $content);
echo $content;
?>
            </iframe>


</body>
</html>