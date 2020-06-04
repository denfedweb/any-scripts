function popupSubmit(event) {
    event.preventDefault();

    var currentIdForm = event.target.id;
    if (validateForm(currentIdForm)) {
        return false;
    }
    var formData = $(`#${currentIdForm}`).serialize();
    $.ajax({
        url: $(`#${currentIdForm}`).attr("action"),
        type: "POST",
        data: formData,
        dataType: "json",
        success: function(res) {
            const idForm = $(`#${currentIdForm}`).attr("data-idForm");
            if (res.status === "ok") {
                $(`#${currentIdForm}`).trigger("reset");
                $(`#result-id-${idForm}`).css("display", "flex");
                $(`#coupon-id-${idForm}`).html(res.texts.coupon);
                $("#popup_user_phone").removeClass("errorInputForm");
                $("#popup_user_email").removeClass("errorInputForm");
                $("#popup_user_zip").removeClass("errorInputForm");
                $("#popup_user_name").removeClass("errorInputForm");
                if ($('.g-recaptcha').length != 0) {
                grecaptcha.reset();
                }
            } else if (res.status === "form_error") {
                $(`.form-popup-builder-${idForm}`).html(res.html);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });

    function validateForm(id) {
        // валидация почты
        var regEmail = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
        var el_e = $(`#${id} #popup_user_email`);
        var v_email = el_e.val() ? false : true;
        if (el_e.val() == "" || el_e.length == 0) {
            v_email = false;
        } else if (!regEmail.test(el_e.val())) {
            v_email = true;
            el_e.addClass("errorInputForm");
        }
        // валидация телефона
        var regPhone = /^([+]?[0-9\s-\(\)]{3,25})*$/i;
        var el_p = $(`#${id} #popup_user_phone`);
        var v_phone = el_p.val() ? false : true;
        if (el_p.val() == "" || el_p.length == 0) {
            v_phone = false;
        } else if (!regPhone.test(el_p.val())) {
            v_phone = true;
            el_p.addClass("errorInputForm");
        }
        // валидация имени и зип кода
        var el_n = $(`#${id} #popup_user_name`);
        var v_name = el_n.val() ? false : true;
        if (el_n.val() == "" || el_n.length == 0) {
            v_name = false;
        }
        var el_z = $(`#${id} #popup_user_zip`);
        var v_zip = el_z.val() ? false : true;
        if (el_z.val() == "" || el_z.length == 0) {
            v_zip = false;
        }
        // валидация при незаполненых обязательных инпутов
        if (el_e.val() == "" && el_e.prop("required")) {
            v_email = true;
            el_e.addClass("errorInputForm");
        } else if (el_p.val() == "" && el_p.prop("required")) {
            v_phone = true;
            el_p.addClass("errorInputForm");
        } else if (el_n.val() == "" && el_n.prop("required")) {
            v_name = true;
            el_n.addClass("errorInputForm");
        } else if (el_z.val() == "" && el_z.prop("required")) {
            v_zip = true;
            el_z.addClass("errorInputForm");
        }

        return v_email || v_phone || v_zip || v_name;
    }
}

function buttonPopup(popup) {
    $(`.button-popup-${popup.id}`).click(function() {
        var layoutType = "";
        if ($(document).width() <= 800) {
            layoutType = "mobile";
        } else if ($(document).width() >= 800) {
            layoutType = "desktop";
        }
        $.ajax({
            url: `/popups/${popup.id}/show/${layoutType}`,
            type: "GET",
            dataType: "json",
            success: function(res) {
                document.cookie = `NYFCASC${res.id}=26236679; path=/;`;
                if ($(`.popup-id-${res.id}`).length == 0) {
                    $(".main").append(res.html);
                }

                if ($(`.popup-id-${res.id}`).length != 0) {
                    if ($(document).width() <= 800 && res.mobilePopupEnabled == true) {
                        $(`.popup-id-${res.id}`).css("display", "flex");
                    } else if ($(document).width() >= 800) {
                        $(`.popup-id-${res.id}`).css("display", "flex");
                    }
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
}

function scrollPopup(popup) {
    $(window).on("scroll", function() {
        var percent = ($(document).height() / 100) * popup.trigger.percentage;

        if ($(window).scrollTop() >= percent) {
            var layoutType = "";
            if ($(document).width() <= 800) {
                layoutType = "mobile";
            } else if ($(document).width() >= 800) {
                layoutType = "desktop";
            }

            $.ajax({
                url: `/popups/${popup.id}/show/${layoutType}`,
                type: "GET",
                dataType: "json",
                success: function(res) {
                    document.cookie = `NYFCASC${res.id}=26236679; path=/;`;
                    if ($(`.popup-id-${res.id}`).length == 0) {
                        $(".main").append(res.html);
                    }

                    if ($(`.popup-id-${res.id}`).length != 0) {
                        if ($(document).width() <= 800 && res.mobilePopupEnabled == true) {
                            $(`.popup-id-${res.id}`).css("display", "flex");
                        } else if ($(document).width() >= 800) {
                            $(`.popup-id-${res.id}`).css("display", "flex");
                        }
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });

            $(window).off("scroll");
        }
    });
}

var currentUrl = $("body").attr("data-currentUrl");
var currentRoute = $("body").attr("data-currentRoute");

$.ajax({
    url: `/popups/?url=${currentUrl}&route=${currentRoute}`,
    type: "GET",
    dataType: "json",
    success: function(res) {
        for (var id in res) {
            for (var indx in res[id].trigger.types) {
                if (res[id].trigger.types[indx] == "scroll") {
                    if (res[id].quantity > 0) {
                        if (
                            $(document).width() <= 800 &&
                            res[id].mobilePopupEnabled == true
                        ) {
                            scrollPopup(res[id]);
                        } else if ($(document).width() >= 800) {
                            scrollPopup(res[id]);
                        }
                    }
                }

                if (res[id].trigger.types[indx] === "click") {
                    buttonPopup(res[id]);
                }
            }
        }
    },
    error: function(err) {
        console.log(err);
    }
});
$("body").on("click", ".close-popup-builder", function() {
    $(".popup-overlay-builder").css("display", "none");
    $(".popup-success-result").css("display", "none");
});
