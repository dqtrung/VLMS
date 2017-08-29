function cancelFullScreen(el) {
    var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
    if (requestMethod) { // cancel full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function requestFullScreen(el) {
    var el = document.documentElement,
        rfs = // for newer Webkit and Firefox
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        // for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function toggleFull() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

    if (isInFullScreen) {
        cancelFullScreen(document);
    } else {
        requestFullScreen(elem);
    }
    return false;
}

$('#btn_reset_pwd').click(function() {
    $('div#profile_reset_pwd').show();
    $('div#profile_info').hide();
});

$('#btn_back_pro').click(function() {
    $('div#profile_reset_pwd').hide();
    $('div#profile_info').show();
});

$('#add_category_btn').click(function() {
    $('.content_form').show();
    $('#add_category_form').show();
    $('#edit_category_form').hide();
});

$('.edit_category_btn').click(function() {
    $('.content_form').show();
    $('#add_category_form').hide();
    $('#edit_category_form').show();
});

$('.close_form').click(function() {
    $('.content_form').hide();
});

$('.show_more').click(function() {
    $(this).hide();
    $(this).next().show();
    $(this).next().next().show();
})

$('.show_less').click(function() {
    $(this).hide();
    $(this).prev().hide();
    $(this).prev().prev().show();
})

$('.datetimepicker4').datetimepicker();

var changeCheckbox = document.querySelector('.js-switch');

if (changeCheckbox) {
    changeCheckbox.onchange = function() {
        if (changeCheckbox.checked == false) {
            $('img.avatar-view').css('filter', 'grayscale(100%)');
            $('#role_user').prop('disabled', true);
        } else {
            $('img.avatar-view').css('filter', '');
            $('#role_user').prop('disabled', false);
        }
    };
}

if ($('#status_user').text()) {
    if ($('#status_user').text() == 'Active') {
        $('#status_user').addClass('active_user');
        $('img.avatar-view').css('filter', '');
    } else {
        $('#status_user').addClass('lock_user');
        $('img.avatar-view').css('filter', 'grayscale(100%)');
    }
}

function each(arr, callback) {
    var length = arr.length;
    var i;

    for (i = 0; i < length; i++) {
        callback.call(arr, arr[i], i, arr);
    }

    return arr;
}

window.addEventListener('DOMContentLoaded', function() {
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    if (container) {
        var image = container.getElementsByTagName('img').item(0);
        var cropper = null;
        var uploadedImageURL = null;
        var options = {
            aspectRatio: 1 / 1,
            preview: '.preview',
            autoCropArea: 0.5
        };

        $('#clear_image').click(function() {
            cropper.destroy();
            image.src = "";
            cropper = new Cropper(image, options);
        });

        $('#change-avatar-modal').on('shown.bs.modal', function() {
            if (!cropper) {
                image.src = "";
                cropper = new Cropper(image, options);
            }

            // Import image
            var inputImage = document.getElementById('inputImage');

            if (URL) {
                inputImage.onchange = function() {
                    var files = this.files;
                    var file;

                    if (cropper && files && files.length) {
                        file = files[0];

                        if (/^image\/\w+/.test(file.type)) {
                            if (uploadedImageURL) {
                                URL.revokeObjectURL(uploadedImageURL);
                            }

                            image.src = uploadedImageURL = URL.createObjectURL(file);
                            cropper.destroy();
                            cropper = new Cropper(image, options);
                            inputImage.value = null;
                        } else {
                            window.alert('Please choose an image file.');
                        }
                    }
                };
            } else {
                inputImage.disabled = true;
                inputImage.parentNode.className += ' disabled';
            }
        });
    }
});

$('#account_list').DataTable({
    columnDefs: [
        { targets: 0, searchable: false, responsivePriority: 1 },
        { targets: 1, responsivePriority: 2 },
        { targets: -1, orderable: false, searchable: false, responsivePriority: 3 }
    ]
});

$('#application_list').DataTable({
    columnDefs: [
        { targets: 0, searchable: false, responsivePriority: 1 },
        { targets: 1, responsivePriority: 2 },
        { targets: -1, orderable: false, searchable: false, responsivePriority: 3 }
    ]
});

$('#operation_list').DataTable({
    columnDefs: [
        { targets: 0, searchable: false, responsivePriority: 1 },
        { targets: 1, responsivePriority: 2 },
        { targets: -1, orderable: false, searchable: false, responsivePriority: 3 }
    ]
});

$('#role_list').DataTable({
    columnDefs: [
        { targets: 0, searchable: false, responsivePriority: 1 },
        { targets: 1, responsivePriority: 2 },
        { targets: -1, orderable: false, searchable: false, responsivePriority: 3 }
    ]
});