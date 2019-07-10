# slave-driver-simulator

Ok so... it makes your pet (better just use it on normal pet) change into the specified npc, but it also does other stuff: hooks the NPC idle animations and shows random messages, emulates emotes and answers to the actions you do (for example, if you use "love" it will do the love emote, assuming the NPC has it, and say something in a bubble.)
Plus has a command that leaves it to wander around the town to bug other NPCs and have small convos with em, just type "slave free" in your proxy chat and let it free to go where it wants, same command to recall it - if you don't recall, the pet won't move unless you change zone.
Configure the jsons how you please, I won't share mines.

First of all, specify the NPC in the index.js by changing the value of the variables at the beginning:
- templateId => desired NPC.
- huntingZoneId => NPC default zones.
You find NPC Ids (of NA at least) here: https://raw.githubusercontent.com/neowutran/TeraDpsMeterData/master/monsters/monsters-NA.xml
Pick one in a town/open world, search its name/location in there, and change the ids.
Anyway I suggest using default one, also because of the gpk mod, you know - shouldn't be hard to figure out where to put it, just google.

About the Jsons containing the msgs.
- messages.json => emote emulation msgs, ids are from 1 to 22, as for many NPCs.
- idlemsg.json => idle messages, add how many you want.
- provok.json => other NPCs' messages, strictly linked to answ.json.
- answ.json => your pet/NPC answers, they are numbered because every reply in provok links to the corresponding answer in answ.
So for example, if you have "1: How was your day?" in the provok.json, you must have "1: A sht, thanks" in the answ json, remember to sync em at same number or you will get a random NPC ask your pet "How was the day?" and the pet answering "No, I don't do drugs."
Also remember to adjust the provok/answ length value in the index.js, the variable at the beginning called 'provoleng', change it accordingly to the exact key numbers in the provok/answ jsons, *key* number, *not* file lines.

Other functions:
- It tells you you're dying if your HP is low.
- Download the GPK mod for the human NPC (1025/212) and have fun, you have a NSFW slave now.
- You can disable totally Idle spamming by setting "noidle" variable in the beginning to *true*
- If you want to use it with partner, set the "altId" and "altTemp" variables to the same values as "templateId" and "huntingZoneId", cause by default using servant spawns that little brat elf NPCs cause of how amusing her running animation is.

Notes:
- The code is kinda sht, yeah.
- It's a lot fun.
- If your pet goes through walls while freed, too bad, it will come back sooner or later or once you recall it with "slave free."

If you want to change other sht, just edit the code, bye.
