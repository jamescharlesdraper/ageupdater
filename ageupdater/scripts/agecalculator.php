

<?php

 $birthDate = $_GET['age']; // 12
  //date in mm/dd/yyyy format; or it can be in other formats as well
  $date = "12-17-1983";
  //explode the date to get month, day and year
  $birthDate = explode("-", $birthDate);
  //get age from date or birthdate
  $age = (date("md", date("U", mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date("md")
    ? ((date("Y") - $birthDate[2]) - 1)
    : (date("Y") - $birthDate[2]));


$preText = $_GET['preText'];

$postText = $_GET['postText'];

$width  = $_GET['width'];

$lineHeight  = $birthDate[5];

$fontSize =  $birthDate[4];

$txtbefore = $birthDate[5];

$txtafter = $birthDate[6];



  echo "<body style='margin:0;overflow: hidden;'> <p style='font-size:".$fontSize.";line-height:".$lineHeight.";overflow:hidden;'>".$txtbefore." ".$age." ".$txtafter."</p> </body>"
?>