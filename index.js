const messages = require("./messages.json");
const idlemsg = require("./idlemsg.json");
const provok = require("./provok.json");
const answ = require("./answ.json");
const Vec3 = require('tera-vec3');

module.exports = function slave(dispatch) {    
    let idk = true,
    gameId,
	randomprovok,
	randomansw,
    templateId = 1025,
    huntingZoneId = 212,
	altId = 1406,
	altTemp = 72,
	altName = "Alt Slave",
	petId = 0,
	provoleng = 29,  //jsons length
	free = false, //free
	erand = 0,
	npcmover = false,
	ishapeId = 500384,
	petName = 'Slave',
	int1 = 0,
	int2 = 0,
	npcactdist = 0,
	int3 = 0,
	petloc = 0,
	petw = 0,
	myId = 0,
	npcact = 0,
	npcact1 = 0,
	ender = 0,
	hend = 0,
	iddle = 0,
	//npcloc = 0,
	noidle = false,
	maxhp_e = 0,
	hp_e = 0,
	hpdiff = 0,
	onlyonce = true,
	intfn = 0;
var npcids = [];  
var npclocs = [];
//var erand = 0;
//var randomprovok = 0;
//var randomansw = 0;
const command = dispatch.command;
 
    dispatch.hook('S_LOGIN', 13, (event) => {
        myId = event.gameId;
    });

command.add('slave', {
'free': () => {
if (free == true)
{
sendbubgen(myId, "You may come back now.");
setTimeout(() => { 
free = false;
sendbub("Be right back!");
}, 2000);
}

if (free == false)
{
sendbubgen(myId, "I have some business here, in the while you may go look around if you want.");
setTimeout(() => { 
free = true;
sendbub("Oh, okay! I'll go have a stroll then, just call me back when you want!");
}, 2000);
}

}

});


    dispatch.hook('S_REQUEST_SPAWN_SERVANT', 2, (event) => {
		if (myId != event.ownerId) return;
		
        if (templateId != 0 && huntingZoneId != 0) {
		if (event.type != 0) {
			event.linkedNpcTemplateId = altId;
			event.linkedNpcHuntingZoneId = altTemp;
			event.name = altName;
		} else {
            event.linkedNpcTemplateId = templateId;
            event.linkedNpcHuntingZoneId = huntingZoneId;
			event.name = petName;
		};	
  event.walkSpeed = 43;
  event.runSpeed = 110;
  //event.type = 0;
  petId = event.gameId;
  petloc = event.loc;
  
  //if (petId != 0) emorand();
  
  
            return true;
        }		
    });
	
	function randInt(min, max) { return min + Math.floor(Math.random() * (max-min)); }

            //social hook, mirroring emotes

dispatch.hook("S_SOCIAL", 1, (event) => { 
//if (ender != 1) return;
if (event.target == myId) {
if (free == true) return;
//if (event.animation > 6 && event.animation < 22) 
//int1 = randInt(1, 2);
//int2 = randInt(1, 10);
//intfn = randInt(1, 22);
int1 = event.animation;
intfn = aniconv (int1);

    if (intfn == 0) return;
     if(Object.keys(messages).includes(intfn.toString())) 
		{
		noidle = true;
		sendbub(messages[intfn])
		doEmote(petId, intfn)
		setTimeout(() => { noidle = false }, 10000);
        }
		return true;
} else if (event.target == petId) {
    if (event.animation < 3) {
	if (free == true) return false;
	if (noidle == true) return false;
	int2 = event.animation;
/*	if (noidle == 1) {
	//event.animation = null;
	return false;
	noidle = 0
	} */
//	if(Object.keys(messages).includes(int2.toString())) 
//		{
		/*	
		dispatch.send("S_CHAT", 3, {
        name: petName,
        message: messages[intfn]
        });
		*/
		iddle = idlemsg[randInt(0, idlemsg.length - 1)];
		sendbub(iddle)
		
		noidle = true
		setTimeout(() => { noidle = false }, 10000);
		//sendbub("Test")
		//doEmote(petId, intfn)
//        }
    }
return true;
} else {
//event.animation = intfn;
return true;
//emorand ();
}

});
                 //end hook

//social hook, auto

// dispatch.hook("S_SOCIAL", 1, (event) => { 

// if (event.target != petId) return;
// if (event.animation < 6) {
//	int2 = event.animation;
//	if (noidle == 1) {
//	event.animation = null;
//	return true;
//	}
//	if(Object.keys(messages).includes(int2.toString())) 
//		{
		/*	
		dispatch.send("S_CHAT", 3, {
        name: petName,
        message: messages[intfn]
        });
		*/
//		sendbub(idlemsg[randInt(0, idlemsg.length - 1)])
		//doEmote(petId, intfn)
//        }
// }


// });
//end hook

//update pet location and stop it from following if freed
dispatch.hook("S_NPC_LOCATION", 3, (event) => {
if (event.gameId != petId) return;
if (free == true) return false;
petloc = event.loc;
let petw = event.w,
	petlocx = event.loc.x,
	petlocy = event.loc.y,
	petlocz = event.loc.z;
    console.log(event);	
});

dispatch.hook("S_LOAD_TOPO", 3, (event) => {
if (npcids.length > 0) {
npcids.length = 0;
npclocs.length = 0;
};
});
                                                         //sperimental hook
dispatch.hook("S_SPAWN_NPC", 11, (event) => {
//if (petId == 0) return;
if (event.gameId == petId) return;
//if (event.gameId == npcact) return;
if (event.aggressive == true) return;
if (event.villager == false) return;
if (!event.npcName) return;
if (event.visible == false) return;
if (event.repairable == false) return;
//if (npcmover == true) return;
//if (npcact !== 0) return;
//npcmover = true;
/*
let idnum = event.gameId.toString,
    inum = 0;
var i;

//for (i = 0; i < 2; i++) {
int3 = randInt(0, 9);
inum = idnum.includes(int3);
if (inum == false) return;
// }
*/

npcids.push(event.gameId);
npclocs.push(event.loc);

//int3 = randInt(0,5);
//let inum = randInt(0,5);
//if (int3 !== inum) return
	
	
//if (npcactdist > 250) return;
//10mt

return true;

});
//                                                     npc interaction end


setInterval(() => {
//noidle = true;

//console.log(provok.length);
if (free == true) {
var res;

erand = randInt(1, provoleng);
console.log(erand);
if(Object.keys(provok).includes(erand.toString())) 
		{
randomprovok = provok[erand];	
        }
if(Object.keys(answ).includes(erand.toString())) 
		{
randomansw = answ[erand];	
        }
console.log(randomprovok);
console.log(randomansw);	


if (npcids.length > 1) {
if (npcids.length > 29) { 
do {
npcids.shift();
npclocs.shift();
}
while (npcids.length > 29);
};	

//do 
var rander = randInt(0, npcids.length);	
var randnpcid = npcids[rander];
var randnpcloc = npclocs[rander];

//while (typeof randnpcid == "undefined");

console.log(randnpcid);
console.log("Starting random interaction");
res = npcmoverd (randnpcid, randnpcloc);
//if (!res) 
//delete npcids[rander];
//delete npclocs[rander];
//npcids = npcids.filter(Boolean);
//npclocs = npclocs.filter(Boolean);
//
};


};
}, 20000);


dispatch.hook("S_PLAYER_STAT_UPDATE", 12, (event) => { 
hpdiff = percentage(event.hp, event.maxHp)

//hp tick
if (hpdiff < 39n) {
emohp();
ender = 1
} else if (ender != 0) {
//clearTimeout (ender);
ender = 0
}

});

dispatch.hook("S_REQUEST_DESPAWN_SERVANT", 1, (event) => { 
if (event.gameId === petId) {
petId = 0;
return true;
};

});


function npcmoverd (id, locat) {
//setTimeout(() => {
//npcmover = true;
if (petId == 0) return;
//noidle = true;

npcact = id;
let npcloc1 = locat,
    ///npcloc = npcloc1.subN(20, 20),
    newv = petloc.angleTo(npcloc1),
	npcloc = npcloc1.sub(new Vec3(20,0,0).rotate(newv)),
	npcw = radians_to_degrees(newv),
    //npclocx = event.loc.x,
    //npclocy = event.loc.y,
	//npclocz = event.loc.z,
    neww = (npcw + 180) % 360,
	news = degrees_to_radians(neww),
	npcactdist = npcloc1.dist2D(petloc),
	delayact = Math.round(npcactdist/500),
	delayedmt = Math.round(delayact/25),
    delayms = Math.round(delayedmt*1000);	

console.log("Starting fake movement test.");
console.log(petloc);	
console.log(npcact);
console.log(npcloc);
console.log(npcactdist);	
if (npcactdist > 2000) {
console.log("Too far, aborting.");
return false;
};

dispatch.toClient('S_NPC_LOCATION', 3, { gameId: petId, loc: petloc, w: newv, speed: 250, dest: npcloc, type: 1 });	
setTimeout(() => {
dispatch.toClient('S_NPC_LOCATION', 3, { gameId: petId, loc: petloc, w: newv, speed: 200, dest: npcloc, type: 7 });	
}, 200);
//dispatch.toClient('S_NPC_LOCATION', 3, { gameId: petId, loc: npcloc, w: news, dest: npcloc, type: 0 });

setTimeout(() => {

sendbubgen(id, randomprovok);
setTimeout(() => {
doEmote(petId, 6);
sendbub(randomansw);
}, 2000);
//noidle = false;
petloc = npcloc;
}, 10000);

return
}

	function radians_to_degrees(radians)
	{
	  return radians * (180/Math.PI);
	}
	
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
	
function aniconv (planim) {
//func
if (planim == 16 || planim == 17 || planim == 52 || planim == 43) {
	return 14;
} else if (planim == 18) {
    return 13;
} else if (planim == 19) {
	return 20;
} else if (planim == 20) {
	return 7;
} else if (planim == 21 || planim == 44) {
	return 19;
} else if (planim == 26) {
	return 16;
} else if (planim == 27) {
	return 17;
} else if (planim == 25) {
	return 10;
} else if (planim == 28) {
	return 18;
} else if (planim == 22) {
	return 15;
} else if (planim == 29) {
	return 22;
} else if (planim == 30) {
	return 12;
} else if (planim == 24) {
	return 21;
} else {
	return 0;
}
//bye func
}


function emohp () {
	    if (ender != 0) return;
		
	    intfn = 13
		if(Object.keys(messages).includes(intfn.toString())) 
		{
		/*	
		dispatch.send("S_CHAT", 3, {
        name: petName,
        message: messages[intfn]
        });
		*/
		sendbub("Oh my God, you are dying! Stop dying!");
		doEmote(petId, intfn);
        }	
//ender = setTimeout(emohp(), 60000);
}

function percentage(partialValue, totalValue) {
   return (100n * partialValue) / totalValue;
} 

function sendbub(texte) {
dispatch.toClient('S_QUEST_BALLOON', 1, { 
			message: texte,
			source: petId
});


}
function sendbubgen(src, msg) {
dispatch.toClient('S_QUEST_BALLOON', 1, { 
			message: msg,
			source: src
});


}

	//dispatch.hook('S_NPC_LOCATION', 3, (event) => {
	function emorand() {
        //if (petId = 0) return;

		int1 = randInt(1, 2);
		int2 = randInt(1, 10);
		intfn = randInt(1, 22);
			
		//doEmote(petId, intfn);
		dispatch.toClient('S_SOCIAL', 1, { 
			target: petId,
			animation: intfn
		});
		if(Object.keys(messages).includes(intfn.toString())) 
		{
			
		dispatch.send("S_CHAT", 3, {
        name: petName,
        message: messages[intfn]
        });
		
        }
		dispatch.setTimeout(() => emorand(), randInt(10000, 12000));
	}
	
	
	/*
    function tick() {
        //mod.send('S_CHAT', 3, { name: petName, message: messages[randInt(0, messages.length - 1)] });		
		if (int1 = 5) {
		doEmote(petId, intfin)
		if(Object.keys(messages).includes(intfn.toString())) 
		{
        send(messages[intfin]);
        }
	    }
        //dispatch.setTimeout(() => tick(), randInt(60000, 120000));      
	}
	*/
	
	function doEmote(target, emote) {	
		dispatch.toClient('S_SOCIAL', 1, { 
			target: target,
			animation: emote
		});
	}
	
	function send(message) {
    dispatch.send('S_CHAT', 3, {
        name: petName,
        message: message
    })
    }	
	
    //dispatch.game.on('enter_game', () => tick());
	
}
