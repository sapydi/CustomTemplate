angular.module('unileverUSApp').service('jsonServiceStub', function($http, $q) { // overwrite jsonService dependency

    this.getUserInfo = function() {
    	return angular.copy(stubData.getUserInfo);
    };

    this.getObservations = function() {
    	return (stubData.getObservationsData);
    };
});


var stubData = {getUserInfo: {}, getObservationsData: {} };
stubData.getUserInfo = {
  "idAccount": 1,
  "idPerson": 1966,
  "lastname": "Laurijssen",
  "firstname": "Céline"
}

stubData.getObservationsData = {
	"data": [
	  {
	    "id": "0123",
	    "building": "Building 0001",
	    "floor": "Floor 1",
	    "plannedStartDate": "02-06-2017",
	    "plannedStartTime": "10:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0124",
	    "building": "Building 0001",
	    "floor": "Floor 2",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "11:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0125",
	    "building": "Building 0003",
	    "floor": "Floor 3",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "12:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0126",
	    "building": "Building 0004",
	    "floor": "Floor 4",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "13:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0127",
	    "building": "Building 0001",
	    "floor": "Floor 1",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "14:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0128",
	    "building": "Building 0006",
	    "floor": "Floor 6",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "16:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0129",
	    "building": "Building 0006",
	    "floor": "Floor 6",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "16:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0130",
	    "building": "Building 0006",
	    "floor": "Floor 6",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "16:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0131",
	    "building": "Building 0006",
	    "floor": "Floor 6",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "16:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0132",
	    "building": "Building 0006",
	    "floor": "Floor 6",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "16:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  },
	  {
	    "id": "0133",
	    "building": "Building 0006",
	    "floor": "Floor 6",
	    "plannedStartDate": "25-06-2017",
	    "plannedStartTime": "16:00",
	    "observer": "P001",
	    "actualStartTime": "",
	    "spaces": {
	      "space": [
	        {
	          "code": "MR01",
	          "type": "M"
	        },
	        {
	          "code": "MR02",
	          "type": "W"
	        }
	      ]
	    }
	  }
	]
}