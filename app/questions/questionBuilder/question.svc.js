'use strict';

angular
.module('questionsApp.questionBuilder')
.service('QuestionService', function QuestionService($http) {
    var prefix_name = 'Question_Icons_';

    return {
        fields:[
            {
                name : 'textAnswer',
                value : 'Textbox',
                image: 'images/' + prefix_name + 'textbox.png',
                description: 'Textbox'
            },
            {
                name : 'radio',
                value : 'Radio Buttons',
                image: 'images/' + prefix_name + 'radio_buttons.png',
                description: 'Radio Buttons'
            },
            // {
            //     name : 'radio_grid',
            //     value : 'Radio Button Grid',
            //     image: 'images/' + prefix_name + 'radio_button_grid.png',
            //     description: 'Radio Button Grid'
            // },
            {
                name : 'dropdown',
                value : 'Dropdown List',
                image: 'images/' + prefix_name + 'dropdown_menu.png',
                description: 'Dropdown List'
            },
            // {
            //     name : 'dropdown_grid',
            //     value : 'Dropdown List Grid',
            //     image: 'images/' + prefix_name + 'dropdown_menu_list.png',
            //     description: 'Dropdown List Grid'
            // },
            {
                name : 'checkboxes',
                value : 'Checkboxes',
                image: 'images/' + prefix_name + 'checkboxes.png',
                description: 'Checkboxes'
            },
            {
                name : 'essay',
                value : 'Essay',
                image: 'images/' + prefix_name + 'essay.png',
                description: 'Essay'
            }
            // {
            //     name : 'number',
            //     value : 'Number',
            //     image: 'images/' + prefix_name + 'number.png',
            //     description: 'Number'
            // },
            // {
            //     name : 'slider',
            //     value : 'Slider',
            //     image: 'images/' + prefix_name + 'slider.png',
            //     description: 'Slider'
            // },
            // {
            //     name : 'slider_list',
            //     value : 'Slider List',
            //     image: 'images/' + prefix_name + 'slider_list.png',
            //     description: 'Slider List'
            // },
            // {
            //     name : 'likert_scale',
            //     value : 'Likert Scale',
            //     image: 'images/' + prefix_name + 'likert_scale.png',
            //     description: 'Likert Scale'
            // },
            // {
            //     name : 'nps',
            //     value : 'NPS',
            //     image: 'images/' + prefix_name + 'nps.png',
            //     description: 'NPS'
            // },
            // {
            //     name : 'drag_drop_ranking',
            //     value : 'Drag & Drop Ranking',
            //     image: 'images/' + prefix_name + 'drag_drop_ranking.png',
            //     description: 'Drag & Drop Ranking'
            // },
            // {
            //     name : 'ranking_grid',
            //     value : 'Ranking Grid',
            //     image: 'images/' + prefix_name + 'ranking_grid.png',
            //     description: 'Ranking Grid'
            // }
        ]
    };
});