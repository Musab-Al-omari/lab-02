'use strict';
let keywordArr = [];


function Bringer(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    Bringer.all.push(this)
    // if (!keywordArr.includes(this.keyword)) {
    if (keywordArr.includes(this.keyword) === false) { keywordArr.push(this.keyword) };
    // }

}
Bringer.all = [];
// console.log(keywordArr);
// console.log(Bringer.all);



Bringer.prototype.render = function () {
    // let workBox = $('<div></div>');
    // workBox.addClass(this.keyword);
    // let template = $('#photo-template').html();
    // workBox.html(template);
    // workBox.find('h2').text(this.title);
    // workBox.find('img').attr('src', this.image_url);
    // workBox.find('p').text(this.description);
    // $('main').append(workBox);

    
    let workBox = $('#photo-template').clone();
    workBox.addClass(this.keyword)
    workBox.find('h2').text(this.title);
    workBox.find('img').attr('src', this.image_url);
    workBox.find('p').text(this.description);
    workBox.removeAttr('id');
    $('main').append(workBox);

}

let dropDown = function () {
    for (let i = 0; i < keywordArr.length; i++) {
        let myOptions = $('<option value="default">Filter by Keyword</option>');
        $('#selectMenu').append(myOptions)
        myOptions.attr('value', keywordArr[i])
        myOptions.text(keywordArr[i])
    }
}



let dropDownTow = function () {
    let mySelect = $('<select id="selectMenuSecond"></select>');
    $('header').append(mySelect)
    let sortArry = ['sortBy', 'Title', 'NumberOfHorns']
    for (let i = 0; i < sortArry.length; i++) {
        let myOptions = $('<option value=""></option>');
        mySelect.append(myOptions)

        myOptions.attr('value', sortArry[i])
        myOptions.text(sortArry[i])
    }

}




let myEvent = function () {

    $('#selectMenu').on('change', function () {
        let selected = $(this).val();
        console.log(selected);
        $('section').hide();
        if (selected === 'default') {
            $('section').show();

        } else {
            $(`.${selected}`).fadeIn(800);
        }

    });
}



let myNewEvent = function () {


    $('#selectMenuSecond').on('change', function () {
        let newSelect = $(this).val();
        console.log(newSelect);
        if (newSelect === 'Title') {
            // console.log("HELLO");
            sortingByTitle()
            $('section').html('');
            Bringer.all.forEach(element => {
                element.render();
            });

        } else if (newSelect === 'NumberOfHorns') {
            sortByNumOfHorns();
            $('#photo-template').html('');
            Bringer.all.forEach(element => {
                element.render();
            });


        }

    })
}


function sortingByTitle() {
    Bringer.all.sort(function (a, b) {
        var nameA = a.title
        var nameB = b.title
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });

}

function sortByNumOfHorns() {
    Bringer.all.sort(function (a, b) {
        var numA = a.horns
        var numB = b.horns
        if (numA < numB) {
            return -1;
        }
        if (numA > numB) {
            return 1;
        }

        return 0;
    });
}


function getFromDate() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    $.ajax('date/page-1.json', ajaxSettings).then((data) => {
        data.forEach(element => {
            let newWorkBox = new Bringer(element.image_url, element.title, element.description, element.keyword, element.horns);
            // console.log(newWorkBox);
            newWorkBox.render();

        });
        dropDown();
        dropDownTow();
        $('document').ready(myNewEvent);
        $('document').ready(myEvent);
    })

}
$('document').ready(getFromDate);





