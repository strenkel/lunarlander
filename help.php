<!DOCTYPE html>

<html>

  <?php include 'php/head.php';?>

  <body>

    <?php include 'php/menu.php';?>

    <div class="content">
      <div class="content-center">
        <div id="text" class="text long">
          Lunar Lander ist ein textbasiertes Computerspiel. Ziel ist es, mit einer Landefähre
          auf dem Mond zu landen. Angezeigt werden nacheinander die Höhe, die Geschwindigkeit
          und der zur Bremsung verfügbare Treibstoff der Fähre. Anschließend hat man 2,5 Sekunden Zeit, den
          eingesetzten Treibstoff zur Bremsung einzugeben. Daraufhin wird die neue Höhe, die neue
          Geschwindigkeit und der verbleibende Treibstoff berechnet.
          Es wird eine Bremsdauer von 10 Sekunden unterstellt.
          Nun wiederholt sich der Zyklus bis die Fähre gelandet ist.
          Eine Landung mit einer Geschwindigkeit unter 3 m/s gilt
          als Erfolg, darüber als Crash.
          <br><br>
          <a href="http://www.technologizer.com/2009/07/19/lunar-lander/">Lunar Lander</a> wurde 1969 von
          <a href="http://www.cs.brandeis.edu/~storer/">Jim Storer</a> geschrieben.
          Es ist eines der einflußreichsten Computerspiele aller Zeiten.
          Ich selbst habe es in den 70ziger Jahren auf einem
          <a href="http://www.hpmuseum.org/">HP Taschenrechner</a> kennen gelernt. Die hier vorgestellte Browser-Version
          ist dieser Taschenrechner-Version nachempfunden.
          <br><br>
          Die Berechnungen basieren auf der
          <a href="http://de.wikipedia.org/wiki/Raketengrundgleichung">Raketengrundgleichung</a>
          und dem <a href="http://de.wikipedia.org/wiki/Freier_Fall">freien Fall</a>. Zugrunde liegt
          dabei die Gravitation des Mondes von 1.622 m/s**2, eine Austrittsgeschwindigkeit des
          Treibstoffes von 3.000 m/s und ein Fährenleergewicht von 5.000 kg.
        </div>
      </div>
    </div>

  </body>
</html>
