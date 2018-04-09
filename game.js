//Variables
    var pk_inc = 0; //Is pokemon being incubated? 0 = no, 1 = yes
    var eg_hat = 0; //Egg Hatch Timer
    var inc_time = 0; //Time incubated
    var ntf_time = 0; //Notification Timer
    var ntf2_time = 0;
    var trn_time = 0;
    var fnd_itmid = 0; //Item found while exploring
    var epl_time = 0; // Time left until you can explore again
    var rn = 0; //Random Number
    var itmnm = 0;
    var head_act = 0;
//Cookies
    //Cookie Names
        const cookie_names = [ 
            'ck_st',
            'ck_sc_prev',
            'ck_pk_lvl',
            'ck_pk_img',
            'ck_pk_nm',
            'ck_pk_ico',
            'ck_stat',
            'ck_inv'
            ];

    //Variables
        var st = 0; //Starter
        var sc_prev = "sc_1"; //Previous Screen
        var pk_lvl = 0; //Pokemon Level
        var pk_img = 0; //Pokemon Image
        var pk_nm = 0; //Pokemon Name
        var pk_ico = 0; //Pokemon Icon

    //Arrays
        //Stats
            var stat = [
                0, //HP  (stat[0])
                0, //ATK (stat[1])
                0, //DEF (stat[2])
                0, //SPA (stat[3])
                0, //SPD (stat[4])
                0  //SPE (stat[5])
            ];
        //Inventory
            var inv = [
                0, //Pokeballs
                0  //Greatballs
            ];
//Arrays
    //Enemy Stats
        var e_stat = [
            0, //HP  (e_stat[0])
            0, //ATK (e_stat[1])
            0, //DEF (e_stat[2])
            0, //SPA (e_stat[3])
            0, //SPD (e_stat[4])
            0  //SPE (e_stat[5])
        ];
    //Pokemon Names
        const pk_nms = [
            "Bulbasaur",
            "Charmander",
            "Squirtle"
        ];
    //Pokemon Images
        const pk_imgs = [
            "egg/bulbasaur.png",
            "egg/charmander.png",
            "egg/squirtle.png",
            "pk/bulbasaur.gif",
            "pk/charmander.gif",
            "pk/squirtle.gif"
        ];
    //Pokemon Icons
        const pk_icos = [
            "ico/bulbasaur.png",
            "ico/charmander.png",
            "ico/squirtle.png"
        ]
    //Items
        const itms = [
            "Poke Ball",
            "Great Ball"
        ];
    //Item Images
        const itm_imgs = [
            "item/pokeball.png",
            "item/greatball.png"
        ];
    //Stat Gains for Training Bags
        const stat_gain = [
            "2 HP",
            "1 ATK",
            "1 DEF",
            "1 SPA",
            "1 SPD",
            "1 SPE"
        ];
    //Training Bag Names
        const bag = [
            "Azurill",
            "Machop",
            "Aron",
            "Litwick",
            "Flabebe",
            "Zubat"
        ];         

//Shorthand for document.getElementById
    const u_id = function(id){
        return document.getElementById(id);
    };

//Shorthand for document.getElementsByClassName
    const u_cl = function(cl,id){
        return document.getElementsByClassName(cl)[id];
    };
//Toggle Visibility (For elements that start off invisible)
    function tog_vis(id){
        u_id(id).style.display = u_id(id).style.display==='block' ? 'none' : 'block';
    }
//Toggle Visiblity (For elements that start off visible)
    function tog_invis(id){
        u_id(id).style.display = u_id(id).style.display==='none' ? 'block' : 'none';
    }
