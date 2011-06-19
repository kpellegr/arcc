<?php
	$imgPath = "http://www.e-merce.be/proj/arc/pg/mail/";
	$path = "http://www.e-merce.be/proj/arc/pg/";
		
	require_once 'mail/ClassPhpMailer.php';
	
		if($_POST['Base']=='true'){
			$base="<img src='" .$imgPath ."CheckIcon.png' />";
		}else{
			$base='';
		}
		
		if($_POST['Belgacom']=='true'){
			$belgacom = "<img src='" .$imgPath ."CheckIcon.png' />";
		}else{
			$belgacom='';
		};
		
		if($_POST['Mobistar']=='true'){
			$mobistar= "<img src='" .$imgPath ."CheckIcon.png' />";
		}else{
			$mobistar='';
		};
		if($_POST['Andere']=='true'){
			$andere= "<img src='" .$imgPath ."CheckIcon.png' />";
		}else{
			$andere='';
		};
		
$message = "
<html>
<head>
  <title>ARC</title>
  <style>
	body{
		font-family:Verdana, Geneva, sans-serif;
		font-size:12px;
	}
	
	table th{
		padding:1px 5px;
		text-align:right;
	}
	
  </style>
</head>
<body>
	
  <p style='font-style:italic;'>
	\"ARC & Belgacom danken u voor uw aanwezigheid op de Zomer-happening van VOKA. 
Dankzij de professionele telecom-oplossingen van ARC & Belgacom kunnen wij u een kleine souvenir bezorgen van dit mooi event\".
  </p>
  <table>
    <tr>
      <th>Naam: </th><td>{$_POST['naam']}</td>
    </tr>
	<tr>
      <th>Functie</th><td>{$_POST['functie']}</td>
    </tr>
	<tr>
      <th>Bedrijf</th><td>{$_POST['bedrijf']}</td>
    </tr>
	<tr>
      <th>Aantal GSM's</th><td>{$_POST['aantal_gsm']}</td>
    </tr>
	<tr>
      <th>Aantal Bedrijfswagens</th><td>{$_POST['aantal_wagens']}</td>

    </tr>
	<tr>
      <th>Commentaar</th><td>{$_POST['commentaar']}</td>
    </tr>
    <tr>
      <th>Operatoren</th>
	</tr>
</table>
<table>
	<tr>
      <th><img src='{$imgPath}/BaseLogo.png' title='Base' alt='Base'/></th>
      <th><img src='{$imgPath}/BelgacomLogo.jpg' title='Belgacom' alt='Belgacom'/></th>
      <th><img src='{$imgPath}/MobistarLogo.jpg' title='Mobistar' alt='Mobistar'/></th>
      <th>Andere</th>
    </tr>
    <tr>
      <td>{$base}</td>
      <td>{$belgacom}</td>
      <td>{$mobistar}</td>
      <td>{$andere}</td></td>
    </tr>
  </table>
</body>
</html>
";


	$mail             = new PHPMailer(); // defaults to using php "mail()"

	//$body             = file_get_contents();
	//$body             = eregi_replace("[\]",'',$message);
	$body = $message;	
		
	$mail->AddReplyTo("info@arc.be","ARC");

	$mail->SetFrom('info@arc.be', 'ARC');

	$mail->AddReplyTo("info@arc.be","ARC");

	$mail->AddAddress($_POST['email'], $_POST['naam']);

	$mail->Subject    = "ARC - Zomer-happening van VOKA.";

	$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

	$mail->MsgHTML($body);
	
	if(strpos($_POST['image'], 'base64')){
		$contact_image_data= $_POST['image'];
		$data = substr($contact_image_data, strpos($contact_image_data, ","));
		$filename="foto_arc.jpg"; 
		$encoding = "base64"; 
		$type = "image/jpg";
		$mail->AddStringAttachment(base64_decode($data), $filename, $encoding, $type);
	}
	
	//$mail->AddAttachment($contents);      // attachment
	//$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment

	if(!$mail->Send()) {
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo $_POST['image'];
	}

?>
