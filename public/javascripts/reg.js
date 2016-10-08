/**
 * Created by zhangliyong on 16-9-14.
 */
$(function () {
    $('.sub').on('click', function() {
        console.log(11111)
        var params = {};
        params.username = $('input[name=username]').val();
        params.password = $('input[name=password]').val();
        params.passwordRepeat = $('input[name=password-repeat]').val();
        $.ajax({
            url: '/reg',
            dataType: 'json',
            type: "POST",
            data: params,
            complete: function(data) {
                console.log(data.responseText);
            }
        });
    })
});