document.addEventListener('DOMContentLoaded',() => {
  var basic = "";
  var salad = "";
  var s_p = "";
  var total = 0;
  var t = 0;
  var what_amount="";
  var order_things = "";
  var id_num = 0;
  var delete_buttons = document.querySelectorAll('.delete');

  // display pizza menu modal
  var divs = document.querySelectorAll('#basic_price');
  [].forEach.call(divs, function(div){
    div.onclick = () => {
      basic_modal.style.display = "block";
      basic = div.dataset.basic;
      var display_price = div.dataset.price;
      var small = document.getElementById('small');
      small.innerHTML = "$" + display_price;
      var price_number = Number(display_price) + 5.29;
      var big = document.getElementById('big');
      big.innerHTML = "$" + price_number;
    };
  });

  // display salad menu modal
  divs = document.querySelectorAll('#salad_price');
  [].forEach.call(divs, function(div){
    div.onclick = () => {
      salad_modal.style.display = "block";
      salad = div.dataset.salad;
      var display_salad = document.getElementById('salad');
      display_salad.innerHTML = salad;
      var display_price = div.dataset.price;
      s_p = display_price;
      var salad_price = document.getElementById('s_price');
      salad_price.innerHTML = "$" + display_price;
    };
  });

  // display login modal
  divs = document.querySelectorAll('#login');
  [].forEach.call(divs, function(div){
    div.onclick = () => {
      authenticate[0].style.display = "block";
    };
  });
  // display register modal
  divs = document.querySelectorAll('#register');
  [].forEach.call(divs, function(div){
    div.onclick = () => {
      authenticate[1].style.display = "block";
    };
  });
  // display confirm modal
  divs = document.querySelectorAll('#confirm_button');
  [].forEach.call(divs, function(div){
    div.onclick = () => {
      const food = document.querySelectorAll('.food');
      if (food.length != 0){
        var b = document.querySelector('#total_amount');
        var c = document.createElement('p');
        c.innerText = b.innerText;
        const d = document.querySelector('#total_amount_confirm');
        d.append(c);
        confirm_modal.style.display = "block";
        for (i=0; i<food.length; i++){
          var a = food[i].innerText;
          a = a.replace(/🗑/g, "");
          var p = document.createElement('p');
          p.innerText = a;
          var confirm_area = document.querySelector('#confirm_place');
          confirm_area.append(p);
        }
      }
      else{
        window.alert("You haven't order anything!");
      }

    };
  });

  // close icon to close modal
  var spans = document.querySelectorAll(".close");
  [].forEach.call(spans, function(span){
    span.onclick = () =>{
      basic_modal.style.display = "none";
      salad_modal.style.display = "none";
      authenticate[0].style.display = "none";
      authenticate[1].style.display = "none";
      confirm_modal.style.display = "none";
      salad = "";
      basic = "";
      var confirm_area = document.querySelector('#confirm_place');
      confirm_area.innerHTML = '';
      var d = document.querySelector('#total_amount_confirm');
      d.innerHTML ='';
    };
  });
  // click else where to close modal
  var modals = document.querySelectorAll('.modal');
  [].forEach.call(modals, function(modal){
    window.onclick = (event) => {
      if (event.target == basic_modal) {
        basic_modal.style.display = "none";
        basic = "";
      }
      if (event.target == salad_modal) {
        salad_modal.style.display = "none";
        salad = "";
      }
      if (event.target == authenticate) {
        authenticate[0].style.display = "none";
        authenticate[1].style.display = "none";
        }
      if (event.target == confirm_modal) {
        confirm_modal.style.display = "none";
        var confirm_area = document.querySelector('#confirm_place');
        confirm_area.innerHTML = '';
        var d = document.querySelector('#total_amount_confirm');
        d.innerHTML ='';
      }
    };
  });

  // Add to cart & Remove from cart
    // add beverage, subs, pastas
  var directs = document.querySelectorAll('#direct');
  [].forEach.call(directs, function(direct){
    direct.onclick = () =>{
      id_num++;
      var thing = direct.dataset.thing;
      var price = direct.dataset.price;
      const p = document.createElement('p');
      p.innerHTML = thing + " " + "$" + price;
      p.className = "food";
      p.id=id_num;
      document.querySelector('#order_place').append(p);
      total = total + parseFloat(price);
      t = total.toFixed(2);
      show_total();
      create_delete_button(p, id_num);
      remove();
    }
  });


  // add pizza or salad
  var btns = document.querySelectorAll('.order_btn');
    [].forEach.call(btns,function(btn){
      btn.onclick = () =>{
        // close small window
        basic_modal.style.display = "none";
        salad_modal.style.display = "none";
        // add pizza
        if (basic != ""){
          what_amount = "pizza";
          var size = document.querySelector('input[name="size"]:checked').value;
          var price = document.getElementById(size);
          price = price.innerHTML;
          if (size != ""){
            const p = document.createElement('p');
            id_num++;
            p.innerHTML = basic +" "+ size +" "+ price + "  ";
            p.className = "food";
            p.id = id_num;
            document.querySelector('#order_place').append(p);
            var price = price.match(/\d+.\d+/g).map(Number);
            t = parseFloat(price[0]);
            show_amount(id_num);
            create_delete_button(p, id_num);
            remove();
          }
          // show toppings/addings
          add_thing(id_num);
          show_notes(id_num);
          show_total();
          basic = "";
        }

      // show salad
      if (salad != ""){
        id_num++;
        what_amount = "salad_amount";
        const p = document.createElement('p');
        p.innerHTML = salad +"$ "+ s_p + "  ";
        p.className = "food";
        p.id=id_num;
        document.querySelector('#order_place').append(p);
        var price = s_p.match(/\d+.\d+/g).map(Number);
        t = price[0];
        show_amount(id_num);
        create_delete_button(p, id_num);
        add_thing(id_num);
        show_notes(id_num);
        show_total();
        remove();
        // show salad Adding
        var show_adding = "Salad_adding"
        salad = "";
      }
    };
  });

  // Click check out button in confirm_modal
  var check = document.getElementById("check");
  check.onclick = () =>{
    var bs = document.querySelectorAll('.food');
    [].forEach.call(bs, function(b){
      var a = b.innerText;
      a = a.replace(/🗑/g, "");
      order_things = order_things + a + " ; "
    });
    var order_all = document.getElementById("order_all");
    order_all.value = order_things;
    var bill = document.getElementById("total_amount");
    var bill_html = document.getElementById("bill");
    bill_html.value = bill.innerHTML;
  }

  //show total price
  function show_total(){
    var to = document.querySelector('#total_amount');
    to.innerHTML = "Total Price: $" + t;
  }

  function show_notes(id){
    var note_infos = document.querySelectorAll('.note');
    [].forEach.call(note_infos,function(note_info){
      var note = note_info.value;
      if (note != ""){
          const ni = document.createElement('p');
          ni.innerHTML = "-- " + note;
          ni.className = "";
          ni.id = "food";
          document.getElementById(id).append(ni);
          note_info.value = "";
        }
    });
  }

  function show_amount(id){
    var amount_info = document.getElementById(what_amount);
    var amount = amount_info.value;
      var aa = parseInt(amount);
      t = aa * t;
      total = t + total;
      t = total.toFixed(2);
      const am = document.createElement('span');
      am.className="badge badge-light";
      am.innerHTML = "✖️"+ amount;
      am.id = id_num;
      document.getElementById(id).append(am);
      amount_info.value = "1";
  }

  function add_thing(id){
    var checkbox = document.querySelectorAll('.add_thing');
    var toppings = [];
    for (var i = 0; i < checkbox.length; i++){
      if (checkbox[i].checked){
         toppings.push(checkbox[i].value);
          const tp = document.createElement('p');
          ch = checkbox[i].value;
          var number = ch.match(/\d+.\d+/g).map(Number);
          total = total + number[0];
          t = total.toFixed(2);
          tp.innerHTML = "+ " + checkbox[i].value;
          tp.id = "";
          document.getElementById(id).append(tp);
          checkbox[i].checked = false;
      }
    }
  }

  // remove from cart
  function remove(){
    delete_buttons = document.querySelectorAll('.delete');
    [].forEach.call(delete_buttons,function(delete_button){
      delete_button.onclick =() =>{
        var parent = document.querySelector("#order_place");
        var id = delete_button.id;
        child = document.getElementById(id);
        var p1 = child.innerText;
        var p2 = p1.match(/\d+.\d+/g).map(Number);
        var p3 = p1.match(/(?<=✖️)\d+/g);
        if (p3 != null){
          p3=p3.map(Number);
          total = total - p2[0]*p3[0];
          if (p2.length > 1){
            for(i=1; i<p2.length; i++){
                total = total - p2[i];
            }
          }
        }
        else{
          total = total-p2[0];
        }
        t = total.toFixed(2);
        parent.removeChild(child);
        show_total();
      }

    });
  }

  //
  function create_delete_button(p, id){
    const b = document.createElement('button');
    b.className = "delete";
    b.id=id;
    b.innerHTML="🗑";
    b.style="background-color:white;padding: 0px 0px 0px 0px;margin: 0px 0px 0px 0px;width:10%;"
    p.append(b);
  }

  // login-modal
  // Get the modal
  var modal01 = document.getElementById('id01');
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal01) {
      modal01.style.display = "none";
      }
    }

  // register-modal
  // Get the modal
  modal02 = document.getElementById('id02');
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal02) {
      modal02.style.display = "none";
    }
  }
  // check password_again
  var psw = document.querySelector('input[name="password"]').value;
  var psw_again = document.querySelector('input[name="password_again"]').value;
  if (psw != psw_again){
    document.getElementById('confirm_message').style.display='none';
  }
});
