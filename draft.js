var local = "";


// show localStorage
  const p = document.createElement('p');
  p.innerHTML = localStorage.getItem('order');
  p.id = "";
  document.querySelector('#order_place').append(p);


  local = local + p.innerHTML;
  localStorage.setItem('order',local);


  local = local + basic +" "+ size +" "+ price;


  local =local + salad +"$ "+ s_p;


  local = local + "* " + note;


  local = local + "Qty: " + amount;

  local = local + "+ " + checkbox[i].value;

  const b = document.createElement('button');
  b.className = "delete";
  b.id=id_num;
  b.innerHTML="❌";
  b.style="background-color:white;padding: 0px 0px 0px 0px;margin: 0px 0px 0px 0px;width:10%;"
  p.append(b);
