$(".js-tab-trigger").click(function() {
  var id = $(this).attr("data-tab"),
    content = $('.js-tab-content[data-tab="' + id + '"]');

  $(".js-tab-trigger.active").removeClass("active");
  $(this).addClass("active");

  $(".js-tab-content.active").removeClass("active");
  content.addClass("active");
});
$(".image").click(function() {
  $(".image.active").removeClass("active");
  $(this).addClass("active");
});

$("form").on("change", ".image-form input", function() {
  $(this)
    .parent(".field")
    .attr(
      "data-text",
      $(this)
        .val()
        .replace(/.*(\/|\\)/, "")
    );
  const text = $(this)
    .parent(".field")
    .attr("data-text");
  if ($(this).next("span").length === 0) {
    $(this)
      .parent(".field")
      .append(`<span></span>`);
  }
  $(this)
    .next("span")
    .text(text);
});

$(".add-photo .labeled").click(function() {
  setTimeout(function() {
    $('.add-photo a[data-form-collection="delete"]').html(
      '<i class="fas fa-trash-alt"></i>'
    );
    $('input[type="file"]')
      .last()
      .trigger("click");
  }, 200);
});
