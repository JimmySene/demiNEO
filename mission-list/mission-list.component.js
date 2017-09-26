// Register `missionList` component, along with its associated controller and template
angular
  .module('missionList')
  .component('missionList', {
    templateUrl: 'mission-list/mission-list.template.html',
    controller: ['Mission',
      function MissionListController(Mission) {
        var self = this;
        self.missions = Mission.query();

        self.go = function go(id) {
          console.log(id);
          window.location.href += '/'+id;
        }

      }
    ]
});
