window.onload = function(){
    
    if(localStorage.getItem('email')==null){
        logout_user(1,1000);
    }

    document.getElementById("SETTINGS_ID_VALUE").innerHTML = localStorage.getItem('Id');
    document.getElementById("SETTINGS_NAME_VALUE").innerHTML = localStorage.getItem('fullname');
    document.getElementById("SETTINGS_EMAIL_VALUE").innerHTML = localStorage.getItem('email');
    document.getElementById("SETTINGS_LOGIN_TYPE_VALUE").innerHTML = localStorage.getItem('login_type').toUpperCase();

    var selected_list = localStorage.getItem('selected');
    if(selected_list==null){
        selected_list = "My Day";
    }
    caches.keys().then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))));

    
    const div_name = ["My Day", "Important", "Planned", "Assigned To Me","Tasks", "Getting Started", "Groceries"];
    const div_id = [];  
    let temp_id;
    let extralist = localStorage.getItem('ExtraLists');
    const icon = ["fa-light fa-sun-bright", "fa-light fa-star", "fa-light fa-book", "fa-light fa-user","fa-light fa-home", "fa-light fa-hands-clapping","fa-light fa-cart-shopping"];
    
    
    if (extralist!=null){
        const m = extralist.split("#;#");
        for(i=0; i<m.length-1;i++){
            div_name.push(m[i]);
            icon.push("fa-light fa-bars newicon");
        }
    }

    for (i = 0 ; i<div_name.length;i++){
        temp_id = conv_name_to_id(div_name[i]);
        div_id.push(temp_id);
    }
    
    
    for (i = 0; i<div_id.length; i++){
        user_list = div_name[i];
        let user_inner_td = user_list + "_inner_td";
        let user_div = div_id[i];
        let user_class = user_div;
        // let icon;
        if (icon[i] == "fa-light fa-bars newicon"){
            user_class += " new_list";
        }
        else{
            user_class += " predefined_list";
        }
        
        let span_id = conv_name_to_span(div_name[i]);

        let code = '<tr>'+  
            '<td class="inner_td" id="'+user_inner_td+'">'+
                '<div class="'+user_class+' sectiondiv" id="'+user_div+'" onclick="btnclicked(this);">'
                    +'<i class="'+icon[i]+' myicon" ></i>'+
                    '<span class="textspan" id = "'+span_id+'">'+user_list+'</span>'+
                '</div>'+
            '</td>'+
        '</tr>';

        document.getElementById('all_list').innerHTML += code;
    }

    document.getElementById(conv_name_to_id(selected_list)).className += " selected";
    document.getElementById("disp_name").innerHTML = localStorage.getItem("fullname");
    document.getElementById("disp_email").innerHTML = localStorage.getItem("email");

    document.getElementById("add_task_td").innerHTML+="<i class = 'fa-sharp fa-light fa-paper-plane-top' id = 'sendicon' onclick = 'add_task();'></i>";

    show_task_region(selected_list, "-");

    set_pfp();
    open_context_menu();

};

// ONLOAD FUNCTION COMPLETED

function set_pfp(){
    var pfp = localStorage.getItem('pfp');
    pfp = pfp.replaceAll(" ","+");
    document.getElementById('test_img').src = pfp;
    document.getElementById('pfp').src = pfp;
}

// SET PFP ADDS PROFILE IMAGE

