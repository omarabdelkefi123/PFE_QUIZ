<!DOCTYPE html
	PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns:th="http://www.thymeleaf.org" xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title>Envoie du email "oublier mot de passe"</title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css' />

	<!-- use the font -->
	<style>
		body {
			font-family: 'Roboto', sans-serif;
			font-size: 12px;
		}
	</style>
</head>

<body style="margin: 0; padding: 0;">


	<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
		<tr>
			<td align="center" bgcolor="#ffffff" style="padding: 40px 0 30px 0;">

				<p align="center">
					<img src='cid:myLogo'>
				</p>
			</td>

		</tr>

		<tr>

			<td align="center" bgcolor="#faefff" style="padding: 40px 0 30px 0;">



				<p text="${'Hello ' + Name}">${'Hello ' + Name}</p>

				<span>
					Your application caught our attention. As part of our recruitment process, we are pleased to invite
					you to a 
					technical assessment. this test expired on <span color="red">${expirationPeride}</span>. <br /><br />
	
				<span>to start your test <span color="red">${nameTest}</span>.you should loging with the following
				username and reset your password by clicking on forget password .</span><br /> <br />

				<span style="float: left;margin-left: 19px;">Username:<span color="red"> ${username} </span></span>.<br /><br />
				

				<span>When you are ready, please click this link to access your assessment session:</span> <p align="center" color="red"> ${linkTest} </p>
				

				</span>
				
			</td>
		</tr>
	</table>

</body>

</html>