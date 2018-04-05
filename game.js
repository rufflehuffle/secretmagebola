//Variables
var st = 0; //Starter
var sc_prev = "sc_1"; //Previous Screen
var pk_img = 0; //Pokemon Image
var pk_inc = 0; //Is pokemon being incubated? 0 = no, 1 = yes
var eg_hat = 0; //Egg Hatch Timer
var inc_time = 0; //Time incubated
var ntf_time = 0; //Notification Timer
var pk_lvl = 0; //Pokemon Level
var pk_nm = 0; //Pokemon Name
var stat_hp = 0; //Health Stat
var stat_atk = 0; //Attack Stat
var stat_def = 0; //Defense Stat
var stat_spa = 0; //Special Attack Stat
var stat_spd = 0; //Special Defense Stat
var stat_spe = 0; //Speed Stat
var rn = 0; //Random Number
var pk_side = 0; //Pokemon Side
var e_stat_hp = 0; // Enemy Health Stat
var e_stat_atk = 0; // Enemy Attack Stat
var e_stat_def = 0; // Enemy Defense Stat
var e_stat_spa = 0; // Enemy Special Attack Stat
var e_stat_spd = 0; // Enemy Special Defense Stat
var e_stat_spe = 0; // Enemy Speed Stat
var epl_time = 0; // Time left until you can explore again
var itm_pkb = 0; // How many Pokeballs
var itm_gtb = 0; //How many Greatballs
var fnd_itmid = 0;

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
    //Incubation
    if (pk_inc == 1) {
        eg_hat = eg_hat - 1;
        inc_time = inc_time + 1;
        u_id("inc_time").innerHTML=inc_time;
        u_id("eg_hat").innerHTML=eg_hat;
    }
    //Egg Hatching
    if (eg_hat < 0) { //Check if egg hatched
        pk_lvl = 1; //Set lvl = 1
        define_pk_hat(); //Check what pokemon hatches from the egg and set stats, name, and image of pokemon
        inc_ftc(); //Take pokemon out of incubator
        u_id("pk_img").src=pk_img; //Update pokemon image
        u_id("con_inc").style.display="none"; //Make incubator invisible
        u_id("btn_inc").style.display="none"; //Make incubate button invisible
        u_id("ntf").innerHTML="Your egg has hatched!"; //Notify that egg has hatched
        u_id("con_ntf").style.display="block"; //Make notification box visible
        ntf_time = 10; //Set notification timer to 10
        eg_hat = 1; //Set egg timer to 1
        u_id("con_stg1").style.display="block"; //Make level and stats button visible
        u_id("pk_lvl").innerHTML=pk_lvl; //Update pokemon level
        u_id("con_act").style.display="block"; //Make actions box visible
    }
    //Notification Timer
    ntf_time = ntf_time - 1; //Subtract 1 from time left for notification
    u_id("ntf_time").innerHTML=ntf_time;
    if (ntf_time == 0) { //Check if notification time is up
        u_id("con_ntf").style.display="none"; //Make notification box invisible
    }
    //Explore Timer
    if (epl_time > 0) {
        epl_time = epl_time - 1;
    }
}

function define_pk_hat(){
    if (pk_img == "egg/bulbasaur.png"){ //Check if egg is a bulbasaur egg
        pk_img = "pk/bulbasaur.gif"; //Set pokemon image to bulbasaur
        pk_nm = "Bulbasaur"; //Set pokemon name to bulbasaur
        set_stat(12, 6, 6, 6, 6, 6, 0); //Set stats
    }
    if (pk_img == "egg/charmander.png"){
        pk_img = "pk/charmander.gif";
        pk_nm = "Charmander";
        set_stat(12, 6, 6, 6, 6, 6, 0);
    }
    if (pk_img == "egg/squirtle.png"){
        pk_img = "pk/squirtle.gif";
        pk_nm = "Squirtle";
        set_stat(12, 6, 6, 6, 6, 6, 0);
    }
    u_id("pk_nm").innerHTML=pk_nm; //Update pokemon name
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
    var y = "music/" + x + ".mp3";
    u_id("audio").src=y;
}

function set_stat(a,b,c,d,e,f,g){
    pk_side = g;
    if (g == 0){
        stat_hp = a;
        stat_atk = b;
        stat_def = c;
        stat_spa = d;
        stat_spd = e;
        stat_spe = f;
    }
    if (g == 1){
        e_stat_hp = a;
        e_stat_atk = b;
        e_stat_def = c;
        e_stat_spa = d;
        e_stat_spd = e;
        e_stat_spe = f;
    }
    u_id("hp").innerHTML=stat_hp;
    u_id("atk").innerHTML=stat_atk;
    u_id("def").innerHTML=stat_def;
    u_id("spa").innerHTML=stat_spa;
    u_id("spd").innerHTML=stat_spd;
    u_id("spe").innerHTML=stat_spe;
}

//Explore
function epl(x) {
    rn = Math.floor(Math.random()*99) + 1; //Set random number to a integer between 1 - 100
    if (x == "r1" && epl_time == 0) {
//******************************Experimental*************************************
        if (rn > 50) {
            u_id("ntf").innerHTML="You have found a Pokeball";
            u_id("con_ntf").style.display="block"; //Make notification box visible
            u_id("btn_clm").style.display="inline-block";
            ntf_time = 10;
            u_id("ntf_time").innerHTML=ntf_time;
            epl_time = 5;
            fnd_itmid = 1;
        } else {
            u_id("ntf").innerHTML="You have found a Greatball";
            u_id("ntf").style.display="block"; //Make notification box visible
            epl_time = 5;
            fnd_itmid = 2;
        }
    }
}

function clm(){
    if (fnd_itmid == 1){
        itm_pkb = itm_pkb + 1;
    }
    if (fnd_itmid == 2){
        itm_gtb = itm_gtb + 1;
    }
}
