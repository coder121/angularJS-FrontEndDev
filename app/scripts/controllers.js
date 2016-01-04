'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
              $scope.showMenu = true;
            $scope.message = "Loading ...";
                        menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
                      
                $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
               
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    
                }
               else {
                $scope.invalidChannelSelection = false;
                $scope.myfeedback = feedbackFactory.getFeedback().query();
                $scope.myfeedback.push($scope.feedback);  
                feedbackFactory.getFeedback().save($scope.feedback)
                 $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
              $scope.dish = {};
           $scope.showDish = true;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
      
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
           $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
             $scope.submitComment = function () {
                                $scope.mycomment.date = new Date().toISOString();

                                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                                $scope.commentForm.$setPristine();
                                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

  
         .controller('AboutController', ['$scope','$stateParams', 'corporateFactory', function($scope,$stateParams,corporateFactory) {
            
            

             $scope.showLeaders= true;
             $scope.message = "Loading ...";
             corporateFactory.getLeaders().query(
                 function(response) {
                     $scope.leaders= response;
                     $scope.showLeaders= true;
                 },
                 function(response) {
                     $scope.message = "Error: "+response.status + " " + response.statusText;
                 });
         
         }])
        .controller('IndexController', ['$scope', '$stateParams', 'menuFactory','corporateFactory' , function($scope, $stateParams, menuFactory, corporateFactory) {
             $scope.showDish = false;
                        $scope.message="Loading ...";
                       $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
             $scope.showPromotion = false;
                        $scope.message="Loading ...";
                       $scope.promotion = menuFactory.getPromotion().get({id:0})
                        .$promise.then(
                            function(response){
                               
                                $scope.promotion = response;
                                $scope.showPromotion= true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );

            $scope.showLeadership = false;
                        $scope.message="Loading ...";
                       $scope.leader = corporateFactory.getLeaders().get({id:3})
                        .$promise.then(
                            function(response){
                                console.log(response); 
                                $scope.leader = response;
                                $scope.showLeadership = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
        }])
;