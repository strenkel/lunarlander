<!DOCTYPE html>

<html>

  <?php include 'php/head.php';?>

  <body>

    <?php include 'php/menu.php';?>

    <div class="content">
      <div class="content-center">
        <div id="text" class="text title"></div>
        <div id="control" class="control"></div>
        
        <div id="keyboard" class="keyboard">
          <div>
            <span id="nr1">1</span><span id="nr2">2</span><span id="nr3">3</span><span id="nr4">4</span><span id="nr5">5</span>
          </div>
          <div>
            <span id="nr6">6</span><span id="nr7">7</span><span id="nr8">8</span><span id="nr9">9</span><span id="nr0">0</span>
          </div>
        </div>
        
      </div>
    </div>

    <div class="templates">
      <input id="start-template" class="input" type="button" value="Start"/>
      <input id="fuel-input-template" class="input" type="text"/>
      
    </div>

    

  </body>
  
  <script src="js/LanderMath.js" type="text/javascript"></script>
  <script src="js/main.js" type="text/javascript"></script>

</html>
