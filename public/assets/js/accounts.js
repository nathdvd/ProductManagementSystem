document.addEventListener('DOMContentLoaded', () => {
    $("#switch-form").on("click", function(e) {
        e.stopPropagation();
        state = $("#submit-form").val();
        if (state === "LOG IN") {
            $("#first-name-div, #last-name-div, #confirm-div").removeClass("hidden");
            $("#submit-form").val("SIGN UP");
            $("#switch-form").text("LOG IN");
            $("h1").text("SIGN UP");
        } else {
            $("#first-name-div, #last-name-div, #confirm-div").addClass("hidden");
            $("#submit-form").val("LOG IN");
            $("#switch-form").text("SIGN UP");
            $("h1").text("LOGIN");
        }
        return false;
    });

    $('#message').on("click", () => {
        $('#message').fadeOut(3000);
    });
});
