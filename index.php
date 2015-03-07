<!DOCTYPE html>

<html>

  <?php include 'php/head.php';?>

  <body>

    <?php include 'php/menu.php';?>

    <div class="content">
      <div class="content-center">
        <div id="text" class="text title"></div>
        <div id="control" class="control"></div>
      </div>
    </div>

    <div class="templates">
      <input id="start-template" class="input" type="button" value="Start"/>
      <input id="fuel-input-template" class="input" type="text" pattern="[0-9]*"/>
    </div>

  </body>
  
  <script src="js/LanderMath.js" type="text/javascript"></script>
  <script src="js/main.js" type="text/javascript"></script>

</html>