function open_context_menu(){
    const contextMenu = document.getElementById('context_menu');
    const myscope = document.getElementsByClassName("new_list");
    const predefined_list = document.getElementsByClassName('predefined_list');
    const incomplete_task_li = document.getElementsByClassName('incomplete_task_li');
    const predef_context_menu = document.getElementById('Note_Context_Menu');
    const completed_task_li = document.getElementsByClassName('completed_task_li');
    const list_menu = document.getElementById('li_menu');

    for(i = 0; i<myscope.length;i++){
        if (myscope[i].id != "new_list_div"){
            myscope[i].addEventListener('contextmenu', (event) => {
                event.preventDefault();
                if(event.target.className.includes('sectiondiv')){
                    document.getElementById('listclicked').value = event.target.id;
                }
                else{
                    document.getElementById('listclicked').value = event.target.offsetParent.id;
                }
                const {clientX: mouseX, clientY: mouseY} = event;
                contextMenu.style.top = `${mouseY}px`;
                contextMenu.style.left = `${mouseX}px`;
                contextMenu.style.display = "block";
                predef_context_menu.style.display = "none";
                list_menu.style.display= "none";
            });
        }
    }
    

    for(i = 0; i<predefined_list.length;i++){
        if (predefined_list[i].id != "new_list_div"){
            predefined_list[i].addEventListener('contextmenu', (event) => {
                event.preventDefault();
                
                const {clientX: mouseX, clientY: mouseY} = event;
                predef_context_menu.style.top = `${mouseY}px`;
                predef_context_menu.style.left = `${mouseX}px`;
                contextMenu.style.display = "none";
                list_menu.style.display = "none";
                predef_context_menu.style.display = "block";
            });
        }
    }



    for(i=0;i<incomplete_task_li.length;i++){
        incomplete_task_li[i].addEventListener("contextmenu", (event) => {
            event.preventDefault();
            const {clientX: mouseX, clientY: mouseY} = event;
            list_menu.style.top = `${mouseY}px`;
            list_menu.style.left = `${mouseX}px`;
            list_menu.style.display = "block";
            contextMenu.style.display = "none";
            predef_context_menu.style.display = "none";
            document.getElementById('taskclicked').value = event.target.id + "#C";
        });
    }

    for(i=0;i<completed_task_li.length;i++){
        completed_task_li[i].addEventListener("contextmenu", (event) => {
            event.preventDefault();
            const {clientX: mouseX, clientY: mouseY} = event;
            list_menu.style.top = `${mouseY}px`;
            list_menu.style.left = `${mouseX}px`;
            list_menu.style.display = "block";
            contextMenu.style.display = "none";
            predef_context_menu.style.display = "none";
            document.getElementById('taskclicked').value = event.target.id + "#IC";

        });
    }
    
    document.querySelector("body").addEventListener('click', (e) => {
        if(e.target.offsetParent != contextMenu || e.target.offsetParent != predef_context_menu || e.target.offsetParent!=list_menu){
            contextMenu.style.display = "none";
            predef_context_menu.style.display = "none";
            list_menu.style.display = "none";
        }
    });

    document.querySelector("body").addEventListener("contextmenu", (e)=>{
        e.preventDefault();
    });
}

// CONTEXT MENU-- RIGHT CLICKING TO RENAME AND DELETE

function add_list_to_db(){
    let extralist = localStorage.getItem('ExtraLists');
    let email_id = localStorage.getItem('email');
    fetch("ExtraListDatabase.php", {
        method : "POST",
        headers :{
            "Content-Type": "application/x-www-form-urlencoded; charset = UTF-8",
        },
        body: `extralists='${extralist}'&email=${email_id}`,

    }).then((response)=>response.text)
    .then((res)=>(console.log(res)));
}
// ADDING LIST TO DATABASE FROM LOCALSTORAGE
 

function delete_list(){
    let contextMenu = document.getElementById('context_menu');
    contextMenu.style.display = "none";
    let selected_list = document.getElementById('listclicked').value;
    let listname = conv_id_to_name(selected_list.slice(0,-4));
    let mytext = document.createElement('span');
    mytext.innerHTML = "Are You Sure You Want to Delete This List?<br>List Name = "+listname;
    mytext.className = "delete_text_span_swal";
    Swal.fire({
        title: "List Deletion",
        html: mytext,
        showConfirmButton: true,
        showCancelButton: true,
        focusCancel: true,
        focusConfirm: false,
        confirmButtonText: "Delete",
        cancelButtonText: "Revert"
    }).then((result)=>{
        if (result.isConfirmed){

            let extralist = localStorage.getItem('ExtraLists');
            let to_be_deleted_list_name = listname+"#;#";
            extralist = extralist.replace(to_be_deleted_list_name, "");
            localStorage.setItem('ExtraLists', extralist);
            let delete_id = conv_name_to_id(listname);
            document.getElementById(delete_id).style.display = "none";
            document.getElementById(delete_id).className = "";
            document.getElementById(delete_id).id = "";

            add_list_to_db();
        
        }
    });
}
// DELETE LIST


