$(function () {
    // working
    $('.update-devour').on('click',(event)=>{
        let id = $(event.target).attr("data-id");

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: {devour: 1}
        }).then(
            function() {
                console.log("New burger devoured!");
                location.reload();
            }
        );
    });

    // working
    $('#burger-form').on('submit',function(event){
        event.preventDefault();

        const newBurger = {
            name: $('#burger-form [name=burger-type]').val().trim(),
            devour: 0
        }

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("New burger created!");
                location.reload();
            }
        );
    });    
});