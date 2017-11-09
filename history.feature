Feature: History

  Scenario: No rounds have been played
    Given no rounds have been played
    When we open the application
    Then we should see "NO ROUNDS"

  Scenario: Rounds have been played
    Given rounds have been played
    When we open the application
    Then we should see a table containing:
      * p1 throw ("rock")
      * p2 throw ("sailboat")
      * result   ("invalid")