function rename_list(){
    let selected_list = document.getElementById('listclicked').value;
    let get_list = conv_id_to_name(selected_list.slice(0,-4));
    let mytext = document.createElement('span');
    mytext.innerHTML = "Enter New List Name:<br>Original List Name = "+get_list;
    mytext.className = "delete_text_span_swal";
    
    let {value:listname} = Swal.fire({
        title: "Rename",
        html: mytext,
        input: "text",
        inputPlaceholder: "Enter List Name",
        inputValidator: (listname) => {
            let user_id = conv_name_to_id(listname);
            let div_id = getdivs();
            if(!listname || div_id.includes(user_id) == true) {
                if(!listname){
                    return "Enter List Name";
                }
                else{
                    return "List Already Exists";
                }
            }

            else{
                let extralist = localStorage.getItem('ExtraLists');
                extralist = extralist.replace(get_list, makename(listname));
                localStorage.setItem("ExtraLists", extralist);
                let span_id = conv_name_to_span(get_list);
                document.getElementById(span_id).innerHTML = makename(listname);
                add_list_to_db();
            }

        },
        showConfirmButton: true,
        showCancelButton: true,
        focusCancel: true,
        focusConfirm: false,
        confirmButtonText: "Rename",
        cancelButtonText: "Cancel"
    });


}
// RENAME LIST


function conv_id_to_name(user_name){
    const mySentence = user_name;
    const words = mySentence.split("_");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let x = words.join(" ");
    return x;
}
// CONVERT ANY ID TO NAME


function conv_name_to_id(div_name){
    let div_id;
    div_id = div_name.replace(" ", "_");
    div_id = div_id.toLowerCase();
    div_id+="_div";
    return div_id;

}
// CONV LIST NAME TO DIV-ID


function conv_name_to_span(div_name){
    let div_id;
    div_id = div_name.replace(" ", "_");
    div_id = div_id.toLowerCase();
    div_id+="_span";
    return div_id;
}
// CONVERT LIST NAME TO SPAN-ID


function makename(user_name){
    const mySentence = user_name;
    const words = mySentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    const x = words.join(" ");
    return x;
}
// CONVERTS LISTNAME TO STANDARD FORMAT(CAPITALIZE FIRST LETTER OF EACH WORD)



function add_new_list_td(user_list){
    let user_inner_td = user_list + "_inner_td";
    let user_div = conv_name_to_id(user_list);
    let user_name = makename(user_list);
    let code = '<tr>'+  
        '<td class="inner_td" id="'+user_inner_td+'">'+
            '<div class="'+user_div+' sectiondiv new_list" id="'+user_div+'" onclick="btnclicked(this)">'
                +'<i class="fa-light fa-bars myicon newicon" ></i>'+
                '<span class="textspan">'+user_name+'</span>'+
            '</div>'+
        '</td>'+
    '</tr>';

    document.getElementById('all_list').innerHTML += code;

    let extralist = localStorage.getItem('ExtraLists');
    extralist+=user_name+"#;#";
    localStorage.setItem('ExtraLists', extralist);
    open_context_menu();
    add_list_to_db();


}

// ADDING NEW LIST COLOUMN INTO LEFT SIDE AREA


function getdivs(){
    
    let div_id = [];
    let all_lists = document.getElementsByClassName('sectiondiv');
    for(i = 0 ; i<all_lists.length-1;i++){
        div_id.push(all_lists[i].id);
    }

    return div_id;
    
}

// FIND ALL DIVS ON LEFT SIDE


