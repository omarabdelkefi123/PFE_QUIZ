<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
  <head>
    <title th:remove="all">Template for HTML email with inline image</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <p text="${'Hello ' + Name}">${'Hello ' + Name}</p>
    
    <p>
      Your application caught our attention. As part of our recruitment process, we are pleased to invite
	   you to a technical assessment. this test expired on <span color="red">${expirationPeride}</span>.
    </p>
    <p>
      to start your test <span color="red">${nameTest}</span>.you should change your password by clicking on this link
      <span style="color:red">${linkforgetpassword} </span> then type your username.
    </p>
    <p>Username is:<span style="color:red"> ${username} </span></p>
    
    <p>
    	When you are ready, please click this link to access your assessment session:
    	<span style="color:red"> ${linkTest} </span>
    </p>
    
    <p>
      <img src='cid:myLogo'>
    </p>
    <p>
      Regards, <br />
      Good luck!
    </p>
  </body>
</html>