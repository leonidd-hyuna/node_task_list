/**
 * Created by leonid on 09.06.16.
 */
$(function() {
    $('#refresh_tasks_list_submit').on('click',function(){getData(); return false;});
    $('#insert_new_task_submit').on('click',function(){addNewTask(); return false;});
    $(document).on('click', 'a.delete_task_submit', function(){deleteTask(this);});
    $(document).on('click', 'a.edit_task_submit', function(){editTask(this);});
});

function refreshData(result) {
    resultData = '<thead>' +
            '<th>id</th>' +
            '<th>Title</th>' +
            '<th>Description</th>' +
            '<th>Date Scheduled</th>' +
            '<th>Date Finished</th>' +
            '<th>Task Actions</th>' +
        '</thead>';
    $.each(result, function (num, row) {
        var deleteButton = "<a class='delete_task_submit btn btn-primary'>Delete</a>";
        var editButton = "<a class='edit_task_submit btn btn-primary'>Edit</a>";
        resultData = resultData
            +'<tr>' +
            '<td class="taskId">'+row.id+'</td>' +
            '<td>'+row.title+'</td>' +
            '<td>'+row.description+'</td>' +
            '<td>'+row.date_scheduled+'</td>' +
            '<td>'+row.date_finished+'</td>' +
            '<td>'+deleteButton+' '+editButton+'</td>' +
            '</tr>';
    });
    $('#taskList').html(resultData);
}

function getData() {
    var ajaxOptions = {
        type: "GET",
        url: '/getTasks',
    };
    $.ajax(ajaxOptions)
        .done(function (data) {
            refreshData(data);
        })
        .fail(function (data) {
//					alertData('fail');
        });
//				.always(function (data) {
//					alertData('always');
//				});
}

function addNewTask() {
    var ajaxOptions = {
        type: "POST",
        url: '/addNewTask',
        data: $("#insert_new_task").serialize(),
    };
    $.ajax(ajaxOptions)
        .done(function (data) {
            getData();
            alert("inserted "+data.affectedRows+" row with id="+data.insertId);
        })
        .fail(function (data) {
//				alertData('fail');
        });
//				.always(function (data) {
//					alertData('always');
//				});
}

function deleteTask(block) {
    var row = $(block).closest("tr"),
        currentId = row.find("td.taskId").text();
    ajaxOptions = {
        type: "DELETE",
        url: '/deleteTask/'+currentId,
    };
    $.ajax(ajaxOptions)
        .done(function (data) {
            getData();
            alert("deleted "+data.affectedRows+" row ");
        })
        .fail(function (data) {
//				alertData('fail');
        });
//				.always(function (data) {
//					alertData('always');
//				});
}

function editTask(block) {
    var row = $(block).closest("tr"),
        currentId = row.find("td.taskId").text();
    ajaxOptions = {
        type: "GET",
        url: '/getTasks/'+currentId,
    };
    $.ajax(ajaxOptions)
        .done(function (data) {
            getData();
            alert("editing "+data+" row ");
        })
        .fail(function (data) {
//				alertData('fail');
        });
//				.always(function (data) {
//					alertData('always');
//				});
}