function btnclicked(data){
    let div_id = getdivs();
    let divtag;

    for (i = 0; i<div_id.length; i++){
        divtag = document.getElementById(div_id[i]).className;
        if (divtag.includes("selected")==true){
            document.getElementById(div_id[i]).className = div_id[i] + " sectiondiv";
        }
    }

    data.className+= " selected";
    let listname = conv_id_to_name(data.id);
    show_task_region(listname.slice(0,-4),"-");
}

// LEFT SECTION CLICKED


function new_list_check(listname){
    disp_name = makename(listname);
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
        });
        Toast.fire({
            icon: 'success',
            title: disp_name + " Created"
        });

        add_new_list_td(listname);

}

// CHECKING IF NEW LIST ALREADY EXISTS OR NOT


function addnewlist(){
    let {value:listname} = Swal.fire({
        title: "Add New List",
        showConfirmButton: true,
        input: "text",
        inputPlaceholder: "Enter List Name",
        showCancelButton: true,
        inputValidator: (listname) => {
            let user_id = conv_name_to_id(listname);
            let div_id = getdivs();
            if(!listname || div_id.includes(user_id) == true) {
                if(!listname){
                    return "Enter List Name";
                }
                else{
                    return "List Already Exists";
                }
            }
            else{
                new_list_check(listname);
            }
        }
    });
    
    
}

// ADDS NEW LIST IF IT DOES NOT EXIST PREVIOUSLY



function logout_user(i, mytimer){

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: mytimer,
        timerProgressBar: true,
    });

    if(i==0){
        let Cookies = document.cookie.split(';');
         for (let i = 0; i < Cookies.length; i++)
         {
            document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
         }
        localStorage.clear();
        Toast.fire({
            title: "Clearing Up Work",
            icon: "success",
        });
    }
    else{
        Toast.fire({
            title: "User Not Found Try Logging In Again",
            icon: "error",
        });
    }
    setTimeout(function(){
        var url = window.location.href;
        url = url.replace("index.html", "login.php");
        window.location.assign(url);
    },mytimer+1000);
}

// LOGGING OUT USER


function make_logout_title(){
    let logout_title = document.createElement("h4");
    logout_title.innerHTML = "LOGOUT";
    logout_title.style.fontSize = "20px";
    logout_title.style.fontFamily ="cursive";
    logout_title.style.width = "120px";
    logout_title.style.position = "relative";
    logout_title.style.left = "39%";
    logout_title.style.letterSpacing = "2px";
    logout_title.style.textAlign = "center";
    logout_title.style.marginBottom = "-15px";
    logout_title.style.borderBottom = "2px solid black";
    return logout_title;
}
// MAKE LOGOUT TITLE


function createbutton(text, id, fnc){
    let btn = document.createElement('button');
    btn.className = 'swalbtn';
    btn.innerHTML = text;
    btn.id = id;
    btn.onclick = fnc;
    return btn;
}

// CREATES BUTTON FOR DISP-FULL-PIC-FUNCTION


function add_img_to_database(dataURL){
    let email_id = localStorage.getItem('email');
    fetch("NewImageDatabase.php", {
        method : "POST",
        headers :{
            "Content-Type": "application/x-www-form-urlencoded; charset = UTF-8",
        },
        body: `image_url='${dataURL}'&email=${email_id}`,

    }).then((response)=>response.text)
    .then((res)=>(console.log(res)));
}
// ADDS IMAGE TO DATABASE


function changePFP(){
    Swal.fire({
        title: 'Select image',
        input: 'file',
        inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
        }
    }).then((myresult)=>{
        if (myresult.value) {
            let file = myresult.value;
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                let dataURL = event.target.result;
                document.getElementById('pfp').src = dataURL;
                localStorage.setItem('pfp',dataURL);
                add_img_to_database(dataURL);

            });
            
            reader.readAsDataURL(file);
        }
        else{
            console.log("Error Uploading File");
        }
    });
    
    
}

// CHANGES PROFILE PIC OF USER


