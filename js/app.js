'use strict';

function Bringer(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    Bringer.all.push(this)

}
Bringer.all = [];

Bringer.prototype.render = function () {
    let workBox = $('<div></div>');
    workBox.addClass(this.keyword);
    let template = $('#photo-template').html();
    workBox.html(template);
    workBox.find('h2').text(this.title);
    workBox.find('img').attr('src', this.image_url);
    workBox.find('p').text(this.description);
    $('main').append(workBox);



    // let workBox = $('#photo-template').clone();
    // workBox.addClass(this.keyword)
    // workBox.find('h2').text(this.title);
    // workBox.find('img').attr('src', this.image_url);
    // workBox.find('p').text(this.description);
    // workBox.removeAttr('id');
    // $('main').append(workBox);

}
// function dropDown() {
//     let myOptions = {};
//     let mySelect = $('select');
// $.each(myOptions, function(val, text) {
//     mySelect.append($('<option></option>').val(val).html(text));
// });
    
// }




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

    })
    
}
$('document').ready(getFromDate);