//Do every second
    window.setInterval(timer, 1000)
    function timer() {
        //Incubation
        if (pk_inc == 1) { //Check time of Incubation
            eg_hat -= 1;
            inc_time += 1;
            u_id("inc_time").innerHTML=inc_time;
            u_id("eg_hat").innerHTML=eg_hat;
        }

        //Egg Hatching
        if (eg_hat < 0) {                                  //Check if egg hatched
            pk_lvl = 1;                                    //Set pokemon level to 1
            define_pk_hat();                               //Check what pokemon hatches from the egg and set stats, name, and image of pokemon
            inc_ftc();                                     //Take pokemon out of incubator
            for (let i = 0; i < 2; i++){
                u_cl("pk_img", i).src=pk_img;
            }
            u_id("con_inc").style.display="none";          //Make incubator invisible
            u_id("btn_inc").style.display="none";          //Make incubate button invisible
            u_id("ntf").innerHTML="Your egg has hatched!"; //Notify the player that their egg has hatched
            u_id("con_ntf").style.display="block";         //Make notification box visible
            ntf_time = 10;                                 //Set notification timer to 10
            eg_hat = 1;                                    //Set egg timer to 1
            u_id("con_stg1").style.display="block";        //Make level and stats button visible
            u_id("pk_lvl").innerHTML=pk_lvl;               //Update pokemon level
            u_id("con_act").style.display="block";         //Make actions box visible
        }

        //Notification Timer
        ntf_time -= 1; //Subtract 1 from time left for notification
        u_id("ntf_time").innerHTML=ntf_time;
        if (ntf_time == 0) { //Check if notification time is up
            u_id("con_ntf").style.display="none"; //Make notification box invisible
        }
        if (ntf2_time > 0){
            ntf2_time -= 1;
        } else {
            u_id("con_ntf2").style.display="none";
        }

        //Explore Timer
        if (epl_time > 0) {
            epl_time -= 1;
        }

        //Training Timer
        if (trn_time > 0) {
            trn_time -= 1;
        }
    }

//Find out what pokemon hatches from the egg
    function define_pk_hat(){
        for (let i = 0; i < 3; i++){
            if (st == i){
                pk_img = pk_imgs[i+3];
                pk_nm = pk_nms[i];
                pk_ico = pk_icos[i];
            }
        }
        set_stat(12, 6, 6, 6, 6, 6, 0); //Set stats
        for (let i = 0; i < 4; i++){
            u_cl("pk_nm", i).innerHTML=pk_nm;
        }
        u_cl("pk_ico", 0).src=pk_ico;
    }

//Select Starter
    function sel_st(x){
        st = x;
        def_st_eg(st);
        sc_sw("sc_3");
    }

//Define Starter Egg
    function def_st_eg(x){
        for (let i = 0; i < pk_imgs.length; i++){
            if (x == i){
                pk_img = pk_imgs[i];
            }
        }
        u_cl("st_eg", 0).src=pk_img;
        for (let i = 0; i < 2; i++){
            u_cl("pk_img", i).src=pk_img;
        }
        eg_hat = 1;
    }

//Screen Swap
    function sc_sw(sc_tar){
        u_id(sc_prev).style.display="none";
        u_id(sc_tar).style.display="block";
        sc_prev = sc_tar;
    }

//Place in Incubator
    function inc_plc(){
        u_cl("pk_img", 0).style.display="none";
        u_id("inc_img").src=pk_img;
        pk_inc = 1;
        u_id("btn_ftc").style.display="block";
        u_id("con_eg_hat").style.display="block";
    }

//Retrieve from Incubator
    function inc_ftc(){
        u_cl("pk_img", 0).style.display="block";
        u_id("inc_img").src="";
        pk_inc = 0;
        inc_time = 0;
        u_id("inc_time").innerHTML=inc_time;
        u_id("btn_ftc").style.display="none";
        u_id("con_eg_hat").style.display="none";
    }

//Music
    function sw_aud(x){
        var y = "music/" + x + ".mp3";
        u_id("audioloop").src=y;
    }

//Setting Pokemon Stats
    function set_stat(a,b,c,d,e,f,x){
    let y = [a, b, c, d, e, f];
    for (let i = 0; i < 6; i++){
        if (x == 0){
            stat[i] = y[i];
        }
        if (x == 1){
            e_stat[i] = y[i];
        }
    }
        u_stat();
    }