function disp_full_pic(){
    let logout_title = make_logout_title();
    let logout_text = "Are You Sure You Want To Logout?";
    let mydiv = document.createElement('div');
    mydiv.className = 'mybuttons_div';
    
    b1 = createbutton('Change Picture', 'change_pic_btn_swal', function() {
        changePFP();
        console.log('Change Pic');
    });

    b2 = createbutton('Logout','logout_btn_swal', function(){
        Swal.fire({
            title: logout_title,
            text: logout_text,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel",
            focusCancel: true,
            icon: "warning",
            focusConfirm: false,
        }).then((result2)=>{
            if (result2.isConfirmed){logout_user(0,4000);}
        });
    });

    b3 = createbutton('Cancel','cancel_btn_swal', function(){
        Swal.close();
    });

    let image = document.createElement('img');
    image.src = document.getElementById('pfp').src;
    image.className = "full_pic";
    image.id = "full_pic";
    image.alt = "Full Profile Pic";

    mydiv.appendChild(image);
    mydiv.appendChild(document.createElement('br'));

    mydiv.appendChild(b1);
    mydiv.appendChild(b2);
    mydiv.appendChild(document.createElement('br'));
    mydiv.appendChild(b3);


    Swal.fire({
        showConfirmButton: false,
        html: mydiv,
        showCancelButton: false,
        background: "transparent",
    });
}

// ON-CLICKING USER PROFILE





// MAIN WORK... ADDING TASKS


function heading_clicked(data){
    Swal.fire({
        title: "<span id = 'heading_swal'>"+data.innerHTML+"</span>",
    });
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    return null;
}

function get_tasks_from_db(){
    
    let selected_region = localStorage.getItem('selected');
    var email = localStorage.getItem('email');

    jQuery.ajax({
        type : 'POST',
        data : {'email': email, 'selected_region' : selected_region},
        dataType: "html",
        url: "GetTasksDatabase.php",
        success : function(d){
            let task;
            let data = d.split('||');
            let record = data[0];
            if (record == "1"){
                let incomplete_task = data[1];
                let completed_task = data[2];
                let inc_task_id = data[3];
                let com_task_id = data[4];
                task = [completed_task, incomplete_task,inc_task_id,com_task_id];
            }
            else{
                task = "0";
            }
            show_task_region(selected_region, task);
        }
        
    });
}




function show_task_region(selected_region,task){
    if (task!="-"){

        document.getElementById('show_tasks').innerHTML = "";

        let task_heading_div = document.createElement("div");
        task_heading_div.id = "task_heading_div";
        task_heading_div.className = "task_heading_div";
        task_heading_div.innerHTML = "<p id = 'task_heading_para' onclick = 'heading_clicked(this)'>"+selected_region+"</p>";
        
        document.getElementById('show_tasks').appendChild(task_heading_div);

        let task_holder_div = document.createElement("div");
        task_holder_div.className = "task_holder_div";
        
        let incomplete_ul_code = "<ul  id = 'incomplete_task_ul' class = 'incomplete_task_ul'><center><div id = 'to_be_added_task'></div>";
        let completed_ul_code = "<ul id = 'incomplete_task_ul' class = 'completed_task_ul'><center>";

        if (task!= "0"){
            var completed_task = task[0].split("#;#");
            var incomplete_task = task[1].split("#;#");
            var inc_task_id = task[2].split("#;#");
            var com_task_id = task[3].split("#;#");
            console.log();
    
            // CREATING INCOMPLETE TASKS LIST
            let li_code = "";
            for (i=0;i<incomplete_task.length-1;i++){
                li_code += "<li class = 'incomplete_task_li' id ='"+inc_task_id[i]+"' onclick = 'li_clicked(this);'>"+incomplete_task[i]+"</li>";
            }
    
            incomplete_ul_code +=li_code+"</center></ul>";
            task_holder_div.innerHTML = incomplete_ul_code;
    
            // CREATING COMPLETED TASKS LIST
    
            li_code = "";
            for (i=0;i<completed_task.length-1;i++){
                li_code += "<li class = 'completed_task_li' id = '"+com_task_id[i]+"' onclick = 'li_clicked(this);'>"+completed_task[i]+"</li>";
            }
    
            completed_ul_code += li_code+"</center></ul>";
            task_holder_div.innerHTML += completed_ul_code;
            document.getElementById('show_tasks').appendChild(task_holder_div);
            open_context_menu();
    
        }
        else{
            incomplete_ul_code += "</center></ul>";
            completed_ul_code += "</center></ul";
            task_holder_div.innerHTML += incomplete_ul_code+completed_ul_code;
            document.getElementById('show_tasks').appendChild(task_holder_div);
        }
    }
    else{
        localStorage.setItem('selected',selected_region);
        get_tasks_from_db();
    }

    
    
}

