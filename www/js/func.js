 //$get_favs_array = localStorage.removeItem("favs");
 $(document).on('click', '.t_show', function() {
    if ($(".t_id").val() !== "") {
      $(".preloader").fadeIn();
      $t_id = $(".t_id").val();
      var favs = JSON.parse(localStorage.getItem("favs") || "[]");
      console.log("# of favs: " + favs.length);
      favs.forEach(function(fav, index) {
        console.log("[" + index + "]: " + fav.id);
      });
      //localStorage.checked_tickets =+ $t_id; alert($t_id);
      var url = "https://hasangad.com/support/api/?Ticket_id=" + $t_id;
      //alert(url);
      $.getJSON(url, function(tick) {
        //alert("test"); console.log(result);
        $("#main_page .posts").html("");
        $("#main_page .posts").append('<div class="col-xs-12"><h2>' + tick['ticket'].title + '</h2><span class="btn btn-warning">' + tick['ticket'].status + '</span></div>');
        $.each(tick['comment'], function(i, comment) {
          //alert('inside comments');
          $("#main_page .posts").append('<div class="col-xs-12 comment"><h2>' + comment.c_date + '</h2><p>' + comment.content + '</p></div>');
        });
        $("#main_page .posts").append('<div class="col-xs-12"><p>' + tick['ticket'].content + '</p></div>');
        $CheckExistsFavs = favs.indexOf($t_id);
        //alert($CheckExistsFavs);
        if ($CheckExistsFavs == -1) {
          favs.push($t_id);
          // Saving
          localStorage.setItem("favs", JSON.stringify(favs));
          //alert(localStorage.getItem("favs"));
        }
        $(".preloader").fadeOut();
      });
    }
  });
  $(document).ready(function() {
    // Check of user logged in before and stored by webstorage
    $storedName = localStorage.getItem('login_is');
    $storedPw = localStorage.getItem('pass_is');
    $storedID = localStorage.getItem('u_id');
    //alert($storedName);
    if ((($storedName !== "") && ($storedPw !== "")) && (($storedName !== null) && ($storedPw !== null))) {
      //alert('You are loged in.');
      $(".login_success").html("مرحباً بعودتك / " + $storedName);
      $(".login_success").fadeIn("1000");
      $(".login_form").hide();
      $(".logged_in").show();
      $("#logout").show();
      // Get Tickets
      var dataString = "get_tickets=true&user=" + $storedID;
      var url_user_tickets = "https://hasangad.com/support/api/?" + dataString;
      $.getJSON(url_user_tickets, function(u_ticks) {
        $.each(u_ticks, function(i, tr) {
          //alert('inside comments'); $(".logged_in table tbody").append('<tr><td><a datalink="" onclick="notify(' + tr.td_id + ')">' + tr.name + '</a></td></tr>');
          $(".logged_in table.u_ticks tbody").append(tr.tr);
        });
        //  $("#main_page .posts").append('<div class="col-xs-12"><h2>' + tick['ticket'].title + '</h2><span class="btn btn-warning">' + tick['ticket'].status + '</span></div>');
      });
    }
    /*else {
              alert('ERROR.');
            }*/
    ////////////// Login Form /
    $("#logout").click(function() {
      localStorage.login_is = "";
      localStorage.pass_is = "";
      localStorage.u_id = "";
      window.location.href = "index.html";
    });
    $("#login").click(function() {
      //debugger;
      $("#login").html('جار التحقق ...');
      var user = $(".user").val();
      var pass = $(".pass").val();
      //var MobileToken = localStorage.MobileToken;
      var MobileToken = localStorage.MobileToken;
      //alert(MobileToken);
      //alert(user);
      //var dataString = "user=" + user + "&pass=" + pass + "&login=";
      var dataString = "user=" + user + "&pass=" + pass + "&UpdateMobileToken=" + MobileToken;
      var url2 = "https://hasangad.com/support/api/?" + dataString;
      //debugger;
      $.getJSON(url2, function(login) {
        //debugger;
        //alert("test");
        console.log(login);
        $login_status = login.status;
        $MobileTokenDB = login.MobileTokenDB;
        $MobileTokenStatus = login.MobileTokenStatus;
        $u_id = login.u_id;
        if ($login_status == true) {
          // REFRENCE : https://www.w3schools.com/html/html5_webstorage.asp https://www.w3schools.com/jsref/prop_win_localstorage.asp
          localStorage.login_is = user;
          localStorage.pass_is = pass;
          localStorage.u_id = $u_id;
          //alert("Login Success");
          $(".login_form").stop().slideToggle();
          $(".login_success").fadeIn("1000");
          $("#logout").slideDown("1000");
          var url_user_tickets = "https://hasangad.com/support/api/?get_tickets=true&user=" + $u_id;
          $.getJSON(url_user_tickets, function(u_ticks) {
            $.each(u_ticks, function(i, tr) {
              //alert('inside comments');
              $(".logged_in table.u_ticks tbody").append(tr.tr);
              $(".logged_in").fadeIn("1000");
            });
          });
          //$(".login_success").fadeOut("3000");
        } else if ($login_status == false) {
          $("#login").html('تسجيل الدخول');
        }
        //  $("#main_page .posts").append('<div class="col-xs-12"><h2>' + tick['ticket'].title + '</h2><span class="btn btn-warning">' + tick['ticket'].status + '</span></div>');
      });
      // https://codesundar.com/lesson/phonegap-login-system-using-php-mysql/
      /*  if (user.length > 0 & pass.length > 0) {
        //  alert("Now Ajax");
        $.ajax({
          type: "GET",
          url: url,
          data: dataString,
          crossDomain: true,
          cache: false,
          beforeSend: function () {
            $("#login").html('Connecting...');
          },
          success: function (data) {
            console.log(data);
            if (data == "success") {
              localStorage.login = "true";
              localStorage.email = user;
              //localStorage.email = email;
              window.location.href = "index.html";
            } else if (data = "failed") {
              console.log(data);
              //alert("Login error");
              $("#login").html('Login');
            }
          }
        }).done(function (data) {
          //alert("Done");  }
        });
      }
      return false;*/
    });
    ///////////////////////////////////////
    $(".main_menu a i").click(function() {
      $(".main_menu a i").css({
        "color": "#888888"
      });
      $(this).css({
        "color": "#FFBD54"
      });
    });
    $(".skip_to_home").click(function() {
      $(".splash").animate({
        "right": "-100%"
      });
    });
    $(".login_link").click(function() {
      $(".login_form").stop().slideToggle();
      $(".check_ticket_by_number").slideUp();
      $(".logged_in").slideUp();
      $(".about").slideUp();
      $(".favs").slideUp();
      $(".posts").html("");
    });
    $(".search_link").click(function() {
      $(".login_form").slideUp();
      $(".about").slideUp();
      $(".favs").slideUp();
      $(".logged_in").slideUp();
      $(".check_ticket_by_number").stop().slideToggle();
      $(".posts").html("");
    });
    $(".show_about").click(function() {
      $(".about").stop().slideToggle();
      $(".favs").slideUp();
      $(".logged_in").slideUp();
      $(".check_ticket_by_number").slideUp();
      $(".login_form").slideUp();
      $(".posts").html("");
    });
    $(".show_favorites").click(function() {
      $(".favs").stop().slideToggle();
      $(".about").slideUp();
      $(".logged_in").slideUp();
      $(".check_ticket_by_number").slideUp();
      $(".login_form").slideUp();
      $(".posts").html("");
      $get_favs_array = localStorage.getItem("favs");
      if ($get_favs_array !== "" || $get_favs_array !== null) {
        $new_favs = $.parseJSON($get_favs_array);
        if ($new_favs !== null) {
          $.each($new_favs, function(i, fav) {
            //alert(fav);
            var url = "https://hasangad.com/support/api/?Ticket_id=" + fav;
            //alert(url);
            $(".favs table tbody").html("");
            $.getJSON(url, function(tick) {
              //alert("test"); console.log(result); $u_fake_id = $storedID * 2; alert($u_fake_id);  alert(fav); $fav_is = fav;
              $(".favs table.u_ticks tbody").append(
                '<tr><td><a href="#" data-link="' + fav + '" class="ticket_link" onclick="notify(' + fav + ')">' + tick['ticket'].title + '</a></td><td><span class = "btn btn-warning" > ' + tick['ticket'].status +
                '</span></td></tr> '
              );
            });
          });
        }
      }
    });
    $(".preloader").fadeOut(500);
  });
  // https://stackoverflow.com/questions/6466135/adding-extra-zeros-in-front-of-a-number-using-jquery
  function pad(str, max) {
    str = str.toString();
    return str.length < max ?
      pad("0" + str, max) :
      str;
  }

  function notify(T_id_is) {
    //console.log(T_id_is); debugger; alert("clicked"); $(".ticket_link").on("click", notify); alert('test'); alert(T_id_is);
    $fav_is = pad(T_id_is, 7);
    //alert($fav_is);
    if ($fav_is !== "") {
      $(".preloader").fadeIn();
      $t_id = $fav_is;
      var url = "https://hasangad.com/support/api/?Ticket_id=" + $t_id;
      $.getJSON(url, function(tick) {
        $("#main_page .posts").html("");
        $("#main_page .posts").append('<div class="col-xs-12"><h2>' + tick['ticket'].title + '</h2><span class="btn btn-warning">' + tick['ticket'].status + '</span></div>');
        $.each(tick['comment'], function(i, comment) {
          $("#main_page .posts").append('<div class="col-xs-12 comment"><h2>' + comment.c_date + '</h2><p>' + comment.content + '</p></div>');
        });
        $("#main_page .posts").append('<div class="col-xs-12 main_ticket"><p>' + tick['ticket'].content + '</p></div>');
        $(".preloader").fadeOut();
      });
    }
  }
  $(document).on('click', '#ticket_link', function() {
    $t_id_from_link_data = $(this).data('link');
    notify($t_id_from_link_data);
  });