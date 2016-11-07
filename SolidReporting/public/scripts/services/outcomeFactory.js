myApp.factory('OutcomeFactory', ['$http', '$location', function($http, $location) {
  console.log("OutcomeFactory is working");


  var getData = function() {
    var promise = $http.get('/fileUpload').then(function (response) {
      return response.data;
    });

    return promise;
  }


  var houseStabil = function(selections) {

    var promise = $http.post('/outcomequery/houseStabil', selections).then(function (response) {
      var houseStabil = response.data;
      console.log("houseStabil: ", houseStabil);
      return houseStabil;
    });
    return promise;
  }

  var adultEduAdv = function(selections) {

    var promise = $http.post('/outcomequery/adulteduadv', selections).then(function (response) {
      var adultEduAdv = response.data;
      console.log("adulteduadv: ", adultEduAdv);
      return adultEduAdv;
    });
    return promise;
  }

  var adultLearningDis = function(selections) {

    var promise = $http.post('/outcomequery/adultlearningdis', selections).then(function (response) {
      var adultLearningDis = response.data;
      console.log("adultLearningDis: ", adultLearningDis);
      return adultLearningDis;
    });
    return promise;
  }

  var childLearnDis = function(selections) {

    var promise = $http.post('/outcomequery/childlearndis', selections).then(function (response) {
      var childLearnDis = response.data;
      console.log("childLearnDis: ", childLearnDis);
      return childLearnDis;
    });
    return promise;
  }

  var hhCurrentEmp = function(selections) {

    var promise = $http.post('/outcomequery/hhcurrentemp', selections).then(function (response) {
      var hhCurrentEmp = response.data;
      console.log("hhCurrentEmp: ", hhCurrentEmp);
      return hhCurrentEmp;
    });
    return promise;
  }

  var hh2CurrentEmp = function(selections) {

    var promise = $http.post('/outcomequery/hh2currentemp', selections).then(function (response) {
      var hh2CurrentEmp = response.data;
      console.log("hh2CurrentEmp: ", hh2CurrentEmp);
      return hh2CurrentEmp;
    });
    return promise;
  }

  var econStabil = function(selections) {

    var promise = $http.post('/outcomequery/econstabil', selections).then(function (response) {
      var econStabil = response.data;
      console.log("econStabil: ", econStabil);
      return econStabil;
    });
    return promise;
  }

  var adultDisabil = function(selections) {

    var promise = $http.post('/outcomequery/adultdisabil', selections).then(function (response) {
      var adultDisabil = response.data;
      console.log("adultDisabil: ", adultDisabil);
      return adultDisabil;
    });
    return promise;
  }

  var adultMI = function(selections) {

    var promise = $http.post('/outcomequery/adultmi', selections).then(function (response) {
      var adultMI = response.data;
      console.log("adultMI: ", adultMI);
      return adultMI;
    });
    return promise;
  }

  var childDis = function(selections) {

    var promise = $http.post('/outcomequery/childDis', selections).then(function (response) {
      var childDis = response.data;
      console.log("childDis: ", childDis);
      return childDis;
    });
    return promise;
  }

  var childMI = function(selections) {

    var promise = $http.post('/outcomequery/childmi', selections).then(function (response) {
      var childMI = response.data;
      console.log("childMI: ", childMI);
      return childMI;
    });
    return promise;
  }

  var parentEdu = function(selections) {

    var promise = $http.post('/outcomequery/parentedu', selections).then(function (response) {
      var parentEdu = response.data;
      console.log("parentEdu: ", parentEdu);
      return parentEdu;
    });
    return promise;
  }

  var parentEduThisYear = function(selections) {

    var promise = $http.post('/outcomequery/parenteduthisyear', selections).then(function (response) {
      var parentEduThisYear = response.data;
      console.log("parentEduThisYear: ", parentEduThisYear);
      return parentEduThisYear;
    });
    return promise;
  }

  var parentEduYearBefore = function(selections) {

    var promise = $http.post('/outcomequery/parenteduyearbefore', selections).then(function (response) {
      var parentEduYearBefore = response.data;
      console.log("parentEduYearBefore: ", parentEduYearBefore);
      return parentEduYearBefore;
    });
    return promise;
  }

  var budgetingEdu = function(selections) {

    var promise = $http.post('/outcomequery/budgetingedu', selections).then(function (response) {
      var budgetingEdu = response.data;
      console.log("budgetingEdu: ", budgetingEdu);
      return budgetingEdu;
    });
    return promise;
  }

  var budgetingEduSameYear = function(selections) {

    var promise = $http.post('/outcomequery/budgetingedusameyear', selections).then(function (response) {
      var budgetingEduSameYear = response.data;
      console.log("budgetingEduSameYear: ", budgetingEduSameYear);
      return budgetingEduSameYear;
    });
    return promise;
  }

  var budgetingEduYearBefore = function(selections) {

    var promise = $http.post('/outcomequery/budgetingeduyearbefore', selections).then(function (response) {
      var budgetingEduYearBefore = response.data;
      console.log("budgetingEduYearBefore: ", budgetingEduYearBefore);
      return budgetingEduYearBefore;
    });
    return promise;
  }

  var violence = function(selections) {

    var promise = $http.post('/outcomequery/violence', selections).then(function (response) {
      var violence = response.data;
      console.log("violence: ", violence);
      return violence;
    });
    return promise;
  }

  var tenantTraining = function(selections) {

    var promise = $http.post('/outcomequery/tenanttraining', selections).then(function (response) {
      var tenantTraining = response.data;
      console.log("tenantTraining: ", tenantTraining);
      return tenantTraining;
    });
    return promise;
  }

  var tenantTrainingSameYear = function(selections) {

    var promise = $http.post('/outcomequery/tenanttrainingsameyear', selections).then(function (response) {
      var tenantTrainingSameYear = response.data;
      console.log("tenantTrainingSameYear: ", tenantTrainingSameYear);
      return tenantTrainingSameYear;
    });
    return promise;
  }

  var tenantTrainingPriorYear = function(selections) {

    var promise = $http.post('/outcomequery/tenanttrainingprioryear', selections).then(function (response) {
      var tenantTrainingPriorYear = response.data;
      console.log("tenantTrainingPriorYear: ", tenantTrainingPriorYear);
      return tenantTrainingPriorYear;
    });
    return promise;
  }

  var dbt = function(selections) {

    var promise = $http.post('/outcomequery/DBT', selections).then(function (response) {
      var dbt = response.data;
      console.log("DBT: ", dbt);
      return dbt;
    });
    return promise;
  }

  var DBTsameyear = function(selections) {

    var promise = $http.post('/outcomequery/DBTsameyear', selections).then(function (response) {
      var DBTsameyear = response.data;
      console.log("DBTsameyear: ", DBTsameyear);
      return DBTsameyear;
    });
    return promise;
  }

  var DBTprioryear = function(selections) {

    var promise = $http.post('/outcomequery/DBTprioryear', selections).then(function (response) {
      var DBTprioryear = response.data;
      console.log("DBTprioryear: ", DBTprioryear);
      return DBTprioryear;
    });
    return promise;
  }

  var healthImproved = function(selections) {

    var promise = $http.post('/outcomequery/healthimproved', selections).then(function (response) {
      var healthImproved = response.data;
      console.log("healthImproved: ", healthImproved);
      return healthImproved;
    });
    return promise;
  }

  var socialSupport = function(selections) {

    var promise = $http.post('/outcomequery/socialsupport', selections).then(function (response) {
      var socialsupport = response.data;
      console.log("socialsupport: ", socialsupport);
      return socialsupport;
    });
    return promise;
  }

    var selfGoals = function(selections) {

      var promise = $http.post('/outcomequery/selfgoals', selections).then(function (response) {
        var selfGoals = response.data;
        console.log("selfGoals: ", selfGoals);
        return selfGoals;
      });
      return promise;
    }

    var totalPeople = function(selections) {

      var promise = $http.post('/outcomequery/totalpeopleforoutcomes', selections).then(function (response) {
        var totalPeople = response.data;
        console.log("totalPeople: ", totalPeople);
        return totalPeople;
      });
      return promise;
    }

  return {  //start of return scope
    retrieveData: function () {
      return getData();
    },
    houseStabil: function (selections) {
      return houseStabil(selections);
    },
    adultEduAdv: function (selections) {
      return adultEduAdv(selections);
    },
    adultLearningDis: function (selections) {
      return adultLearningDis(selections);
    },
    childLearnDis: function (selections) {
      return childLearnDis(selections);
    },
    hhCurrentEmp: function (selections) {
      return hhCurrentEmp(selections);
    },
    hh2CurrentEmp: function (selections) {
      return hh2CurrentEmp(selections);
    },
    econStabil: function (selections) {
      return econStabil(selections);
    },
    adultDisabil: function (selections) {
      return adultDisabil(selections);
    },
    adultMI: function (selections) {
      return adultMI(selections);
    },
    childDis: function (selections) {
      return childDis(selections);
    },
    childMI: function (selections) {
      return childMI(selections);
    },
    parentEdu: function (selections) {
      return parentEdu(selections);
    },
    parentEduThisYear: function (selections) {
      return parentEduThisYear(selections);
    },
    parentEduYearBefore: function (selections) {
      return parentEduYearBefore(selections);
    },
    budgetingEdu: function (selections) {
      return budgetingEdu(selections);
    },
    budgetingEduSameYear: function (selections) {
      return budgetingEduSameYear(selections);
    },
    budgetingEduYearBefore: function (selections) {
      return budgetingEduYearBefore(selections);
    },
    violence: function (selections) {
      return violence(selections);
    },
    tenantTraining: function (selections) {
      return tenantTraining(selections);
    },
    tenantTrainingSameYear: function (selections) {
      return tenantTrainingSameYear(selections);
    },
    tenantTrainingPriorYear: function (selections) {
      return tenantTrainingPriorYear(selections);
    },
    dbt: function (selections) {
      return dbt(selections);
    },
    DBTsameyear: function (selections) {
      return DBTsameyear(selections);
    },
    DBTprioryear: function (selections) {
      return DBTprioryear(selections);
    },
    healthImproved: function (selections) {
      return healthImproved(selections);
    },
    socialSupport: function (selections) {
      return socialSupport(selections);
    },
    selfGoals: function (selections) {
      return selfGoals(selections);
    }
  };  //end of return scope

}]);
