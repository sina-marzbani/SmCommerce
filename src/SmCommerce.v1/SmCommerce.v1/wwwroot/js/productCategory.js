var dataTable;

$(document).ready(function () {
    loadDataTable();
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
                "data": "name",
                "width": "50%"
            },
            {
                "data": "displayOrder",
                "width": "20%"
            },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class='text-center'>
                                <a href="/admin/category/Upsert/${data}" class='btn btn-success text-white' style='cursor:pointer;width:100px'>
                                    <i class='far fa-edit'></i> Edit
                                </a>
                                &nbsp;
                                <a onclick=Delete("/admin/category/Delete/${data}") class='btn btn-danger text-white' style='cursor:pointer;width:100px'>
                                    <i class='far fa-trash-alt'></i> Delete
                                </a>
                            </div>
                            `;
                },
                "width": "30%"
            }
        ],
        "language": {
            "emptyTable": "No records found."
        },
        "width": "100%"
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
