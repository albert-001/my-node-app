function show_users(data, status) {
	if (status!="success") {console.log("error: failed to get data!"); return;}
	for (user of data) {
		let user_li = `<li data-id=${user._id} data-name=${user.name} data-addr=${user.address}>name: ${user.name} address: ${user.address}</li>`;
		$("#data_list").append(user_li);
	}
	$("li").focusout(trigger_update)
		.mouseenter(show_actions)
		.mouseleave(hide_actions);
}

function get_users() {
	let url = "/user"
	$.get(url, show_users);
}

function remove_users() {
	$("#data_list").empty();
}

function refresh_users() {
	remove_users();
	get_users();
}

function add_user(event) {
	let name = $("#name").val();
	let addr = $("#addr").val();
	let url = `/user/add?name=${name}&address=${addr}`;
	$("#result").text("adding")
	$.get(url, function(data, status) {
		if (data!="success" || status!="success") {
			$("#result").text("fail")
		} else {
			refresh_users();
			$("#result").text("success")
		}
	});
}

function trigger_edit(li) {
	let id = li.data("id");
	let name = li.data("name");
	let addr = li.data("addr");
	let user_li = `name: <input type=text value=${name}> address: <input type=text value=${addr}>`;
	li.html(user_li);
}

function trigger_update(event) {
	let li = $(this);
	let id = li.data("id");
	let children =li.find("input");
	let name = children[0].value;
	let addr = children[1].value;
	let user_li = `name: ${name} address: ${addr}`;
	let url = `/user/update?id=${id}&name=${name}&address=${addr}`;
	$("#result").text("updating")
	$.get(url, function(data, status) {
		if (data!="success" || status!="success") {
			$("#result").text("fail")
		} else {
			refresh_users();
			$("#result").text("success")
		}
	});
}

function show_actions(event) {
	let li = $(this);
	let id = li.data("id");
	li.append("<img id=remove src=remove.png width=20px height=20px> <img id=edit src=edit.png width=20px height=20px>");
	li.find("#remove").click(function (event) {
		let url = `/user/remove?id=${id}`;
		$("#result").text("removing")
		$.get(url, function(data, status) {
			if (data!="success" || status!="success") {
				$("#result").text("fail")
			} else {
				refresh_users();
				$("#result").text("success")
			}
		});
	});
	li.find("#edit").click(function (event) {
		trigger_edit(li);
	});
}

function hide_actions(event) {
	let li = $(this);
	li.find("img").remove();
}

function init() {
	get_users();

	$("#add").click(add_user);
}

$("body").ready(init);