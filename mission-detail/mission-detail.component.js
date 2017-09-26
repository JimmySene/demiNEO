// Register `missionList` component, along with its associated controller and template
angular
.module('missionDetail')
.component('missionDetail', {
  templateUrl: 'mission-detail/mission-detail.template.html',
  controller: ['$routeParams', 'Mission', 'Agent', '$http', '$scope',
  function MissionDetailController($routeParams, Mission, Agent, $http, $scope) {
    var self = this;
    self.submitted = false;

    // Récupération de la liste des agents (GET /agents)
    self.agents =  Agent.query();

    // $scope.$on retourne une fonction permettant de desenregistrer le listener
    var unregisterListener = $scope.$on('$locationChangeStart', function (event){
      if (confirm("Attention, les données saisies seront perdues !") == true) {
        // empeche le retour accidentel a la page precedente
      } else {
        event.preventDefault();
      }
    })

    // Recuperation des donnees de la mission (GET /missions/id)
    Mission.get({missionId: "&id="+$routeParams.missionId}, function(response) {
      self.mission = response[0];
      console.log(self.mission);
      self.autreSelected = self.mission.type_lieu == "autre";
      self.mapLink = self.mission.adresse.replace(/ /g, "+");
    });

    // Permet de revenir a la page precedente
    self.back = function back() {
      window.history.back();
    }

    // Permet de formater les dates en ISO 8601
    self.formatDate = function formatDate() {
      self.mission.datetime_depart = self.mission.datetime_depart ? moment(self.mission.datetime_depart).format() : "";
      self.mission.datetime_debut = self.mission.datetime_debut ? moment(self.mission.datetime_debut).format() : "";
      self.mission.datetime_fin = self.mission.datetime_fin ? moment(self.mission.datetime_fin).format() : "";
      self.mission.datetime_retour = self.mission.datetime_retour ? moment(self.mission.datetime_retour).format() : "";
    }

    // Permet de mettre la date courante en 1 seul clic
    self.initDate = function test($event) {
      self.mission[$event.currentTarget.nextElementSibling.id] = moment().format();
    }

    // Permet d'afficher le champ de saisie supplementaire si autre est selectionne avec ng-show
    self.change = function change() {
      self.autreSelected = self.mission.type_lieu == "autre";
    }

    // Permet de mettre a jour la mission (PUT /mission/id)
    self.submitForm = function submitForm(isValid) {
      if (isValid) {
        self.formatDate();
        console.log(self.mission);
        Mission.update(
          {missionId: "&id="+self.mission.id}, self.mission,
          function(response) {
            if (response.code == "0_OK") {
              alert(JSON.stringify(response));
              unregisterListener();
              self.back();
            } else {
              alert(JSON.stringify(response));
            }
          },
          function(error) {
            alert(JSON.stringify(error));
            console.error(error);
          });
        } else {
          self.submitted = true;
          alert("Tous les champs doivent être remplis ! ");
        }
      }

    }
  ]
});
