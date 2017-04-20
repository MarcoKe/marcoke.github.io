/**
* Created by mar on 20-2-16.
*/
'use strict';

/* Controllers */

var labsviewApp = angular.module('labsviewApp', []);

labsviewApp.controller('LabListCtrl', function($scope) {
    $scope.labs = [
        {'name': 'The Smith-Waterman Algorithm',
        'category': 'Bioinformatics',
        'description': 'A dynamic programming algorithm for local sequence alignment.',
        'url': 'smith-waterman/'},
        {'name': 'The Needleman-Wunsch Algorithm',
        'category': 'Bioinformatics',
        'description': 'A dynamic programming algorithm for global sequence alignment.',
        'url': 'needleman-wunsch/'},
        {'name': 'The Simplex Method',
        'category': 'Linear Programming',
        'description': 'The all powerful Simplex method.',
        'url': 'simplex/'},
        {'name': 'Canvas Haiku',
        'category': 'Various',
        'description': 'Canvas Haiku as proposed on canvashaikus.com',
        'url': 'canvashaiku/'},
        {'name': 'Sudoku',
        'category': 'Games',
        'description': 'A simple Sudoku solver',
        'url': 'sudoku/'},

    ];



});
