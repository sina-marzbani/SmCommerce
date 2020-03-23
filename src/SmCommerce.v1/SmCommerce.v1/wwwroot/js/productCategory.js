var dataTable;

$(document).ready(function () {
    loadDataTable();
    $('#searchTextbox').keyup(function () {
        dataTable.search($(this).val()).draw();
    });
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Admin/ProductCategory/GetList",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "title"
            },
            {
                "data": "displayOrder",
                "width": "11.2%",
                "render": function (data) {
                    return `<div class='text-center text-success'> ${data} </div>`
                }
            },
            {
                "data": "published",
                "render": function (data) {
                    if (data == true) {
                        return "<div class='text-center text-info'><i class='feather icon-check'></div>";
                    } else {
                        return "<div class='text-center text-info'><i class='feather icon-x'></div>";
                    }
                },
                "width": "10%"
            },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class='text-center'>
                                <a onclick=Delete("/Admin/ProductCategory/Delete/${data}") class='text-danger' style='cursor:pointer'><i class='feather icon-trash-2'></i></a>
                                &nbsp;
                                <a href="/Admin/ProductCategory/Upsert/${data}" class='text-warning' style='cursor:pointer'><i class='feather icon-edit-1'></i></a>                                
                            </div>
                            `;
                },
                "width": "7.5%",
                "orderable": false
            }
        ],
        "language": {
            "emptyTable": "اطلاعاتی برای نمایش موجود نمی باشد.",
            "paginate": {
                "next": "بعد",
                "previous": "قبل"
            },
            "info": "نمایش _START_ تا _END_ از _TOTAL_ سطر",
            "loadingRecords": "در حال بارگذاری ...",
            "processing": "در حال پردازش ...",
            "sLengthMenu": "نمایش _MENU_ سطر",
            "infoFiltered": ""
        },
        "width": "100%",
        "order": [],
        "dom": '<"float-left"f>rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>'
    });
}

function Delete(url) {
    // Call the sweetAlert2-function after the page has loaded
    swal.fire({
        title: "Are you sure you want to delete?",
        text: "You will not be able to restore the content!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "delete",
        closeOnConfirm: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: 'DELETE',
                url: url,
                success: function (data) {
                    // Define in controller:
                    // message = new { success = true, text = "Deleted successfully." };
                    if (data.success) {
                        toastr.success(data.text)
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.text)
                    }
                }
            })
        }
    })
}