function add_task(){
    // var selected_region = localStorage.getItem('selected');
    var incomplete_task = document.getElementById('add_task_input').value;
    incomplete_task = incomplete_task.trim();
    if (incomplete_task != ""){
        var to_be_added_task = document.getElementById('to_be_added_task');

        jQuery.ajax({
            url : 'addTaskDatabase.php',
            type: 'POST',
            dataType: 'html',
            data : {
                'email' : localStorage.getItem('email'), 
                'section': localStorage.getItem('selected'), 
                'id' : localStorage.getItem('Id'),
                'task' : incomplete_task
            },
            success(e) {
                var task_id = e;
                console.log(e);
                var li_code = "<li class = 'incomplete_task_li' id='"+task_id+"'onclick = 'li_clicked(this);'>"+incomplete_task+"</li>";
                to_be_added_task.innerHTML = li_code+to_be_added_task.innerHTML;
        
                document.getElementById('add_task_input').value = "";
        
                open_context_menu();
            }
        });
        
    }
}

function enter_input(event){
    if (event.key == "Enter"){
        add_task();
    }
}

function li_clicked(data){

    if(data.className == "incomplete_task_li"){
        data.className = "completed_task_li";
        updateDBValues(data,"C");
    }
    else{
        data.className = "incomplete_task_li";
        updateDBValues(data, "IC");
    }
}


function updateDBValues(data, status){
    var selected_region = localStorage.getItem('selected');
    var email = localStorage.getItem('email');
    var task_id = data.id;
    jQuery.ajax({
        type : 'POST',
        data : {'email': email, 'selected' : selected_region, 'task' : data.innerHTML ,'status': status, 'task_id': task_id},
        dataType: "html",
        url: "updateDatabaseValues.php",
        success : function(d){
            console.log(d);
        }
    });
}


function delete_task(){
    var selected_list = document.getElementById('taskclicked').value;
    var task_id = selected_list.split("#")[0];
    var status = selected_list.split("#")[1];
    Swal.fire({
        title: "Task Deletion",
        text: document.getElementById(task_id).innerHTML+' will be deleted permanently',
        showConfirmButton: true,
        showCancelButton: true,
        focusCancel: true,
        focusConfirm: false,
        confirmButtonText: "Delete",
        cancelButtonText: "Revert"
    }).then((result)=>{
        if (result.isConfirmed){
            document.getElementById(task_id).style.display= "none";
            jQuery.ajax({
                type: 'POST',
                url : 'deleteTaskDatabase.php',
                dataType: 'html',
                data : {
                    'email' : localStorage.getItem('email'),
                    'section' : localStorage.getItem('selected'),
                    'task_id' : task_id,
                },
                success (e){
                    console.log(e);
                }
            });
        }
    });
}

function open_settings(){
    Swal.fire({
        html : document.getElementById('settings_div').innerHTML,
        width: "80%",
        showConfirmButton: false,
        showCancelButton : false
    });
}

function copy_id(event){
    
    var id = localStorage.getItem('Id');
    navigator.clipboard.writeText(id);
    var copied_div = document.getElementById('copied_div');
    copied_div.style.display = "block";
    console.log(event);
    copied_div.style.top = 160+"px";
    copied_div.style.left = event.clientX+"px";
    window.setTimeout(function(){
        copied_div.style.display = "none";
    },2000);
}

function edit_name(){

}