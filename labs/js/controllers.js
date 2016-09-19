/**
 * Created by mar on 20-2-16.
 */
'use strict';

/* Controllers */

var labsviewApp = angular.module('labsviewApp', []);

labsviewApp.controller('LabListCtrl', function($scope) {
    $scope.labs = [
        {'name': 'The Simplex Method',
         'category': 'Linear Programming',
         'description': 'The all powerful Simplex method.',
         'url': 'simplex/'},
        {'name': 'The Needleman-Wunsch Algorithm',
         'category': 'Bioinformatics',
         'description': 'A dynamic programming algorithm for global sequence alignment.',
         'url': 'needleman-wunsch/'},
        {'name': 'The Smith-Waterman Algorithm', 
         'category': 'Bioinformatics', 
         'description': 'A dynamic programming algorithm for local sequence alignment.', 
         'url': 'smith-waterman/'}
    ];
});
