//Variables
var st = 0; //Starter
var sc_prev = "sc_1";
var pk = 0;
var pk_img = 0;
var pk_inc = 0;
var eg_hat = 0;
var inc_time = 0;
var ntf_time = 0;
var pk_lvl = 0;
var stat_shw = 0;
var pk_nm = 0;
var hp = 0;
var atk = 0;
var def = 0;
var spa = 0;
var spd = 0;
var spe = 0;

//u_id = document.getElementById
var u_id = function(id){
    return document.getElementById(id);
};

//u_cl = document.getElementByClassName
var u_cl = function(cl,id){
    return document.getElementsByClassName(cl)[id];
};

//Toggle Visibility
function tog_vis(id){
    u_id(id).style.display = u_id(id).style.display==='block' ? 'none' : 'block';
}

//Do every second
window.setInterval(timer, 1000)

function timer() {
    if (pk_inc == 1) {
        eg_hat = eg_hat - 1;
        inc_time = inc_time + 1;
        u_id("inc_time").innerHTML=inc_time;
        u_id("eg_hat").innerHTML=eg_hat;
    }
    if (eg_hat < 0) {
        pk_lvl = 1;
        define_pk_hat();
        inc_ftc();
        u_id("pk_img").src=pk_img;
        u_id("con_inc").style.display="none";
        u_id("btn_inc").style.display="none";
        u_id("ntf").innerHTML="Your egg has hatched!";
        u_id("ntf").style.display="block";
        ntf_time = 10;
        eg_hat = 1;
        u_id("con_stg1").style.display="block";
        u_id("pk_lvl").innerHTML=pk_lvl;
        u_id("con_act").style.display="block";
    }
    ntf_time = ntf_time - 1;
    if (ntf_time == 0) {
        u_id("ntf").innerHTML="";
        u_id("ntf").style.display="none";
    }
}

function define_pk_hat(){
    if (pk_img == "egg/bulbasaur.png"){
        pk_img = "pk/bulbasaur.gif";
        pk_nm = "Bulbasaur";
        set_stat(12, 6, 6, 6, 6, 6);
    }
    if (pk_img == "egg/charmander.png"){
        pk_img = "pk/charmander.gif";
        pk_nm = "Charmander";
        set_stat(12, 6, 6, 6, 6, 6);
    }
    if (pk_img == "egg/squirtle.png"){
        pk_img = "pk/squirtle.gif";
        pk_nm = "Squirtle";
        set_stat(12, 6, 6, 6, 6, 6);
    }
    u_id("pk_nm").innerHTML=pk_nm;
}

//Select Starter
function sel_st(x){
    st = x;
    def_st_eg(st);
    sc_sw("sc_3");
}

//Define Starter Egg
function def_st_eg(x){
    var st_eg = x;
    if (st_eg == 1){
        pk_img = "egg/bulbasaur.png";
        u_cl("st_eg", 0).src=pk_img;
        u_id("pk_img").src=pk_img;
        eg_hat = 1;
    }
    if (st_eg == 2){
        pk_img = "egg/charmander.png";
        u_cl("st_eg", 0).src=pk_img;
        u_id("pk_img").src=pk_img;
        eg_hat = 1;
    }
    if (st_eg == 3){
        pk_img = "egg/squirtle.png"
        u_cl("st_eg", 0).src=pk_img;
        u_id("pk_img").src=pk_img;
        eg_hat = 1;
    }
}

//Screen Swap
function sc_sw(sc_tar){
    u_id(sc_prev).style.display="none";
    u_id(sc_tar).style.display="block";
    sc_prev = sc_tar;
}

//Place in Incubator
function inc_plc(){
    u_id("pk_img").style.display="none";
    u_id("inc_img").src=pk_img;
    pk_inc = 1;
    u_id("btn_ftc").style.display="block";
    u_id("con_eg_hat").style.display="block";
}

//Retrieve from Incubator
function inc_ftc(){
    u_id("pk_img").style.display="block";
    u_id("inc_img").src="";
    pk_inc = 0;
    inc_time = 0;
    u_id("inc_time").innerHTML=inc_time;
    u_id("btn_ftc").style.display="none";
    u_id("con_eg_hat").style.display="none";
}

function sw_aud(x){
    y = "music/" + x + ".mp3";
    u_id("audio").src=y;
}

function set_stat(a,b,c,d,e,f){
    hp = a;
    atk = b;
    def = c;
    spa = d;
    spd = e;
    spe = f;
    u_id("hp").innerHTML=hp;
    u_id("atk").innerHTML=atk;
    u_id("def").innerHTML=def;
    u_id("spa").innerHTML=spa;
    u_id("spd").innerHTML=spd;
    u_id("spe").innerHTML=spe;
}