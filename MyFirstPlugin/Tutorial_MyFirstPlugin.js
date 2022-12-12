/*:
* @plugindesc Test Plugin 1 for Tutorial Series
* @author LMPGames
*
*
* @param Dialog Options
* @desc A list of dialog for an npc to say
* @type text[]
* @default ["This is a line of dialog", "This is a different line of dialog", "Oh look, dialog number 3", "New dialog option 4"]
*
*
* @param Dialog Variable ID
* @desc Sets the id for the game variable that store dialog
* @type variable
* @default 1
*/

let myFirstPluginParams = PluginManager.parameters('Tutorial_MyFirstPlugin');
var dialogOptions = JSON.parse(myFirstPluginParams['Dialog Options']);
var dialogVariableId = parseInt(myFirstPluginParams['Dialog Variable ID']);
var nextDialogId = 0;

/* Game_System Functions & Aliases */
Game_System.prototype.setNextDialogId = function(id){
	if (dialogOptions.length > id) {
		$gameVariables.setValue(dialogVariableId, dialogOptions[id]);
	} else {
		$gameVariables.setValue(dialogVariableId, dialogOptions[0]);
	}
}

/* Game_Interpreter Functions & Aliases */
var myFirstPlugin_GameInterpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	if (command == "TutorialPlugin1") {
		let argumentString = "";
		for (let arg of args) {
			argumentString += " " + arg;
		}

		command += argumentString;
		if (command.match(/TutorialPlugin1[ ]SetNextDialogId[ ](\d+)/)) {
			let matches = (/TutorialPlugin1[ ]SetNextDialogId[ ](\d+)/.exec(command) || []);
			if (matches.length > 1) {
				$gameSystem.setNextDialogId(matches[1]);
			}
		}
	}
}
