function Calculate() {
    //konversi
    man_diam_orrifice = parseFloat(document.getElementById("dOrificeMM").value);
    man_diam_line = 3 * 25.4; //default 3"
    
    line6 = document.getElementById("line6");
    if (line6.checked) {
        man_diam_line = 6 * 25.4;
    } else {
      if (man_diam_orrifice > 50.8) {
        window.alert("ID orifice lebih besar dari ID line");
        return;
      }
    }

    man_hw = parseFloat(document.getElementById("hw").value);
    abs_press = parseFloat(document.getElementById("upPress").value) + 1.01325;
    abs_temp = parseFloat(document.getElementById("temp").value) + 273.15;
    man_SG = 0.7;

    //kalkulasi
    H15 = (abs_press-1)*14.50377/(697.2-43*man_SG);
    H16 = ((abs_temp-273.15)*1.8+492)/(315.1*man_SG+170.4);
    H17 = 0.3379*LN(LN(H16))+1.091;
    H18 = 21.46*H17-11.9*Math.pow(H17,2)-5.9;
    H19 = (1.1+0.26*H16+(1.04-1.42*H16)*H15/H18)*Math.exp(H15/H18)/H16;
    zO = 1+(H17-1)*Math.pow((Math.sin(H15/H18*Math.PI/2)),H19);

    H22 = 1;
    H23 = man_diam_orrifice/man_diam_line;
    H26 = 25.4/man_diam_line;
    H25 = 0.5959+0.0312*Math.pow(H23,2.1)-0.184*Math.pow(H23,8)+0.0029*Math.pow(H23,2.5)*Math.pow((1/H22),0.75);
    H27 = H25+0.09*H26*0.039-0.0337*H26*Math.pow(H23,3);
    H28 = H25+0.09*H26*Math.pow(H23,4)*Math.pow((1-Math.pow(H23,4)),-1)-0.0337*H26*Math.pow(H23,3);
    H29 = (H26<=0.433)? H28:H27;
    H295 = Math.pow(H23,4);
    H30 = (1-(0.41+0.35*H295)*man_hw*0.0019154/abs_press)/Math.pow((1-H295),0.5)*H29;
    H31 = H30*33.957*Math.pow(man_diam_orrifice,2)*Math.pow((man_hw*abs_press/abs_temp/man_SG/zO),0.5)*0.000024;
    H33 = H31*man_SG/man_diam_line*51.03435;
    H34 = H23;
    H36 = 0.5959+0.0312*Math.pow(H34,2.1)-0.184*Math.pow(H34,8)+0.0029*Math.pow(H34,2.5)*Math.pow((1/H33),0.75);
    H37 = H26;
    H38 = H36+0.09*H37*0.039-0.0337*H37*Math.pow(H34,3);
    H39 = H36+0.09*H37*Math.pow(H34,4)*Math.pow((1-Math.pow(H34,4)),-1)-0.0337*H37*Math.pow(H34,3);
    H40 = (H37<=0.433) ? H39 : H38;
    H41 =(1-(0.41+0.35*Math.pow(H34,4))*man_hw*0.0019154/abs_press)/Math.pow((1-Math.pow(H34,4)),0.5)*H40;
    result = H41*33.957*Math.pow(man_diam_orrifice,2)*Math.pow((man_hw*abs_press/abs_temp/man_SG/zO),0.5)*0.024;
    elem = document.getElementById("Result");
    elem.innerHTML = "Result: " + result.toFixed(2) + " MSCFD";
}

function ConvertMM() {
    document.getElementById("dOrificeMM").value = 25.4 * document.getElementById("dOrificeIn").value;    
}

function LN(params) { return Math.log(params); }