//Explore (In dev)
    function epl(x) {
        rn = Math.floor(Math.random()*99) + 1; //Set random number to a integer between 1 - 100
        console.log(rn) // ***Remove when done***
        //Route 1
        if (x == "r1" && epl_time == 0) {
            prg("bar_r1", 1); //progress bar on route 1
            setTimeout(function() { //Wait Timer for Explore
                if (epl_time == 0){ //Checks if explore timer is 0
                    if (rn > 50) { //Checks the random number generated
                        fnd(0);
                    } else {
                        fnd(1);
                    }
                }
            }, 1000);
        epl_time = 1; // **Test value**
        }
    }

//Find Item
    function fnd(x){
        for (let i = 0; i < itms.length; i++){
            itmnm = itms[x];
            var img = itm_imgs[x];
        }
        u_id("ntf").innerHTML="You have found a " + itmnm;
        fnd_itmid = x;
        u_id("img_ntf").src=img;
        u_id("con_ntf").style.display="block";
        u_id("btn_clm").style.display="inline-block";
        ntf_time = 10;
        u_id("ntf_time").innerHTML=ntf_time;
        u_id("con_itm_ntf").style.display="inline-block";
        tog_ab();
        tog_vis("epl_r1");
        u_ah('Actions');
        tog_invis('head_act_br');
    }


//Claim Item
    function clm(){
        for (let i = 0; i < itms.length; i++){
            if (fnd_itmid == i){
                inv[i] += 1;
            }
        }
        u_id("ntf").innerHTML=itmnm + " sent to bag.";
        ntf_time = 3;
        u_id("btn_clm").style.display="none";
        u_id("itm_1").innerHTML=inv[0];
        u_id("itm_2").innerHTML=inv[1];
    }

//Fill Bar
    function prg(bar, dist){
        var width = 0;
        var interval = setInterval(frame, 10);
        function frame(){
            if (width >= 100){
                clearInterval(interval);
                width = 0;
                u_id(bar).style.width = width + "%";
            } else {
                width = width + dist;
                u_id(bar).style.width = width + "%";
            }
        }
    }

//Train
    function trn(x){
        if (trn_time == 0){
            prg("bar_trn", 0.2);
            setTimeout(function(){
                if (x == 0){
                    stat[x] += 2;
                } else {
                stat[x] += 1;
                }
                u_stat();
                tog_vis("con_ntf2");
                u_id("ntf2").innerHTML = pk_nm + " gained " + stat_gain[x] + " from breaking open a " + bag[x] + " bag.";
                ntf2_time = 5;
                tog_ab();
                tog_vis("trn_wait");
                u_ah('Actions');
                tog_invis('head_act_br');
            }, 5000)
            trn_time = 5;
        }
    }

//Update Stats
    function u_stat(){
        var a = ["hp", "atk", "def", "spa", "spd", "spe"]
        for (let i = 0; i < a.length; i++){
            u_id(a[i]).innerHTML=stat[i];
        }
    }

//Update Actions Heading
    function u_ah(x){
        var head_act = x;
        u_id("head_act").innerHTML=head_act;
    }

//Toggle Visibility of Action Buttons
    function tog_ab(){
        tog_invis('btn_epl');
        tog_invis('btn_fig');
        tog_invis('btn_trn');
    }

//Set Cookie
    function cset(cname, cvalue){
        document.cookie = cname + "=" + cvalue + ";"
    }

//Get Cookie
    function cget(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
//Save
    function csv(){
        let cookie_values = [
            st,
            sc_prev,
            pk_lvl,
            pk_img,
            pk_nm,
            pk_ico,
            stat,
            inv
        ];
        for (let i = 0; i < cookie_names.length; i++){
            cset(cookie_names[i], cookie_values[i]);
        }
        console.log(document.cookie);
    }

//Start Game
    function btn_start(){
            sc_sw('sc_2')
    }