<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Dirvish Web Interface</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Pablo RUTH">

    <!-- Le styles -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/global.css" rel="stylesheet">
    <style>
      body {
        padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
      }
	</style>
	<link rel="shortcut icon" href="favicon.ico">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="index.php">Dirvish Web Interface</a>
          <div class="nav-collapse collapse">
            <ul class="nav">
              <li class="active"><a href="index.php">Home</a></li>
              <li><a href="config.php">Config</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">

		<div class="row">
				<div id="loading" class="span12">
					<div class="row"><div class="span6 offset3" style="text-align: center; margin-top: 60px;">Loading ...</div></div>
					<div class="row"><div class="span6 offset3 progress progress-striped active" style="margin-top: 10px;"><div class="bar" style="width: 100%;"></div></div></div>
				</div>
		</div>

		<div class="row">
				<div id="clients" class="span12"></div>
		</div>

		<div id="history" class="span12" style="display: none;"></div>
		<div id="log" class="span12" style="display: none;"></div>

    </div> <!-- /container -->

    <script src="js/jquery-1.7.2.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>

  </body>
</html>

